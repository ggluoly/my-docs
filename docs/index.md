---
title: 'Java 后端技术文档库'
description: 'Java 后端开发技术文档与面试库，覆盖 Java、Spring、Spring Cloud、MySQL、Redis、消息队列、部署运维和系统设计。'
layout: home

hero:
  name: Java 后端技术文档库
  text: 企业级 Spring Cloud 技术栈全景
  tagline: 从核心框架到部署运维，按分层梳理企业 Java 微服务的完整技术选型
  actions:
    - theme: brand
      text: 开始阅读
      link: /overview/
    - theme: alt
      text: 技术栈总览
      link: /overview/architecture
    - theme: alt
      text: GitHub
      link: https://github.com/ggluoly/my-docs

features:
  - title: Java 基础
    details: 语言核心、JVM 内存与 GC 调优、并发编程，后端开发绕不开的底层功底。
    link: /java-core/
  - title: Spring 核心
    details: IoC/DI、AOP、Bean 生命周期与事务原理，理解 Spring 的运行机制而非只会用。
    link: /spring-core/
  - title: 核心框架
    details: Spring Boot、Spring Cloud、Nacos、Gateway、OpenFeign、Sentinel，微服务治理的基础骨架。
    link: /framework/
  - title: 数据存储
    details: MySQL、MyBatis-Plus、Redis、Elasticsearch、分库分表、分布式 ID 与数据同步。
    link: /storage/
  - title: 消息与事务
    details: RocketMQ、Kafka、RabbitMQ 异步解耦，Seata 与最终一致性方案。
    link: /messaging/
  - title: 安全与认证
    details: Spring Security、OAuth2、JWT、Sa-Token，以及密钥与配置安全。
    link: /security/
  - title: 工程实践
    details: Maven 多模块、设计模式、SQL 优化、API 设计规范，把代码写好写规范。
    link: /practice/
  - title: 工程能力
    details: 文件存储、定时任务、接口文档、测试、代码质量与开发辅助插件。
    link: /engineering/
  - title: 可观测性
    details: Actuator、Prometheus、Grafana、SkyWalking、OpenTelemetry 与日志平台。
    link: /observability/
  - title: 部署运维
    details: Docker、Kubernetes、Helm、CI/CD、服务网格、数据分析与 AI 能力。
    link: /deploy/
  - title: 按规模选型
    details: 小型单体、中型微服务、大型企业项目的技术组合与演进路线。
    link: /overview/selection
  - title: 面试题库
    details: 按 Java、JVM、并发、Spring、MySQL、Redis、微服务、场景题和系统设计整理高频问题。
    link: /interview/
---

## 推荐学习路径

```text
Java 基础 -> Spring 核心 -> Spring Boot -> MySQL / Redis -> Spring Cloud -> 工程化与部署
```

如果是从零搭建企业后端能力，建议先补齐语言、框架和数据库三块地基，再逐步引入缓存、消息、微服务治理和部署运维。不要一开始就追求组件完整，先把单个服务写对、跑稳、查得了问题。

面试复习可以按另一条路径推进：Java 高频题 -> Spring 原理题 -> MySQL / Redis 场景题 -> 微服务治理 -> 场景题 -> 系统设计。

## 技术分层地图

| 层级 | 重点 | 对应栏目 |
| --- | --- | --- |
| 语言与运行时 | Java 语法、集合、并发、JVM | [Java 基础](/java-core/) |
| 框架原理 | IoC、AOP、事务、Spring Boot | [Spring 核心](/spring-core/) / [核心框架](/framework/) |
| 数据与中间件 | MySQL、Redis、ES、MQ、Seata | [数据存储](/storage/) / [消息与事务](/messaging/) |
| 微服务治理 | 注册配置、网关、调用、限流熔断 | [核心框架](/framework/) |
| 工程化 | Maven、API 规范、测试、代码质量 | [工程实践](/practice/) / [工程能力](/engineering/) |
| 交付与稳定性 | 监控、日志、链路追踪、Docker、K8s | [可观测性](/observability/) / [部署运维](/deploy/) |
| 面试复习 | 高频题、场景题、系统设计 | [面试库](/interview/) |

## 按规模选型

小型项目优先保证业务交付，中型项目关注服务拆分和可观测性，大型项目再引入服务网格、复杂数据同步和高级治理。具体组合见 [按规模选型](/overview/selection)。
