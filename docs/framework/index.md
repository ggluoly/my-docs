---
title: '核心框架'
description: 'Spring Boot 与 Spring Cloud 微服务技术文档，覆盖注册配置、网关、服务调用、限流熔断和服务治理。'
---

# 核心框架

核心框架层是整个微服务体系的骨架，负责服务的启动、治理、注册发现、流量入口、远程调用和稳定性保障。

## 组件清单

| 组件 | 作用 | 说明 |
| --- | --- | --- |
| [Spring Boot](./spring-boot) | 基础开发框架 | 单个微服务的基础，负责应用启动、自动配置和接口开发，基本必用。 |
| [Spring Cloud](./spring-cloud) | 微服务治理 | 服务注册、远程调用、网关、熔断限流等微服务能力。 |
| [Nacos](./nacos) | 注册配置中心 | 服务注册与发现 + 统一配置管理，国内项目推荐。 |
| [Spring Cloud Gateway](./gateway) | 网关 | 微服务统一入口，负责路由、鉴权、限流、跨域、灰度。 |
| [OpenFeign](./openfeign) | 服务调用 | 声明式 HTTP 客户端，以接口方式完成服务间远程调用。 |
| [Sentinel](./sentinel) | 熔断限流 | 限流、熔断、降级、热点参数限流，国内项目常用。 |

## 层次关系

```
Spring Boot          每个微服务本质上都是一个 Spring Boot 应用
  + Spring Cloud     在 Boot 之上提供微服务治理能力
  + Spring Cloud Alibaba   国内常用扩展，整合 Nacos / Sentinel / RocketMQ / Seata
```

Spring Boot 是基础，Spring Cloud 提供治理能力，Spring Cloud Alibaba 是国内项目常用的一套微服务组件集成。
