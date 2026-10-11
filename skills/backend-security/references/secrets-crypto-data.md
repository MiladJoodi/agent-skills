# Secrets, Cryptography, and Data

Standards: OWASP Top 10:2025 A02 (Security Misconfiguration) and A04 (Cryptographic Failures); ASVS 5.0 cryptography and data-protection chapters.

## Contents
- Secret management
- Never log
- Encryption in transit and at rest
- Authenticated encryption
- Randomness and token storage
- Keys
- PII and data minimization
- Database least privilege
- Backups

## Secret management

- Load secrets from a secret manager or protected runtime configuration. Never commit them, bake them into images or artifacts, or expose them in client bundles, source maps, or error responses.
- Separate secrets per environment and per service; grant each service only the secrets it needs.
- Fail closed when a required secret is missing or malformed.
- Rotate on a schedule and after suspected exposure; support an overlap window (old and new key accepted) so rotation does not cause outages.
- Treat any secret that touched git history as compromised: revoke and rotate, do not just delete the text.
- API keys issued to your customers: show once, store hashed, scope narrowly, allow revocation.

```ts
// Wrong
const signingKey = "REPLACE_ME";

// Right
const signingKey = process.env.SIGNING_KEY;
if (!signingKey) throw new Error("SIGNING_KEY is required");
```

## Never log

Passwords, password hashes, session IDs, access and refresh tokens, JWTs, API keys, `Authorization` headers, cookies, OTPs and TOTP seeds, recovery codes, private keys, webhook signing secrets, presigned URLs, full payment card data, and government IDs. Redact at the logger boundary (see `logging-errors-deps.md`).

## Encryption in transit and at rest

- TLS 1.2 or higher for all external and internal service-to-service traffic. Never disable certificate validation (`rejectUnauthorized: false`) outside a tightly controlled test.
- Enable platform encryption at rest. Add application-level field encryption for especially sensitive values (tokens, TOTP secrets, identifiers) when the threat model needs it.
- Encryption at rest does not protect against an application that already holds decryption rights; authorization still applies.

## Authenticated encryption

Use AEAD: AES-256-GCM or XChaCha20-Poly1305 through a maintained library. Never ECB; avoid CBC unless combined with a MAC you fully control (prefer GCM). One unique nonce per encryption under a key; never reuse. Verify the tag before using plaintext. Bind context with associated data (record ID, format version).

```ts
// Wrong
crypto.createCipheriv("aes-256-ecb", key, null);

// Right: AES-256-GCM (key is 32 random bytes from a KMS/secret store)
import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

export function encrypt(key: Buffer, plaintext: Buffer, aad: Buffer) {
  const iv = randomBytes(12);                       // 96-bit nonce, unique per message
  const c = createCipheriv("aes-256-gcm", key, iv);
  c.setAAD(aad);
  const ct = Buffer.concat([c.update(plaintext), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]);   // store iv | tag | ciphertext (+ key id)
}

export function decrypt(key: Buffer, blob: Buffer, aad: Buffer) {
  const iv = blob.subarray(0, 12), tag = blob.subarray(12, 28), ct = blob.subarray(28);
  const d = createDecipheriv("aes-256-gcm", key, iv);
  d.setAAD(aad);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(ct), d.final()]);  // throws if tampered
}
```

Never invent ciphers, MACs, KDF chains, or protocols. Use TLS, a KMS, or libsodium. Other stacks: Python `cryptography`, PHP `sodium_*`, Go `crypto/*` and `x/crypto`, Java JCA/JCE with GCM.

## Randomness and token storage

- Use a CSPRNG for tokens, session IDs, reset links, nonces, salts, and keys: Node `crypto.randomBytes` / `crypto.randomInt` / `crypto.randomUUID`, Python `secrets`, Go `crypto/rand`, Java `SecureRandom`, PHP `random_bytes`. Never `Math.random()`.
- Bearer tokens: at least 128 bits of entropy.
- **Random, high-entropy tokens** (reset, refresh, API keys) can be stored as a plain SHA-256 hash. **Passwords** need a slow KDF (see `authentication.md`). Low-entropy values such as 6-digit OTPs should be stored with an HMAC (keyed hash) and have attempt limits, because a bare hash is brute-forceable.

```ts
const token = randomBytes(32).toString("base64url");
const stored = createHash("sha256").update(token).digest("hex"); // store this, send `token`
```

## Keys

- Keep encryption, signing, and password-hashing keys separate; never reuse a key across purposes.
- Store keys in a KMS or secret manager; keep them away from the data they protect.
- Version keys (`kid`) and keep old versions available for decryption during rotation.
- Derive per-purpose keys from a master key with HKDF where appropriate. Do not derive keys directly from passwords without a password-based KDF.

## PII and data minimization

- Collect only what a documented purpose needs; define retention and deletion, including exports and backups.
- Authorize each sensitive field per caller; exports and admin queries follow the same rules as ordinary reads.
- Keep credentials and unnecessary PII out of queues, events, and analytics payloads.
- Use synthetic data in tests and mask identifiers in logs and admin UIs.

## Database least privilege

- One database identity per service or privilege boundary. DML only on required tables; no superuser, schema-owner, `FILE`, or DDL rights for the runtime account.
- Separate credentials for migrations and for the application runtime; read replicas use read-only credentials.
- Never expose database credentials to the browser or to untrusted workers.

## Backups

- Encrypt backups and protect their keys separately; restrict who can create, read, restore, and delete them.
- Protect exports, snapshots, and manifests as sensitive data. Define retention.
- Test restores in a controlled environment and verify access controls on restored data. Never store production backups in public or loosely controlled storage.
