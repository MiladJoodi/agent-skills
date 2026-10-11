# Authentication

Standards: OWASP Top 10:2025 A07; API2:2023; ASVS 5.0 authentication, session, and token chapters.

## Contents
- Password storage
- Login flow
- Sessions vs JWT
- JWT pitfalls
- Refresh token rotation
- MFA
- OAuth / OIDC
- Password reset and magic links
- Enumeration, timing, brute force

## Password storage

Use a memory-hard KDF through a maintained library that generates a unique salt and stores algorithm and parameters inside the encoded hash.

| Algorithm | Minimum baseline (OWASP Password Storage Cheat Sheet; re-check before fixing production values) |
|---|---|
| **Argon2id** (preferred) | 19 MiB memory, 2 iterations, parallelism 1 (or an equivalent trade-off, e.g. more memory and fewer iterations) |
| scrypt | N=2^17, r=8, p=1 |
| bcrypt | work factor 10 or higher (12 is common); has a 72-byte input limit |
| PBKDF2-HMAC-SHA256 | 600,000 iterations (FIPS-constrained environments only) |

Benchmark on production-like hardware and raise parameters where latency allows. Never use MD5, SHA-1, SHA-256, SHA-3, or any fast hash for passwords, and never encrypt passwords reversibly.

```ts
// Wrong
const hash = crypto.createHash("sha256").update(password).digest("hex");

// Right (illustrative: confirm option names in the installed `argon2` version)
import argon2 from "argon2";
const hash = await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 19456, // KiB
  timeCost: 2,
  parallelism: 1,
});
const ok = await argon2.verify(hash, password);
```

- Cap password length before hashing (for example 128 characters) to prevent hashing-based DoS, but allow long passphrases (at least 64). Enforce a sensible minimum length; do not require composition rules.
- Rehash on successful login when stored parameters are below the current policy.
- Other stacks: Python `argon2-cffi`; PHP `password_hash($pw, PASSWORD_ARGON2ID)` and `password_verify`; Go `golang.org/x/crypto/argon2` via a vetted wrapper; Java Spring Security `Argon2PasswordEncoder`.

## Login flow

1. Normalize the identifier consistently with registration and uniqueness rules. Do not alter the password.
2. Validate input length before the expensive hash.
3. Look up the account; verify the password. If the account does not exist, still verify against a dummy hash so timing is similar.
4. Return the same generic message for "no such user" and "wrong password".
5. Complete MFA (if enabled) before issuing the normal authenticated session.
6. Issue a **new** session ID or token after login (prevents session fixation).

```ts
// Wrong
if (!user) return res.status(404).json({ error: "User not found" });

// Right
if (!validCredentials) return res.status(401).json({ error: "Invalid credentials" });
```

## Sessions vs JWT

Prefer opaque **server-side sessions** for browser apps: instant revocation, device management, and fewer pitfalls. Use JWTs when statelessness across services is a real requirement.

Sessions:
- Session IDs from a CSPRNG, at least 128 bits of entropy.
- Enforce idle and absolute timeouts server-side.
- Invalidate on logout, password change, and suspected compromise.
- Cookie attributes and browser handling: see the `frontend-security` skill.

## JWT pitfalls

- Pin allowed algorithms in the verify call. Reject `none`. Never let the token header choose the algorithm or key type (HS256 vs RS256 confusion).
- Validate signature, `iss`, `aud`, `exp`, `nbf`, and token purpose. A decoded but unverified JWT is not authenticated.
- Prefer asymmetric keys when several parties verify; HS256 only with a high-entropy secret shared by issuer and verifier alone.
- Short-lived access tokens (minutes). JWTs are not revocable by default: use short TTLs plus refresh rotation, a `jti` denylist, or a per-user token version.
- Do not put secrets or unnecessary personal data in claims. Base64 is not encryption.

```ts
// Wrong: decode without verifying, or verify without pinning
const claims = decode(token);
jwt.verify(token, key);

// Right (jose; confirm against the installed version)
import { jwtVerify } from "jose";
const { payload } = await jwtVerify(token, publicKey, {
  algorithms: ["RS256"],
  issuer: "https://auth.example.com/",
  audience: "api.example.com",
});
```

## Refresh token rotation

- High-entropy refresh tokens; store only a hash (SHA-256 is fine for random tokens) server-side.
- Rotate on every use, atomically: consume the old token and store the new one in one transaction.
- Detect reuse of an already-rotated token and revoke the whole token family.
- Revoke on logout, password reset, and account suspension.

## MFA

- Prefer WebAuthn/passkeys or TOTP over SMS. Store TOTP secrets encrypted at rest.
- Rate-limit verification attempts; prevent code replay within the validity window.
- Recovery codes: single-use, high-entropy, stored hashed.
- Require re-authentication before changing or disabling factors.
- Never implement your own OTP algorithm; never log codes or seeds.

## OAuth / OIDC

- Use a maintained library and the correct flow: authorization code with PKCE (S256) for public clients and recommended for all. No implicit flow.
- `state` bound to the initiating session; `nonce` for OIDC.
- Redirect URIs: exact-match against registered values. No wildcards, no prefix matching.
- Validate ID token signature, `iss`, `aud`, `exp`, `nonce`. Do not confuse an access token with an ID token.
- Do not trust unverified claims or unverified email addresses to link or create accounts.

```ts
// Wrong
if (redirect.startsWith(allowedBase)) { /* open redirect via lookalike hosts */ }

// Right
if (!REGISTERED_REDIRECTS.has(redirect)) throw new Error("Unregistered redirect_uri");
```

## Password reset and magic links

- Token: at least 128 bits from a CSPRNG, single-use, short TTL, stored hashed, bound to user and purpose.
- Same public response whether or not the account exists.
- Build links from configured base URLs, never from the request `Host` header.
- On use: consume atomically, then invalidate other reset tokens, sessions, and refresh tokens.
- Prevent leakage through `Referer`, logs, and analytics (consume via POST or redirect immediately).

## Enumeration, timing, brute force

- Identical responses (status, body shape, similar timing) for existing and non-existing accounts in login, signup, and reset.
- Compare secrets with `crypto.timingSafeEqual` on equal-length buffers (it throws on length mismatch; compare hashes, not raw inputs).
- Rate-limit by account identifier and by IP; IP limits alone are weak. Use progressive delays rather than permanent lockout, which lets attackers lock out victims.
- Alert on credential-stuffing patterns. See `api-security.md` for quotas.
