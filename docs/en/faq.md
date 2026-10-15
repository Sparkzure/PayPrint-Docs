# FAQ

## Why doesn't the paper come out after paying?

By design: **payment only books the ledger; the user must press "Confirm print"**.
Within the window (30 min by default) confirming releases the job. For unattended
kiosks enable auto-release under runtime settings.

## "Device already bound" at registration?

A device in the database can be bound to only one member account. For a new device,
reinstall or resale, an admin must **release** it in the admin panel (wipes sessions,
frees the fingerprint; the next registration/login treats it as new). There is no
self-service release — on purpose.

## Why can't admins order?

Admins sign in to a separate panel (no device involved) but **cannot consume** — that
blocks the "leaked admin password = free paper" path. Collectors are not accounts either.

## "Amount duplicates another order"?

Within a printer, pending-payment amounts must be unique so a payment can be located by
amount alone. Wait for the other order to be paid or to expire.

## Can I expose this to the internet?

The project is designed for LANs (server and printer share the network). If you must, put
a TLS reverse proxy in front (registration/login need WebCrypto → HTTPS) and keep the
admin panel off the public internet.

## Is my document safe?

Uploaded files are visible only to the owning account (the preview endpoint checks
ownership). Images are converted server-side into A4 PDFs (landscape/portrait, scaled and
centered).
