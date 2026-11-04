// Parser RTF robusto: remove gruas de controle (fonttbl, colortbl, pict, stylesheet...)
// e converte o texto real. Uso: node scripts/rtf-limpar.mjs <entrada> <saida>
import fs from "node:fs";

const DESTINOS_IGNORAR = new Set([
  "fonttbl", "colortbl", "stylesheet", "info", "pict", "object", "objdata",
  "header", "headerl", "headerr", "headerf", "footer", "footerl", "footerr",
  "footerf", "listtable", "listoverridetable", "revtbl", "rsidtbl",
  "generator", "themedata", "colorschememapping", "datastore", "latentstyles",
  "fldinst", "xmlnstbl", "mmathPr", "filetbl", "pnseclvl", "wgrffmtfilter",
]);

function limparRtf(buf) {
  const s = buf.toString("latin1");
  const out = [];
  let i = 0;
  let ignorarAte = -1; // profundidade de fechamento quando ignorando
  let ignorando = false;
  let profundidade = 0;
  let pendenteEspaco = false;

  const push = (ch) => {
    if (pendenteEspaco) {
      out.push(" ");
      pendenteEspaco = false;
    }
    out.push(ch);
  };

  while (i < s.length) {
    const c = s[i];

    if (c === "{") {
      profundidade++;
      i++;
      // Descobre se este grupo é um destino a ignorar
      if (s[i] === "\\") {
        let j = i + 1;
        let palavra = "";
        while (j < s.length && /[a-zA-Z*]/.test(s[j])) palavra += s[j++];
        // Só define o alvo se ainda NÃO estamos ignorando: grupos aninhados
        // (ex.: {\*\panose ...} dentro de {\fonttbl) não podem resetar o alvo.
        if (!ignorando && (palavra.startsWith("*") || DESTINOS_IGNORAR.has(palavra.toLowerCase()))) {
          ignorando = true;
          ignorarAte = profundidade;
        }
      }
      continue;
    }

    if (c === "}") {
      if (ignorando && profundidade === ignorarAte) ignorando = false;
      profundidade = Math.max(0, profundidade - 1);
      i++;
      continue;
    }

    if (ignorando) {
      i++;
      continue;
    }

    if (c === "\\") {
      const n = s[i + 1];

      // Escapes de caractere
      if (n === "\\" || n === "{" || n === "}") {
        push(n);
        i += 2;
        continue;
      }
      // Hex
      if (n === "'") {
        const hex = s.substr(i + 2, 2);
        const code = parseInt(hex, 16);
        if (!Number.isNaN(code)) {
          if (code >= 128) {
            // cp1252 aproximado
            const mapa = { 0x93: "\u201C", 0x94: "\u201D", 0x92: "\u2019", 0x91: "\u2018",
                           0x96: "\u2013", 0x97: "\u2014", 0x85: "\u2026" };
            push(mapa[code] ?? String.fromCharCode(code));
          } else {
            push(String.fromCharCode(code));
          }
        }
        i += 4;
        continue;
      }
      // Unicode \uN (só se vier número de verdade; senão cai no control word geral)
      if (n === "u" && /[-\d]/.test(s[i + 2] ?? "")) {
        let j = i + 2;
        let num = "";
        if (s[j] === "-") { num += "-"; j++; }
        while (j < s.length && /\d/.test(s[j])) num += s[j++];
        const code = parseInt(num, 10);
        if (!Number.isNaN(code)) push(String.fromCharCode((code + 65536) % 65536));
        if (s[j] === "?") j++;
        i = j;
        continue;
      }
      // Control word
      let j = i + 1;
      let palavra = "";
      while (j < s.length && /[a-zA-Z]/.test(s[j])) palavra += s[j++];
      let param = "";
      if (s[j] === "-") { param += "-"; j++; }
      while (j < s.length && /\d/.test(s[j])) param += s[j++];
      if (s[j] === " ") j++;

      if (palavra === "par" || palavra === "line" || palavra === "sect" || palavra === "row") {
        out.push("\n");
        pendenteEspaco = false;
      } else if (palavra === "tab" || palavra === "cell") {
        out.push("\t");
        pendenteEspaco = false;
      } else if (palavra === "emdash") {
        push("\u2014");
      } else if (palavra === "endash") {
        push("\u2013");
      } else if (palavra === "bullet") {
        push("\u2022");
      } else if (palavra === "lquote") {
        push("\u2018");
      } else if (palavra === "rquote") {
        push("\u2019");
      } else if (palavra === "ldblquote") {
        push("\u201C");
      } else if (palavra === "rdblquote") {
        push("\u201D");
      } else {
        pendenteEspaco = true;
      }
      i = j;
      continue;
    }

    if (c === "\r" || c === "\n") { i++; continue; }
    if (c === " " || c === "\t") { pendenteEspaco = true; i++; continue; }

    push(c);
    i++;
  }

  return out.join("")
    .replace(/[ ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const [entrada, saida] = process.argv.slice(2);
if (!entrada || !saida) {
  console.error("Uso: node scripts/rtf-limpar.mjs <entrada.rtf> <saida.txt>");
  process.exit(1);
}
const txt = limparRtf(fs.readFileSync(entrada));
fs.writeFileSync(saida, txt, "utf8");
console.log(`OK ${saida}`);
console.log(`palavras: ${txt.split(/\s+/).filter(Boolean).length.toLocaleString("pt-BR")}`);
console.log(`caracteres: ${txt.length.toLocaleString("pt-BR")}`);
console.log("--- amostra ---");
console.log(txt.slice(0, 700));
