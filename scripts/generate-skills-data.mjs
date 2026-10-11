import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const jsonPath = path.join(root, "data", "skills.json");
const outPath = path.join(root, "js", "skills-data.js");

const catalog = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const body = `/* Auto-generated from data/skills.json — do not edit by hand.
 * Regenerate: node scripts/generate-skills-data.mjs
 */
window.SKILLS_CATALOG = ${JSON.stringify(catalog, null, 2)};
`;

fs.writeFileSync(outPath, body, "utf8");
console.log(
  `Wrote ${catalog.skills.length} skills → ${path.relative(root, outPath)}`
);
