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
  JSP 本质上是服务端动态页面模板，Servlet 容器不能直接执行 JSP，因此会先把 JSP 翻译成 Java Servlet 源码，再编译成字节码并加载执行。这样 JSP 中的静态 HTML 会直接写入响应，Java 代码和标签会转换为对应的 Servlet 处理逻辑，最终通过 `service()` 方法生成动态内容。通常 JSP 会在首次访问时完成翻译和编译，也可以通过容器配置在应用启动阶段预编译。JSP 是对 Servlet 输出页面能力的封装，主要用于视图层；实际项目中更常见前后端分离或模板引擎方案。
- MVC 中 Servlet 和 JSP 分别承担什么角色？
  Servlet 通常承担 Controller 角色：接收请求、调用业务层、处理参数校验和流程控制，将结果放入 request/session 域，再转发或重定向到对应页面。
  JSP 通常承担 View 角色：读取域对象中的数据，通过 EL、JSTL 等生成 HTML 响应页面，尽量不写业务逻辑。
- 为什么现在项目很少直接使用 JSP？
  现在项目较少直接使用 JSP，主要是因为它的页面渲染和 Java Web 容器强绑定，前端页面通常需要和后端一起部署，前后端协作、独立发布和扩缩容都不够灵活。

### JSP 有哪些内置对象？

JSP 常见九大内置对象包括 `request`、`response`、`pageContext`、`session`、`application`、`out`、`config`、`page` 和 `exception`。它们由 JSP 容器创建，页面中可以直接使用。

#### 常见追问

- `request` 和 `session` 有什么区别？
  request 是一次 HTTP 请求范围内的数据载体，从请求进入到响应返回结束；常用于 Controller 向 JSP 转发数据，例如 `request.setAttribute()` 后通过 `forward` 跳转，数据仍然存在。
  session 是一次会话范围内的数据载体，通常从用户首次访问创建，到超时、主动失效或浏览器会话标识失效后结束；常用于保存登录用户、购物车等需要跨多个请求共享的数据。
  request 数据隔离性更强、生命周期短、占用服务端内存更少；session 可以跨请求，但会占用更多服务端资源，分布式场景还需要考虑 Session 共享或改用 Token。
- `application` 对应什么作用域？
  `application` 对应 ServletContext 作用域，也叫应用作用域。
  它的生命周期通常从 Web 应用启动到应用停止或重新部署为止，整个应用内所有用户、所有请求都可以访问同一份数据。
  常用于保存全局配置、应用级缓存、在线人数等共享数据，例如通过 `ServletContext#setAttribute()` 存取。
  需要注意它是多线程共享的，修改共享对象时要考虑线程安全；不适合存放用户相关数据。
- `exception` 对象什么时候可用？
  `exception` 是 JSP 的异常页隐式对象，只有当前 JSP 被声明为错误页时才可用，例如：`<%@ page isErrorPage="true" %>`。
  通常由普通 JSP 通过 `<%@ page errorPage="/error.jsp" %>` 指定错误页，发生未处理异常后转发到 `error.jsp`，此时可以通过 `exception` 获取异常信息，例如 `exception.getMessage()`。
  普通 JSP 页面默认不能直接使用 `exception`，否则会编译报错。

### JSP 四种作用域是什么？

JSP 四种作用域包括 page、request、session 和 application。page 只在当前页面有效；request 在一次请求内有效；session 在一次会话内有效；application 在整个 Web 应用内共享。

#### 常见追问

- request 转发和重定向对作用域有什么影响？
  请求转发 `forward` 是服务器内部跳转，浏览器只发起一次请求，所以 `request` 作用域数据可以传递；`session` 和 `application` 作用域数据也不受影响。`page` 作用域只在当前 JSP 页面有效，转发后不能访问。
  重定向 `sendRedirect` 会让浏览器再次发起新请求，因此原 `request` 作用域数据会丢失；`session` 和 `application` 作用域数据仍然可用，`page` 作用域同样不能传递。
  实际开发中，转发常用于服务端页面或接口内部处理；重定向常用于操作完成后的页面跳转，例如 POST 提交成功后重定向，避免刷新页面重复提交。
- session 什么时候失效？
  `Session` 失效主要有几种情况：
  1. 超过最大非活动时间，默认通常是 30 分钟，以最后一次客户端请求访问该 Session 的时间开始计算；可以通过 `session.setMaxInactiveInterval()` 或 `web.xml` 配置。
  2. 主动调用 `session.invalidate()`，Session 会立刻失效，内部属性也会被清除。
  3. Web 应用停止、重新部署或服务器关闭时，通常会销毁 Session。
  浏览器关闭后，默认的 `JSESSIONID` 会话 Cookie 一般会消失，后续无法再关联原 Session；但服务端的 Session 是否立即销毁取决于容器实现和超时配置。
- application 作用域为什么要谨慎使用？
  `application` 作用域对应 `ServletContext`，生命周期和整个 Web 应用一致，所有用户、所有请求共享同一份数据，所以要谨慎使用。
  主要风险是：数据会长期驻留内存，放入大对象或无用对象容易造成内存占用甚至泄漏；多线程请求会同时读写，属性本身不保证线程安全；不同用户的数据若放进去，可能造成数据串扰和安全问题。
  它适合保存全局且相对稳定的共享配置、应用级缓存等。用户信息、请求临时数据这类内容应该分别放在 `session` 或 `request` 作用域。

## Session 与 Cookie

### Session 和 Cookie 有什么区别？

Cookie 保存在客户端浏览器，容量较小，可能被用户修改；Session 保存在服务端，通过 sessionId 和客户端关联。Cookie 适合保存非敏感小信息，Session 适合保存登录态等服务端会话数据。分布式系统中 Session 常存入 Redis 等集中存储。

#### 常见追问

