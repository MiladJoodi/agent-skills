# Files, Webhooks, and Background Jobs

Standards: ASVS 5.0 file-handling and business-logic chapters; API10:2023 (unsafe consumption of APIs); OWASP Top 10:2025 A08 (software or data integrity failures).

## Contents
- File uploads
- Object storage and presigned URLs
- Serving files
- Inbound webhooks
- Replay protection and idempotency
- Background jobs and queues

## File uploads

- Authenticate and authorize the uploader and the target resource **before** accepting data. Enforce per-file size, file count, and per-user quota limits while streaming.
- Allowlist the types the feature needs. Validate the actual content (magic bytes and a real parser), not the extension or client MIME type. Reject malformed files, archives with suspicious structure, and decompression bombs.
- Generate storage keys on the server. Never use client filenames as paths or keys; this prevents traversal and overwrites.
- Store uploads outside executable paths and private by default.
- Re-encode images or sanitize documents where feasible; scan for malware when the threat model requires it (KYC, document exchange), quarantining until clean.
- Treat archives, office documents, images, and media as hostile parser inputs; process them in an isolated worker with resource limits.

```ts
// Wrong
await storage.put(`uploads/${req.file.originalname}`, req.file.buffer);

// Right
const key = `${auth.tenantId}/${auth.userId}/${crypto.randomUUID()}`; // server-generated
assertAllowedContent(file);                    // size + magic bytes + allowlist (your code)
await privateStorage.put(key, file.stream, { contentType: detectedType });
```

## Object storage and presigned URLs

- Buckets and objects are private unless public access is an explicit product requirement. Check bucket policies for accidental public exposure and cross-tenant access.
- Authorize the user **before** minting a presigned URL, and bind it to one object key (server-generated), one method, and the shortest practical lifetime.
- Constrain what the provider supports: S3-style **presigned POST policies** can enforce `content-length-range` and content type; **presigned PUT** URLs can sign headers such as `Content-Type` but offer weaker size enforcement. Always verify size and content after upload.
- A presigned URL is a bearer credential: do not log it, and remember anyone holding it can use it until expiry.
- Never ship long-lived storage credentials to browsers. Verify that an "upload complete" callback refers to the expected object and upload session.
- Prevent unintended overwrite: unique keys, no client-chosen keys.

## Serving files

- Authorize each download against the file's owner or tenant; use short-lived signed GET URLs or stream through the app.
- Set a correct `Content-Type`, `X-Content-Type-Options: nosniff`, and `Content-Disposition: attachment` for content that should not render.
- Treat SVG, HTML, and XML uploads as active content. Do not serve them inline from the main application origin; use a separate cookie-less origin or force download.

## Inbound webhooks

Use the provider's official verification method and algorithm. Do not invent a generic scheme.

1. Read the **raw request bytes** and verify the signature **before** parsing JSON. Re-serialized JSON may differ byte for byte and break (or weaken) verification.
2. Compare with a constant-time function; check lengths first, since `timingSafeEqual` throws on mismatched lengths.
3. Check the signed timestamp; reject outside a small window (for example 5 minutes) when the protocol provides one.
4. Select the signing secret per endpoint or account; rotate with an overlap window.
5. Do nothing with side effects until verification passes.

```ts
// Wrong: parsed first, then re-serialized
app.post("/webhook", express.json(), (req, res) => {
  verify(JSON.stringify(req.body), sig);
});

// Right (Express; other frameworks expose the raw body differently, so verify yours)
import { createHmac, timingSafeEqual } from "node:crypto";

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const expected = createHmac("sha256", WEBHOOK_SECRET).update(req.body).digest();
  const given = Buffer.from(String(req.header("x-signature")), "hex");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return res.sendStatus(401);
  }
  const event = JSON.parse(req.body.toString("utf8"));
  await processOnce(event.id, () => handle(event));
  res.sendStatus(200);
});
```

(The header name, hash, and encoding above are placeholders; use exactly what the provider documents.)

Respond quickly and hand heavy work to a queue. Do not expose webhook endpoints to browser CORS; they are server-to-server.

## Replay protection and idempotency

- A valid signature proves authenticity, not freshness. Combine the timestamp check with storing processed event IDs.
- Deduplicate by inserting the event ID under a unique constraint in the same transaction as the effect; duplicates then become no-ops.
- Scope IDs to provider, account, and event type. Expect delayed and out-of-order delivery.
- For high-value events, re-fetch the object from the provider API instead of trusting the payload.
- Drive effects through the same state machine as HTTP handlers (`concurrency-and-business-logic.md`).

## Background jobs and queues

- Treat job payloads as untrusted even from "internal" producers: validate the schema and size at worker entry.
- **Re-authorize in the worker.** An authorized enqueue does not mean the action is still permitted when the job runs; re-check current permissions and resource state.
- Do not serialize passwords, session tokens, or unnecessary PII into jobs; pass IDs and load data in the worker. Do not pass file paths or SQL.
- Clients must not choose job names, queues, or handlers.
- Use least-privilege credentials for workers, separate from the web tier where possible. Sign or encrypt payloads if the broker is broadly accessible or shared.
- Bound retries with backoff, use dead-letter queues, alert on poison messages, and limit concurrency. Make retryable handlers idempotent.
- Avoid logging complete payloads that contain sensitive data.

```ts
// Wrong
await queue.add(req.body.jobName, req.body.payload);

// Right
const input = ApprovedJob.parse(req.body);
await queue.add("generate-report", { reportId: input.reportId, requestedBy: auth.userId });
// the worker re-checks that requestedBy may still access reportId
```
