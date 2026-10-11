import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const tempSrc =
  process.env.TEMP || process.env.TMP || process.env.TMPDIR || "/tmp";
const srcPath = path.join(tempSrc, "farsiui-skills-data.ts");

const src = fs.readFileSync(srcPath, "utf8");

function extractArrayLiteral(source, exportName) {
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Missing ${exportName}`);
  const eq = source.indexOf("=", start);
  const bracket = source.indexOf("[", eq);
  let depth = 0;
  let end = -1;
  for (let i = bracket; i < source.length; i++) {
    const ch = source[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`Unclosed array for ${exportName}`);
  return source.slice(bracket, end);
}

function toJsValue(tsLiteral) {
  const code = tsLiteral
    .replace(/\bas const\b/g, "")
    .replace(/,\s*([}\]])/g, "$1");
  return Function(`"use strict"; return (${code});`)();
}

function titleFromSlug(slug) {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (part.toLowerCase() === "ui") return "UI";
      if (part.toLowerCase() === "seo") return "SEO";
      if (part.toLowerCase() === "rtl") return "RTL";
      if (part.toLowerCase() === "mcp") return "MCP";
      if (part.toLowerCase() === "md") return "MD";
      if (part.toLowerCase() === "cli") return "CLI";
      if (part.toLowerCase() === "api") return "API";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function englishSummary(skill) {
  const text = skill.activationDescription || skill.summary || "";
  const cut = text.split(/(?<=[.!?])\s+/)[0] || text;
  return cut.length > 220 ? `${cut.slice(0, 217).trim()}…` : cut.trim();
}

const categoriesRaw = toJsValue(extractArrayLiteral(src, "SKILL_CATEGORIES"));
const skillsRaw = toJsValue(extractArrayLiteral(src, "skills"));

const categories = categoriesRaw.map((c) => ({
  id: c.id,
  name: c.titleEn,
  nameFa: c.title,
  description: c.description,
}));

const skills = skillsRaw.map((skill) => {
  const cursorTarget = (skill.installTargets || []).find((t) => t.id === "cursor");
  const installPath =
    cursorTarget?.paths?.[0] || `.cursor/skills/${skill.slug}/SKILL.md`;
  const englishName =
    skill.titleEn && skill.titleEn !== skill.slug
      ? skill.titleEn
      : titleFromSlug(skill.slug);

  return {
    id: skill.slug,
    name: englishName,
    nameFa: skill.title,
    slug: skill.slug,
    category: skill.category,
    tags: skill.tags || [],
    summary: englishSummary(skill),
    description: skill.activationDescription || skill.summary,
    whenToUse: (skill.useCases || []).join(" · ") || skill.summary,
    useCases: skill.useCases || [],
    installPath,
    installCommand: skill.installCommand || "",
    example: skill.example || "",
    featured: [
      "persian-formal",
      "persian-rtl-ui",
      "persian-seo",
      "jalali-calendar",
      "iran-validation",
    ].includes(skill.slug),
    source: "farsiui",
    // Upstream credit from FarsiUI `source` field; otherwise FarsiUI itself
    sourceName: skill.source?.name || "FarsiUI",
    sourceUrl: skill.source?.url || "https://farsiui.ir/skills",
    sourceRepo: skill.source?.url || "https://github.com/MiladJoodi/FarsiUI",
    filesPath: `skills/${skill.slug}/`,
  };
});

const out = { categories, skills };
const outPath = path.join(root, "data", "skills.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

console.log(
  `Wrote ${skills.length} skills in ${categories.length} categories → ${outPath}`
);
console.log(
  categories
    .map(
      (c) =>
        `${c.id}: ${skills.filter((s) => s.category === c.id).length} — ${c.name}`
    )
    .join("\n")
);

const { spawnSync } = await import("node:child_process");
const gen = spawnSync(process.execPath, [path.join(__dirname, "generate-skills-data.mjs")], {
  cwd: root,
  encoding: "utf8",
});
if (gen.stdout) process.stdout.write(gen.stdout);
if (gen.status !== 0) {
  if (gen.stderr) process.stderr.write(gen.stderr);
  process.exit(gen.status || 1);
}