- Cookie 安全属性有哪些？
  1. `Secure`：Cookie 只能通过 HTTPS 请求发送，避免明文传输。
  2. `HttpOnly`：禁止 JavaScript 通过 `document.cookie` 读取，降低 XSS 窃取 Cookie 的风险。
  3. `SameSite`：限制跨站请求是否携带 Cookie，主要防御 CSRF。
     - `Strict`：完全禁止跨站携带。
     - `Lax`：部分顶级导航 GET 请求可以携带，常作为默认策略。
     - `None`：允许跨站携带，但必须同时设置 `Secure`。
  4. `Domain`：限制 Cookie 可发送到哪些域名。通常不设置或设置为精确域范围，避免扩大到不必要的子域。
  5. `Path`：限制 Cookie 在站点内的有效路径，范围越小越安全。
  6. `Max-Age` / `Expires`：控制 Cookie 的有效期。敏感登录态通常设置合理的过期时间，退出登录时应将其清除。
  对于登录态 Cookie，通常至少设置 `Secure`、`HttpOnly`、合适的 `SameSite`，并收紧 `Domain`、`Path` 和有效期。
- Session 为什么会有分布式共享问题？
  因为 Session 默认保存在单台应用服务器的内存中，而分布式部署时，同一个用户的请求可能被负载均衡转发到不同服务器。
  例如第一次请求到了 A 服务器，登录信息保存在 A 的 Session；下一次请求被转发到 B 服务器，B 内存中没有这个 Session，就会出现登录状态丢失或用户数据不一致。
    解决方式通常有三类：
    1. 使用粘性会话，让同一用户固定访问同一台机器，但服务器故障时 Session 仍会丢失。
    2. Session 复制，在多台服务器间同步 Session，但网络和内存开销较大。
    3. 将 Session 存到 Redis 等集中式存储中，各实例共享访问。这是实际项目中较常用的方案。
- JWT 和 Session 有什么区别？
  1. `Session` 是服务端保存会话状态的方案。客户端通常只保存一个 `sessionId` Cookie，服务端根据它查询用户状态；JWT 通常把用户标识、权限、过期时间等声明放在 Token 内，由客户端携带。
  2. `Session` 是有状态的，分布式部署需要解决共享问题，例如 Redis 集中存储；JWT 可以由服务端验签直接确认身份，天然更适合无状态服务和横向扩容。
  3. `Session` 服务端可以直接删除或修改会话，强制下线、权限变更立即生效比较容易；JWT 一旦签发，在过期前通常仍有效，想立即失效一般要配合黑名单、Token 版本号或短 Access Token 加 Refresh Token。
  4. JWT 内容只是 Base64 编码，不是加密，不能放密码、身份证号等敏感信息；Session 数据存服务端，客户端看不到具体内容。
  5. JWT 每次请求都带完整 Token，体积通常比 `sessionId` 大；Session 客户端传输开销小，但服务端需要存储和查询会话数据。
  6. `Session` 常用于传统 Web 登录态；JWT 常用于前后端分离、移动端、微服务 API 鉴权。实际项目里会根据是否需要即时注销、权限实时变更和多端接入来选择。

#### 关联文档

- [安全认证](/interview/security)
- [Redis 面试题](/interview/redis)

### Session 工作原理是什么？

用户首次访问时，服务端创建 Session 并生成 sessionId，再通过 Cookie 或 URL 重写返回给客户端。之后客户端请求携带 sessionId，服务端根据 sessionId 找到对应会话数据，从而识别用户状态。

#### 常见追问

- sessionId 泄漏有什么风险？
  `sessionId` 泄漏的核心风险是会话劫持。攻击者拿到有效的 `sessionId` 后，可以伪造用户 Cookie 请求服务端，服务端会把攻击者识别为该用户，不需要知道用户名和密码。
  可能造成未授权访问、读取敏感数据、执行转账或修改资料等高危操作；如果泄漏的是管理员 Session，还可能导致后台被接管。
  防护上会使用 HTTPS 和 `Secure` 防止传输窃听，`HttpOnly` 降低 XSS 窃取风险，设置合理过期时间；登录成功后要重新生成 `sessionId` 防止会话固定攻击，退出登录或修改密码后及时使旧 Session 失效。
- Session 过期时间在哪里配置？
  通常在 Web 容器或 Spring Boot 配置中设置。
  传统 Servlet 项目可在 web.xml 中配置，单位是分钟：
  ```
    <session-config>
    <session-timeout>30</session-timeout>
    </session-config>
  ```
  Spring Boot 可以在 application.yml 中配置：
  ```
  server:
  servlet:
    session:
      timeout: 30m
  ```
  也可以通过 HttpSession#setMaxInactiveInterval 动态设置，单位是秒。Session 超时一般指一段时间内没有访问后失效，不是从创建开始的绝对过期时间。
- 分布式 Session 如何实现？
  分布式 Session 的核心是让多个应用实例共享同一份 Session 数据，不能只存在单机内存里。
  常见方案是 Spring Session + Redis。应用把 Session 存到 Redis，各个实例根据客户端携带的同一个 `sessionId` 从 Redis 读取 Session，因此请求无论落到哪台机器都能识别登录状态。
  实现上引入 `spring-session-data-redis`，配置 Redis 连接后启用 Spring Session；默认 Session Cookie 名通常是 `SESSION`，也可以统一配置域名、路径、`HttpOnly`、`Secure` 和过期时间。
  Redis 要设置 Session TTL，Session 访问时续期；退出登录、修改密码或强制下线时删除对应 Redis Session 即可。
  也可以使用数据库、共享文件系统或粘性 Session，但数据库性能一般较差，粘性 Session 不能解决实例故障和扩容后的会话迁移问题，生产中通常优先 Redis。

### 禁用 Cookie 后 Session 还能用吗？

可以，但需要通过 URL 重写等方式在请求 URL 中携带 sessionId。不过这种方式暴露在地址栏和日志中，安全性和易用性都较差，现代项目一般不推荐。

#### 常见追问

- URL 重写有什么安全风险？
  URL 重写常见于 Cookie 不可用时，把 `sessionId` 拼到 URL 中，例如 `;jsessionid=xxx`。主要风险是 `sessionId` 会出现在浏览器历史、服务端访问日志、代理日志、Referer 头和分享链接中，容易被泄漏，进而导致会话劫持。
  另外，重写规则配置不当还可能引入开放重定向，攻击者构造跳转地址诱导用户访问钓鱼站点；如果将路径或参数直接拼接到文件路径、后端路由，还可能造成路径遍历、参数篡改或鉴权绕过。
  防护上优先使用 Cookie 保存 Session 标识，启用 HTTPS、`HttpOnly`、`Secure` 和合理的 SameSite；重写目标要使用白名单，不能直接信任用户传入的 URL、路径或重定向地址。
