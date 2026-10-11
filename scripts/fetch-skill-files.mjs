import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, "data", "skills.json"), "utf8")
);

const API =
  "https://api.github.com/repos/MiladJoodi/FarsiUI/git/trees/main?recursive=1";
const RAW =
  "https://raw.githubusercontent.com/MiladJoodi/FarsiUI/main/";

const skillsRoot = path.join(root, "skills");
fs.mkdirSync(skillsRoot, { recursive: true });

const headers = {
  "User-Agent": "agent-skills-importer",
  Accept: "application/vnd.github+json",
};

console.log("Fetching repo tree…");
const treeRes = await fetch(API, { headers });
if (!treeRes.ok) throw new Error(`Tree HTTP ${treeRes.status}`);
const tree = await treeRes.json();

const prefix = "apps/v4/content/skills/";
const wantedSlugs = new Set(catalog.skills.map((s) => s.slug));

const files = tree.tree.filter((item) => {
  if (item.type !== "blob" || !item.path.startsWith(prefix)) return false;
  const rest = item.path.slice(prefix.length);
  const slug = rest.split("/")[0];
  if (!wantedSlugs.has(slug)) return false;
  if (rest === "README.md") return false;
  return true;
});

console.log(`Downloading ${files.length} files for ${wantedSlugs.size} skills…`);

let ok = 0;
let fail = 0;

for (const file of files) {
  const relative = file.path.slice(prefix.length);
  const dest = path.join(skillsRoot, relative);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  process.stdout.write(`${relative}… `);
  try {
    const res = await fetch(RAW + file.path, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    ok++;
    console.log("ok");
  } catch (err) {
    fail++;
    console.log("FAIL", err.message);
  }
}

console.log(`Done: ${ok} ok, ${fail} failed`);
console.log(
  "Local skill folders:",
  fs.readdirSync(skillsRoot).filter((name) =>
    fs.statSync(path.join(skillsRoot, name)).isDirectory()
  ).length
);
