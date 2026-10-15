# PayPrint-Docs

PayPrint 的文档站（VitePress），组织方式仿 OpenList-Docs：页面即文件、导航/侧栏集中配置、
双语（简体中文为根路径，English 在 `/en/`）。

## 本地开发

```bash
npm ci
npm run dev      # http://localhost:5173
```

## 结构

```
docs/
  index.md            首页（hero + features）
  guide/              指南：介绍与快速开始、打印机接入
  faq.md              常见问题
  deploy.md           部署与运维（从后端仓 docs/DEPLOY.md 搬运）
  api.md              接口契约（从后端仓 docs/API.md 搬运）
  develop.md          架构与开发（从后端仓 docs/DEVELOPMENT.md 搬运）
  en/                 英文镜像（英文为精炼版，中文为权威全文）
  .vitepress/config.mts   导航、侧栏、双语 locales
```

## 部署

push 到 main 后 `gh-pages.yml` 自动构建并发布到 GitHub Pages
（`https://sparkzure.github.io/PayPrint-Docs/`）。

## 与后端仓的分工

- **文档站**：面向使用者的入口（安装、部署、FAQ）。
- **后端仓 `docs/`**：仍保留 API.md / DEPLOY.md / DEVELOPMENT.md（代码内引用不断链）；
  长文档以文档站为发布面，两边内容同步时以文档站为准搬运。

## License

与主项目一致，AGPL-3.0。