- 移动端通常怎么维持登录态？
  移动端通常使用 Token 维持登录态。用户登录成功后，服务端返回 Access Token，客户端安全保存后，在后续请求的 `Authorization: Bearer <token>` 请求头中携带。
  Access Token 一般设置较短有效期；为了避免用户频繁登录，会再配合有效期更长的 Refresh Token。Access Token 过期后，客户端用 Refresh Token 调用刷新接口获取新的 Access Token。
  Android 一般存到 Keystore 加密后的存储中，iOS 存 Keychain，不建议明文放在 SharedPreferences、UserDefaults 或普通本地文件中。
  服务端需要校验 Token 签名、有效期和状态；退出登录、修改密码或设备下线时，可以通过 Redis 黑名单、Token 版本号或服务端会话记录使 Token 失效。HTTPS 是必须的，避免 Token 在传输中被窃取。
- Token 方案如何替代 Session？
  Token 方案中，服务端登录成功后签发 Token，例如 JWT 或随机 Token，客户端后续请求放在 `Authorization` 请求头中。服务端通过校验 Token 的签名、有效期和声明信息识别用户，不再依赖 `HttpSession`。
  如果使用 JWT，用户信息和过期时间通常放在 Token 载荷中，服务端可做到无状态校验，适合多实例和网关场景；但 JWT 签发后不易立即失效，通常配合短过期时间、Refresh Token、黑名单或 Token 版本号处理注销和强制下线。
  如果使用随机 Token，服务端需要在 Redis 保存 `token -> 用户信息`，本质上是把 Session 标识从 Cookie 改为请求头，仍然有服务端状态，但便于移动端和跨域场景使用。
  两种方案都要使用 HTTPS，Token 设置合理过期时间，避免放入 URL；客户端安全保存，服务端还要校验权限，不能只校验 Token 是否有效。

## 传统 MVC 与安全基础

### Spring MVC 和 Struts 有什么区别？

Struts 是传统 MVC 框架，常以 Action 为核心；Spring MVC 是 Spring 生态中的 Web MVC 框架，天然整合 IoC、AOP、事务和消息转换器。Spring MVC 更适合 REST API 和前后端分离场景，Struts 现在主要出现在老项目维护中。

#### 常见追问

- Struts2 的 Action 是线程安全的吗？
  Struts2 的 Action 默认是线程安全的。因为 Struts2 会针对每个请求创建一个新的 Action 实例，请求之间不共享 Action 的成员变量。
  但如果把 Action 配置成 Spring 单例，或者在 Action 中使用 `static` 变量、共享的非线程安全对象，就仍然会有线程安全问题。实际开发中，Action 保持无状态，不在静态变量或单例成员中保存请求相关数据。
- Spring MVC 为什么更适合现代项目？
  Spring MVC 更适合现代项目，主要是它和 Spring 生态整合更紧密，能够直接复用 Spring 的 IOC、AOP、事务、安全和数据访问能力，分层开发更自然。
  它对 RESTful 支持更好，通过 `@RequestMapping`、`@RequestBody`、`@ResponseBody` 等注解可以方便地处理 JSON 接口，比较适合前后端分离和移动端接口开发。
  另外 Spring MVC 的参数绑定、异常统一处理、拦截器、文件上传、数据校验和单元测试支持都比较完善。结合 Spring Boot 后，配置量也明显减少，开发和部署效率更高。
  Struts2 基于 Action 的模型更偏传统 MVC，OGNL 等机制也带来过安全风险和调试复杂度；目前新项目通常优先选择 Spring MVC。
- 过滤器、拦截器和 AOP 有什么区别？
  **过滤器 Filter** 是 Servlet 规范提供的，作用在 Web 容器层，位于请求进入 `DispatcherServlet` 之前、响应返回客户端之前。通常用于字符编码、跨域、请求日志、XSS 过滤、登录态初步校验等。
  **拦截器 Interceptor** 是 Spring MVC 提供的，作用在 `DispatcherServlet` 内部、Controller 调用的前后。它能拿到 Handler 和 ModelAndView，适合做接口权限校验、登录校验、操作日志、接口耗时统计等。
  **AOP** 是 Spring 提供的面向切面编程能力，作用范围不局限于 Web 请求，可以拦截方法执行。常用于事务、统一日志、权限注解校验、异常处理、缓存、监控等横切逻辑。
  对同步且正常完成的请求，执行顺序通常是：Filter 前置 -> Interceptor `preHandle` -> Controller（及可能的 Controller AOP）-> Interceptor `postHandle` -> 视图渲染 -> Interceptor `afterCompletion` -> Filter 后置。
  如果拦截器在 `preHandle` 中短路、Controller 抛出异常或请求进入异步处理，回调顺序会变化；`postHandle` 不保证执行。AOP 如果切的是 Controller 方法，通常在 Controller 方法调用过程中生效。

#### 关联文档

- [Spring 面试题](/interview/spring)

### 如何避免 SQL 注入？

核心是不要拼接用户输入到 SQL 中，应使用 `PreparedStatement` 或 ORM 框架的参数绑定能力。还要对输入做合法性校验，限制数据库账号权限，避免把异常 SQL 信息直接暴露给用户。MyBatis 中优先使用 `#{}`，谨慎使用 `${}`。

#### 常见追问

- `PreparedStatement` 为什么能防 SQL 注入？
  `PreparedStatement` 会先对 SQL 模板进行预编译，SQL 结构和参数值是分开传递的。比如 `where username = ? and password = ?` 中，`?` 只是参数占位符，参数通过 `setString()` 绑定。
  即使用户输入了 `' or 1=1 --`，数据库也会把它当作普通字符串值，而不是 SQL 语法的一部分，因此不能改变原 SQL 的条件结构。
  需要注意，只有参数值可以使用 `?` 占位。表名、字段名、排序字段这类 SQL 结构不能直接参数化，必须使用白名单校验。
- MyBatis 的 `#{}` 和 `${}` 有什么区别？
  **#{}** 是预编译参数占位符，MyBatis 最终会使用 PreparedStatement 的 ? 绑定参数。参数会按类型处理，通常可以防止 SQL 注入，业务查询条件应优先使用它。
  **${}** 是字符串直接拼接，MyBatis 会把参数原样替换进 SQL。它常用于动态表名、字段名、排序字段等无法使用 ? 的 SQL 结构位置，但存在 SQL 注入风险。
