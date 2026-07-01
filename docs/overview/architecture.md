---
title: '整体架构'
description: 'Java 后端整体架构文档，梳理企业微服务分层、核心组件关系、数据链路和系统治理设计。'
---

# 整体架构

一个典型企业 Spring Cloud 项目可以这样理解：

```
前端 / App / 第三方系统
        |
        v
Spring Cloud Gateway
        |
        v
认证鉴权 / 限流 / 路由 / 日志
        |
        v
业务微服务集群
        |
        |-- user-service
        |-- order-service
        |-- product-service
        |-- payment-service
        |-- search-service
        |-- file-service
        |-- job-service
        |
        v
基础设施层
        |
        |-- Nacos
        |-- MySQL
        |-- Redis
        |-- Elasticsearch
        |-- RocketMQ / Kafka
        |-- MinIO / OSS
        |-- Seata
        |-- Prometheus / Grafana
        |-- SkyWalking / ELK
```

## 分层理解

- **入口层**：所有外部请求先经过 [Spring Cloud Gateway](/framework/gateway)，由它统一完成路由转发、鉴权、限流、跨域和日志。
- **业务层**：按业务域拆分的微服务集群，每个服务本质上都是一个独立的 Spring Boot 应用，服务之间通过 [OpenFeign](/framework/openfeign) 互相调用。
- **基础设施层**：注册配置中心（Nacos）、数据库、缓存、搜索、消息队列、文件存储、分布式事务、监控与日志等共享组件。

## 典型调用链

```
前端
  -> Gateway
  -> user-service
  -> order-service
```

服务在启动时注册到 Nacos，Gateway 从 Nacos 发现服务并完成路由，业务服务之间通过 OpenFeign + LoadBalancer 完成声明式远程调用，调用链路由 SkyWalking / OpenTelemetry 追踪。
