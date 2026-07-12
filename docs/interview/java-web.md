---
title: 'JavaWeb 面试题'
description: 'JavaWeb 面试题整理，覆盖 Servlet、JSP、Session、Cookie、Tomcat、WebLogic、SQL 注入和传统 Web 项目常见问题。'
outline: [2, 3]
---

# JavaWeb 面试题

本页整理传统 JavaWeb 面试题，包括 Servlet、JSP、Session、Cookie、Tomcat、WebLogic 和基础 Web 安全。JSP、Struts、WebLogic 等内容现在多见于老项目维护，但面试中仍可能作为 JavaWeb 基础考察。

## Servlet 与 JSP

### JSP 和 Servlet 有什么区别？

Servlet 是运行在服务端的 Java 程序，主要负责接收请求、处理业务和生成响应；JSP 是以 HTML 为主、嵌入 Java 片段或标签的视图技术，最终会被容器翻译并编译成 Servlet。简单说，JSP 本质上也是 Servlet，但更偏页面展示，Servlet 更偏控制逻辑。

#### 常见追问

- JSP 为什么会被编译成 Servlet？
- MVC 中 Servlet 和 JSP 分别承担什么角色？
- 为什么现在项目很少直接使用 JSP？

### JSP 有哪些内置对象？

JSP 常见九大内置对象包括 `request`、`response`、`pageContext`、`session`、`application`、`out`、`config`、`page` 和 `exception`。它们由 JSP 容器创建，页面中可以直接使用。

#### 常见追问

- `request` 和 `session` 有什么区别？
- `application` 对应什么作用域？
- `exception` 对象什么时候可用？

### JSP 四种作用域是什么？

JSP 四种作用域包括 page、request、session 和 application。page 只在当前页面有效；request 在一次请求内有效；session 在一次会话内有效；application 在整个 Web 应用内共享。

#### 常见追问

- request 转发和重定向对作用域有什么影响？
- session 什么时候失效？
- application 作用域为什么要谨慎使用？

## Session 与 Cookie

### Session 和 Cookie 有什么区别？

Cookie 保存在客户端浏览器，容量较小，可能被用户修改；Session 保存在服务端，通过 sessionId 和客户端关联。Cookie 适合保存非敏感小信息，Session 适合保存登录态等服务端会话数据。分布式系统中 Session 常存入 Redis 等集中存储。

#### 常见追问

- Cookie 安全属性有哪些？
- Session 为什么会有分布式共享问题？
- JWT 和 Session 有什么区别？

#### 关联文档

- [安全认证](/interview/security)
- [Redis 面试题](/interview/redis)

### Session 工作原理是什么？

用户首次访问时，服务端创建 Session 并生成 sessionId，再通过 Cookie 或 URL 重写返回给客户端。之后客户端请求携带 sessionId，服务端根据 sessionId 找到对应会话数据，从而识别用户状态。

#### 常见追问

- sessionId 泄漏有什么风险？
- Session 过期时间在哪里配置？
- 分布式 Session 如何实现？

### 禁用 Cookie 后 Session 还能用吗？

可以，但需要通过 URL 重写等方式在请求 URL 中携带 sessionId。不过这种方式暴露在地址栏和日志中，安全性和易用性都较差，现代项目一般不推荐。

#### 常见追问

- URL 重写有什么安全风险？
- 移动端通常怎么维持登录态？
- Token 方案如何替代 Session？

## 传统 MVC 与安全基础

### Spring MVC 和 Struts 有什么区别？

Struts 是传统 MVC 框架，常以 Action 为核心；Spring MVC 是 Spring 生态中的 Web MVC 框架，天然整合 IoC、AOP、事务和消息转换器。Spring MVC 更适合 REST API 和前后端分离场景，Struts 现在主要出现在老项目维护中。

#### 常见追问

- Struts2 的 Action 是线程安全的吗？
- Spring MVC 为什么更适合现代项目？
- 过滤器、拦截器和 AOP 有什么区别？

#### 关联文档

- [Spring 面试题](/interview/spring)

### 如何避免 SQL 注入？

核心是不要拼接用户输入到 SQL 中，应使用 `PreparedStatement` 或 ORM 框架的参数绑定能力。还要对输入做合法性校验，限制数据库账号权限，避免把异常 SQL 信息直接暴露给用户。MyBatis 中优先使用 `#{}`，谨慎使用 `${}`。

#### 常见追问

- `PreparedStatement` 为什么能防 SQL 注入？
- MyBatis 的 `#{}` 和 `${}` 有什么区别？
- 排序字段必须动态拼接时怎么处理？

#### 关联文档

- [MyBatis 面试题](/interview/mybatis)
- [安全认证](/interview/security)

## Tomcat 与 WebLogic

### Tomcat 是什么？

Tomcat 是 Apache 开源的 Servlet / JSP 容器，用来运行 Java Web 应用。它负责接收 HTTP 请求、管理 Servlet 生命周期、处理 Session、加载 Web 应用类，并把请求转交给具体 Servlet 或 Spring MVC 的 `DispatcherServlet`。