- 排序字段必须动态拼接时怎么处理？
  对排序字段和排序方向做白名单映射，不直接把前端参数放进 ${}。
  排序字段不允许前端直接传数据库字段名；排序方向只接受 ASC 或 DESC，非法值使用默认排序。

#### 关联文档

- [MyBatis 面试题](/interview/mybatis)
- [安全认证](/interview/security)

## Tomcat 与 WebLogic

### Tomcat 是什么？

Tomcat 是 Apache 开源的 Servlet / JSP 容器，用来运行 Java Web 应用。它负责接收 HTTP 请求、管理 Servlet 生命周期、处理 Session、加载 Web 应用类，并把请求转交给具体 Servlet 或 Spring MVC 的 `DispatcherServlet`。

#### 常见追问

- Tomcat 是 Web 服务器还是应用服务器？
  Tomcat 本质上是 Web 服务器，同时也是 Servlet/JSP 容器。
  它能处理 HTTP 请求、提供静态资源访问，所以具备 Web 服务器能力；也能运行 Servlet、JSP、WebSocket 等 Java Web 组件。
  但它不属于完整的 Java EE 应用服务器。JDK 8 时代的完整 Java EE 应用服务器如 WebLogic、WebSphere、JBoss，通常还提供 EJB、JMS、JTA 等企业级规范实现。
- web服务器和应用服务器的区别？
  Web 服务器主要处理 HTTP 通信和静态资源，例如 HTML、CSS、JS、图片，也常负责 HTTPS、反向代理和负载均衡，典型是 Nginx、Apache HTTP Server。
  应用服务器主要承载业务逻辑和动态请求处理，提供应用运行时能力。Java 场景中通常包括 Servlet/JSP 容器，以及事务、消息、连接池、安全等企业级能力，典型是 WebLogic、WebSphere、JBoss。
  两者边界不是绝对的：Tomcat 既能处理 HTTP 和静态资源，也能运行 Java Web 应用，但通常不算完整 Java EE 应用服务器。
  实际生产中常见 Nginx 作为入口，应用服务器或 Tomcat 集群负责处理后端业务请求。
- Tomcat 和 Nginx 有什么区别？
  Tomcat 是 Java Web 容器，核心职责是运行 Java Web 应用，例如 Servlet、JSP、Spring MVC，并处理动态业务请求。
  Nginx 是高性能 Web 服务器和反向代理服务器，擅长处理静态资源、HTTPS 终止、请求转发、负载均衡和限流。
  常见部署是 Nginx 放在前面，负责静态文件、SSL 和流量分发；动态请求转发到后面的多个 Tomcat 实例。
  Tomcat 基于多线程处理请求；Nginx 采用事件驱动、异步非阻塞模型，在大量连接和静态资源场景下资源消耗更低。
  Tomcat 也能提供静态资源，但性能和并发能力通常不如 Nginx，因此生产环境一般不让 Tomcat 直接对外暴露。
- Spring Boot 为什么能直接启动 Web 服务？
  Spring Boot 默认集成了嵌入式 Web 容器，比如 `spring-boot-starter-web` 默认使用嵌入式 Tomcat。
  启动时，`SpringApplication.run()` 会创建 Spring 容器；对于 Web 应用，会创建 `ServletWebServerApplicationContext`。容器刷新过程中会创建 `TomcatServletWebServerFactory`，由它创建并启动内嵌 Tomcat。
  同时 Spring Boot 会把 `DispatcherServlet`、Filter、Listener 等注册到这个 Tomcat 中，所以一个带 `main` 方法的 Jar 包就能直接监听端口并提供 Web 服务，不需要单独部署到外部 Tomcat。
  JDK 8 下常见的 Spring Boot 2.x 默认端口是 `8080`，可通过 `server.port` 配置修改。

#### 关联文档

- [Tomcat](/deploy/tomcat)

### Tomcat 的核心组件有哪些？

Tomcat 常见核心组件包括 Catalina、Coyote 和 Jasper。Catalina 是 Servlet 容器核心，负责 Web 应用生命周期和请求处理链；Coyote 是连接器，负责 HTTP / AJP 协议接入；Jasper 是 JSP 引擎，负责把 JSP 翻译并编译成 Servlet。

#### 深入解释

Tomcat 容器层级通常可以理解为 `Engine -> Host -> Context -> Wrapper`。`Engine` 表示整个 Servlet 引擎，`Host` 表示虚拟主机，`Context` 表示一个 Web 应用，`Wrapper` 表示一个具体 Servlet。

#### 常见追问

- Connector 和 Container 有什么区别？
  Connector 和 Container 是 Tomcat 的核心组件。
  Connector 负责网络层通信，监听端口、接收 HTTP/AJP 请求、解析协议，并将请求转换为 Tomcat 内部的 `Request` 和 `Response` 对象，再交给 Container 处理。
  Container 负责处理应用请求，定位并调用对应的 Web 应用和 Servlet。Tomcat 的 Container 分层是 `Engine -> Host -> Context -> Wrapper`，其中 Wrapper 对应一个 Servlet。
  请求处理链路可以理解为：客户端 -> Connector -> Engine -> Host -> Context -> Wrapper -> Servlet。
  处理完成后，响应再经过 Connector 按 HTTP 协议写回客户端。
- `Context` 对应什么？
  在 Tomcat 中，`Context` 对应一个 Web 应用，也就是通常部署在 `webapps` 下的一个项目。
  例如访问路径是 `/order`，那么 `/order` 就是这个 Context 的 `contextPath`；它下面会包含该应用的 Servlet、Filter、Listener、静态资源和独立的类加载器。
  Tomcat 的层级里，`Host` 管理多个 Context，`Context` 再管理多个 Wrapper，Wrapper 对应具体的 Servlet。
  需要注意，Tomcat 的 `Context` 和 Spring 的 `ApplicationContext` 不是同一个概念：前者是 Web 应用运行单元，后者是 Spring IoC 容器。

#### 关联文档

- [Tomcat](/deploy/tomcat)

### Tomcat 的请求处理流程是什么？

