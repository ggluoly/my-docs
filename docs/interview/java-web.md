---
title: 'JavaWeb 面试题'
description: 'JavaWeb 面试题整理，覆盖 Servlet、JSP、Session、Cookie、SQL 注入和传统 Web 项目常见问题。'
outline: [2, 3]
---

# JavaWeb 面试题

本页整理传统 JavaWeb 面试题，包括 Servlet、JSP、Session、Cookie 和基础 Web 安全。JSP、Struts 等内容现在多见于老项目维护，但面试中仍可能作为 JavaWeb 基础考察。

## Servlet 与 JSP

### JSP 和 Servlet 有什么区别？

#### 标准回答

Servlet 是运行在服务端的 Java 程序，主要负责接收请求、处理业务和生成响应；JSP 是以 HTML 为主、嵌入 Java 片段或标签的视图技术，最终会被容器翻译并编译成 Servlet。简单说，JSP 本质上也是 Servlet，但更偏页面展示，Servlet 更偏控制逻辑。

#### 常见追问

- JSP 为什么会被编译成 Servlet？
- MVC 中 Servlet 和 JSP 分别承担什么角色？
- 为什么现在项目很少直接使用 JSP？

### JSP 有哪些内置对象？

#### 标准回答

JSP 常见九大内置对象包括 `request`、`response`、`pageContext`、`session`、`application`、`out`、`config`、`page` 和 `exception`。它们由 JSP 容器创建，页面中可以直接使用。

#### 常见追问

- `request` 和 `session` 有什么区别？
- `application` 对应什么作用域？
- `exception` 对象什么时候可用？

### JSP 四种作用域是什么？

#### 标准回答

JSP 四种作用域包括 page、request、session 和 application。page 只在当前页面有效；request 在一次请求内有效；session 在一次会话内有效；application 在整个 Web 应用内共享。

#### 常见追问

- request 转发和重定向对作用域有什么影响？
- session 什么时候失效？
- application 作用域为什么要谨慎使用？

## Session 与 Cookie

### Session 和 Cookie 有什么区别？

#### 标准回答

Cookie 保存在客户端浏览器，容量较小，可能被用户修改；Session 保存在服务端，通过 sessionId 和客户端关联。Cookie 适合保存非敏感小信息，Session 适合保存登录态等服务端会话数据。分布式系统中 Session 常存入 Redis 等集中存储。

#### 常见追问

- Cookie 安全属性有哪些？
- Session 为什么会有分布式共享问题？
- JWT 和 Session 有什么区别？

#### 关联文档

- [安全认证](/interview/security)
- [Redis 面试题](/interview/redis)

### Session 工作原理是什么？

#### 标准回答

用户首次访问时，服务端创建 Session 并生成 sessionId，再通过 Cookie 或 URL 重写返回给客户端。之后客户端请求携带 sessionId，服务端根据 sessionId 找到对应会话数据，从而识别用户状态。

#### 常见追问

- sessionId 泄漏有什么风险？
- Session 过期时间在哪里配置？
- 分布式 Session 如何实现？

### 禁用 Cookie 后 Session 还能用吗？

#### 标准回答

可以，但需要通过 URL 重写等方式在请求 URL 中携带 sessionId。不过这种方式暴露在地址栏和日志中，安全性和易用性都较差，现代项目一般不推荐。

#### 常见追问

- URL 重写有什么安全风险？
- 移动端通常怎么维持登录态？
- Token 方案如何替代 Session？

## 传统 MVC 与安全基础

### Spring MVC 和 Struts 有什么区别？

#### 标准回答

Struts 是传统 MVC 框架，常以 Action 为核心；Spring MVC 是 Spring 生态中的 Web MVC 框架，天然整合 IoC、AOP、事务和消息转换器。Spring MVC 更适合 REST API 和前后端分离场景，Struts 现在主要出现在老项目维护中。

#### 常见追问

- Struts2 的 Action 是线程安全的吗？
- Spring MVC 为什么更适合现代项目？
- 过滤器、拦截器和 AOP 有什么区别？

#### 关联文档

- [Spring 面试题](/interview/spring)

### 如何避免 SQL 注入？

#### 标准回答

核心是不要拼接用户输入到 SQL 中，应使用 `PreparedStatement` 或 ORM 框架的参数绑定能力。还要对输入做合法性校验，限制数据库账号权限，避免把异常 SQL 信息直接暴露给用户。MyBatis 中优先使用 `#{}`，谨慎使用 `${}`。

#### 常见追问

- `PreparedStatement` 为什么能防 SQL 注入？
- MyBatis 的 `#{}` 和 `${}` 有什么区别？
- 排序字段必须动态拼接时怎么处理？

#### 关联文档

- [MyBatis 面试题](/interview/mybatis)
- [安全认证](/interview/security)
