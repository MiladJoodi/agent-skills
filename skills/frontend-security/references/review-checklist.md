# Review Checklist and Common AI-Generated Mistakes

Run through this at the end of any security-sensitive change or audit. Do not tick an item because a config line exists; confirm the effective behavior (inspect response headers, rendered HTML, run the tests).

## Contents
- Checklist
- Greppable patterns
- Common AI-generated mistakes
- Audit report format

## Checklist

**Rendering and XSS**
- [ ] User-controlled text renders through normal escaped JSX.
- [ ] Every HTML sink is justified and sanitized with a restrictive allowlist at the render boundary.
- [ ] Markdown and rich text cannot emit unsafe HTML.
- [ ] URLs from data pass a protocol allowlist; redirects are same-site paths or allowlisted hosts.
- [ ] JSON-LD and inline serialized data escape `<`.
- [ ] SVG and uploaded HTML are not served inline from the main origin.

**Authentication and authorization**
- [ ] Session/refresh tokens live in `HttpOnly; Secure; SameSite` cookies, not web storage or URLs.
- [ ] Every Server Action and Route Handler authenticates, authorizes the specific resource, and validates input.
- [ ] No client-supplied `userId`, role, price, or permission is trusted.
- [ ] CSRF defenses match the auth model (cookies need them).
- [ ] Logout and expiry invalidate sessions server-side; session ID rotates on login.

**Headers and network**
- [ ] CSP is present, nonce-based with `'strict-dynamic'`, no `'unsafe-inline'`/`'unsafe-eval'` for scripts in production.
- [ ] Nonce is generated per request and set on both the request and response CSP header; nonce pages are dynamic and not cached across users.
- [ ] `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` set; HSTS only on proper HTTPS.
- [ ] No duplicate or conflicting headers across proxy, config, and CDN.
- [ ] CORS uses explicit origins; no `*` with credentials; `Vary: Origin` set where needed.

**Inputs, dependencies, secrets**
- [ ] Server-side schemas on every untrusted boundary; strict objects where appropriate.
- [ ] Size, length, range, and rate limits in place.
- [ ] Queries parameterized; server-side URL fetches protected against SSRF.
- [ ] Lockfile committed; audit run; new dependencies reviewed.
- [ ] Third-party scripts minimized; SRI used where feasible with real hashes.
- [ ] No secrets in `NEXT_PUBLIC_*`, client bundles, logs, or error responses.

**Payments, OTP, uploads**
- [ ] Payment success requires server-to-server verification; amount and currency checked.
- [ ] Fulfillment is idempotent and concurrency-safe; webhook signatures verified over the raw body.
- [ ] OTP: secure generation, hashed, expiring, attempt-limited, rate-limited, atomic consumption, no enumeration, not logged.
- [ ] Uploads: authorization, content validation, size limits, server-generated keys, private storage, safe serving headers.

**Verification**
- [ ] Relevant tests pass, including negative tests (invalid input, unauthorized access, replay, duplicates).
- [ ] Remaining risks, untested paths, and required deployment changes are documented.

## Greppable patterns

When reviewing a diff or repo, search for:

```
dangerouslySetInnerHTML   innerHTML   outerHTML   insertAdjacentHTML   document.write
eval(   new Function   localStorage   sessionStorage   document.cookie
NEXT_PUBLIC_   Access-Control-Allow-Origin   unsafe-inline   unsafe-eval
target="_blank"   href={   redirect(   postMessage   Math.random
"use server"   export async function (POST|PUT|PATCH|DELETE)
```

Treat each hit as suspicious until you have traced where its data comes from.

## Common AI-generated mistakes

- Passing CMS, comment, or API HTML straight into `dangerouslySetInnerHTML`.
- Regex-based "sanitizers".
- `href={userUrl}` with no protocol check; `redirect(searchParams.returnTo)`.
- JWT in `localStorage` "because it's simpler".
- Session cookie without `HttpOnly`/`Secure`/`SameSite`.
- "We use SameSite=Lax, so CSRF is solved", including on state-changing Route Handlers.
- Server Actions with no authorization because "the page is protected".
- Trusting client-sent `userId`, `price`, `role`, `isAdmin`.
- CSP copied with `'unsafe-inline' 'unsafe-eval'` and called done; CSP set only on the response; hardcoded nonce; nonce CSP on static pages.
- `Access-Control-Allow-Origin: *` with credentials, or reflecting `Origin`.
- Client-only validation (React Hook Form, browser Zod, HTML attributes, disabled buttons).
- Marking orders paid from a redirect query parameter; no idempotency; merchant secret in client code.
- OTP with `Math.random()`, no attempt limits, different responses for known/unknown users, or OTP returned in the response "for testing".
- Trusting `file.type` or extension; public buckets; long-lived presigned URLs for any content type.
- Placeholder SRI hashes, invented API fields, or unverified header directives left in deployable code.
- Code written for a different Next.js version (`middleware` vs `proxy`, sync vs async `cookies()`/`headers()`).
- Declaring the project "secure" because lint, tests, or `npm audit` pass.
- Rewriting the whole auth or deployment setup when a targeted fix would do.

## Audit report format

For each finding:

```
[Severity: Critical | High | Medium | Low]  Short title
Location:    path/to/file.tsx:42
Evidence:    what the code does, and how it can be abused
Fix:         the concrete change (code or config)
Verified:    how it was confirmed, or "not verified: <reason>"
```

Order by severity. Separate confirmed findings from assumptions. End with what was not checked.
