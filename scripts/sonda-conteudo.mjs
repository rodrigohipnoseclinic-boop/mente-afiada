// Sonda: verifica se cada arquivo tem texto extraível (PDF) ou lê DOCX/EPUB.
// Uso: node scripts/sonda-conteudo.mjs
import fs from "node:fs";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const raiz = path.resolve("conteudo");
const pastas = ["terapiatri", "materiais-extra"];

function listar(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? listar(p) : [p];
  });
}

async function lerPdf(file) {
  const buf = fs.readFileSync(file);
  const parser = new PDFParse({ data: buf });
  try {
    const r = await parser.getText();
    const txt = (r.text || "").replace(/\s+/g, " ").trim();
    return { chars: txt.length, paginas: r.total ?? r.pages?.length ?? 0, amostra: txt.slice(0, 160) };
  } finally {
    await parser.destroy().catch(() => {});
  }
}

async function lerDocx(file) {
  const r = await mammoth.extractRawText({ path: file });
  const txt = (r.value || "").replace(/\s+/g, " ").trim();
  return { chars: txt.length, paginas: null, amostra: txt.slice(0, 160) };
}

async function lerRtf(file) {
  let s = fs.readFileSync(file, "latin1");
  s = s.replace(/\\'([0-9a-f]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
  s = s.replace(/\\[a-z]+-?\d+\s?/gi, " ").replace(/[{}]/g, " ").replace(/\s+/g, " ").trim();
  return { chars: s.length, paginas: null, amostra: s.slice(0, 160) };
}

async function lerEpub(file) {
  // EPUB é um ZIP: conta entradas HTML sem extrair deps
  return { chars: fs.statSync(file).size, paginas: null, amostra: "(EPUB — extração completa na próxima etapa)" };
}

const linhas = [];
for (const pasta of pastas) {
  for (const file of listar(path.join(raiz, pasta))) {
    const ext = path.extname(file).toLowerCase();
    let r;
    try {
      if (ext === ".pdf") r = await lerPdf(file);
      else if (ext === ".docx") r = await lerDocx(file);
      else if (ext === ".rtf") r = await lerRtf(file);
      else if (ext === ".epub") r = await lerEpub(file);
      else continue;
    } catch (e) {
      r = { chars: 0, paginas: null, amostra: "ERRO: " + e.message.slice(0, 80) };
    }
    const status = ext === ".pdf"
      ? (r.chars > 2000 ? "TEXTO OK" : r.chars > 200 ? "POCO TEXTO" : "PROVAVEL ESCANEADO")
      : "OK";
    linhas.push({
      arquivo: path.basename(file),
      tipo: ext.slice(1).toUpperCase(),
      status,
      paginas: r.paginas ?? "-",
      chars: r.chars,
      amostra: r.amostra.replace(/\n/g, " "),
    });
  }
}

console.log(JSON.stringify(linhas, null, 2));
fs.writeFileSync("scripts/sonda-resultado.json", JSON.stringify(linhas, null, 2), "utf8");