#### 常见追问

- Tomcat 是 Web 服务器还是应用服务器？
- Tomcat 和 Nginx 有什么区别？
- Spring Boot 为什么能直接启动 Web 服务？

#### 关联文档

- [Tomcat](/deploy/tomcat)

### Tomcat 的核心组件有哪些？

Tomcat 常见核心组件包括 Catalina、Coyote 和 Jasper。Catalina 是 Servlet 容器核心，负责 Web 应用生命周期和请求处理链；Coyote 是连接器，负责 HTTP / AJP 协议接入；Jasper 是 JSP 引擎，负责把 JSP 翻译并编译成 Servlet。

#### 深入解释

Tomcat 容器层级通常可以理解为 `Engine -> Host -> Context -> Wrapper`。`Engine` 表示整个 Servlet 引擎，`Host` 表示虚拟主机，`Context` 表示一个 Web 应用，`Wrapper` 表示一个具体 Servlet。

#### 常见追问

- Connector 和 Container 有什么区别？
- `Context` 对应什么？

#### 关联文档

- [Tomcat](/deploy/tomcat)

### Tomcat 的请求处理流程是什么？

客户端请求先进入 Connector，由 Coyote 解析 HTTP 协议，然后进入 Engine、Host、Context、Wrapper 等容器层级，最终调用目标 Servlet。Spring MVC 项目中，目标通常是 `DispatcherServlet`，之后再由 Spring MVC 调用 Controller 并生成响应。

#### 常见追问

- Filter 在请求流程中什么时候执行？
- DispatcherServlet 在 Tomcat 中是什么角色？
- Tomcat 线程池满了会怎样？

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [Spring 面试题](/interview/spring)

### Tomcat 为什么要自定义类加载器？

Tomcat 需要同时运行多个 Web 应用，因此要隔离不同应用的类和依赖，避免一个应用的 jar 冲突影响另一个应用。每个 Web 应用通常有独立的 `WebAppClassLoader`，加载自身 `WEB-INF/classes` 和 `WEB-INF/lib` 下的类。

#### 深入解释

Tomcat 在 Web 应用类加载上会对双亲委派做调整，让应用优先加载自己的依赖，从而支持应用隔离和热部署。但 Java 核心类、公共类和容器类仍需要遵循安全边界，不能随意覆盖。

#### 常见追问

- 双亲委派是什么？
- Tomcat 类加载器和普通 JVM 类加载器有什么区别？
- 为什么热部署容易导致类加载器泄漏？

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [类加载机制](/java-core/class-loading)

### Spring Boot 内嵌 Tomcat 和外部 Tomcat 有什么区别？

内嵌 Tomcat 是 Spring Boot 应用启动时在进程内创建的容器，应用通常打成 jar 直接运行；外部 Tomcat 是独立安装的容器，传统项目通常打成 war 包部署进去。内嵌 Tomcat 更适合微服务和容器化，外部 Tomcat 更常见于传统 JavaWeb 项目。

#### 常见追问

- Spring Boot jar 和 war 部署有什么区别？
- 内嵌 Tomcat 如何配置端口和线程池？
- 为什么微服务更常用内嵌容器？

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [Spring Boot 面试题](/interview/spring-boot)

### WebLogic 是什么？

WebLogic 是 Oracle 提供的企业级 Java EE / Jakarta EE 应用服务器。它不只是 Servlet 容器，还提供数据源、JNDI、JMS、JTA 事务、集群、管理控制台和安全域等完整企业级能力。

#### 常见追问

- WebLogic 为什么叫企业级应用服务器？
- WebLogic 常见于哪些项目？
- WebLogic 和 Spring Boot 是同一类东西吗？

#### 关联文档

- [WebLogic](/deploy/weblogic)

### Tomcat 和 WebLogic 有什么区别？

Tomcat 偏轻量级 Servlet / JSP 容器，主要负责运行 Web 应用；WebLogic 是完整企业级应用服务器，除了 Web 容器能力，还提供数据源、JNDI、JMS、JTA 事务、集群和管理控制台等能力。新 Spring Boot 微服务通常优先使用内嵌 Tomcat，传统大型 Java EE 项目可能使用 WebLogic。

#### 常见追问

- 为什么 WebLogic 运维复杂度更高？
- 什么场景还会使用 WebLogic？
- 从 WebLogic 迁移到 Spring Boot 要注意什么？

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [WebLogic](/deploy/weblogic)

### 传统项目为什么会使用 WebLogic？

传统企业项目使用 WebLogic，通常是因为需要完整 Java EE 能力、厂商支持、集中式管理控制台、企业级数据源、JMS、JTA 事务和集群高可用。银行、保险、政企等老系统中，WebLogic 比较常见。

#### 常见追问

- 新项目为什么不一定选 WebLogic？
- WebLogic 迁移到 Kubernetes 有哪些难点？
- JNDI 数据源迁移到 Spring Boot 怎么处理？

#### 关联文档

- [WebLogic](/deploy/weblogic)
