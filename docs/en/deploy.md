# Deploy & operate

> This page is a condensed English overview. The Chinese version
> [部署与运维](/deploy.md) is the authoritative, full reference.

## Build & packaging

The deliverable is **one binary**: HTTP API, background workers and the frontend are
embedded at build time (`go:embed`), so there is no runtime asset directory and no
"copied the binary but forgot the frontend" failure mode.

```bash
make build          # Go 1.27+; fetches the frontend dist from the PayPrint-Frontend release
make release-linux-arm64   # linux/arm64 (aarch64)
make release-linux-armv7   # linux/arm/v7
make release-linux-amd64   # linux/amd64
```

Pure-Go dependencies (`modernc.org/sqlite`) + `CGO_ENABLED=0` mean cross-compiling needs
no toolchain for the target. For old hardware set `GOAMD64=v1` (default in the Makefile)
and `GOARM=7` for arm/v7.

Releases attach `payprint-server-<tag>-<os>-<arch>.zip` with SHA256 sidecars for
linux amd64/arm64/armv7 and windows amd64, plus multi-arch Docker images
(`ghcr.io/sparkzure/payprint`) built with buildx cross-compilation.

## Run (single binary + systemd)

Nothing to install on the target besides the binary. Create an empty directory, drop the
binary in, run it once:

```
/opt/payprint/payprint-server   # the only file before first start
/opt/payprint/payprint.conf     # generated from built-in defaults on first start
/opt/payprint/data/             # database + uploads; backing up this dir = backing up the site
```

One-step systemd install (auto-start on boot, restart on crash):

```bash
sudo bash scripts/install-service.sh --binary ./payprint-server --unit payprint.service
```

Upgrades = replace the binary + restart; never overwrite `payprint.conf`
(it holds your admin token and all runtime-tuned values).

## Configuration

Process-level config comes **only** from `payprint.conf` (INI style):

- Default location is **the binary's own directory** (not the working directory);
  `go run`/`go test` ephemeral dirs fall back to the working directory.
- Missing file → generated from the built-in template (the single source of defaults);
  write failures warn but never block startup.
- Only keys present in the file are overridden — delete a line to fall back to the default.
- Unknown keys warn; invalid values refuse to start.
- Relative paths (`db_path`, `storage_dir`) resolve against the config file's directory.
- Environment variables are **not** read; the startup log's first line names the file.

Key sections: `[server]` (addr/env/log), `[storage]` (db + uploads), `[security]`
(`admin_token` — required for the CLI admin API), `[printer]`
(`default_printer_uri` seeds the first printer), `[worker]`, `[payment]`.

## Runtime settings vs config

Anything operators tune on site (release window, auto-release, registration toggle,
IPP poll interval, ...) lives in the `app_settings` table and is edited in the admin
panel with **immediate effect** — no restart. Panel edits are stored as overrides;
the config file remains the base layer.

## Backup & restore

- **Export**: admin panel → Backup, or `GET /api/v1/admin/backup` (zip: consistent DB
  snapshot + uploaded files).
- **Restore**: upload the zip (validated and staged), then restart the service; the
  startup path applies it atomically and keeps the previous data as `*.pre-restore`.
- Backing up `data/` plus `payprint.conf` is a full-site backup.

## HTTPS

Consumer registration/login use WebCrypto, which requires a secure context: serve via
HTTPS or localhost. Typical setup: Nginx/Caddy TLS in front, proxying to `127.0.0.1:8080`.
Keep the admin panel off the public internet.
