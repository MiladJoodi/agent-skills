# CSP, Security Headers, and CORS

## Contents
- Version note
- Nonce-based CSP in Next.js (App Router)
- What nonces imply
- Rollout
- Static security headers
- CORS
- Common mistakes

## Version note

The current Next.js CSP guide uses `proxy.ts` exporting a `proxy` function. Older Next.js versions use `middleware.ts` exporting `middleware`, with the same logic. Check the installed version and the official guide before choosing the file name:
https://nextjs.org/docs/app/guides/content-security-policy

## Nonce-based CSP in Next.js (App Router)

How it works: the proxy generates a fresh nonce per request, puts it in the `Content-Security-Policy` header on **both the forwarded request and the response**, and also in a custom `x-nonce` request header. During rendering Next.js reads the nonce from the request CSP header and applies it to framework scripts and the inline scripts and styles it generates.

```ts
// proxy.ts  (middleware.ts / "middleware" on older versions)
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp); // required: Next reads the nonce from here

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
```

Reading the nonce for your own scripts:

```tsx
import { headers } from "next/headers";
import Script from "next/script";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://example.com/sdk.js" nonce={nonce} strategy="afterInteractive" />
      </body>
    </html>
  );
}
```

Rules:
- The server generates the nonce. Never read an inbound `x-nonce` from the client and trust it.
- Never hardcode or reuse a nonce across requests.
- Add third-party hosts to `connect-src`, `img-src`, `frame-src`, and so on only after confirming the app needs them. With `'strict-dynamic'`, a host allowlist in `script-src` is ignored by supporting browsers; trust flows from the nonce.
- Do not add `'unsafe-inline'` or `'unsafe-eval'` to `script-src` in production to make errors go away. `'unsafe-eval'` is only for development tooling.
- `style-src` with a nonce can break some CSS-in-JS or UI libraries. If you must loosen it, `'unsafe-inline'` on `style-src` is a much smaller risk than on `script-src`, but record it as a known tradeoff.

## What nonces imply

- Pages that use a nonce must be **dynamically rendered**. Static generation, ISR, and similar caching cannot carry a per-request nonce. Do not set `export const dynamic = "force-static"` on those pages, and do not cache nonce-bearing HTML across users.
- Measure the performance impact before applying nonce CSP to every route.
- If an app cannot go dynamic, consider hash-based CSP or Next.js's other documented options instead of weakening script rules.

## Rollout

1. Ship `Content-Security-Policy-Report-Only` first, with a reporting endpoint.
2. Inspect the rendered HTML: do framework scripts carry the nonce? Do hydration, streaming, analytics, image providers, fonts, and chat widgets still work?
3. Fix violations by adding the minimum needed sources, not by loosening script rules.
4. Switch to enforcing `Content-Security-Policy`.

CSP is a second layer. It does not replace output encoding and sanitizing.

## Static security headers

Static headers can go in `next.config` (`headers()`); it cannot generate per-request nonces. Avoid defining the same header at several layers (proxy, config, CDN, reverse proxy).

```ts
// next.config.ts
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" }, // legacy; CSP frame-ancestors is the modern control
  // HTTPS production only:
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

export default {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

Notes:
- **HSTS:** send only over HTTPS. Add `includeSubDomains` only if every subdomain supports HTTPS. Add `preload` only after the domain meets the preload requirements and you accept that removal is slow.
- **frame-ancestors** in CSP controls who can embed the site. Use `'none'`, `'self'`, or an explicit allowlist. Keep `X-Frame-Options` only as a legacy fallback and keep it consistent with the CSP.
- **Permissions-Policy:** include only directives the target browsers support and that the app does not need. If the app uses a feature (camera, payment), allow it explicitly.
- **Do not set `X-XSS-Protection`.** It is deprecated and can introduce issues.
- Cross-origin isolation headers (`Cross-Origin-Opener-Policy`, `Cross-Origin-Embedder-Policy`) can break OAuth popups and third-party embeds. Add them deliberately, not by default.

## CORS

CORS controls which origins may **read** cross-origin responses. It is not authentication, not authorization, and not a CSRF defense.

- Default to same-origin. Add CORS only on specific endpoints that need cross-origin access.
- Allowlist exact origins. Never reflect the request `Origin` without checking it against the allowlist.
- Never combine `Access-Control-Allow-Origin: *` with credentials. With credentials, return an explicit trusted origin plus `Access-Control-Allow-Credentials: true`.
- Add `Vary: Origin` whenever the response depends on the request origin.
- Handle preflight (`OPTIONS`) explicitly: allowed methods and headers listed, not reflected.
- A wildcard origin can be fine for a public, read-only, credential-free API.

```ts
const ALLOWED = new Set(["https://app.example.com"]);

export function corsHeaders(request: Request): Headers {
  const headers = new Headers({ Vary: "Origin" });
  const origin = request.headers.get("origin");
  if (origin && ALLOWED.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  return headers;
}
```

## Common mistakes

- CSP set only on the response, not on the forwarded request, so Next.js cannot apply the nonce.
- Nonce CSP on statically rendered pages, then "fixing" the breakage with `'unsafe-inline'`.
- Hardcoded nonce, or a nonce reused across requests or cached with HTML.
- Copying a large CSP that breaks hydration, then deleting it entirely.
- Duplicate or conflicting headers from proxy, config, and CDN.
- HSTS with `includeSubDomains`/`preload` on a domain with HTTP-only subdomains.
- Reflecting `Origin` or sending `*` with credentials.
