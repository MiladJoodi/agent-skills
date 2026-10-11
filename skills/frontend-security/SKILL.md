---
name: frontend-security
description: Secure-by-default guidance for writing, reviewing, and fixing frontend code in React and Next.js (App Router) - XSS and unsafe HTML, dangerouslySetInnerHTML, DOMPurify, URL and redirect validation, Content Security Policy with nonces, security headers (HSTS, nosniff, frame-ancestors, Referrer-Policy, Permissions-Policy), CORS, cookies and token storage, CSRF, Server Action and Route Handler hardening, third-party scripts and SRI, npm supply-chain risk, form and input validation, file uploads, payment verification and webhooks, and OTP/SMS login. Use this skill whenever the user mentions XSS, CSP, CSRF, CORS, cookies, JWT or token storage, sanitizing HTML, security headers, secure login, payment callbacks, uploads, or asks for a security review or audit of frontend code. Also use it when writing code that renders user-controlled content, handles sessions or auth, or accepts payments, even if the user never says "security".
---

# Frontend Security (React / Next.js)

Rules for writing, reviewing, and fixing frontend code so it is secure by default. Prefer small, targeted changes that preserve existing behavior. Concrete fixes over theory.

Last reviewed: October 2026. Version-sensitive details (Next.js APIs, header values) change; see "Verify before asserting" below.

## How to work

1. **Inspect first.** Read `package.json` (Next.js and React versions), the router in use (App Router or Pages), the auth model (cookie session or bearer token), and where headers are set today (`proxy.ts` / `middleware.ts`, `next.config`, reverse proxy, hosting platform). Do not add a protection that already exists or conflicts with one that does.
2. **Trace untrusted data** from source (user input, URL, API, CMS, uploads, third parties) to sink (DOM, URL, cookie, DB, redirect, file path). Security bugs live at the sinks.
3. **Pick the mode:** implementing, fixing, or auditing. For audits, report each finding with severity, file and line, evidence, and a concrete fix. Do not pad the report with generic advice.
4. **Make the smallest secure change.** Do not rewrite an auth or deployment architecture when a targeted fix works.
5. **Verify, then report.** Say what you checked and what you could not. Never claim something is fixed because a config line exists; confirm the effective behavior (response headers, rendered HTML, test results).

Ask the user only what changes the answer: cookie session vs bearer token, Next.js version, where headers are configured, whether user-supplied HTML is a real requirement. Never ask for real secrets, production tokens, or session cookies.

## Non-negotiable rules

1. **The browser is untrusted.** Client-side validation, hidden buttons, disabled controls, route guards, and TypeScript types are UX, not security. Enforce every security decision on the server.
2. **Render untrusted data as text.** Any HTML sink (`dangerouslySetInnerHTML`, `innerHTML`, and similar) needs a maintained sanitizer with a restrictive allowlist, applied at the render boundary. Never use regex to sanitize.
3. **URLs from data are untrusted.** Allowlist protocols (`http:`, `https:`, optionally `mailto:`) before putting them in `href` or `src`. Validate redirect targets against relative paths or an explicit host allowlist.
4. **Keep credentials out of JavaScript.** Session and refresh tokens belong in `HttpOnly; Secure; SameSite` cookies, not `localStorage`, `sessionStorage`, URLs, or logs.
5. **Cookie-authenticated mutations need CSRF defense and authorization.** `SameSite` helps but does not cover everything. Never change state on GET.
6. **Treat every Server Action and Route Handler as a public HTTP endpoint.** Authenticate, authorize against the specific resource (ownership, tenant), and validate input with a schema, every time.
7. **Use a nonce-based CSP** with `'strict-dynamic'`, rolled out via Report-Only first. Do not add `'unsafe-inline'` or `'unsafe-eval'` to scripts just to silence errors. Nonces require dynamic rendering.
8. **Secrets stay on the server.** Anything in the client bundle or in `NEXT_PUBLIC_*` is public.
9. **Money flows are verified server-to-server.** Never trust a redirect, query string, or client-reported amount. Compute amounts on the server, verify with the provider, make fulfillment idempotent.
10. **OTP and login endpoints are attack surface.** Rate-limit, cap attempts, expire and hash codes, return generic responses (no account enumeration).
11. **Uploads are hostile.** Validate content (not just extension or client MIME type), generate storage keys server-side, keep storage private, treat SVG and HTML as active content.
12. **Dependencies are code you run.** Commit the lockfile, install from it in CI, audit, and review new packages (especially in auth and payment paths).
13. **Do not log secrets or personal data:** passwords, OTPs, tokens, cookies, `Authorization` headers, card data, government IDs.

## Where to read next

Read only the reference that matches the task:

| Task touches | Read |
|---|---|
| HTML rendering, Markdown, rich text, links, redirects, iframes, postMessage, JSON-LD | `references/xss-and-urls.md` |
| CSP, nonces, security headers, CORS, `proxy.ts` / `middleware.ts` | `references/csp-headers-cors.md` |
| Sessions, cookies, tokens, CSRF, Server Actions, Route Handlers, authorization | `references/auth-cookies-csrf.md` |
| Forms, schemas, request limits, file uploads, object storage | `references/input-validation-uploads.md` |
| Payment callbacks, webhooks, OTP / SMS login | `references/payments-and-otp.md` |
| Third-party scripts, SRI, npm dependencies, supply chain | `references/third-party-and-supply-chain.md` |
| Finishing a change or running an audit | `references/review-checklist.md` |

For a full audit, read the checklist first, then the references for each area found in the code.

## Verify before asserting

- **Next.js naming:** current Next.js docs use `proxy.ts` exporting `proxy` for the nonce pattern; older versions use `middleware.ts` exporting `middleware`. Check the installed version and the official docs before choosing.
- **Header values and directives:** if unsure about a directive or value, check MDN or the framework docs instead of guessing.
- **Provider APIs** (payments, SMS, storage): use the provider's current official documentation. Do not invent response codes, field names, or amount units.
- **Placeholders:** never ship placeholder SRI hashes, fake keys, or invented configuration as if they were real.
- If something cannot be verified in this session, say so explicitly in the final message.
