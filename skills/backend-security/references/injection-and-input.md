# Injection and Input

Standards: OWASP Top 10:2025 A05; ASVS 5.0 validation, encoding, and file-handling chapters.

## Contents
- Validate at every trust boundary
- SQL and ORM pitfalls
- NoSQL and LDAP
- Command and template injection
- Unsafe deserialization and prototype pollution
- Path traversal
- XXE
- ReDoS
- Size, depth, and content-type limits

## Validate at every trust boundary

- Parse input with a schema before business logic: type, length, range, format, enum, cross-field rules.
- Reject unknown fields on security-sensitive writes (strict objects).
- Validate third-party and queue payloads too. Treat database values as untrusted when their origin is uncertain.
- Canonicalize before applying path or identifier policy, then use the canonical form (do not validate one representation and use another).
- Encode output for its destination (SQL parameters, shell argv, HTML, URL). Do not rely on stripping "bad characters" at input time.

```ts
const CreateItem = z.strictObject({
  title: z.string().trim().min(1).max(200),
  qty: z.number().int().min(1).max(100),
}); // z.strictObject in Zod 4; .strict() on z.object in Zod 3
```

## SQL and ORM pitfalls

```ts
// Wrong
await db.query(`SELECT * FROM users WHERE email = '${email}'`);
await prisma.$queryRawUnsafe(`SELECT * FROM users WHERE id = ${id}`);

// Right
await db.query("SELECT * FROM users WHERE email = $1", [email]);
await prisma.$queryRaw`SELECT * FROM users WHERE id = ${id}`; // tagged template binds parameters
```

- Placeholders cannot bind identifiers. For dynamic column, table, sort field, or direction, map the input to a server-side allowlist.
- ORMs do not make raw fragments, `where: req.query`, or string-built `orderBy` safe.
- Use a database account with only the privileges the service needs.
- Other stacks: PDO prepared statements (PHP), driver placeholders or `sqlalchemy.text().bindparams` (Python), `database/sql` placeholders (Go), `PreparedStatement` (Java).

## NoSQL and LDAP

- MongoDB treats objects as operators. Never pass `req.body` or `req.query` as a filter: `?email[$ne]=x` matches everything.
- Validate primitive types, then build the filter from allowlisted fields. Avoid `$where` and server-side JavaScript.
- LDAP: escape filter values with a vetted library or use parameterized APIs; never concatenate filters.

```ts
// Wrong
await users.findOne(req.body.filter);

// Right
const email = z.string().email().parse(req.body.email);
await users.findOne({ email: { $eq: email } });
```

## Command and template injection

- Prefer a library over a subprocess. If a subprocess is unavoidable, use `execFile`/`spawn` without a shell, pass an argv array, and allowlist executables and arguments.
- Never compile templates from user input; pass untrusted values as data to trusted templates. Template engines can execute code.

```ts
// Wrong
exec(`convert ${file} out.png`);

// Right
execFile("convert", [validatedPath, "out.png"]);
```

Also: Python `subprocess.run([...], shell=False`), Go `exec.Command` with separate args, Java `ProcessBuilder` with a list.

## Unsafe deserialization and prototype pollution

- Do not deserialize untrusted data with formats that can instantiate arbitrary types or run code: Python `pickle` and unsafe `yaml.load`, Java `ObjectInputStream`, PHP `unserialize`, Ruby `Marshal`. Use JSON plus schema validation; safe YAML loaders only.
- Do not deep-merge untrusted objects into configuration or authorization state. Guard `__proto__`, `constructor`, `prototype`; use `Object.create(null)` maps or schema-parsed objects.

```ts
// Wrong
const options = deepMerge(defaults, req.body);
// Right
const options = OptionsSchema.parse(req.body);
```

## Path traversal

Prefer server-generated IDs over client-controlled paths. If a path is needed, resolve against a fixed root and verify containment, accounting for symlinks.

```ts
import path from "node:path";
import { realpath } from "node:fs/promises";

const root = await realpath("/var/app/uploads");
const full = await realpath(path.resolve(root, userId, fileId)); // throws if missing
if (!full.startsWith(root + path.sep)) throw badRequest();
```

Do not use `startsWith` on non-normalized strings or `..` filtering as the only check.

## XXE

Disable external entity resolution and external DTDs in every XML parser; reject DTDs when not needed. Set limits on document size, nesting, and entity expansion. Do not assume a parser's defaults are safe in the installed version. Prefer JSON.

## ReDoS

Avoid nested quantifiers and overlapping alternations on untrusted input. Bound input length before matching. Do not accept user-supplied regular expressions. Prefer a linear-time regex engine or a simple parser for structured formats.

## Size, depth, and content-type limits

- Cap request body size at the application and at the proxy/infrastructure layer.
- Cap JSON depth, array length, multipart field count, file count, and decompressed size.
- Accept only expected `Content-Type`s and reject malformed or ambiguous bodies (including JSON sent as `text/plain` where the framework would accept it).
- Never trust a file extension or client MIME type as proof of content.
