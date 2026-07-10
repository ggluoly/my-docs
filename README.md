# Java 后端技术文档库

基于 VitePress 构建的 Java 后端开发技术文档与面试库，覆盖 Java 基础、Spring、Spring Cloud、数据存储、消息队列、安全认证、工程实践、可观测性和部署运维。

在线地址：<https://docs.yidian601.top>

## 技术基线

- Java 基础原理与存量项目维护默认以 JDK 8 为讲解基线。
- Spring Boot 3.x 及现代新项目最低使用 Java 17，优先评估 Java 21 LTS。
- Java 9-25 的语言和平台能力单独放在 `docs/java-core/features/` 中，页面会标明版本状态和使用边界。

## 本地开发

CI 当前使用 Node.js 24。建议本地使用相同主版本，避免依赖安装和构建结果不一致。

```sh
npm ci
npm run docs:dev
```

构建和预览：

```sh
npm run docs:build
npm run docs:preview
```

## 目录结构

```text
docs/                       Markdown 文档源码
docs/.vitepress/config.ts   VitePress 导航、搜索、SEO 和站点配置
docs/.vitepress/theme/      自定义主题和交互
docs/public/                静态资源与自定义域名 CNAME
.github/workflows/          GitHub Pages 部署流程
```

## 内容维护

- 新增页面应放到对应的 `docs/` 栏目中，并同步更新导航和侧边栏。
- Java 基础、JVM 和并发菜单项使用独立 Markdown 页面，不维护聚合导览页。
- 文档优先使用中文，涉及版本差异时必须写明 JDK、框架或产品版本。
- 不提交密钥、Token、密码、连接串、个人配置和构建产物。
- 涉及导航、页面结构或主题调整后，必须运行 `npm run docs:build`。

## 部署

推送到 `main` 后，GitHub Actions 构建 `docs/.vitepress/dist` 并部署到 GitHub Pages。自定义域名由 `docs/public/CNAME` 配置。

## 许可证

本项目使用 [MIT License](./LICENSE)。
