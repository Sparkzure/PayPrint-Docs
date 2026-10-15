# Printer setup

Printer addresses live in the admin panel ("Printers & pricing") — **they are data, not
config**: edit, then press "Test connection" to probe immediately; failures return
`reachable: false` plus a reason.

## Option 1: direct wireless printer (default)

For printers with AirPrint / IPP Everywhere / Mopria, the server pushes IPP directly —
no middlebox:

```
ipp://<printer-ip>/ipp/print
```

Some models need the port: `ipp://<printer-ip>:631/ipp/print`. Verify from the server:

```bash
ipptool -tv ipp://192.168.1.50:631/ipp/print get-printer-attributes.test
```

## Option 2: CUPS gateway (fallback)

USB-only printers need one CUPS gateway (an always-on mini host):

```
ipp://<gateway-ip>:631/printers/<queue>
```

**The queue name is required.** Recommended CUPS hardening: bind the LAN interface only,
`Allow` limited subnets, `WebInterface No`. The server and gateway share the LAN; the
gateway runs no agent.

## Service windows

Printers can define weekly service windows (admin panel, JSON array; empty = always on):

```json
[{"days":[1,2,3,4,5],"start":"08:00","end":"22:00"}]
```

- `days` are ISO weekdays (Mon = 1); `end` earlier than `start` crosses midnight
- Outside a window: no ordering, no release; delivery is deferred without consuming retries
- Judged in server-local time — mind `TZ` in containers
