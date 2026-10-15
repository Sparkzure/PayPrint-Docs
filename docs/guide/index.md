# 介绍与快速开始

PayPrint 是跑在局域网里的自助打印服务：管理员把打印机接入进来，**每台打印机有独立的纸张、
单价与在线时段**。用户在网页上传 PDF 或
图片（JPG/PNG），选好参数下单、扫码付款，然后点「确认打印」，服务端经 IPP 把任务直投打印机。

## 它是怎么工作的

```
用户浏览器 ──HTTP──▶ PayPrint（Go 单二进制） ──IPP──▶ 打印机
     ▲                    │
     └── 扫码支付，到账上报 ─┘（收款设备 / 账号会话）
```

- **收到付款不会自动出纸**：到账只把订单推进到「待确认打印」，用户手动确认才创建打印任务。
  无人值守场景可在面板打开「到账即出纸」。
- **单二进制**：前端已嵌入，运行时没有资源目录；首次启动在二进制旁边生成带注释的
  `payprint.conf` 与 `data/`，整个目录自包含、可整体搬走。

## 快速开始

```bash
# 1. 从 Release 下载对应平台的 zip（或自行 make build），解出一个二进制
#    放进一个可写目录，空跑一次：它会生成带注释的 payprint.conf 与 data/
/opt/payprint/payprint-server

# 2. 改两个必填项：[security] admin_token 与 [printer] default_printer_uri
nano /opt/payprint/payprint.conf

# 3. 正式跑起来；Linux 上用脚本一行装成 systemd 服务（开机自启、崩溃拉起）
sudo bash scripts/install-service.sh --binary /opt/payprint/payprint-server --unit payprint.service

# 4. 在服务器本机用 http://localhost:8080 注册第一个账号，它会自动成为管理员
```

## 系统要求

| 项 | 要求 |
|---|---|
| 服务器 | 任何能跑 Go 交叉编译产物的机器（linux amd64/arm64/armv7、windows amd64） |
| 打印机 | 支持 AirPrint / IPP Everywhere 的网络打印机；或 USB 打印机 + CUPS 网关 |
| 数据库 | 内嵌 SQLite（WAL），无需安装 |
| HTTPS | 用户端注册/登录依赖 WebCrypto，需要 HTTPS 或 localhost（见部署页） |

## 下一步

- [打印机接入](/guide/printer.md) —— 直连与 CUPS 网关两种接法
- [部署与运维](/deploy.md) —— 配置参考、systemd、备份、HTTPS
- [接口契约](/api.md) —— 签名算法、状态机、错误码全表
- 常见问题见 [FAQ](/faq.md)
