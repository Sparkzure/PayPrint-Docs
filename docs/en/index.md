---
layout: home

hero:
  name: PayPrint
  text: Self-service printing on your LAN
  tagline: Upload on the web, pay by QR, and paper comes out via direct IPP after user confirmation — shipped as a single binary
  actions:
    - theme: brand
      text: Quick start
      link: /en/guide/
    - theme: alt
      text: Deploy & operate
      link: /en/deploy
    - theme: alt
      text: API contract
      link: /en/api

features:
  - icon: 🖨️
    title: Direct IPP printing
    details: AirPrint / IPP Everywhere printers get jobs straight from the server; USB-only printers need one CUPS gateway. Duplex, color, copies, page ranges — priced per sheet server-side.
  - icon: 💰
    title: Payment ≠ printing
    details: Money received only books the ledger; the user presses "Confirm print" to release paper. Amounts match uniquely per printer; ambiguous payments go to a human, never guessed.
  - icon: 📦
    title: Single binary
    details: HTTP API, background workers and the whole frontend in one file. First run generates a commented config next to the binary; the deploy directory is relocatable as a whole.
  - icon: 🔐
    title: Device identity
    details: Non-exportable ECDSA-P256 keys in WebCrypto, request signing, nonce replay protection. The account is the identity core; devices are accessories.
  - icon: 🛠️
    title: Admin panel
    details: Accounts, devices, printers & pricing, orders (refund/retry), collector credentials, audit log with CSV export, hot-reloadable runtime settings.
  - icon: 🌐
    title: i18n UI
    details: Frontend in SolidJS + Hope UI (same stack as OpenList) with Simplified Chinese and English built in.
---
