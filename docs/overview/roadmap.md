# 学习路线与重点记忆

## 最小学习路线

学习企业 Java Spring Cloud，不建议一开始学全部。推荐顺序：

1. [Java 基础](/java-core/)（语言核心 → 并发 → JVM）
2. [Spring Boot](/framework/spring-boot) 与 [Spring 核心原理](/spring-core/)（IoC / AOP / 事务）
3. [MyBatis-Plus + MySQL](/storage/mysql) 与 [SQL 优化](/practice/sql-optimization)
4. [Redis](/storage/redis)
5. [Spring Security / JWT](/security/spring-security)
6. [Spring Cloud 基础](/framework/spring-cloud)
7. [Nacos 注册中心和配置中心](/framework/nacos)
8. [OpenFeign 服务调用](/framework/openfeign)
9. [Spring Cloud Gateway](/framework/gateway)
10. [Sentinel 熔断限流](/framework/sentinel)
11. [Elasticsearch](/storage/elasticsearch)
12. [RocketMQ / Kafka](/messaging/)
13. [XXL-Job](/engineering/xxl-job)
14. [MinIO / OSS](/engineering/minio)
15. [Actuator + Prometheus + Grafana](/observability/prometheus-grafana)
16. [SkyWalking / OpenTelemetry](/observability/skywalking)
17. [Docker](/deploy/docker)
18. [Kubernetes](/deploy/kubernetes)
19. [CI/CD](/deploy/cicd)
20. [Seata](/messaging/seata) / [ShardingSphere](/storage/sharding) / [Canal](/storage/data-sync)

> 前两步的 [Java 基础](/java-core/) 与 [Spring 核心原理](/spring-core/) 是地基。很多人跳过它们直接堆框架，结果线上一遇到 OOM、死锁、事务失效就束手无策。打牢地基再往上走，性价比最高。工程层面的 [Maven](/practice/maven)、[设计模式](/practice/design-pattern)、[API 规范](/practice/api-design) 可在写项目的过程中随用随学。

## 重点记忆版

企业 Spring Cloud 项目可以按这些问题来记：

| 问题 | 技术选型 |
| --- | --- |
| 服务怎么启动 | `Spring Boot` |
| 服务怎么治理 | `Spring Cloud` |
| 服务怎么注册发现 | `Nacos / Eureka / Consul` |
| 配置怎么统一管理 | `Nacos Config / Spring Cloud Config` |
| 请求从哪里进来 | `Gateway / Nginx / APISIX` |
| 服务之间怎么调用 | `OpenFeign / Dubbo` |
| 服务挂了怎么办 | `Sentinel / Resilience4j` |
| 数据存哪里 | `MySQL / PostgreSQL` |
| 数据怎么访问 | `MyBatis-Plus / JPA` |
| 热点数据怎么加速 | `Redis` |
| 分布式锁怎么做 | `Redisson` |
| 搜索怎么做 | `Elasticsearch` |
| 异步消息怎么做 | `RocketMQ / Kafka / RabbitMQ` |
| 分布式事务怎么做 | `Seata / 事务消息` |
| 文件放哪里 | `MinIO / OSS / S3` |
| 定时任务怎么做 | `XXL-Job / Quartz` |
| 登录权限怎么做 | `Spring Security / OAuth2 / JWT / Sa-Token` |
| 接口文档怎么做 | `Knife4j / Springdoc OpenAPI` |
| 日志怎么查 | `ELK / Loki` |
| 链路怎么追踪 | `SkyWalking / OpenTelemetry` |
| 指标怎么监控 | `Prometheus + Grafana` |
| 代码质量怎么管 | `SonarQube / JaCoCo / Checkstyle` |
| 怎么部署 | `Docker / Kubernetes / Helm` |
| 怎么自动发布 | `Jenkins / GitLab CI / Argo CD` |
