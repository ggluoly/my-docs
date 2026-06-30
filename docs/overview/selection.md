# 按项目规模选型

不是所有项目都必须用全部组件。应该根据项目规模、业务复杂度、团队能力逐步选择。

> 下面的选型都聚焦在「用哪些组件」。无论项目大小，[Java 基础](/java-core/)、[Spring 核心原理](/spring-core/) 和 [工程实践](/practice/) 都是通用前提，不随规模变化，因此不列入下表。

## 小型单体项目

| 类别 | 选型 |
| --- | --- |
| 基础框架 | `Spring Boot` |
| 数据库 | `MySQL` |
| ORM | `MyBatis-Plus` |
| 缓存 | `Redis` |
| 权限 | `Spring Security / Sa-Token` |
| 接口文档 | `Knife4j / Springdoc OpenAPI` |
| 文件存储 | `MinIO / OSS` |
| 定时任务 | `Spring Scheduler` |
| 部署 | `Docker` |

## 中型微服务项目

| 类别 | 选型 |
| --- | --- |
| 基础框架 | `Spring Boot + Spring Cloud` |
| 注册配置 | `Nacos` |
| 网关 | `Spring Cloud Gateway` |
| 服务调用 | `OpenFeign` |
| 熔断限流 | `Sentinel` |
| 数据库 | `MySQL` |
| ORM | `MyBatis-Plus` |
| 缓存 | `Redis + Redisson` |
| 搜索 | `Elasticsearch` |
| 消息队列 | `RocketMQ / Kafka` |
| 文件存储 | `MinIO / OSS` |
| 定时任务 | `XXL-Job` |
| 认证鉴权 | `Spring Security / JWT / Sa-Token` |
| 监控 | `Actuator + Prometheus + Grafana` |
| 链路追踪 | `SkyWalking / OpenTelemetry` |
| 日志 | `ELK / Loki` |
| 部署 | `Docker + Jenkins / GitLab CI` |

## 大型企业项目

| 类别 | 选型 |
| --- | --- |
| 基础架构 | `Spring Boot + Spring Cloud + Spring Cloud Alibaba` |
| 注册配置 | `Nacos 集群` |
| 网关 | `Gateway / APISIX / Kong` |
| 服务治理 | `Sentinel + OpenFeign + LoadBalancer` |
| 数据库 | `MySQL / PostgreSQL 集群` |
| 分库分表 | `ShardingSphere` |
| 缓存 | `Redis Cluster + Redisson` |
| 搜索 | `Elasticsearch 集群` |
| 消息 | `RocketMQ / Kafka 集群` |
| 分布式事务 | `Seata / 事务消息 / 最终一致性` |
| 文件 | `MinIO 集群 / OSS / S3` |
| 数据同步 | `Canal / Debezium / Flink CDC` |
| 认证中心 | `OAuth2 / Keycloak / Spring Authorization Server` |
| 密钥管理 | `Vault / KMS` |
| 任务调度 | `XXL-Job / PowerJob` |
| 可观测性 | `OpenTelemetry + Prometheus + Grafana + SkyWalking` |
| 日志 | `ELK / EFK / Loki` |
| 质量平台 | `SonarQube + JaCoCo + Checkstyle` |
| 测试 | `JUnit 5 + Testcontainers + WireMock` |
| 部署 | `Kubernetes + Helm + Argo CD` |
| 镜像仓库 | `Harbor` |
| 制品仓库 | `Nexus / Artifactory` |

## 最常见企业组合

一个比较标准、实用、不夸张的 Spring Cloud 企业技术栈：

```
Spring Boot 3.x
Spring Cloud 202x.x
Spring Cloud Alibaba
Nacos
Spring Cloud Gateway
OpenFeign
Spring Cloud LoadBalancer
Sentinel
MyBatis-Plus
MySQL
Redis
Redisson
Elasticsearch
RocketMQ
XXL-Job
MinIO
Spring Security / Sa-Token
JWT
Knife4j / Springdoc OpenAPI
Spring Boot Actuator
Micrometer
Prometheus
Grafana
SkyWalking / OpenTelemetry
ELK / Loki
Lombok
MapStruct
JUnit 5
Mockito
Testcontainers
SonarQube
JaCoCo
Docker
Jenkins / GitLab CI
Harbor
Kubernetes
```

## 最终建议

不要为了“完整”而一次性引入所有组件。实际项目推荐原则：

```
先满足业务
再解决性能
再解决稳定性
再解决可观测性
再解决自动化交付
最后再考虑高级治理
```

一个正常企业中型 Spring Cloud 项目的核心组合可以确定为：

```
Spring Boot + Spring Cloud + Nacos + Gateway + OpenFeign + Sentinel
+ MySQL + Redis + Elasticsearch + MQ + Security + XXL-Job + MinIO
+ Actuator + Prometheus + Grafana + SkyWalking + Docker
```

大型项目再逐步补充：

```
Seata / ShardingSphere / Canal / Debezium / Vault
OpenTelemetry / ELK / Loki / Kubernetes / Helm / Istio
SonarQube / Testcontainers / GitLab CI / Jenkins / Harbor
```
