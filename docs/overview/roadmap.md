# 学习路线与重点记忆

## 最小学习路线

学习企业 Java Spring Cloud，不建议一开始学全部。推荐顺序：

1. `Java 基础`
2. `Spring Boot`
3. `MyBatis-Plus + MySQL`
4. `Redis`
5. `Spring Security / JWT`
6. `Spring Cloud 基础`
7. `Nacos 注册中心和配置中心`
8. `OpenFeign 服务调用`
9. `Spring Cloud Gateway`
10. `Sentinel 熔断限流`
11. `Elasticsearch`
12. `RocketMQ / Kafka`
13. `XXL-Job`
14. `MinIO / OSS`
15. `Actuator + Prometheus + Grafana`
16. `SkyWalking / OpenTelemetry`
17. `Docker`
18. `Kubernetes`
19. `CI/CD`
20. `Seata / ShardingSphere / Canal`

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
