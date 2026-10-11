---
name: backend-security
description: Secure-by-default guidance for writing, reviewing, and fixing backend application code - HTTP/REST/GraphQL APIs, authentication, authorization (BOLA/IDOR), sessions and JWT, OAuth/OIDC, password hashing, injection (SQL, NoSQL, command, template), SSRF, mass assignment, rate limiting, file uploads, secrets and crypto, webhooks, race conditions, business-logic abuse, logging, background jobs, and dependency hygiene. Use whenever the user mentions SQL injection, SSRF, IDOR, BOLA, JWT, sessions, OAuth, password hashing, rate limiting, mass assignment, file upload, secrets, webhooks, race conditions, API security, security review, or audit. Also use when implementing login, signup, password reset, roles and permissions, multi-tenant data access, database queries, outbound HTTP fetches, webhooks, queue workers, or payment endpoints, even if the user never says "security".
---

# Backend Security (Application Layer)

Rules for writing, reviewing, and fixing backend code so it is secure by default. Prefer small, targeted changes that preserve existing behavior. Concrete fixes over theory.

Standards baseline: OWASP Top 10:2025 (SSRF now sits under A01 Broken Access Control), OWASP API Security Top 10:2023, OWASP ASVS 5.0.0. These are baselines, not a substitute for threat modeling or version-specific documentation.

Scope: application-level backend security. Out of scope: infrastructure and OS hardening, network security, penetration testing. Browser-side topics (XSS, CSP, browser cookie handling, token storage in the browser) belong to the `frontend-security` skill; this skill covers only the server-side half.

Examples are TypeScript (Node.js). The rules are language-neutral; each reference notes where Python, PHP, Go, or Java differ.

Last reviewed: October 2026.

## How to work

1. **Inspect first.** Identify language and framework versions, the auth model (session, JWT, OAuth), the data layer (ORM, raw SQL, NoSQL), multi-tenancy, where authorization is enforced (middleware, service, query), and existing security controls. Do not duplicate or conflict with them.
2. **Trace untrusted data** from every source (body, query, path, headers, cookies, files, webhooks, queue messages, third-party responses, database values you do not control) to every sink (query, command, template, file path, outbound URL, log line, response).
3. **Pick the mode:** implement, fix, or audit. For audits, report each finding with severity, location, evidence, fix, and how it was verified.
4. **Make the smallest secure change.** Do not rewrite an auth or deployment architecture when a targeted check or a parameterized query fixes the problem.
5. **Test the attack path.** Add or run a test for the exploit, the expected denial, and boundary cases (other user, other tenant, replay, concurrent request).
6. **Verify, then report.** Say what you checked and what you could not. Never claim "fixed" because a config line exists.

Ask the user only what changes the answer: auth model, tenancy key, database engine, whether GraphQL, webhooks, or background jobs exist. Never ask for real secrets or production data.

## Non-negotiable rules

1. **Authenticate, then authorize every action on every object.** Never trust a client-supplied user ID, role, tenant, price, or ownership flag.
2. **Authorization lives in the query.** Scope reads, updates, and deletes by owner or tenant, and treat zero affected rows as denial.
3. **Parameterize everything.** Never build SQL, NoSQL filters, shell commands, LDAP filters, or templates from untrusted strings.
4. **Validate input with a schema at every trust boundary:** types, ranges, enums, sizes, depth. Reject unknown fields on writes.
5. **Allowlist writable and returnable fields.** No raw request bodies into models; no raw models into responses.
6. **Block SSRF.** Allowlist destinations, deny private and metadata addresses at connection time, limit redirects, time, and bytes.
7. **Hash passwords with Argon2id** (or scrypt/bcrypt where it is unavailable). Never use fast hashes or reversible encryption.
8. **Treat tokens as bearer credentials.** Pin JWT algorithms, validate `iss`/`aud`/`exp`, keep lifetimes short, rotate refresh tokens, make revocation possible.
9. **Make money, quota, and redeem operations atomic and idempotent.** Conditional updates, unique constraints, idempotency keys.
10. **Recompute prices, totals, permissions, and eligibility on the server.** Client values are hints.
11. **Verify inbound webhooks over the raw body** with a constant-time compare and a freshness check, and deduplicate event IDs.
12. **Treat uploads, queue messages, and third-party responses as hostile.** Server-generated keys, content validation, private storage, re-authorization in workers.
13. **Secrets never appear in source, logs, errors, or responses.** Use a secret manager, separate environments, and rotate.
14. **Fail closed.** Generic client errors, detailed server logs with a request ID; authorization or crypto failures never degrade to "allow".
15. **Rate-limit authentication and expensive or abusable flows,** and bound pagination, body size, and query cost.

## Where to read next

Read only what the task needs. For a full audit, read the checklist first, then the references for each area found in the code.

| Task touches | Read |
|---|---|
| Passwords, login, sessions, JWT, refresh tokens, MFA, OAuth/OIDC, reset links | `references/authentication.md` |
| BOLA/IDOR, roles, tenants, mass assignment, admin routes, step-up auth | `references/authorization.md` |
| SQL/NoSQL/command/template injection, validation, deserialization, paths, XXE, ReDoS | `references/injection-and-input.md` |
| Outbound fetch, URL previews, webhook senders, SSRF | `references/ssrf-and-outbound.md` |
| Rate limits, GraphQL, business-flow abuse, CORS/CSRF (server side), API errors and inventory | `references/api-security.md` |
| Secrets, encryption, randomness, keys, PII, database privileges, backups | `references/secrets-crypto-data.md` |
| Races, transactions, idempotency, state machines, price tampering | `references/concurrency-and-business-logic.md` |
| Uploads, object storage, inbound webhooks, queues and workers | `references/files-webhooks-jobs.md` |
| Logging, audit trails, error handling, dependencies, supply chain | `references/logging-errors-deps.md` |
| Finishing a change or running an audit | `references/review-checklist.md` |

## Verify before asserting

- Never invent library APIs, option names, defaults, or config keys. Check the installed version and the official docs.
- Examples marked "illustrative" or using helper names that are not real library functions must be adapted to the project's actual libraries.
- Never ship placeholder secrets, keys, or hashes as working values. Use clearly marked placeholders.
- Password-hashing parameters, JWT library behavior, framework raw-body handling, and database isolation semantics are version-specific: confirm them.
- If something could not be verified in this session, say so explicitly in the final message.