客户端请求先进入 Connector，由 Coyote 解析 HTTP 协议，然后进入 Engine、Host、Context、Wrapper 等容器层级，最终调用目标 Servlet。Spring MVC 项目中，目标通常是 `DispatcherServlet`，之后再由 Spring MVC 调用 Controller 并生成响应。

#### 常见追问

- Filter 在请求流程中什么时候执行？
  Filter 在请求到达 Servlet 或 Spring MVC 的 DispatcherServlet 之前执行，响应返回给客户端之前也会再次经过 Filter。
  Filter 的核心入口是 doFilter，调用 chain.doFilter(request, response) 前是前置处理，调用后是后置处理：
  ```
  public void doFilter(ServletRequest request, ServletResponse response,
                     FilterChain chain) throws IOException, ServletException {
    // 前置处理
    chain.doFilter(request, response);
    // 后置处理
    }
  ```
  多个 Filter 时，前置逻辑按 order 从小到大执行，后置逻辑按相反顺序执行。
- DispatcherServlet 在 Tomcat 中是什么角色？
  DispatcherServlet 是 Spring MVC 的前端控制器，本质上是一个 Servlet。在 Spring Boot 中，它通常由 Spring 创建为 Bean 并注册到 Tomcat；Servlet 容器再按注册和加载时机初始化、调度它。
  Tomcat 接收到请求后，会依据 URL 映射把请求转发给 DispatcherServlet；随后它负责统一调度 Spring MVC 流程：
    `Tomcat -> DispatcherServlet -> HandlerMapping -> Controller -> HandlerAdapter
  -> Controller 返回结果 -> ViewResolver / HttpMessageConverter -> 响应`
  它不负责监听端口、接收 Socket 连接或线程调度，这些由 Tomcat 完成；它只处理已经进入 Web 容器的 HTTP 请求。
  通常在 Spring Boot 中，DispatcherServlet 会自动注册并映射到 /，因此大部分业务请求都会先经过它。
- Tomcat 线程池满了会怎样？
  达到 `maxThreads` 后，默认 Connector 不会继续创建工作线程；请求连接仍可能被接受并等待可用线程，直到 Connector 达到 `maxConnections`。
  达到 `maxConnections` 后，新的 TCP 连接会进入操作系统监听队列，队列容量由 `acceptCount` 控制；该队列满后，连接可能被拒绝或超时，客户端表现取决于操作系统、Connector 和反向代理配置。
  如果显式配置了 Tomcat `Executor`，还需要结合该 Executor 的队列容量和拒绝策略判断，不能一概视为默认线程池任务队列。

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [Spring 面试题](/interview/spring)

### Tomcat 为什么要自定义类加载器？

Tomcat 需要同时运行多个 Web 应用，因此要隔离不同应用的类和依赖，避免一个应用的 jar 冲突影响另一个应用。每个 Web 应用通常有独立的 `WebAppClassLoader`，加载自身 `WEB-INF/classes` 和 `WEB-INF/lib` 下的类。

#### 深入解释

Tomcat 在 Web 应用类加载上会对双亲委派做调整，让应用优先加载自己的依赖，从而支持应用隔离和热部署。但 Java 核心类、公共类和容器类仍需要遵循安全边界，不能随意覆盖。

#### 常见追问

- 双亲委派是什么？
  双亲委派是 Java 类加载器默认的加载机制：一个类加载器收到加载请求后，先委托父加载器加载；父加载器无法加载时，自己才尝试加载。
  主要是为了避免类被重复加载，并保证核心类的安全性。例如自定义一个 java.lang.String，Application ClassLoader 会先委托 Bootstrap ClassLoader，最终仍然加载 JDK 自带的 String。
  JDK 8 中是 Bootstrap、Extension、Application 三层；JDK 9 之后 Extension ClassLoader 被 Platform ClassLoader 替代，委派模型本身没有变化。
- Tomcat 类加载器和普通 JVM 类加载器有什么区别？
  Tomcat 没有完全遵循传统的双亲委派，它为了实现 Web 应用隔离和依赖版本隔离，采用了分层类加载器。
  JDK 8 普通 JVM 的默认层次是：`Bootstrap ClassLoader -> Extension ClassLoader -> Application ClassLoader`
  Tomcat 在其下扩展了自己的类加载器：
  ```
  Bootstrap -> Extension(JDK 8) -> System -> Common
                                      ├-> Catalina
                                      ├-> Shared
                                      └-> WebappClassLoader（每个 Web 应用独立）
  ```
  WebappClassLoader 默认是“先自己加载，再委派父加载器”，也就是打破了传统双亲委派。这样不同 Web 应用可以使用同一个类库的不同版本，例如两个应用分别使用不同版本的 Spring。
  但对 JDK 核心类、Servlet API 等容器规范类，仍然优先委派父加载器，避免应用自行覆盖。
  Tomcat 可以通过 delegate=true 将 Web 应用类加载器改回父优先模式。
- 为什么热部署容易导致类加载器泄漏？
  热部署时，Tomcat 会创建新的 WebappClassLoader 加载新应用，并销毁旧的 WebappClassLoader。旧类加载器只有在没有任何外部引用时才能被 GC 回收。
  容易泄漏的原因是：应用之外的长期存活对象仍然引用了旧应用加载的类、对象或线程上下文类加载器，导致旧 WebappClassLoader 及其加载的全部 Class 无法释放。

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [类加载机制](/java-core/class-loading)

### Spring Boot 内嵌 Tomcat 和外部 Tomcat 有什么区别？

内嵌 Tomcat 是 Spring Boot 应用启动时在进程内创建的容器，应用通常打成 jar 直接运行；
外部 Tomcat 是独立安装的容器，传统项目通常打成 war 包部署进去。内嵌 Tomcat 更适合微服务和容器化，外部 Tomcat 更常见于传统 JavaWeb 项目。

#### 常见追问

- Spring Boot jar 和 war 部署有什么区别？
  Spring Boot 的 jar 部署通常使用内嵌 Tomcat，通过 java -jar 直接启动；war 部署是将应用包放到外部 Tomcat 等 Servlet 容器中运行。
  主要区别：
  jar：应用自带 Web 容器，启动入口是 main 方法，部署简单，环境一致性更好，适合微服务和容器化部署。
  war：依赖外部 Web 容器，容器负责应用加载、启动和停止，适合传统统一运维的 Tomcat 环境。
