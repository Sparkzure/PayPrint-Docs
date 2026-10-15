# Architecture & development (overview)

> Full architecture notes, design constraints and pitfalls live in the Chinese version
> [架构与开发](/develop.md) (also `docs/DEVELOPMENT.md` in the backend repository).

## Repositories

| Repository | Contents |
|---|---|
| `Sparkzure/PayPrint` | Go backend (module `github.com/Sparkzure/PayPrint`, `server/` is the module root), scripts, deploy, docs |
| `Sparkzure/PayPrint-Frontend` | SolidJS + Hope UI SPA; release workflow attaches `payprint-web-<tag>.tar.gz` which the backend downloads and embeds |
| `Sparkzure/PayPrint-Docs` | This site (VitePress, zh/en) |

## Backend layout

`cmd/server` (entry) · `internal/config` (INI template = source of defaults) ·
`internal/webui` (embedded dist + placeholder) · `internal/database` (goose migrations
embedded; **ASCII-only SQL comments**) · `internal/store` (sqlc-generated, do not edit) ·
`internal/service` (business logic & transaction boundaries) · `internal/httpapi` ·
`internal/ipp` · `internal/pdfutil` (image→A4 PDF, zero deps) · `internal/notifier` ·
`internal/backup`.

## Local development

```bash
# backend (no Node needed):
make build      # fetches/refreshes the frontend dist automatically
make run        # http://127.0.0.1:8080
make dev        # air hot reload (Go only)
make check      # gofmt + vet + test + single-binary build (pre-commit gate)

# frontend (its own repo):
npm ci && npm run dev   # http://localhost:5173, /api proxied to 127.0.0.1:8080
```

End-to-end smoke (`make smoke`, 135 assertions) runs against a temp server with a fake
IPP printer, using the **frontend's real signing implementation** — the only check that
catches cross-language protocol drift between the two repositories.

## Conventions

- Conventional Commits (`type(scope): subject`, checked by CI); PR template requires
  verification evidence and an AI-assistance disclosure.
- Colors in the frontend come from CSS/Hope tokens only (light & dark both verified);
  no hex colors in components.
- `.tools/` is an optional project-local toolchain; every script falls back to PATH tools.
- Public docs are Chinese; this English site mirrors the structure.
