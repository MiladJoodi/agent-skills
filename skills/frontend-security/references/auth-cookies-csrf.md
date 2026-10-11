# Auth, Cookies, CSRF, and Server Endpoints

## Contents
- Cookies
- Token storage
- Sessions
- CSRF
- Server Actions and Route Handlers
- Authorization
- Secrets in the client bundle
- Common mistakes

## Cookies

Authentication cookies should be:

- `HttpOnly`: JavaScript cannot read it, so XSS cannot steal it directly.
- `Secure`: HTTPS only (in production).
- `SameSite`: set explicitly. `Lax` is a good default; `Strict` for highly sensitive apps when UX allows; `None` only for real cross-site needs, and it requires `Secure` plus a CSRF strategy.
- Narrow scope: omit `Domain` (host-only) and use the narrowest `Path`. Consider the `__Host-` prefix, which requires `Secure`, `Path=/`, and no `Domain`.
- Bounded lifetime: explicit `Max-Age`/`Expires`.

```ts
import { cookies } from "next/headers";

(await cookies()).set("__Host-session", sessionId, {
  httpOnly: true,
  secure: true,          // use process.env.NODE_ENV === "production" if you develop over plain http
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 8,
});
```

(`cookies()` is async in current Next.js; check your version.)

## Token storage

| Where | Verdict |
|---|---|
| `HttpOnly; Secure` cookie | Preferred for session and refresh tokens |
| In-memory (React state/ref) | Acceptable for a short-lived access token; lost on reload; still readable by XSS while the page runs |
| `localStorage` / `sessionStorage` | Do not store access or refresh tokens: any XSS reads them |
| URL (query, hash) | Never: leaks via logs, history, analytics, and `Referer` |
| Client bundle / `NEXT_PUBLIC_*` | Never for secrets |

If a third-party API needs a bearer token in the browser: scope it narrowly, keep it short-lived, and keep any refresh token in an `HttpOnly` cookie. Consider a backend-for-frontend (BFF) so credentials stay server-side.

Never trust data decoded from a JWT on the client for authorization. The server must verify the signature and claims.

## Sessions

- Prefer opaque, unpredictable session IDs with server-side state over putting sensitive state in the cookie.
- Rotate the session ID after login and privilege changes (prevents session fixation).
- Invalidate sessions server-side on logout, password change, and suspected compromise. Deleting the cookie client-side is not enough.
- Set sensible idle and absolute timeouts.

## CSRF

CSRF matters when the browser attaches credentials automatically (cookies). Bearer tokens in an `Authorization` header set by your own JavaScript are not auto-attached and are not CSRF-prone (but have the XSS tradeoffs above).

Layered defenses for cookie-authenticated, state-changing requests:

1. `SameSite=Lax` or `Strict` cookies.
2. Never change state on `GET` (or other "safe" methods).
3. Verify `Origin` (fall back to `Referer`) against your expected origin(s).
4. Use a CSRF token (synchronizer token or signed double-submit) where the risk justifies it.
5. Require a custom header on fetch calls (forces a CORS preflight for cross-site attackers).

`SameSite=Lax` does not cover every case (for example, attacks from sibling subdomains on the same site, or `GET`-based mutations). Do not treat it as complete. Never treat CORS as a CSRF defense.

```ts
export function assertSameOrigin(request: Request, allowed: string[]) {
  const origin = request.headers.get("origin");
  if (!origin || !allowed.includes(origin)) {
    throw new Response("Forbidden", { status: 403 });
  }
}
```

## Server Actions and Route Handlers

**Server Actions** are public POST endpoints that happen to be called from your UI. Anyone can call them directly.

- Authenticate and authorize inside every action. Do not rely on "only our UI calls this".
- Validate all arguments and `FormData` with a schema.
- Next.js compares the `Origin` header to the host for Server Actions as a CSRF mitigation. If your app sits behind a proxy or uses multiple domains, configure the allowed origins per the current docs (`serverActions.allowedOrigins`; check the config location for your version). Do not disable the check.
- Return generic errors; do not leak internals.

**Route Handlers** have no built-in CSRF protection. When cookies authenticate the request, add the Origin check and/or token yourself.

```ts
"use server";
import { z } from "zod";

const Input = z.strictObject({ name: z.string().trim().min(1).max(100) });

export async function updateProfile(input: unknown) {
  const user = await requireUser();            // authenticate
  const data = Input.parse(input);             // validate
  await db.profile.update({                    // authorize via the query itself
    where: { userId: user.id },
    data,
  });
}
```

(`requireUser` and `db` stand for your application's own code.)

## Authorization

Authentication says who you are. Authorization says what you may do. Check it on every protected server operation.

- Check ownership and tenant boundaries in the query (`where: { id, ownerId: user.id }`), not only "is logged in". Missing this is IDOR, one of the most common real-world flaws.
- Never accept `userId`, `role`, `isAdmin`, `price`, `accountId`, or permission flags from the client as truth. Derive identity from the session.
- Hidden buttons and protected frontend routes are usability, not security.
- Re-check authorization for sensitive actions (payments, email/password change, role changes), ideally with re-authentication.

## Secrets in the client bundle

- Anything bundled for the browser is public, including `NEXT_PUBLIC_*` variables and source maps if exposed.
- Put server-only modules behind `import "server-only"` so an accidental client import fails the build.
- Keep API keys, merchant credentials, signing secrets, and database URLs in server-only environment variables.
- Scan for committed secrets; rotate any that leaked.

## Common mistakes

- JWT or refresh token in `localStorage` "for convenience".
- Session cookie without `HttpOnly`, `Secure`, or `SameSite`.
- "We use `SameSite=Lax`, so no CSRF handling" on a Route Handler that changes state.
- Server Actions with no auth check because the page is already protected.
- Trusting a client-sent `userId` or `price`.
- Logout that only clears the cookie and leaves the session valid on the server.
- Putting tokens in URLs (password reset and magic links need single-use, short-lived tokens and `Referrer-Policy` set appropriately).
- Missing clickjacking protection (`frame-ancestors`) on sensitive pages.
