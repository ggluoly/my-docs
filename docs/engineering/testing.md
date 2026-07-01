---
title: '测试'
description: 'Java 后端测试文档，介绍单元测试、集成测试、契约测试、Testcontainers 和接口回归验证实践。'
---

# 测试

## 是什么

测试层保障代码质量和功能正确性，覆盖单元测试、集成测试、契约测试等不同层次。

## 常见组件

- `JUnit 5`：单元测试。
- `Mockito`：Mock 测试。
- `AssertJ`：断言工具。
- `Spring Boot Test`：Spring 集成测试。
- `Testcontainers`：容器化集成测试。
- `WireMock`：Mock 外部 HTTP 服务。
- `MockMvc`：Controller 测试。
- `RestAssured`：API 测试。
- `Spring Cloud Contract`：契约测试。
- `Pact`：契约测试。

## 选型建议

企业项目建议至少有：

```
JUnit 5
Mockito
Spring Boot Test
MockMvc
```

中大型项目建议补充：

```
Testcontainers
WireMock
契约测试
```

Testcontainers 用真实容器（MySQL、Redis、Kafka）做集成测试，避免 Mock 与真实环境的差异；契约测试（Spring Cloud Contract / Pact）保障微服务之间接口约定的一致性。
