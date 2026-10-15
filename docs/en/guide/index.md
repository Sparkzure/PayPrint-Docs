# Introduction & quick start

PayPrint is a self-service printing service for your LAN: **each printer is its own service endpoint**.
Users upload a PDF or an image (JPG/PNG), pick options, pay by QR, then press
"Confirm print" — the server delivers the job via IPP.

## How it works

```
Browser ──HTTP──▶ PayPrint (Go binary) ──IPP──▶ Printer
   ▲                   │
   └── payment report ──┘ (collector credential / account session)
```

- **Payment does not print by itself**: it moves the order to "awaiting release";
  the user must confirm within the window (30 min by default). Unattended kiosks can
  enable auto-release in the admin panel.
- **Single binary**: the frontend is embedded; first run generates a commented
  `payprint.conf` and `data/` next to the binary.

## Quick start

```bash
# 1. Grab a platform zip from Releases (or make build), drop the binary into a
#    writable directory and run it once: payprint.conf + data/ appear next to it.
/opt/payprint/payprint-server

# 2. Set two required keys: [security] admin_token and [printer] default_printer_uri
nano /opt/payprint/payprint.conf

# 3. Run for real; on Linux install as a systemd service:
sudo bash scripts/install-service.sh --binary /opt/payprint/payprint-server --unit payprint.service

# 4. Register the first account at http://localhost:8080 — it becomes the admin.
```

## Requirements

| Item | Requirement |
|---|---|
| Server | Anything the cross-compiled binaries run on (linux amd64/arm64/armv7, windows amd64) |
| Printer | AirPrint / IPP Everywhere network printer; or USB printer + CUPS gateway |
| Database | Embedded SQLite (WAL), nothing to install |
| HTTPS | Registration/login need WebCrypto: HTTPS or localhost (see Deploy) |

## Next steps

- [Printer setup](/en/guide/printer.md) — direct IPP and the CUPS gateway fallback
- [Deploy & operate](/en/deploy.md) — configuration, systemd, backup, HTTPS
- [API contract](/en/api.md) — signing, state machines, error codes
- Questions? See the [FAQ](/en/faq.md)