- 内嵌 Tomcat 如何配置端口和线程池？
  内嵌 Tomcat 的端口通常在 `application.yml` 中配置：
    ```yaml
    server:
        port: 8081
    ```
    也可以配置绑定地址和连接相关参数：
    ```yaml
    server:
        address: 0.0.0.0
        port: 8081
        tomcat:
            threads:
                max: 200
                min-spare: 10
            accept-count: 100
            max-connections: 8192
            connection-timeout: 20s
    ```
    以上是 Spring Boot 2.3-2.7 和 Spring Boot 3.x 的配置方式。以 Spring Boot 2.7、JDK 8 为例：
    - `threads.max`：Tomcat 工作线程最大数，默认通常是 `200`。
    - `threads.min-spare`：核心空闲线程数，默认通常是 `10`。
    - `accept-count`：Connector 达到 `max-connections` 后，操作系统监听队列可等待的 TCP 连接数，默认通常是 `100`；队列满后新连接可能被拒绝或超时。
    - `max-connections`：Tomcat 最大并发连接数，默认通常是 `8192`。
    - `connection-timeout`：建立连接后等待请求数据的超时时间。
    线程数不能只按 CPU 核数直接设置。若接口主要等待数据库、RPC、Redis 等 I/O，可以适当增加；若是 CPU 密集型任务，应接近 CPU 核数并通过压测确定。
    Spring Boot 2.2 及以前使用旧属性名：
    ```yaml
    server:
        tomcat:
            max-threads: 200
            min-spare-threads: 10
    ```
    `accept-count`、`max-connections` 等连接属性的配置方式不变。
- 为什么微服务更常用内嵌容器？
  微服务更常用内嵌容器，核心是让服务以独立、完整的进程交付。
    - 应用和 Tomcat 一起打成可执行 Jar，部署时只需要 `java -jar`，不依赖服务器预装和维护外部 Tomcat。
    - 每个服务独占端口、线程池、连接数等容器配置，服务之间互不影响，隔离性更好。
    - 配置随应用版本一起管理，开发、测试、生产环境的一致性更高，减少“同一个 War 在不同 Tomcat 表现不同”的问题。
    - 更适合 Docker、Kubernetes：一个容器通常运行一个服务进程，镜像构建、扩缩容、健康检查和滚动发布都更直接。
    - 发布时直接替换整个应用实例，回滚也是回滚对应镜像或 Jar，流程更简单。
    - 外部 Tomcat 更适合传统单体或多个 War 共用容器的场景，但会带来版本、配置和资源隔离问题。

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [Spring Boot 面试题](/interview/spring-boot)

### WebLogic 是什么？

WebLogic 是 Oracle 提供的企业级应用服务器，具体支持的 Java EE 或 Jakarta EE 规范取决于产品版本。它不只是 Servlet 容器，还提供数据源、JNDI、JMS、JTA 事务、集群、管理控制台和安全域等完整企业级能力。
需要注意，Jakarta EE 8 仍使用 `javax.*` 包名；只有 Jakarta EE 9+ 才迁移到 `jakarta.*`，不能仅凭“使用 WebLogic”判断应用的 API 包名。

#### 常见追问

- WebLogic 为什么叫企业级应用服务器？
  WebLogic 被称为企业级应用服务器，是因为它不只是提供 Web 容器能力，还提供了企业应用所需的一整套中间件服务。
  - 依据所支持的 Java EE 或 Jakarta EE 规范版本，提供 Servlet、JSP、EJB、JPA、JTA、JMS、JCA 等企业级组件。
  - 提供分布式事务管理，能够协调数据库、消息队列等多个资源的一致性。
  - 支持集群、负载均衡和故障转移，单个节点故障后请求可以转发到其他节点，提升高可用能力。
  - 提供 JMS 消息服务，适合异步解耦、削峰和可靠消息投递。
  - 支持连接池、线程池等资源管理，统一控制数据库连接和并发资源的使用。
  - 提供完善的安全能力，包括认证、授权、SSL、LDAP 集成等。
  - 提供集中化运维管理，例如控制台、监控、日志、部署、节点管理和配置管理。
  - Oracle 对其提供商业支持，常用于银行、电信、政企等对稳定性、事务和高可用要求较高的场景。
  Tomcat 更偏轻量级 Web 容器，主要运行 Servlet/JSP；WebLogic 则是完整的企业级应用服务器。
- WebLogic 常见于哪些项目？
  WebLogic 常见于对稳定性、分布式事务和高可用要求较高的传统企业项目，例如：
  - 银行、保险、证券等金融核心或周边系统，如账户、支付、清算、信贷、理赔。
  - 电信运营商的计费、CRM、订单、业务支撑系统。
  - 政府和大型国企的信息化平台，如审批、社保、税务、采购、档案系统。
  - 大型 ERP、供应链、订单管理和客户管理系统。
  - 需要 EJB、JMS、JTA 分布式事务的 Java EE 项目。
  - 使用 Oracle 数据库、中间件产品体系较多的企业，通常会采用 WebLogic 作为应用服务器。
  现在新建的互联网微服务项目更常用 Spring Boot 内嵌 Tomcat、Docker 和 Kubernetes；WebLogic 更多存在于存量大型企业系统中。

#### 关联文档

- [WebLogic](/deploy/weblogic)

### Tomcat 和 WebLogic 有什么区别？

Tomcat 偏轻量级 Servlet / JSP 容器，主要负责运行 Web 应用；WebLogic 是完整企业级应用服务器，除了 Web 容器能力，还提供数据源、JNDI、JMS、JTA 事务、集群和管理控制台等能力。新 Spring Boot 微服务通常优先使用内嵌 Tomcat，传统大型 Java EE 项目可能使用 WebLogic。

#### 常见追问

