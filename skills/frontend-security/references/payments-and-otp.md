# Payments and OTP / SMS Login

General principles for any provider. For provider-specific behavior (endpoints, response codes, amount units), use the provider's current official documentation and do not invent field names or codes.

## Contents
- Payment flow
- Redirect callbacks
- Webhooks
- Idempotency and state
- Card data and PCI scope
- OTP and SMS login
- Common mistakes

## Payment flow

1. **Server creates the payment.** Compute the amount on the server from trusted order data. Never accept an amount, price, or currency from the client.
2. **Persist a pending record** before redirecting: internal order or payment ID, provider transaction reference, amount, currency, user, status `pending`.
3. **Redirect or open the provider's checkout** (hosted page, redirect, or provider-hosted fields).
4. **On return or notification, verify server-to-server** with the provider's official API using server-side credentials.
5. **Match the verified result** against the persisted record: transaction reference, amount, currency, merchant account, and expected state.
6. **Fulfill once.** Update status and grant access in one atomic step.

## Redirect callbacks

The browser redirect back to your site is an untrusted notification, not proof of payment. Query parameters can be forged.

Wrong:

```ts
if (searchParams.get("status") === "success") await markOrderPaid(orderId);
```

Right (provider functions are placeholders for the provider's official API):

```ts
const ref = searchParams.get("ref");
const payment = await db.payment.findByProviderRef(ref);
if (!payment) return redirect("/pay/failed");
if (payment.status === "paid") return redirect("/pay/done"); // idempotent

const result = await verifyWithProvider({ ref, amount: payment.amount });
if (!result.verified || result.amount !== payment.amount || result.currency !== payment.currency) {
  return redirect("/pay/failed");
}
await fulfillOnce(payment.id, result.transactionId); // atomic, see below
return redirect("/pay/done");
```

- Treat user cancellation and failure separately from verified success.
- A success page must only display state that the server already verified.
- Verify the correct amount unit and currency (minor units vs major units, and currencies with different denominations, cause serious bugs).
- Keep merchant credentials in server-only environment variables. Never log them or return them in errors.

## Webhooks

- Verify the signature using the provider's documented scheme, over the **raw request body** (not re-serialized JSON), with a constant-time comparison.
- Check the timestamp tolerance if the provider supplies one, to reduce replay.
- Reject unsigned or invalid requests before doing any work.
- Treat the payload as a hint: for high-value events, re-fetch the object from the provider API.
- Respond quickly; process via a queue when work is heavy. Providers retry, so handlers must be idempotent.
- Do not expose the webhook endpoint to browser CORS; it is server-to-server.

## Idempotency and state

- Model payment state explicitly (`pending` → `paid` / `failed` / `refunded`) and allow only valid transitions.
- Use a unique constraint on the provider transaction ID, and an atomic conditional update (`UPDATE ... WHERE status = 'pending'`) or a row lock so concurrent callbacks cannot double-fulfill.
- Handle duplicate callbacks, retries, timeouts, and out-of-order events.
- Reconcile pending payments through the provider's documented process when a callback is lost.
- Keep an audit log of provider responses (without secrets or full card data).

## Card data and PCI scope

- Do not touch raw card numbers. Use hosted checkout or provider-hosted fields so card data never reaches your servers or your own DOM.
- Never log or store card numbers, CVV, or full track data.
- Third-party scripts on checkout pages can skim data. Minimize them, apply CSP, and use SRI where possible.

## OTP and SMS login

OTP endpoints are authentication endpoints. Protect requesting, sending, verifying, and resending.

- **Generate** with a cryptographically secure source (for example `crypto.randomInt`), never `Math.random()`.
- **Expire** quickly (a few minutes) and invalidate on success and when superseded.
- **Store** a keyed hash (HMAC) of the code, not plaintext; bind it to the identifier, purpose, and attempt/transaction ID.
- **Compare** in constant time.
- **Limit attempts** (for example 5 per code), then require a new code. Avoid permanent lockouts that let an attacker deny service to a victim; prefer cooldowns.
- **Rate-limit** sends and verifies per identifier (phone/email) and per IP, plus global caps. Add bot protection (CAPTCHA or similar) on the send endpoint.
- **Consume atomically** so two concurrent requests cannot both use the same code.
- **No enumeration:** return the same response and similar timing whether or not the account exists ("If the number is eligible, a code was sent").
- **Control cost abuse:** SMS pumping (attackers triggering many messages, often to premium or foreign numbers) can run up bills. Add per-destination limits, geographic allowlists where appropriate, and spending alerts.
- **Never** put OTPs in URLs, logs, analytics events, `localStorage`, or API responses (not even "for testing").
- Protect the SMS or email provider API key: server-only, least privilege.
- OTP alone is a weak second factor against phishing and SIM swap; for high-risk actions consider passkeys or app-based TOTP.

## Common mistakes

- Marking an order paid from a redirect query parameter.
- Trusting a client-supplied amount.
- No idempotency, so retries double-credit or double-ship.
- Verifying webhook signatures over parsed-and-reserialized JSON.
- Merchant secret in `NEXT_PUBLIC_*` or client code.
- OTP with unlimited attempts, reusable codes, or `Math.random()`.
- Different responses for "unknown user" and "code sent".
- Logging OTPs or full payment payloads.
