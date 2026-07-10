---
title: '技术栈总览'
description: 'Java 后端技术栈总览文档，梳理企业后端架构、技术选型、学习路线和不同项目规模下的演进建议。'
---

# 技术栈总览

企业 Java 开发 Spring Cloud 微服务项目，完整技术栈一般不是一个框架能解决的，而是一整套组件组合。

但要注意：**不是所有项目都必须全部使用**。应该根据项目规模、业务复杂度、团队能力逐步选择。

## Java 版本基线

本文档采用两条并行基线：Java 基础原理和存量项目维护以 JDK 8 为主，便于理解经典 JVM、并发和语言机制；现代 Spring Boot 3.x 新项目以 Java 17 为最低要求，并在完整技术栈兼容时从 Java 17 / 21 中选择，优先评估 Java 21 LTS。JDK 8 基线不等于新项目选型建议。

## 核心组合速查

| 组件 | 类别 | 主要作用 |
| --- | --- | --- |
| Spring Boot | 基础框架 | 单个微服务的基础开发框架，负责应用启动、自动配置和业务接口开发。 |
| Spring Cloud | 微服务治理 | 负责服务发现、服务调用、网关、负载均衡等微服务能力。 |
| Spring Cloud Alibaba | 微服务扩展 | 国内常用的 Spring Cloud 扩展，整合 Nacos、Sentinel、RocketMQ、Seata 等组件。 |
| Nacos | 注册配置 | 注册中心和配置中心，负责服务注册发现以及统一配置管理。 |
| Gateway | 网关 | 微服务统一入口，负责路由转发、鉴权、限流、跨域和灰度流量控制。 |
| OpenFeign | 服务调用 | 声明式 HTTP 客户端，用接口方式完成微服务之间的远程调用。 |
| Sentinel / Resilience4j | 稳定性治理 | 负责限流、熔断、降级、超时和重试控制。 |
| MySQL | 数据库 | 关系型数据库，负责保存核心业务数据和事务数据。 |
| Redis | 缓存 | 内存缓存数据库，负责缓存、分布式锁、验证码、Token 和热点数据加速。 |
| Elasticsearch | 搜索分析 | 分布式搜索和分析引擎，负责全文搜索、复杂检索、聚合分析和日志检索。 |
| RocketMQ / Kafka / Pulsar | 消息队列 | 负责异步解耦、削峰填谷、事件驱动和最终一致性；RabbitMQ 仅作为选型参考和面试考点。 |
| Seata | 分布式事务 | 处理跨服务、跨数据库的事务一致性问题。 |
| Spring Security / OAuth2 / JWT | 认证授权 | 负责登录认证、接口鉴权、Token 校验和权限控制。 |
| XXL-Job | 任务调度 | 分布式任务调度平台，负责任务定时执行、分片执行和任务管理。 |
| MinIO / OSS | 文件存储 | 对象存储服务，负责图片、附件、合同、Excel、PDF 等文件存储。 |
| Prometheus | 指标监控 | 指标采集和监控系统，负责采集服务、接口、JVM、容器等运行指标。 |
| Grafana | 监控看板 | 监控可视化平台，负责展示 Prometheus 等数据源的监控看板。 |
| SkyWalking / OpenTelemetry | 链路追踪 | 负责追踪微服务调用链和定位性能问题。 |
| ELK / Loki | 日志平台 | 日志采集、存储和检索系统，负责集中查看应用日志和异常日志。 |
| Docker | 容器化 | 把应用和运行环境打包成标准镜像，方便部署和迁移。 |
| Kubernetes | 容器编排 | 负责服务部署、扩缩容、滚动发布和故障恢复。 |
| Jenkins / GitLab CI | CI/CD | 持续集成和持续部署工具，负责编译、测试、构建镜像和自动发布。 |

## 怎么读这个文档库

本文档库按技术分层组织，每一层对应一个栏目：

- [整体架构](./architecture)：一个典型企业 Spring Cloud 项目长什么样。
- [按规模选型](./selection)：小型、中型、大型项目分别该用哪些组件。
- [学习路线](./roadmap)：从零开始学习企业 Java 的推荐顺序，以及重点记忆版。
- [友情链接](./links)：Java 后端学习、官方文档和常用技术社区入口。

各组件的详细说明分布在以下栏目。其中**语言基础**部分（Java 基础、Spring 核心、工程实践）不在原始技术栈清单中，是为构成"全技术"知识库而补充的底层内容：

- [Java 基础](/java-core/)：语言核心、JVM 原理与调优、并发编程。
- [Spring 核心](/spring-core/)：IoC/DI、AOP、事务原理。
- [核心框架](/framework/)：Spring Boot、Spring Cloud、Nacos、Gateway、OpenFeign、Sentinel。
- [数据存储](/storage/)：MySQL、MyBatis-Plus、Redis、Elasticsearch、分库分表、分布式 ID、数据同步。
- [消息与事务](/messaging/)：RocketMQ、Kafka、Apache Pulsar、Seata；RabbitMQ 不设独立技术页，仅作为选型参考和面试考点。
- [安全与认证](/security/)：Spring Security、OAuth2、JWT、Sa-Token、密钥管理。
- [工程实践](/practice/)：Maven 构建、设计模式、SQL 优化、API 设计规范。
- [工程能力](/engineering/)：文件存储、定时任务、接口文档、测试、代码质量、开发辅助。
- [可观测性](/observability/)：Prometheus、Grafana、SkyWalking、日志平台。
- [部署运维](/deploy/)：Docker、Kubernetes、CI/CD、服务网格、数据分析、AI 能力。

## 最终建议

不要为了"完整"而一次性引入所有组件。实际项目推荐原则：

```
先满足业务
再解决性能
再解决稳定性
再解决可观测性
再解决自动化交付
最后再考虑高级治理
```
