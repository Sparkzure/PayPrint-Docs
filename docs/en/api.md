# API contract (overview)

> Full contract with the canonical signing algorithm, state machines and the complete
> error-code table lives in the Chinese version [接口契约](/api.md), which is also shipped
> as `docs/API.md` in the backend repository.

## Envelope & identity

All responses are JSON `{"data": ...}` or `{"error": {"code", "message"}}`. Stable error
codes drive UI branching — never match on message text.

| Line | Credential | Notes |
|---|---|---|
| User | Session token (`Authorization: Bearer`) | Device signature **only** for register/login |
| Admin | Admin session or `X-Admin-Token` | Not device-bound; admins cannot order |
| Collector | `X-Collector-Token` (printer-scoped) | Reports payments for all users of one printer |

## Request signing (register/login only)

`payprint/v1`: canonical string = `method\npath\nquery\ntimestamp\nnonce\nsha256(body)`
with Go-style query escaping; headers `X-Device-Fingerprint/-Timestamp/-Nonce/-Signature/-
PublicKey/-Platform/-App-Version/-Label`. Nonces are recorded **per fingerprint** and
consumed on successful verification regardless of the request outcome.

## Core rules

- Amounts are **integer fen** computed server-side; client-sent amounts never count.
- Payment reports are matched **per printer by exact amount** (plus optional spec/price
  checks); a unique candidate proceeds, zero → `payment_unmatched`/`order_expired`,
  two or more → `payment_ambiguous` — never guessed.
- **Payment does not print**: `POST /orders/{id}/print` (release) is the only path that
  creates a print job; it re-checks ownership, status, window, printer availability and
  (optionally) official payment verification.
- Print jobs retry with backoff, get polled to a terminal state, and job/order terminal
  states are written in the same transaction. In-flight jobs can never be reset to
  `pending` (that would print twice).
- The audit log is **order-log only**: one snapshot row per order, no foreign keys.
