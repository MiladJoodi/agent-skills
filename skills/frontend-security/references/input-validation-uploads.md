# Input Validation and File Uploads

## Contents
- Validation rules
- Schema example
- Request limits
- Injection and encoding
- File uploads and object storage
- Common mistakes

## Validation rules

Client validation improves UX. Server validation is the security control.

- Validate at every server boundary: Server Actions, Route Handlers, webhooks, queue consumers.
- Use a schema library (Zod, Valibot, and similar). Share schemas between client and server where practical, but always run them on the server.
- Allowlist: expected types, formats, enum members. Enforce lengths, numeric bounds, array sizes, and object depth.
- Reject unexpected fields on sensitive endpoints (strict objects). Never spread request bodies or `FormData` straight into database writes (mass assignment).
- Normalize only where the domain needs it (trim, case-fold emails, Unicode normalization for identifiers), and normalize before validating.
- Recalculate prices, discounts, tax, inventory, and permissions on the server.
- Return generic client-facing errors. Log diagnostic detail without secrets or personal data.

## Schema example

```ts
"use server";
import { z } from "zod";

// z.strictObject in Zod 4 (use .strict() on z.object in Zod 3)
const CheckoutInput = z.strictObject({
  productId: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(20),
});

export async function startCheckout(input: unknown) {
  const user = await requireUser();
  const parsed = CheckoutInput.safeParse(input);
  if (!parsed.success) return { error: "Invalid request" };

  const product = await getProduct(parsed.data.productId); // price from the server catalog
  // ... compute total from product.price * quantity on the server
}
```

For Route Handlers that parse JSON, handle malformed JSON and wrong `Content-Type` explicitly, and return 400 rather than throwing.

## Request limits

- Enforce body-size limits at the application and the infrastructure layer.
- Rate-limit expensive and authentication-related endpoints (per user, per IP, and per target such as email or phone). IP limits alone are weak: attackers distribute, and legitimate users share IPs.
- Bound pagination (`limit` max), search query length, and file counts.

## Injection and encoding

- Use parameterized queries or ORM methods. Never build SQL, shell commands, or file paths by concatenating user input.
- Encode output for its destination: HTML text, attribute, URL, JS, and CSS contexts need different encoding. Do not rely on stripping "bad characters" at input time.
- Do not interpolate user input into HTTP headers (header injection) or email headers and subjects.
- Server-side fetches of user-supplied URLs (link previews, webhooks, image fetch) need SSRF defenses: allowlist hosts/schemes, block private and link-local address ranges, and re-check after redirects.

## File uploads and object storage

Apply the same rules whether files go to local disk or an S3-compatible service.

**Before upload**
- Authenticate the uploader and authorize the target resource.
- Enforce size limits, allowed types, and per-user quotas.

**Upload path**
- Generate object keys on the server (for example `userId/uuid.ext`). Never use client filenames as paths. This prevents path traversal and collisions.
- Prefer presigned URLs over proxying large files, and never ship long-lived storage credentials to the browser.
- Keep presigned URLs short-lived. Constrain what you can: with S3-style **presigned POST policies** you can enforce `content-length-range` and content type; with **presigned PUT** you can sign headers such as `Content-Type`, but size enforcement is limited, so verify after upload.
- Anyone holding a valid presigned URL can use it until it expires. Scope and expire accordingly.

**After upload**
- Validate the actual content (magic bytes via a parser or library), not just the extension or client-supplied MIME type.
- Re-encode images server-side when practical; optionally strip EXIF if privacy matters.
- Scan files for malware when the threat model requires it (KYC, document exchange).

**Serving**
- Keep buckets private by default. Serve through signed GET URLs or a CDN with controlled headers.
- Send correct `Content-Type`, `X-Content-Type-Options: nosniff`, and `Content-Disposition: attachment` for downloads that should not render.
- Treat SVG and HTML uploads as active content. Do not serve them inline from your authenticated origin; sanitize SVG or serve user content from a separate, cookie-less origin.
- Prevent cross-tenant access and unauthorized overwrites; check that bucket policies are not public by accident.

## Common mistakes

- Zod (or similar) running only in the browser.
- `db.user.update({ data: body })` with the raw body.
- Trusting `file.type` or the file extension.
- Public-read bucket plus attacker-influenced object keys.
- Presigned URLs with long expiry that allow any content type.
- Detailed validation or SQL errors returned to the client.
- Fetching user-provided URLs server-side with no SSRF protection.
