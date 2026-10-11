# XSS, URLs, and Redirects

## Contents
- Dangerous sinks
- Sanitizing HTML
- Markdown and rich text
- URLs and redirects
- JSON-LD and inline data
- Links, iframes, postMessage
- Quick tests

## Dangerous sinks

React escapes text children and attribute values by default. Treat anything that bypasses that as high risk, and search the code for these:

- `dangerouslySetInnerHTML`
- `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`
- `eval`, `new Function`, `setTimeout("string")`, `setInterval("string")`
- `href`, `src`, `action`, `formAction`, `srcDoc`, `window.location = ...` fed by data
- `postMessage` handlers
- `<script type="application/ld+json">` built from data
- Embedded third-party HTML or widgets

Data is not safe because it came from your database, an authenticated user, a CMS, or an internal API. Stored content can be attacker-controlled.

## Sanitizing HTML

Avoid HTML rendering unless it is a real requirement. If it is:

1. Decide the allowed tags, attributes, and URL schemes.
2. Sanitize with a maintained library (DOMPurify), using a restrictive allowlist.
3. Sanitize at the render boundary, after any transformation that could introduce markup.
4. Do not modify the HTML after sanitizing.
5. Never use regex or string replacement as a sanitizer.

Wrong:

```tsx
<article dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
```

Right (works in client and server code; `isomorphic-dompurify` supplies a DOM on the server):

```tsx
import DOMPurify from "isomorphic-dompurify";

const clean = DOMPurify.sanitize(post.bodyHtml, {
  ALLOWED_TAGS: ["p", "br", "strong", "em", "ul", "ol", "li", "a", "code", "pre"],
  ALLOWED_ATTR: ["href", "title"],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|\/(?!\/))/i,
});

<article dangerouslySetInnerHTML={{ __html: clean }} />
```

Notes:
- Do not assume browser-only `dompurify` works in a Server Component; it needs a DOM.
- Sanitizing before storage is fine as defense in depth, but sanitize again at render. Sanitizer rules and bugs change over time.
- If allowed `<a>` tags can carry `target="_blank"`, make sure `rel="noopener noreferrer"` is applied (DOMPurify hooks can add it).
- Do not allow `style` attributes, event-handler attributes, `<iframe>`, `<form>`, or `<svg>` unless there is a specific reason.

## Markdown and rich text

- `react-markdown` does not render raw HTML by default, which is safe. If you enable `rehype-raw`, add `rehype-sanitize` after it with a strict schema.
- Renderers that output HTML strings (`marked`, `markdown-it`) do not sanitize by default. Sanitize the HTML output, not the Markdown source.
- Rich-text editor output (Quill, TipTap, and similar) is HTML from the client. Sanitize it on the server.
- Keep plain text as plain text when formatting is not needed.
- Validate link and image URL protocols in rendered output as well.

## URLs and redirects

Never let arbitrary strings become navigation targets.

```ts
export function safeHttpUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}
```

```tsx
const href = safeHttpUrl(profile.website);
return href ? (
  <a href={href} target="_blank" rel="noopener noreferrer">Website</a>
) : null;
```

Reject `javascript:`, `data:`, `vbscript:`, and `blob:` unless intentionally required.

**Redirects** (login `returnTo`, `next`, `callbackUrl`): accept only same-site relative paths, or hosts from an explicit allowlist.

```ts
export function safeRedirectPath(raw: string | null | undefined, fallback = "/"): string {
  if (!raw) return fallback;
  // Must start with a single "/", not "//" (protocol-relative) or "/\" (browser-normalized to "//").
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  if (/[\u0000-\u001f]/.test(raw)) return fallback;
  return raw;
}
```

For payment, login, and account-settings flows, do not accept arbitrary return URLs at all; map a short identifier to a server-side destination.

## JSON-LD and inline data

Putting `JSON.stringify(data)` inside a `<script>` tag lets `</script>` or `<` in the data break out of it. Escape `<`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }}
/>
```

The same applies to any server-to-client state serialized into inline scripts.

## Links, iframes, postMessage

- External links with `target="_blank"` should carry `rel="noopener noreferrer"`. Modern browsers imply `noopener`, but being explicit is harmless.
- Untrusted embeds go in `<iframe sandbox>` with the minimum permissions. Never combine `allow-scripts` and `allow-same-origin` for untrusted content.
- `postMessage`: always pass an explicit `targetOrigin` (never `"*"` for sensitive data) and check `event.origin` against an allowlist in receivers before trusting `event.data`.
- Treat SVG and uploaded HTML as active content. Do not render user SVG inline from your own origin (see `input-validation-uploads.md`).
- Do not build `style` strings or `<style>` content from user input.

## Quick tests

Try these through every input that reaches the page:

- `"><img src=x onerror=alert(1)>`
- `<svg onload=alert(1)>`
- `javascript:alert(1)` in every URL field
- `</script><script>alert(1)</script>` in anything serialized into a script tag
- Redirect params: `//evil.example`, `/\evil.example`, `https://evil.example`
