# Spring Cloud

## 是什么

Spring Cloud 是微服务治理框架，负责服务发现、服务调用、网关、负载均衡、熔断限流等微服务能力。微服务项目常用。

## Spring Cloud Alibaba

`Spring Cloud Alibaba` 是国内项目常用的一套微服务组件集成，是 Spring Cloud 的扩展，整合了以下组件：

- **Nacos**：注册中心和配置中心。
- **Sentinel**：限流熔断降级。
- **RocketMQ**：消息队列。
- **Seata**：分布式事务。

## 三者关系

- **Spring Boot**：基础，每个微服务本质上都是一个 Spring Boot 应用。
- **Spring Cloud**：微服务治理能力，例如服务注册、远程调用、网关、熔断限流。
- **Spring Cloud Alibaba**：国内项目常用的微服务组件集成，常配合 Nacos、Sentinel、RocketMQ、Seata 使用。

## 选型建议

国内新项目通常采用：

```
Spring Boot 3.x + Spring Cloud 202x.x + Spring Cloud Alibaba
```

以这套为底座，再按需引入 Nacos、Gateway、OpenFeign、Sentinel 等组件。
