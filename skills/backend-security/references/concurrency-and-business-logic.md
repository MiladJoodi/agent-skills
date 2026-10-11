# Concurrency and Business Logic

Standards: OWASP Top 10:2025 A06 (Insecure Design); API6:2023 (unrestricted access to sensitive business flows).

## Contents
- Race conditions and TOCTOU
- Atomic updates and constraints
- Transactions and isolation
- Idempotency keys
- State machines
- Prices, quantities, discounts
- Queues and distributed workflows

## Race conditions and TOCTOU

Dangerous pattern: check a condition, then change state in a separate step. Two concurrent requests both pass the check. Typical victims: balances, coupons, inventory, quotas, one-time tokens, invitations.

- State the invariant (balance never negative, one redemption per user and campaign).
- Enforce it in the database (conditional update, constraint, lock), not in application memory.
- Never assume low traffic or a single instance prevents races.

```ts
// Wrong: check then act
const wallet = await getWallet(userId);
if (wallet.balance < amount) throw insufficient();
await setBalance(userId, wallet.balance - amount);

// Right: one atomic conditional update
const r = await db.wallet.updateMany({
  where: { userId, balance: { gte: amount } },
  data: { balance: { decrement: amount } },
});
if (r.count !== 1) throw insufficient();
```

## Atomic updates and constraints

- SQL form: `UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 AND balance >= $1`; check affected rows.
- Unique constraints encode invariants: `UNIQUE (user_id, coupon_id)` makes double redemption impossible regardless of timing.
- Check affected-row counts and distinguish success, conflict, and not-found.
- Optimistic concurrency: a `version` column in the `WHERE` clause.

## Transactions and isolation

- Put related writes in one transaction when partial completion would break an invariant.
- Choose the isolation level deliberately. `SERIALIZABLE` (or explicit locks such as `SELECT ... FOR UPDATE`) for sensitive financial logic; handle serialization failures (for example PostgreSQL SQLSTATE `40001`) by retrying the whole transaction.
- When locking several rows (transfers), lock in a consistent order to avoid deadlocks.
- Keep network calls and slow work out of open transactions. Perform external side effects after commit, or use an outbox.
- Confirm semantics for your actual database and driver; isolation behavior differs between engines.

## Idempotency keys

For operations where retries must not repeat effects (payments, orders, transfers, provisioning):

1. Accept a client key (`Idempotency-Key`) or derive one.
2. Scope it to principal, tenant, and operation.
3. Store key, request fingerprint, status, and result atomically with the effect where possible.
4. Same key and same request: return the stored result. Same key and different request: `409`/`422`.
5. Handle concurrent duplicates (unique insert wins; others wait or get "in progress") and crashed operations.
6. Expire keys after a documented window.

```ts
const existing = await idem.get(auth.userId, key);
if (existing) {
  if (existing.bodyHash !== hash(req.body)) throw conflict();
  return existing.response;
}
```

Inbound webhooks and message consumers get the same treatment with the event ID as the key (see `files-webhooks-jobs.md`).

## State machines

- Define states and allowed transitions (`pending -> paid -> fulfilled`, `pending -> canceled`).
- Apply transitions only on the server, atomically, with the expected current state in the update. Never let a client set `status`.
- Treat duplicate, delayed, and out-of-order events as normal; handlers must be idempotent.

```ts
// Wrong
await db.order.update({ where: { id }, data: { status: req.body.status } });

// Right
const r = await db.order.updateMany({
  where: { id, status: "pending" },
  data: { status: "paid" },
});
if (r.count !== 1) throw conflict();
```

## Prices, quantities, discounts

- The client may suggest a SKU and quantity. The server loads price, tax, shipping, fees, discount eligibility, and entitlements from trusted data.
- Recompute totals immediately before charge or commit; re-check stock and coupon limits in the same transaction as the write.
- If the client sends a price, compare and reject on mismatch rather than silently using either value.
- Use integer minor units (or an exact decimal type) for money; define rounding explicitly; verify currency.
- Quotes: if you issue a server-signed quote, bind it to user, items, amount, and an expiry, and verify it on use.

```ts
// Wrong
await charge(req.body.total);

// Right
const items = await catalog.getMany(req.body.items.map((i) => i.sku));
const total = computeTotal(items, req.body.items, auth); // server-side rules
await charge(total);
```

## Queues and distributed workflows

- Assume at-least-once delivery. Make handlers idempotent wherever duplicates would be harmful.
- Use an outbox pattern (write the event in the same transaction as the state change) when a commit and a message must stay consistent.
- Separate retryable from permanent failures; bound retries; dead-letter poison messages.
- For multi-service flows without a shared transaction use sagas with compensating actions. Never "fire and forget" ledger effects.