- 为什么 WebLogic 运维复杂度更高？
  主要是 WebLogic 引入了完整应用服务器和域管理体系，管理对象更多，所以运维复杂度更高：
  - WebLogic 需要维护 Domain、AdminServer、Managed Server、Node Manager、Cluster 等组件；Spring Boot 通常一个 Jar 就是一个独立进程。
  - 配置项较多，例如数据源、JMS、JTA 分布式事务、线程池、Work Manager、安全域、证书、会话复制和集群参数，很多配置还需要通过管理控制台或 WLST 统一维护。
  - 集群部署需要处理受管服务器启停、负载均衡、Session 复制、节点扩缩容和故障转移；配置不一致容易导致问题。
  - 应用通常以 War/Ear 包部署，要考虑部署、卸载、热更新、版本回滚以及应用与容器共享类库的兼容性，例如 ClassLoader 冲突。
  - WebLogic 自身有版本、补丁、JDK 兼容性和 Oracle 安全补丁的维护要求，升级时还要评估对现有应用和域配置的影响。
  - 排障范围更大，既要看应用日志，也要看 AdminServer、Managed Server、Node Manager、JDBC、JMS、集群通信等日志和运行状态。
  - Spring Boot 也需要处理配置、监控、发布和扩容，但其常见模式是“一服务一进程/一容器”，配合 Docker、Kubernetes 后，部署和故障隔离通常更直接。
- 什么场景还会使用 WebLogic？
  目前主要是以下场景仍会使用 WebLogic：
  - 存量系统：很多银行、保险、运营商、政府和大型企业早期基于 Java EE 开发了大量 War/Ear 应用，使用了 EJB、JMS、JTA、JNDI 等能力，迁移成本和风险很高。
  - 强依赖 Java EE 企业能力：例如需要容器托管事务、分布式事务、可靠消息、统一安全认证、连接池、集群 Session 复制等，且这些能力已经深度绑定在 WebLogic 配置和代码中。
  - Oracle 技术栈集成：系统与 Oracle Database、Oracle RAC、SOA Suite、OSB、Oracle Identity Management 等产品集成较深时，通常会继续采用 WebLogic。
  - 对厂商支持要求高：金融、政企等场景往往需要商业化 SLA、补丁支持、合规审计和明确的厂商责任边界，WebLogic 能满足这类要求。
  - 统一中间件平台：企业已经有成熟的 WebLogic 域、集群、监控、发布流程和专业运维团队，新系统为了复用现有基础设施，也可能继续部署到 WebLogic。
  - 单体或少量大型核心应用：如果不是频繁独立扩缩容的微服务，而是稳定的大型企业应用，WebLogic 的集中托管模式仍然适用。
  如果是新建 Spring Cloud 微服务项目，会优先选择 Spring Boot 可执行 Jar、Docker 和 Kubernetes；WebLogic 更多是存量系统延续和特定企业级集成场景的选择。
- 从 WebLogic 迁移到 Spring Boot 要注意什么？
  重点关注以下几类问题：
  - 先做依赖盘点：确认应用是否依赖 EJB、JMS、JTA、JNDI、WebService、容器安全、Session 复制、WebLogic 专有 API，以及是否存在共享库和自定义 ClassLoader 配置。
  - JDK 8 下通常选择 Spring Boot 2.x。旧版或运行 Jakarta EE 8 的 WebLogic 应用通常使用 `javax.*`；Spring Boot 3 基于 Jakarta EE 9+，包名变为 `jakarta.*`，并且要求 JDK 17，不能直接作为 JDK 8 的迁移目标。
  - EJB 迁移：无状态 Session Bean 一般改为 Spring `@Service`；EJB 的注入、定时任务、异步调用、事务传播等，需要分别映射到 Spring 的依赖注入、`@Scheduled`、`@Async`、`@Transactional`。
  - 数据源迁移：原来通过 WebLogic Console/JNDI 配置的数据源，要改为 Spring Boot 的 `application.yml` 或配置中心配置，并明确连接池参数、超时、校验 SQL、数据库连接数等。常用连接池是 HikariCP。
  - 事务迁移：需要区分本地事务和分布式事务。本地数据库事务可使用 Spring `@Transactional`；如果原系统依赖 WebLogic JTA 协调多个数据源或 JMS，则要评估 Seata、Atomikos、Narayana，或者优先通过最终一致性、消息补偿等方式降低 XA 事务依赖。
  - JMS 迁移：确认原来使用的是 WebLogic JMS 还是标准 JMS API。若迁移到 Kafka、RabbitMQ，需要重新评估消息顺序、重复消费、幂等、事务消息、重试和死信队列，不能只替换客户端依赖。
  - 安全迁移：WebLogic 的 Security Realm、LDAP 集成、角色授权、单点登录和证书配置，通常要迁移到 Spring Security、OAuth2/OIDC 或企业统一认证平台。
  - 部署方式变化：从 War/Ear 部署到 WebLogic，通常转为 Spring Boot 可执行 Jar 独立运行。需要补齐外部化配置、健康检查、优雅停机、日志标准化、监控指标、链路追踪和告警。
  - 集群与会话：原来依赖 WebLogic Session Replication 的应用，需要尽量改为无状态服务；确实需要共享会话时，可使用 Redis Spring Session，并验证登录态失效和扩容场景。
  - 类加载和依赖冲突：WebLogic 中常见 `prefer-application-packages`、共享 Jar、容器自带库冲突。迁移后要清理重复依赖，统一由 Maven 或 Gradle 管理，重点验证 XML、JAXB、JAX-WS、Hibernate 等版本兼容性。
  - 发布与回滚：建议按模块或接口渐进迁移，通过灰度、双写或流量切换验证，而不是一次性整体替换；核心要验证事务一致性、性能、故障恢复和回滚方案。

#### 关联文档

- [Tomcat](/deploy/tomcat)
- [WebLogic](/deploy/weblogic)

### 传统项目为什么会使用 WebLogic？

传统企业项目使用 WebLogic，通常是因为需要完整 Java EE 能力、厂商支持、集中式管理控制台、企业级数据源、JMS、JTA 事务和集群高可用。银行、保险、政企等老系统中，WebLogic 比较常见。

#### 常见追问

