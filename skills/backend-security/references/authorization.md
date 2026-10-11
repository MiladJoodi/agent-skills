# Authorization

Standards: OWASP Top 10:2025 A01; API1 (BOLA), API3 (BOPLA), API5 (BFLA) :2023; ASVS 5.0 authorization chapter.

## Contents
- BOLA / IDOR
- Function-level authorization
- Property-level authorization and mass assignment
- RBAC and ABAC
- Multi-tenant isolation
- Authorization inside the query
- Admin endpoints
- Re-authentication

## BOLA / IDOR

Treat every client-supplied identifier as a selector, never as proof of ownership. Check access on every read, write, delete, export, and nested resource.

```ts
// Wrong: any logged-in user can read any invoice
return db.invoice.findUnique({ where: { id: invoiceId } });

// Right
const invoice = await db.invoice.findFirst({
  where: { id: invoiceId, ownerId: auth.userId },
});
if (!invoice) throw notFound(); // same response for "missing" and "not yours"
return toInvoiceDto(invoice);
```

Reflect real policy: delegated or shared access needs its own rule, not just `ownerId`. Test cross-user access for every operation.

## Function-level authorization (BFLA)

- Authenticate, then check permission for the requested action, not a role label.
- Deny by default when a permission is missing or policy evaluation errors.
- Apply the same policy to alternate routes, bulk endpoints, exports, GraphQL resolvers, and API versions.
- Hidden UI controls, route names, and unguessable IDs are not authorization.

```ts
// Wrong
if (user) await deleteOrganization(orgId);

// Right
await policy.require(user, "organization:delete", organization); // your policy layer
await deleteOrganization(orgId);
```

## Property-level authorization and mass assignment

- Separate create and update schemas. Allowlist writable fields; ignore or reject everything else.
- Server-controlled fields (`role`, `isAdmin`, `ownerId`, `tenantId`, `balance`, `status`, `price`, audit fields) are never writable from request bodies.
- Return explicit response DTOs; never return the whole ORM entity.

```ts
// Wrong
await db.user.update({ where: { id: auth.userId }, data: req.body });
res.json(user); // leaks internal flags and hashes

// Right
const input = UpdateProfile.parse(req.body); // strict schema
await db.user.update({ where: { id: auth.userId }, data: { displayName: input.displayName } });
res.json({ id: user.id, displayName: user.displayName });
```

Framework notes: Rails strong parameters; Django explicit serializers/forms; Laravel `$fillable`; Spring `@JsonProperty(access = READ_ONLY)` on protected fields.

## RBAC and ABAC

- RBAC for stable capabilities; ABAC when decisions depend on attributes (owner, tenant, resource state, time).
- Centralize decisions in one policy module, `can(actor, action, resource)`, instead of scattered `role === "admin"` checks. Unit-test the policy.
- Resolve roles and entitlements from trusted server-side state, never from request fields.

## Multi-tenant isolation

- Derive tenant from the authenticated membership, never from a client header or body field alone. A requested tenant switch must be validated against membership.
- Include tenant scope in every read, update, delete, uniqueness constraint, and join.
- Scope cache keys, search indexes, object-storage keys, exports, and background jobs by tenant.
- Database row-level security is useful defense in depth when correctly configured and tested; it does not replace query scoping.
- Test: change the tenant ID in a request and confirm no cross-tenant access.

## Authorization inside the query

Put the authorization predicate in the same query as the identifier. Fetch-then-check is racy and easy to forget.

```ts
// Wrong
const doc = await docs.get(id);
if (doc.orgId !== auth.orgId) throw forbidden();

// Right: conditional update; zero rows means denied, missing, or conflict
const res = await db.doc.updateMany({
  where: { id, orgId: auth.orgId, version: expectedVersion },
  data: { title: input.title, version: { increment: 1 } },
});
if (res.count !== 1) throw notFoundOrConflict();
```

For bulk operations use `WHERE id IN (...) AND owner_id = $actor` and compare the affected row count with the requested count.

## Admin endpoints

- Separate permission for every privileged operation; separate support/operator/system privileges from ordinary ones.
- Consider returning 404 rather than 403 to non-admins on admin routes to avoid disclosing their existence.
- Log high-impact actions (actor, target, outcome, request ID) without secrets.
- Users must not be able to assign themselves privileged roles.
- Test legacy, undocumented, and alternate-version routes.

## Re-authentication

Require fresh authentication or step-up verification for email and password changes, factor changes, API key creation, payout or recovery changes, role grants, data export, and account deletion. A valid long-lived session is not proof the user just approved a sensitive action. Bind step-up to the session with a short validity window.
