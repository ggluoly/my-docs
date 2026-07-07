---
title: 'Spring Cloud 面试题'
description: 'Spring Cloud 面试题整理，覆盖注册发现、服务调用、网关、熔断限流、历史组件和微服务治理。'
---

# Spring Cloud 面试题

## Spring Boot 和 Spring Cloud 有什么区别？

Spring Boot 解决单个应用如何快速开发和启动的问题，提供自动配置、Starter 和运行时约定；Spring Cloud 解决多个服务之间如何治理的问题，包括注册发现、服务调用、网关、配置、熔断限流和链路治理。简单说，Boot 是应用基础，Cloud 是微服务治理能力。

### 关联文档

- [Spring Boot](/framework/spring-boot)
- [Spring Cloud](/framework/spring-cloud)

## Spring Cloud 是什么？有哪些常见组件？

Spring Cloud 是基于 Spring Boot 的微服务治理体系，提供服务注册发现、配置管理、服务调用、网关、熔断限流等能力。现代项目常见组合是 Nacos、OpenFeign、Gateway、Sentinel；早期项目中也会见到 Eureka、Ribbon、Hystrix、Zuul 和 Spring Cloud Config。

### 关联文档

- [Spring Cloud](/framework/spring-cloud)
- [Nacos 注册配置](/framework/nacos)
- [OpenFeign 服务调用](/framework/openfeign)
- [Gateway 网关](/framework/gateway)
- [Sentinel 熔断限流](/framework/sentinel)

## 微服务为什么需要注册中心？

微服务实例数量和地址会动态变化，注册中心负责服务注册、发现和健康状态维护。调用方不需要写死服务地址，而是通过服务名获取可用实例。

### 关联文档

- [Spring Cloud](/framework/spring-cloud)
- [Nacos 注册配置](/framework/nacos)

## OpenFeign 的作用是什么？

OpenFeign 是声明式 HTTP 客户端，用接口和注解描述远程调用，屏蔽手写 HTTP 请求的细节。它通常和负载均衡、熔断降级、超时配置一起使用。

### 关联文档

- [OpenFeign 服务调用](/framework/openfeign)

## Ribbon 的作用是什么？有哪些负载均衡策略？

Ribbon 是早期 Spring Cloud 常见的客户端负载均衡组件，调用方在本地拿到服务实例列表后，根据轮询、随机、权重或响应时间等策略选择一个实例发起请求。新版本 Spring Cloud 更推荐使用 Spring Cloud LoadBalancer，Ribbon 更多作为传统项目面试点出现。

### 关联文档

- [OpenFeign 服务调用](/framework/openfeign)

## Gateway 在微服务中做什么？

Gateway 是微服务统一入口，负责路由转发、鉴权、限流、跨域、灰度和统一日志等能力。它把公共入口能力从业务服务中抽离出来。

### 关联文档

- [Gateway 网关](/framework/gateway)

## Zuul 和 Spring Cloud Gateway 有什么区别？

Zuul 是早期 Spring Cloud 常见网关组件，传统 Zuul 1 基于 Servlet 阻塞模型；Spring Cloud Gateway 基于 WebFlux 和 Reactor，天然支持异步非阻塞、路由断言、过滤器链和更现代的网关扩展方式。当前项目选型优先使用 Gateway，Zuul 主要作为历史组件了解。

### 关联文档

- [Gateway 网关](/framework/gateway)

## Sentinel 解决什么问题？

Sentinel 负责流量控制、熔断降级、热点参数限流等稳定性治理能力，用来防止局部故障扩散，保护核心服务。

### 关联文档

- [Sentinel 熔断限流](/framework/sentinel)

## Hystrix 和 Sentinel 有什么区别？

Hystrix 是 Netflix 早期熔断降级组件，主要提供线程隔离、熔断和降级能力，但已进入维护状态；Sentinel 更强调流量控制、熔断降级、热点参数限流和实时规则管理，国内 Spring Cloud Alibaba 项目更常见。新项目通常优先选择 Sentinel 或 Resilience4j。

### 关联文档

- [Sentinel 熔断限流](/framework/sentinel)

## Spring Cloud Config 和 Nacos 配置中心有什么区别？

Spring Cloud Config 是 Spring 官方配置中心方案，常配合 Git 仓库管理配置；Nacos 同时提供注册中心和配置中心能力，支持命名空间、分组、动态刷新和控制台管理。国内 Spring Cloud Alibaba 项目通常更常用 Nacos。

### 关联文档

- [Nacos 注册配置](/framework/nacos)

## 如何实现微服务监控和日志管理？

微服务监控通常包括指标监控、日志聚合和链路追踪三部分。指标可以用 Prometheus 采集并用 Grafana 展示；日志可以集中到 ELK、Loki 等平台；链路追踪可以使用 SkyWalking 或 OpenTelemetry。排查问题时要把请求链路、接口耗时、错误日志和实例指标关联起来。

### 关联文档

- [可观测性](/observability/)

## 如何实现微服务部署和扩展？

微服务部署通常结合容器镜像、配置管理、服务发现和 CI/CD 流程。扩展时优先保证服务无状态，通过 Kubernetes 或其他编排平台做副本伸缩、滚动发布和健康检查；有状态组件如数据库、消息队列和缓存需要单独设计高可用和容量规划。

### 关联文档

- [Docker 容器化](/deploy/docker)
- [Kubernetes 编排](/deploy/kubernetes)
- [CI/CD](/deploy/cicd)

## 分布式事务有哪些常见方案？

常见方案包括本地消息表、可靠消息最终一致性、TCC、Saga、最大努力通知和 Seata AT 模式。强一致性成本高，微服务系统通常优先通过业务拆分、幂等、补偿和最终一致性降低分布式事务复杂度。

### 关联文档

- [Seata 分布式事务](/messaging/seata)

## 微服务常见设计模式有哪些？

常见模式包括 API Gateway、服务注册发现、配置中心、熔断降级、限流、链路追踪、服务隔离、CQRS、Saga 和事件驱动。面试回答时要结合业务场景说明解决的问题，而不是只背模式名称。

### 关联文档

- [整体架构](/overview/architecture)
