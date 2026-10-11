# SSRF and Outbound Requests

Standards: OWASP Top 10:2025 A01 (SSRF is now part of Broken Access Control); API7:2023 (SSRF) and API10:2023 (unsafe consumption of APIs).

Rendering URLs in the browser is a frontend topic. This file covers server-side fetching and proxying.

## Contents
- Core rules
- Blocked destinations
- Implementation pattern
- Redirects and DNS rebinding
- Webhook senders, previews, image fetchers
- Limits on responses

## Core rules

Treat every user-influenced URL as hostile: link previews, "import from URL", image fetchers, document converters, callback URLs, webhook destinations.

1. Prefer an **allowlist** of hosts and schemes over a blocklist. Normally allow `https:` only.
2. Parse with a standards-compliant URL parser. Reject credentials in the URL, unexpected ports, and ambiguous forms.
3. **Resolve DNS, then validate the resolved IPs**, and connect only to a validated address. A hostname check alone proves nothing.
4. Disable redirects by default. If needed, re-validate every hop and cap the count (for example 3).
5. Set connect and total timeouts and a maximum response size enforced while streaming.
6. Do not forward `Authorization`, cookies, or internal headers to the destination.
7. Never use naive string checks such as "URL contains trusted-host.com".
8. Enforce egress policy at the network layer too (egress proxy or firewall) where possible; application checks are one layer.

## Blocked destinations (non-exhaustive)

- IPv4 loopback `127.0.0.0/8`, "this network" `0.0.0.0/8`
- Private `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
- Link-local `169.254.0.0/16` (includes the cloud metadata address `169.254.169.254`)
- Shared address space `100.64.0.0/10`, benchmarking `198.18.0.0/15`, multicast and reserved ranges
- IPv6 `::1`, unique local `fc00::/7`, link-local `fe80::/10`, and IPv4-mapped forms such as `::ffff:127.0.0.1`
- Provider-specific metadata hostnames and internal service names

Use a maintained IP-classification library rather than hand-written regexes, and normalize unusual encodings (decimal, octal, hex IPs, trailing dots). Extend the list for your cloud provider, and check the current IANA special-purpose registries. Where available, require IMDSv2 or equivalent on cloud hosts as defense in depth.

## Implementation pattern

Illustrative sketch: `isBlockedIp` and the fetch helper stand for your own code built on a maintained library; verify the HTTP client's supported hooks (for example a custom `lookup` on the connection) in its documentation before relying on them.

```ts
// Wrong
const res = await fetch(req.body.url);

// Right
const url = new URL(req.body.url);
if (url.protocol !== "https:" || url.username || url.password) throw badRequest();
if (!ALLOWED_HOSTS.has(url.hostname)) throw badRequest(); // allowlist when the use case permits

const res = await safeFetch(url, {   // custom client that validates the IP it actually connects to
  redirect: "manual",
  timeoutMs: 5_000,
  maxBytes: 1_000_000,
});
```

A safe client validates the address **at connection time** (inside the resolver or dial hook), so the IP that was checked is the IP that is used:

```ts
// Conceptual: validate every resolved address inside the connection's lookup step
function guardedLookup(hostname, options, cb) {
  dns.lookup(hostname, { ...options, all: true }, (err, addrs) => {
    if (err) return cb(err);
    if (addrs.some((a) => isBlockedIp(a.address))) return cb(new Error("blocked destination"));
    cb(null, addrs);
  });
}
```

Other stacks: Python validate with `ipaddress` after resolution and control redirects in `requests`/`httpx`; Go a custom `DialContext` that checks the IP; Java a custom connection/redirect strategy; PHP validate and disable automatic redirects.

## Redirects and DNS rebinding

- DNS rebinding returns a public IP at validation time and a private IP at fetch time. Resolve once, validate, and connect to that address (or validate inside the connection hook as above). Never re-resolve between check and use.
- Re-validate scheme, host, port, and resolved IPs after every redirect. Block redirects from HTTPS to HTTP.

## Webhook senders, previews, image fetchers

- Webhook destinations: allowlist or validate with the same rules at registration **and** at delivery. Restrict who can register endpoints.
- Sign outgoing payloads with a per-endpoint secret and include a timestamp and unique ID so receivers can verify and de-duplicate.
- Previews and image fetchers are high-risk SSRF surfaces: same IP checks, strict size and content-type limits, run in an isolated egress path.
- Do not echo raw error details or response bodies from internal destinations to the user.
- Apply per-destination quotas and failure back-off to prevent abuse.

## Limits on responses

- Timeouts: connect (seconds) and total.
- Enforce byte limits while streaming, not after buffering; do not trust `Content-Length` alone.
- Limit decompressed size, content type, and parsing complexity. Validate JSON, XML, and images before processing.
- Retry only safe failure classes, with bounded attempts and backoff.
