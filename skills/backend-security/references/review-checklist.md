# Review Checklist

Use when finishing a change or running an audit. Inspect the actual implementation; trace data through routing, middleware, validation, authorization, data access, outbound calls, and response serialization. Do not tick an item because a config line exists; confirm effective behavior.

## Contents
- Final checklist
- Greppable patterns
- Common AI-generated mistakes
- Audit report format
- Release gate

## Final checklist

**Authentication and sessions**
- [ ] Passwords use Argon2id (or scrypt/bcrypt) with verified parameters; length capped before hashing.
- [ ] Login, reset, and MFA return uniform responses; rate limits and attempt limits in place.
- [ ] Session ID rotates on login; sessions invalidated on logout and password change.
- [ ] JWT: algorithm pinned, `iss`/`aud`/`exp` validated, short TTL, refresh rotation with reuse detection if used.
- [ ] OAuth/OIDC: `state`, PKCE, exact redirect URI match, ID token validation.

**Authorization**
- [ ] Every protected route authenticates and checks function-level permission.
- [ ] Every object access is scoped by owner or tenant inside the query.
- [ ] Writable and returnable fields are allowlisted (no raw body into models, no raw models out).
- [ ] Admin routes have explicit permission checks and audit logging; sensitive actions need step-up auth.

**Inputs and data access**
- [ ] Queries are parameterized; dynamic identifiers come from allowlists.
- [ ] Schemas validate every boundary; unknown fields rejected on writes.
- [ ] No shell-string commands, user-controlled templates, unsafe deserialization, or unchecked paths; XML parsers disable external entities.
- [ ] Body size, depth, pagination, and upload limits enforced.

**Outbound calls and APIs**
- [ ] User-influenced URLs: allowlist or connection-time IP validation, redirects limited, timeouts and byte caps set.
- [ ] Rate limits and quotas on auth, messaging, export, and abusable business flows (shared store across instances).
- [ ] GraphQL depth, cost, and batching limits where applicable; authorization in resolvers.
- [ ] CORS uses explicit origins; cookie-authenticated mutations have CSRF defenses.
- [ ] Deprecated, debug, and shadow endpoints inventoried and removed or protected.

**Data and business logic**
- [ ] Secrets externalized, never logged or returned; rotation possible.
- [ ] AEAD encryption with unique nonces; no custom crypto; CSPRNG for all security values.
- [ ] Database account has least privilege; backups encrypted.
- [ ] Money, stock, quota, and redeem flows use atomic updates, constraints, and idempotency keys.
- [ ] Prices, totals, and eligibility recomputed server-side; state transitions validated.

**Files, webhooks, jobs, operations**
- [ ] Uploads authorized, bounded, content-validated, server-keyed, private; SVG/HTML not served inline.
- [ ] Presigned URLs scoped and short-lived; size and type re-verified after upload.
- [ ] Webhook signatures verified over raw bytes, with freshness check and deduplicated event IDs.
- [ ] Workers validate payloads and re-authorize; retries bounded; handlers idempotent.
- [ ] Logs and errors contain no credentials or sensitive internals; security events alert.
- [ ] Lockfile committed; audit and secret scanning run; new dependencies reviewed.
- [ ] Tests cover the exploit path, denial, replay, and concurrency; failed or skipped checks are reported.

## Greppable patterns

Search, then inspect context. A match is not proof of a vulnerability and absence is not proof of safety.

```
$queryRawUnsafe  queryRaw(  .raw(  execute(          string-built SQL or raw fragments
findById(  findUnique(  findOne(                     check owner/tenant scope
req.body  req.query  ...req.body  Object.assign(     mass assignment, unvalidated input
update(req.body  create(req.body                     mass assignment
jwt.verify(  jwt.decode(  algorithms                  pinning, verification
Math.random(  createHash("md5"|"sha1"|"sha256")       tokens and password hashing
fetch(  axios  http.request  got(                     SSRF, redirects, limits
child_process  exec(  execSync(  shell: true          command injection
readFile  sendFile  path.join(                        traversal
unserialize  pickle.loads  yaml.load(  ObjectInputStream
Access-Control-Allow-Origin  cors(                    origin reflection, wildcard + credentials
redirect(  res.redirect                               open redirects
webhook  signature  rawBody  req.body.toString        signature over raw bytes
console.log  logger.  JSON.stringify(req              secret or PII logging
balance  coupon  quantity  redeem  status =           races, tampering, transitions
eval(  new Function(  vm.run                          code execution
```

Adapt to the repository's language, ORM, and naming conventions.

## Common AI-generated backend mistakes

1. Fetch by ID, then return it, with no owner or tenant filter (BOLA).
2. `db.update({ data: req.body })` or `new Model(req.body)` (mass assignment, privilege escalation).
3. Authentication middleware added, but a sensitive route left unprotected; login checked but ownership and permission not.
4. Trusting client `userId`, `role`, `tenantId`, `price`, `total`, or `status`.
5. String-interpolated SQL "just this once", or a raw ORM helper with interpolation.
6. JWT decoded without verification, verified without `algorithms`/`aud`, or no revocation story.
7. SHA-256 or bcrypt with unsuitable settings for passwords; `Math.random()` for tokens.
8. `fetch(userUrl)` with no SSRF controls; hostname checked once but redirects and DNS changes ignored.
9. Webhook JSON parsed before verifying a signature that must cover raw bytes; signature accepted but no replay or dedup handling.
10. Check-then-update on balances, coupons, or stock with no atomic guard or transaction.
11. In-memory rate limits that fail across instances; limits keyed on an attacker-controlled value.
12. Different error messages for "user missing" vs "bad password"; stack traces and tokens in responses and logs.
13. Open CORS with credentials; CSRF ignored on cookie-authenticated routes.
14. Public-read bucket or broad presigned PUT "just to test"; trusting `file.type` and filenames.
15. Invented library methods, config keys, or security defaults; placeholder secrets and hashes left in deployable code.
16. Tests that mock away the very authorization or verification logic they are meant to test.
17. Declaring a fix complete without running tests or stating what could not be verified.

## Audit report format

For each actionable finding:

```
Title:
Severity:        Critical | High | Medium | Low | Informational
Status:          Confirmed | Suspected | Not verified
Location:        path/to/file.ts:42 (or route / resolver)
Evidence:        observed code path, request example, or grepped sink
Prerequisites:   access level and attacker-controlled input required
Impact:          concrete confidentiality, integrity, or availability consequence
Reference:       e.g. API1:2023 BOLA, A01:2025
Fix:             concrete code or config change
Verification:    test, command, docs, or manual inspection; or "not verified: <reason>"
Residual risk:   what remains
```

Order by severity. Assign severity from exploitability, required privileges, affected assets, and realistic impact; do not inflate because a dangerous-looking function exists. Do not invent CVEs.

## Release gate

- A completed checklist is not a passed review. Report confirmed findings separately from suspected or unverified ones.
- Verify each claimed fix against the real code and tests; record failed, skipped, and unavailable checks.
- List entry points and dependencies that were not reviewed, and state the scope and limits of the review.
- Release-blocking findings need explicit resolution or documented risk acceptance.
