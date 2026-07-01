---
title: 'MyBatis-Plus'
description: 'MyBatis-Plus 技术文档，介绍 Java 后端数据存储中的核心概念、应用场景、性能优化和选型建议。'
---

# MyBatis-Plus

## 是什么

MyBatis-Plus 是在 MyBatis 基础上增强的 ORM 框架，简化 CRUD 操作，国内企业项目使用非常广泛。

## 同类组件

| 组件 | 说明 |
| --- | --- |
| `MyBatis` | SQL 映射框架 |
| `MyBatis-Plus` | 简化 CRUD |
| `Spring Data JPA` | ORM 框架 |

## 解决什么问题

- 自动生成单表 CRUD，减少重复 SQL 代码。
- 提供条件构造器、分页插件、代码生成器等增强能力。
- 保留 MyBatis 手写 SQL 的灵活性。

## 常见依赖

```xml
mybatis-plus-spring-boot-starter
```

## 选型建议

- 国内项目默认 `MyBatis-Plus`，兼顾开发效率和 SQL 灵活性。
- 偏好面向对象 ORM、跨数据库场景多时可考虑 `Spring Data JPA`。
- 纯手写 SQL、追求完全可控时用原生 `MyBatis`。
