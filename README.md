# Agent Skills

Personal collection of agent skills I use. Browse, open a skill, download or copy `SKILL.md`.

## Run

```bash
npx --yes serve -l 5500
```

Or open `index.html` directly.

## Structure

```text
skills/<slug>/SKILL.md
data/skills.json
js/skills-data.js
```

## Sync from FarsiUI

```bash
node scripts/import-farsiui-skills.mjs
node scripts/fetch-skill-files.mjs
```

## License

MIT
