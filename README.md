# Agent Skills

Static Agent Skills catalog based on [FarsiUI Skills](https://farsiui.ir/skills). Browse, filter by category, and download real `SKILL.md` files — no build step, GitHub Pages ready. English UI; each skill lives in its own folder under `skills/`.

**Live:** Pages را از شاخه `main` (root) فعال کنید:

`https://miladjoodi.github.io/agent-skills/`

## Stack

- HTML, CSS, JavaScript — English UI (classic scripts, works with double-click / `file://`)
- Catalog: [`data/skills.json`](data/skills.json) + generated [`js/skills-data.js`](js/skills-data.js)
- Full skill trees: [`skills/<slug>/`](skills/)
- No React, bundler, or backend

## Local development

You can open [`index.html`](index.html) directly in the browser (same pattern as the portfolio: data ships in `js/skills-data.js`).

Or serve over HTTP:

```bash
npx --yes serve -l 5500
```

## Project layout

```text
agent-skills/
├── index.html
├── pages/skill.html
├── data/skills.json          # ۷ دسته + ۳۰ مهارت (FarsiUI)
├── skills/<slug>/SKILL.md    # فایل واقعی برای دانلود
├── css/ · js/
├── scripts/                  # import از FarsiUI
├── serve.json
├── .nojekyll
├── LICENSE
└── README.md
```

## همگام‌سازی با FarsiUI

```bash
# ۱) skills-data.ts را از ریپو بگیر
curl -sL "https://raw.githubusercontent.com/MiladJoodi/FarsiUI/main/apps/v4/lib/skills-data.ts" -o "$TEMP/farsiui-skills-data.ts"

# ۲) کاتالوگ JSON + js/skills-data.js
node scripts/import-farsiui-skills.mjs

# ۳) فایل‌های SKILL.md
node scripts/fetch-skill-files.mjs

# فقط regenerate کردن skills-data.js از JSON:
node scripts/generate-skills-data.mjs
```

صفحه جزئیات: `pages/skill.html?id=<slug>` — دکمه دانلود همان فایل واقعی داخل `skills/` را می‌دهد.

## License

MIT — see [LICENSE](LICENSE).
