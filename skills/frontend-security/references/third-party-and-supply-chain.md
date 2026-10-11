# Third-Party Scripts and Supply Chain

## Contents
- Third-party scripts
- Subresource Integrity
- Dependencies
- Common mistakes

## Third-party scripts

A third-party script runs with full access to the page, including forms and (without `HttpOnly`) cookies. Treat each one as a trust decision.

- Inventory every script: purpose, owner, data it can access, which pages it loads on.
- Load the fewest possible. Keep them off login, checkout, and account pages unless essential.
- Prefer `next/script` with an explicit `strategy`, and pass the CSP `nonce` (see `csp-headers-cors.md`).
- Restrict where scripts can send data with `connect-src` and related directives.
- Gate optional analytics and marketing scripts behind consent where required.
- Never pass secrets or sensitive customer data to analytics or chat widgets.
- Never load scripts from user-controlled URLs, and avoid `document.createElement("script")` with data-derived `src`.
- Prefer self-hosting a pinned copy when the vendor allows it.

## Subresource Integrity

SRI makes the browser reject a script or stylesheet whose bytes differ from a known hash. It only works for resources at stable, versioned URLs whose content never changes in place.

```tsx
<Script
  src="https://cdn.example.com/lib-1.2.3.min.js"
  integrity="sha384-REPLACE_WITH_VERIFIED_HASH"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

- The hash above is a placeholder. Compute it from the exact file (`openssl dgst -sha384 -binary file.js | openssl base64 -A`, prefixed with `sha384-`). Never ship a made-up hash.
- Pin the exact version in the URL. SRI on an unversioned "latest" URL will break the site when the file changes.
- If the vendor publishes no stable hash and changes the file in place, self-host a pinned copy or accept and document the risk.
- Verify that your framework and CDN setup supports the integrity attributes you add.

## Dependencies

- Commit the lockfile. Install from it in CI (`npm ci`, `pnpm install --frozen-lockfile`, `yarn install --immutable`). Do not delete the lockfile to "fix" problems.
- Use the package manager the repository already uses.
- Run the audit command (`npm audit --omit=dev --audit-level=high`, `pnpm audit`, `yarn npm audit`) in CI and on dependency changes. Judge advisories by severity, affected versions, and reachability; do not blindly suppress or force-fix with breaking upgrades.
- Pin or tightly range security-sensitive direct dependencies and review updates deliberately. Consider a short cooldown before adopting brand-new releases.
- Before adding a package, especially in auth, payment, or build paths: check the official name (typosquatting), maintainers, activity, download history, and whether the platform already provides the feature. Do not install a package just because an AI answer mentioned it.
- Inspect install and lifecycle scripts of new dependencies and unexpected additions to the lockfile.
- Remove unused dependencies and scripts.
- A clean audit does not prove the application is secure; it only covers known advisories.

## Common mistakes

- Adding a chat or analytics snippet to checkout pages without review or CSP changes.
- SRI hash copied from a different version, or a placeholder left in production.
- Unpinned CDN `latest` URLs.
- Deleting the lockfile or running `npm audit fix --force` blindly.
- Installing a lookalike package name suggested by an AI answer.