- 新项目为什么不一定选 WebLogic？
  新项目不一定选 WebLogic，核心原因是它解决的问题和现在主流架构不完全匹配：
  - 新项目大多采用 Spring Boot、微服务和容器化部署，一个服务打成可执行 Jar 或镜像即可运行，不依赖完整 Java EE 应用服务器。
  - WebLogic 比较重，需要维护 Domain、AdminServer、Managed Server、集群和相关配置；对于独立服务来说，部署、扩缩容和故障隔离成本更高。
  - Spring Boot 已经覆盖常用能力，例如依赖注入、MVC、事务、连接池、定时任务、消息集成、监控和安全；很多场景不需要 EJB、容器级 JTA 等 WebLogic 能力。
  - 微服务强调独立发布、弹性扩缩容和快速迭代。WebLogic 更偏向集中式应用服务器和 War/Ear 托管模式，和 Kubernetes 的声明式部署模式相比，通常不够轻量。
  - WebLogic 是商业产品，存在许可、支持和补丁维护成本；Spring Boot 生态开源，技术选型和人才储备更广。
  - WebLogic 的配置和运行机制相对复杂，排障还要覆盖应用、服务器实例、域配置、Node Manager 等多个层面；Spring Boot 单服务的边界更清晰。
  - 不过，如果新项目必须接入既有 WebLogic 平台，强依赖 Oracle SOA、WebLogic JMS、统一 JTA 或厂商 SLA，选择 WebLogic 仍然是合理的。
- WebLogic 迁移到 Kubernetes 有哪些难点？
  主要难点不在于把 WebLogic 镜像化，而在于把原来依赖应用服务器的运行能力拆解出来：
  - Domain 配置管理：WebLogic 的 Domain、AdminServer、Managed Server、JDBC、JMS、Security Realm 等配置原本通常在文件系统和控制台维护。迁移到 Kubernetes 后，需要把配置模板化、版本化，并区分 ConfigMap、Secret 和持久化数据。
  - 状态管理：WebLogic 常依赖本地文件、部署目录、Session 复制、EJB Timer、JMS Store 等状态。Kubernetes Pod 是可随时重建的，应用需要尽量无状态；Session 可迁到 Redis，文件迁对象存储或 PVC，JMS 持久化需要独立规划。
  - 集群和服务发现：WebLogic Cluster 的成员发现、负载均衡、Session Sticky、复制组播或单播机制，与 Kubernetes Service、Ingress 的机制不同，需要重新设计集群通信和流量入口。
  - AdminServer 高可用：传统 WebLogic 的 AdminServer 是管理中心，迁移后要考虑它的 Domain 配置持久化、故障恢复、Operator 管理方式，以及管理面和业务面隔离。
  - 部署模型差异：原来是把 War/Ear 部署到 Managed Server；在 Kubernetes 中需要构建镜像、处理启动参数、环境变量、挂载配置、滚动发布、探针、资源限制和优雅终止。
  - 启动和扩缩容：WebLogic 启动时间通常较长，不适合按瞬时流量快速扩容。需要合理设置 readiness/liveness/startup probe、预热策略、HPA 指标和最小副本数。
  - 会话与长连接：如果依赖 WebLogic HTTP Session Replication、WebSocket、长事务或长连接，需要处理 Pod 重建、负载均衡粘性、连接迁移和优雅下线。
  - JMS 与事务：WebLogic JMS、Store-and-Forward、XA/JTA 事务和 MDB 可能与 WebLogic 强绑定。迁移时要评估继续使用 WebLogic JMS、改造到 Kafka/RabbitMQ，或通过本地事务加幂等、Outbox、补偿机制替代分布式 XA。
  - 网络与安全：需要重新处理 Ingress、TLS 证书、内外网隔离、NetworkPolicy、服务账号、数据库和消息中间件凭证管理；不能把原服务器 IP、端口和防火墙规则直接照搬。
  - 运维监控：原来依赖 WebLogic Console、日志和 JMX 监控的能力，需要接入 Kubernetes 日志、Prometheus 指标、Grafana、链路追踪和告警，并建立应用与 Pod 两个层面的排障机制。
  - 授权与成本：WebLogic 的许可通常和处理器核数、部署规模有关，容器弹性扩容后要重新评估许可证合规和成本。
  - 实施策略上，优先把应用改造成无状态、外部化配置和可观测，再做容器化；对于强依赖 WebLogic 专有能力的核心系统，通常采用分阶段迁移，而不是直接整体搬迁。
- JNDI 数据源迁移到 Spring Boot 怎么处理？
  先判断迁移后是否还保留外部应用服务器：
  - 如果 Spring Boot 仍部署在 WebLogic 或 Tomcat 等容器中，并且希望继续使用容器统一管理的数据源，可以保留 JNDI。Spring Boot 配置 `spring.datasource.jndi-name=java:comp/env/jdbc/xxx`，应用侧通过 `DataSource` 注入即可，不再自己配置 URL、账号和连接池参数。
  - 如果迁移为 Spring Boot 可执行 Jar 或容器化部署，通常不能继续依赖 WebLogic JNDI，需要将原数据源配置迁移到 `application.yml`、环境变量或配置中心，由 Spring Boot 创建 `DataSource`。例如配置 JDBC URL、用户名、密码、驱动和 HikariCP 的最大连接数、超时、连接校验等。
  - 原 WebLogic 数据源里的关键参数不能遗漏：数据库 URL、驱动版本、连接池初始/最小/最大连接数、连接超时、空闲回收、测试 SQL、连接泄漏检测、事务模式和数据库网络超时。
  - 密码不能继续明文放在配置文件，生产环境一般通过 Kubernetes Secret、Vault 或配置中心加密能力管理。
  - 如果原来有多个 JNDI 数据源，需要在 Spring Boot 中定义多个 `DataSource`、对应的 `JdbcTemplate` 或 `EntityManagerFactory`，并用 `@Primary`、`@Qualifier` 明确注入关系。
  - 事务要单独确认：单数据源场景使用 Spring 的 `@Transactional` 即可；如果原来通过 WebLogic JTA 管理多数据源或 JMS 的 XA 事务，不能简单替换为普通数据源，需要保留 JTA/XA 能力，或者改造成最终一致性方案。
  - 对于 JPA/Hibernate，还要检查方言、DDL 策略、默认 schema、连接释放策略和事务边界，避免迁移后出现连接数暴涨或自动建表问题。
  - JDK 8 下通常使用 Spring Boot 2.x，保留 JNDI 时常见命名空间是 `java:comp/env`；如果后续升级 Spring Boot 3，Servlet、JPA 等 Jakarta EE API 会从 `javax.*` 改为 `jakarta.*`，但 Java SE 的 `javax.naming` 和 `java:comp/env` 等 JNDI 名称保持不变。

#### 关联文档

- [WebLogic](/deploy/weblogic)
