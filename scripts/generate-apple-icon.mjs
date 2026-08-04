import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const source = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#141616"/>
  <circle cx="90" cy="90" r="59" stroke="#c7a552" stroke-width="3.5" fill="none"/>
  <text x="90" y="114" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="500" font-size="56" fill="#fefefe">RL</text>
</svg>
`;

const outPath = path.join(__dirname, "..", "app", "apple-icon.png");

await sharp(Buffer.from(source)).png().toFile(outPath);

console.log(`Wrote ${outPath}`);
