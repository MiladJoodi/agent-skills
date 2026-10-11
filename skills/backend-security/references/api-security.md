# API Security

Standards: OWASP API Security Top 10:2023 (API4, API6, API8, API9, API10); OWASP Top 10:2025 A02, A06, A10; ASVS 5.0 API chapters. A newer API Top 10 edition may exist: check owasp.org before citing numbers.

## Contents
- Rate limiting and quotas
- Resource exhaustion and pagination
- GraphQL
- Unrestricted business flows
- CORS and CSRF (server side)
- Headers for APIs
- Inventory and shadow endpoints
- Error responses

## Rate limiting and quotas

- Limit authentication, signup, password reset, OTP, search, export, messaging (SMS/email), and anything that costs money.
- Key by authenticated principal, API key, tenant, destination, and IP as appropriate. Do not let attackers reset limits by varying an untrusted label.
- Use shared storage (for example Redis) when running several instances; in-memory limits do not hold across replicas.
- Apply limits **before** expensive work. Use burst limits plus longer-term quotas. Return `429` with `Retry-After`.

```ts
// Wrong: in-memory, per-process, IP only
if (hits[ip]++ > 100) return res.sendStatus(429);

// Right: shared store, principal-aware, cost-aware (illustrative interface)
await quota.consume({ subject: auth.userId, operation: "report-export", cost: estimate });
```

## Resource exhaustion and pagination

- Bound body size, header size where supported, array lengths, nesting depth, batch counts, upload size, and concurrent requests per client.
- Every list endpoint has a default and a hard maximum page size (for example 100). Prefer cursor pagination with opaque cursors for large sets.
- Bound query time, expensive joins, export size, image/PDF processing, and decompression. Time out outbound calls. Stream large results.
- Cap `include`/`expand` depth and sort/filter fields (allowlist them).

```ts
const limit = Math.min(Number(req.query.limit ?? 20) || 20, 100);
```

## GraphQL

- Authenticate and **authorize in every resolver**, including nested fields; object and property rules still apply.
- Limit query depth, complexity or cost, alias count, list multipliers, and batch size. Consider persisted or allowlisted operations for first-party clients.
- Apply request-size limits and operation timeouts; cap pagination inside resolvers.
- Restrict introspection in production when it is not a deliberate public feature. This is not authorization.
- Prevent N+1 amplification with bounded batching (data loaders). Do not expose raw ORM or database errors in error extensions.

## Unrestricted business flows

Flows that cause harm when automated: coupons and referrals, free trials, signups, invitations, SMS/email sending, ticket or stock reservation, voting.

- Per-account, per-resource, and global limits; uniqueness constraints; atomic redemption (see `concurrency-and-business-logic.md`).
- Bind one-time codes to recipient and purpose; expire quickly.
- Add friction or review when abuse signals appear. CAPTCHA and IP reputation help but are not sufficient alone; the server must validate any CAPTCHA token.

## CORS and CSRF (server side)

CORS is browser-enforced read access control. It is not authentication and not CSRF protection.

- Allowlist exact origins; never reflect an arbitrary `Origin`; never `*` with credentials; add `Vary: Origin` when the response depends on it.
- Cookie-authenticated, state-changing endpoints need CSRF defense: verify `Origin` (or `Referer`) against your expected origins, check `Sec-Fetch-Site` where available, and/or require a CSRF token or custom header. Do not change state on `GET`.
- APIs authenticated only by an `Authorization` header are not CSRF-prone, but if the same API also accepts cookies it is.
- Browser-side details (cookie attributes, headers like CSP): see the `frontend-security` skill.

```ts
// Server-side origin check for cookie-authenticated mutations
const origin = req.headers.origin;
if (!origin || !ALLOWED_ORIGINS.has(origin)) return res.sendStatus(403);
```

## Headers for APIs

- `Content-Type` set correctly on every response (usually `application/json`), plus `X-Content-Type-Options: nosniff`.
- `Cache-Control: no-store` on responses containing personal or secret data.
- Remove version-disclosing headers (`X-Powered-By`, `Server` detail) where practical.
- Headers are hardening, not authorization. Browser-facing HTML policies belong to `frontend-security`.

## Inventory and shadow endpoints

- Enumerate routes, methods, GraphQL operations, API versions, and exposed internal services; compare against the documented spec (OpenAPI) and what is deployed.
- Remove or explicitly disable deprecated versions. Ensure old path prefixes cannot bypass new auth middleware.
- Authenticate or network-restrict debug, health detail, metrics, and admin endpoints according to their audience.
- Review every newly added endpoint for authn, authz, schema, and rate limits.

## Error responses

- Return a stable error code and a generic message; include a request/correlation ID for support.
- Never return stack traces, SQL, file paths, tokens, dependency responses, or internal hostnames.
- Do not turn authorization failures into successes in global error handlers (A10:2025: mishandling of exceptional conditions); fail closed.

```ts
// Wrong
res.status(500).send(err.stack);

// Right
log.error({ err, requestId }, "handler failed");
res.status(500).json({ error: "internal_error", requestId });
```
