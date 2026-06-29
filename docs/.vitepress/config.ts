import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的知识库',
  description: '个人技术文档与学习笔记',

  base: '/my-docs/',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/ggluoly/my-docs' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ggluoly/my-docs' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026'
    }
  }
})