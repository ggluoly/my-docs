---
title: 'Spring Cloud 面试题'
description: 'Spring Cloud 面试题整理，覆盖注册发现、服务调用、网关、熔断限流、历史组件和微服务治理。'
---

# Spring Cloud 面试题

## 微服务为什么需要注册中心？

### 标准回答

微服务实例数量和地址会动态变化，注册中心负责服务注册、发现和健康状态维护。调用方不需要写死服务地址，而是通过服务名获取可用实例。

### 关联文档

- [Spring Cloud](/framework/spring-cloud)
- [Nacos 注册配置](/framework/nacos)

## OpenFeign 的作用是什么？

### 标准回答

OpenFeign 是声明式 HTTP 客户端，用接口和注解描述远程调用，屏蔽手写 HTTP 请求的细节。它通常和负载均衡、熔断降级、超时配置一起使用。

### 关联文档

- [OpenFeign 服务调用](/framework/openfeign)

## Gateway 在微服务中做什么？

### 标准回答

Gateway 是微服务统一入口，负责路由转发、鉴权、限流、跨域、灰度和统一日志等能力。它把公共入口能力从业务服务中抽离出来。

### 关联文档

- [Gateway 网关](/framework/gateway)

## Sentinel 解决什么问题？

### 标准回答

Sentinel 负责流量控制、熔断降级、热点参数限流等稳定性治理能力，用来防止局部故障扩散，保护核心服务。

### 关联文档

- [Sentinel 熔断限流](/framework/sentinel)
