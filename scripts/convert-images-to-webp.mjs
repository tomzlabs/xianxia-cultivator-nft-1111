import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = process.argv[2];
const targetDir = path.join(root, "images");

if (!sourceDir) throw new Error("Usage: node scripts/convert-images-to-webp.mjs <source-directory>");

await mkdir(targetDir, { recursive: true });
const sources = (await readdir(sourceDir)).filter((file) => /^xianxia-\d{4}\.png$/.test(file)).sort();

for (const source of sources) {
  const target = source.replace(/\.png$/, ".webp");
  await sharp(path.join(sourceDir, source)).webp({ quality: 92, effort: 5 }).toFile(path.join(targetDir, target));
}

console.log(`Converted ${sources.length} avatar images to ${targetDir}`);
