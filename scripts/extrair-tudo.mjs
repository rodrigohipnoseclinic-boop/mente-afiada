// Extrai texto de todos os materiais em conteudo/ para conteudo/extraido/*.txt
// Uso: node scripts/extrair-tudo.mjs
import fs from "node:fs";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const RAIZ = path.resolve("conteudo");
const SAIDA = path.join(RAIZ, "extraido");
const PASTAS = ["terapiatri", "materiais-extra"];

fs.mkdirSync(SAIDA, { recursive: true });

const slug = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 70);

function listar(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? listar(p) : [p];
  });
}

/** Limpa RTF de forma robusta o suficiente para glossários. */
function desRtf(raw) {
  let s = raw;
  // Remove grupos de destino que não têm texto útil
  s = s.replace(/\{\\\*\\[^{}]*\}/g, " ");
  s = s.replace(/\{\\\*[^{}]*\}/g, " ");
  // Escapes hexadecimais (cp1252)
  s = s.replace(/\\'([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  // Unicode \uNNNN?
  s = s.replace(/\\u(-?\d+)\??/g, (_, n) => String.fromCharCode((parseInt(n, 10) + 65536) % 65536));
  // Quebras
  s = s.replace(/\\par[d]?\b/g, "\n").replace(/\\line\b/g, "\n").replace(/\\tab\b/g, "\t");
  // Controle words restantes
  s = s.replace(/\\[a-zA-Z]+-?\d* ?/g, " ");
  // Escapes de caractere
  s = s.replace(/\\([\\{}])/g, "$1");
  // Chaves
  s = s.replace(/[{}]/g, " ");
  // Normaliza
  return s.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

const indice = [];

for (const pasta of PASTAS) {
  for (const file of listar(path.join(RAIZ, pasta))) {
    const ext = path.extname(file).toLowerCase();
    const nome = path.basename(file);
    let texto = "";
    let metodo = "";

    try {
      if (ext === ".pdf") {
        const parser = new PDFParse({ data: fs.readFileSync(file) });
        try {
          const r = await parser.getText();
          texto = r.text || "";
        } finally {
          await parser.destroy().catch(() => {});
        }
        metodo = "pdf-parse";
      } else if (ext === ".docx") {
        const r = await mammoth.extractRawText({ path: file });
        texto = r.value || "";
        metodo = "mammoth";
      } else if (ext === ".rtf") {
        texto = desRtf(fs.readFileSync(file, "latin1"));
        metodo = "des-rtf";
      } else if (ext === ".epub") {
        indice.push({ arquivo: nome, ignorado: true, motivo: "EPUB duplicado do PDF" });
        continue;
      } else {
        continue;
      }
    } catch (e) {
      indice.push({ arquivo: nome, erro: e.message.slice(0, 120) });
      continue;
    }

    // Remove marcadores de página "-- N of M --"
    texto = texto.replace(/^--\s*\d+\s+of\s+\d+\s*--\s*$/gm, "");
    // Normaliza espaços mantendo parágrafos
    texto = texto.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

    const destino = path.join(SAIDA, slug(nome) + ".txt");
    fs.writeFileSync(destino, texto, "utf8");

    const palavras = texto.split(/\s+/).filter(Boolean).length;
    indice.push({
      arquivo: nome,
      saida: path.basename(destino),
      metodo,
      caracteres: texto.length,
      palavras,
      paginas_estimadas: Math.max(1, Math.round(palavras / 300)),
    });
  }
}

const validos = indice.filter((i) => i.palavras);
const totalPalavras = validos.reduce((a, b) => a + b.palavras, 0);
const totalChars = validos.reduce((a, b) => a + b.caracteres, 0);

fs.writeFileSync(
  path.join(SAIDA, "_indice.json"),
  JSON.stringify(
    { gerado_em: new Date().toISOString(), arquivos: indice, total_palavras: totalPalavras, total_caracteres: totalChars },
    null,
    2
  ),
  "utf8"
);

console.table(
  validos.map((i) => ({ arquivo: i.arquivo.slice(0, 45), metodo: i.metodo, palavras: i.palavras, chars: i.caracteres }))
);
console.log(`\nTOTAL: ${totalPalavras.toLocaleString("pt-BR")} palavras · ${totalChars.toLocaleString("pt-BR")} caracteres`);
