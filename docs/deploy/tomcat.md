---
title: 'Tomcat'
description: 'Tomcat 技术文档，介绍 Servlet 容器、Catalina、Coyote、Jasper、连接器、类加载和 Java Web 应用部署实践。'
---

# Tomcat

## 是什么

Tomcat 是 Apache 开源的 Servlet / JSP 容器，也是最常见的 Java Web 应用运行环境之一。它实现了 Servlet、JSP、EL、WebSocket 等 Web 相关规范，可以运行 Spring MVC、传统 JavaWeb 和 Spring Boot Web 应用。

在现代 Spring Boot 项目中，Tomcat 经常以内嵌容器形式存在，应用打成 jar 后可以直接运行；在传统 JavaWeb 项目中，Tomcat 也常作为外部容器部署 war 包。

## 解决什么问题

Tomcat 主要解决这些问题：

```text
接收 HTTP 请求
解析请求和响应
管理 Servlet 生命周期
运行 JSP 页面
维护 Web 应用上下文
处理 Session
加载和隔离 Web 应用类
```

它让 Java Web 应用不需要自己实现底层网络协议、线程模型和 Servlet 生命周期管理。

## 核心组件

| 组件 | 说明 |
| --- | --- |
| `Catalina` | Tomcat 的 Servlet 容器核心，负责 Web 应用生命周期和请求处理链 |
| `Coyote` | 连接器组件，负责 HTTP / AJP 等协议接入和请求解析 |
| `Jasper` | JSP 引擎，负责把 JSP 翻译并编译成 Servlet |
| `Engine` | 整个 Servlet 引擎，通常对应一个 Catalina 实例 |
| `Host` | 虚拟主机，一个 Host 可以包含多个 Web 应用 |
| `Context` | 一个 Web 应用，对应一个 `ServletContext` |
| `Wrapper` | 一个具体 Servlet 的包装对象 |

常见层级可以理解为：

```text
Server
  -> Service
    -> Connector
    -> Engine
      -> Host
        -> Context
          -> Wrapper
```

## 请求处理流程

Tomcat 处理请求的大致流程：

```text
浏览器 / 客户端
  -> Connector 接收连接
  -> Coyote 解析 HTTP 请求
  -> Engine 选择虚拟主机
  -> Host 定位 Web 应用
  -> Context 定位应用上下文
  -> Wrapper 调用目标 Servlet
  -> Filter / Servlet / Listener 参与处理
  -> 返回 HTTP 响应
```

在 Spring MVC 项目中，最终通常会进入 `DispatcherServlet`，再由 Spring MVC 完成 HandlerMapping、Controller 调用和响应渲染。

## 类加载机制

Tomcat 有自己的类加载体系，目的是隔离不同 Web 应用，避免一个应用的依赖影响另一个应用。

常见层级包括：

```text
Bootstrap ClassLoader
  -> Platform / System ClassLoader
    -> Common ClassLoader
      -> WebApp ClassLoader
```

每个 Web 应用通常有独立的 `WebAppClassLoader`，加载自身 `WEB-INF/classes` 和 `WEB-INF/lib` 下的类和 jar。Tomcat 在 Web 应用类加载上会对双亲委派做调整，让应用优先加载自己的依赖，从而实现应用隔离和热部署。

## Spring Boot 内嵌 Tomcat

Spring Boot Web 项目默认常使用内嵌 Tomcat。应用启动时会在 JVM 内部创建 Tomcat 实例，然后注册 Spring MVC 的 `DispatcherServlet`。

内嵌 Tomcat 的特点：

- 打成 jar 即可运行，不需要单独安装 Tomcat。
- 应用和运行环境绑定，部署简单。
- 更适合容器化和云原生部署。
- 配置通过 Spring Boot 配置项统一管理。

常见配置示例：

```yaml
server:
  port: 8080
  servlet:
    context-path: /api
  tomcat:
    threads:
      max: 200
    max-connections: 8192
```

## 外部 Tomcat 部署

传统项目常将应用打成 war 包，部署到独立 Tomcat 的 `webapps` 目录或通过管理控制台发布。

外部 Tomcat 的特点：

- 多个应用可以共享一个 Tomcat 实例。
- 运维可以统一管理容器版本、连接器和线程池。
- 应用和容器解耦，但环境一致性更依赖运维规范。
- 在容器化和微服务场景下使用比例下降。

## 常见配置

常见配置关注点包括：

- 端口：HTTP、HTTPS、AJP 端口。
- 线程池：最大线程数、最小空闲线程数。
- 连接数：最大连接数、accept 队列。
- Session：超时时间、持久化、共享策略。
- 日志：访问日志、应用日志。
- 安全：关闭不必要端口、限制管理后台、隐藏版本信息。

## 选型建议

```text
现代 Spring Boot 服务：优先内嵌 Tomcat / Jetty / Undertow
传统 Spring MVC / JSP 项目：可使用外部 Tomcat
完整 Java EE 企业应用：评估 WebLogic 等应用服务器
云原生部署：优先 jar + 容器镜像 + Kubernetes
```

Tomcat 适合大多数 Java Web 服务，但如果项目依赖完整 Java EE 能力，例如 EJB、JTA、企业级 JMS、集中管理控制台和厂商支持，就需要评估 [WebLogic](./weblogic) 等应用服务器。

## 面试关注点

Tomcat 常见面试点包括：

- Tomcat 是什么，和 Web 服务器、应用服务器有什么区别。
- Catalina、Coyote、Jasper 分别负责什么。
- Tomcat 请求处理流程。
- Tomcat 类加载机制为什么要打破双亲委派。
- Spring Boot 内嵌 Tomcat 和外部 Tomcat 的区别。
- Tomcat 如何调优线程数、连接数和 Session。

相关面试题可参考 [JavaWeb 面试题](/interview/java-web)。
