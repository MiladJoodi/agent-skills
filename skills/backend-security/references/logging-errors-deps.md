# Logging, Errors, and Dependencies

Standards: OWASP Top 10:2025 A03 (Software Supply Chain Failures), A09 (Security Logging and Alerting Failures), A10 (Mishandling of Exceptional Conditions); ASVS 5.0 logging and dependency chapters.

## Contents
- Safe logging
- Audit trails
- Log injection
- Error handling
- Dependency security
- Supply chain and CI
- SBOM and secret scanning

## Safe logging

- Use structured (JSON) logs with a timestamp, event type, outcome, `requestId`, and the minimum actor and target identifiers needed.
- Log security events: authentication success and failure, authorization denials, password and MFA changes, privileged actions, recovery flows, webhook verification failures, rate-limit triggers, suspicious validation failures.
- Never log the items listed under "Never log" in `secrets-crypto-data.md`. Redact request headers, query parameters, and body fields at the logger boundary; do not log whole requests.
- Alert, do not only log (A09:2025): define which events page someone.
- Restrict log access, define retention, and treat errors sent to monitoring or tracing services as outbound data flows too.

```ts
// Wrong
logger.error({ headers: req.headers, body: req.body });

// Right (pino shown; use your logger's redaction feature)
const logger = pino({
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"],
});
logger.warn({ event: "auth_failed", requestId, outcome: "denied" });
```

## Audit trails

- Record who did what to which resource, when, and with what outcome, including before/after state for high-impact changes (without secrets).
- Distinguish the authenticated actor, the affected subject, and the service identity.
- Make the audit stream append-only or tamper-evident where feasible and separate from debug logs. Do not claim "tamper-proof" unless storage and access controls support it.

## Log injection

- Untrusted values can forge log lines through CR/LF or control characters. Prefer structured fields over string concatenation; encode or strip control characters for text formats.
- Treat every log field that originates in a request or third party as untrusted.

## Error handling

- Clients get a stable code, a generic message, and a request ID. Servers keep full detail.
- No stack traces, SQL text, file paths, config, tokens, or dependency response bodies in production responses.
- Use equivalent responses where existence must not leak (for example `404` for both "missing" and "not yours").
- Do not swallow errors from security checks, and do not let a global error handler turn an authorization failure or a failed signature check into success. Fail closed.
- Handle resource exhaustion and unexpected states deliberately (A10:2025): timeouts, retries with limits, cleanup in `finally`, no partial transactions.

## Dependency security

- Commit the lockfile and install from it in CI: `npm ci`, `pnpm install --frozen-lockfile`, `yarn install --immutable`, `pip install --require-hashes`, `go mod verify`.
- Run the ecosystem's audit tooling in CI and on dependency changes (`npm audit --omit=dev --audit-level=high`, `pip-audit`, `govulncheck`, OWASP Dependency-Check). Confirm flags for your tool version.
- Judge advisories by severity, affected versions, and reachability. Do not blindly run `npm audit fix --force`; review breaking upgrades.
- Before adding a package, especially in auth, crypto, payment, templating, or parsing paths: verify the official name (typosquatting), maintainers, activity, and whether the platform already provides the feature. Do not install a package just because an AI answer mentioned it.
- Review install scripts, unexpected lockfile changes, registry sources, and ownership changes.
- Consider a short cooldown before adopting brand-new releases of dependencies.

## Supply chain and CI

- Pin CI actions and plugins, preferably to commit SHAs for critical workflows. Use least-privilege CI tokens and short-lived credentials.
- Verify provenance and signatures where supported (for example `npm audit signatures`).
- Make builds reproducible from the lockfile; verify that release artifacts contain the intended versions.
- Keep secrets out of build logs and images.

## SBOM and secret scanning

- Generate an SBOM (CycloneDX or SPDX) for each release artifact and store it with the release, so "are we affected?" can be answered quickly. An SBOM does not prove software is free of vulnerabilities.
- Run secret scanning (gitleaks, trufflehog, or host-native scanning) in pre-commit and CI; block merges on findings. Treat a finding as an exposure: revoke and rotate, then clean history if needed.
