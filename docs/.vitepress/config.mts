import { defineConfig } from 'vitepress'

// 仿 OpenList-Docs 的组织方式（Valaxy→VitePress 等价物）：
// 页面即文件（pages 约定路由），导航/侧栏集中在这里，
// 双语用 VitePress 原生 locales：根路径 = 中文，/en/ = English。
export default defineConfig({
  lang: 'zh-CN',
  title: 'PayPrint',
  description: '局域网自助打印：网页上传、扫码付款、确认后 IPP 直投打印机',

  head: [
    ['meta', { name: 'theme-color', content: '#1F6FEB' }],
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/' },
          { text: '部署', link: '/deploy' },
          { text: '接口契约', link: '/api' },
          { text: '开发', link: '/develop' },
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '介绍与快速开始', link: '/guide/' },
              { text: '打印机接入', link: '/guide/printer' },
              { text: '常见问题', link: '/faq' },
            ],
          },
          { text: '部署与运维', link: '/deploy' },
          { text: '接口契约（API）', link: '/api' },
          { text: '架构与开发', link: '/develop' },
        ],
        outline: [2, 3],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Sparkzure/PayPrint' },
        ],
        editLink: {
          pattern: 'https://github.com/Sparkzure/PayPrint-Docs/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '以 AGPL-3.0 发布',
          copyright: 'PayPrint · <a href="https://sparkzure.xyz" target="_blank" rel="noopener">sparkzure.xyz</a>',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Deploy', link: '/en/deploy' },
          { text: 'API', link: '/en/api' },
          { text: 'Development', link: '/en/develop' },
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction & quick start', link: '/en/guide/' },
              { text: 'Printer setup', link: '/en/guide/printer' },
              { text: 'FAQ', link: '/en/faq' },
            ],
          },
          { text: 'Deploy & operate', link: '/en/deploy' },
          { text: 'API contract', link: '/en/api' },
          { text: 'Architecture & development', link: '/en/develop' },
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/Sparkzure/PayPrint' },
        ],
        footer: {
          message: 'Released under AGPL-3.0',
          copyright: 'PayPrint · <a href="https://sparkzure.xyz" target="_blank" rel="noopener">sparkzure.xyz</a>',
        },
      },
    },
  },
})
