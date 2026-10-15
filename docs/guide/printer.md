# 打印机接入

打印机地址在管理面板的「打印机与价目」页维护，**是数据不是配置**：改完点「测试连接」当场验证，
探测失败返回 `reachable: false` 加原因（区分"地址写错"与"打印机没开"）。

## 方式一：直连无线打印机（默认）

打印机支持无线/网络打印（AirPrint / IPP Everywhere / Mopria）时，Web/API 直接用 IPP 投递，
**不需要任何中间设备**：

```
ipp://<打印机IP>/ipp/print
```

部分机型需要带端口 `ipp://<打印机IP>:631/ipp/print`。从服务器验证可达性：

```bash
ipptool -tv ipp://192.168.1.50:631/ipp/print get-printer-attributes.test
```

## 方式二：CUPS 网关（回退）

打印机只有 USB、或不提供 IPP 服务时，另装一台 CUPS 网关（一台常开的小主机，如树莓派）：

```
ipp://<网关IP>:631/printers/<队列名>
```

**必须精确到队列**，不能只写主机名。CUPS 侧建议：只绑局域网网卡、`Allow` 限定网段、
`WebInterface No`。Web/API 与网关在同一局域网内，Web 直接 push IPP，网关上不放任何 agent。

## 在线时段

打印机可以配置「每周在线时段」（面板里 JSON 数组，留空 = 全天在线）：

```json
[{"days":[1,2,3,4,5],"start":"08:00","end":"22:00"}]
```

- `days` 是 ISO 工作日（周一 = 1）；`end` 早于 `start` 表示跨午夜
- 时段外**不下单、不放行**，投递顺延且不消耗重试预算
- 判定用服务器本地时间，容器部署时注意 `TZ`
