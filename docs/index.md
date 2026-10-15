---
layout: home

hero:
  name: PayPrint
  text: 局域网自助打印
  tagline: 网页上传、扫码付款、用户确认后经 IPP 直投打印机出纸 —— 单二进制交付，拷过去就能跑
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/
    - theme: alt
      text: 部署与运维
      link: /deploy
    - theme: alt
      text: 接口契约
      link: /api

features:
  - icon: 🖨️
    title: IPP 直连打印机
    details: 支持 AirPrint / IPP Everywhere / Mopria 的网络打印机直接投递；USB 打印机才需要一台 CUPS 网关转发。双面、彩色、份数、页范围，服务端按张计价。
  - icon: 💰
    title: 到账与出纸分离
    details: 收到钱只记账，用户点「确认打印」才出纸。打印机内金额唯一匹配，匹配不上或多单转人工，绝不猜。
  - icon: 📦
    title: 单二进制交付
    details: HTTP 接口、后台任务循环与整个前端打进一个文件；首次启动自动生成带注释的配置文件，部署目录整体可搬走。
  - icon: 🔐
    title: 设备身份
    details: 浏览器内不可导出的 ECDSA-P256 密钥、请求签名、nonce 防重放；账号是身份核心，设备只是附属物。
  - icon: 🛠️
    title: 管理面板
    details: 账号、设备、打印机与价目、订单（退款/重推）、收款凭据、审计日志（CSV 导出），运行参数保存即生效。
  - icon: 🌐
    title: 界面 i18n
    details: 前端 SolidJS + Hope UI（OpenList 同栈），内置简体中文与 English，配色深浅两套跟随系统。
---
