---
title: 'Spring 核心'
description: 'Spring 核心技术文档，讲解 IoC、AOP、事务、Bean 生命周期等 Java 后端框架原理和实践要点。'
---

# Spring 核心

> 本栏目为知识库新增内容，不属于《Spring 技术套件》原文档。

[核心框架](/framework/)栏目讲的是「用 Spring Boot 搭微服务」，本栏目讲的是**底层原理**：Spring 到底做了什么、为什么这么设计。理解这些，才能看懂自动配置、排查 Bean 注入和事务失效问题、写出合理的 AOP 切面。

## 为什么要懂原理

每个微服务本质都是一个 Spring 应用。日常开发中大量「玄学问题」其实都源于对核心机制的不了解：

- `@Autowired` 注入为 null
- `@Transactional` 不生效、回滚不了
- 循环依赖报错
- AOP 切面没拦截到方法
- 自动配置没生效

这些都需要理解 IoC 容器、AOP 代理、事务的工作机制。

## 本栏目内容

| 主题 | 说明 |
| --- | --- |
| [IoC 与依赖注入](./ioc) | 容器、Bean 生命周期、注入方式、循环依赖 |
| [AOP 面向切面](./aop) | 动态代理、切面、应用场景 |
| [事务原理](./transaction) | 声明式事务、传播行为、失效场景 |

## Spring 全家桶定位

| 模块 | 作用 |
| --- | --- |
| Spring Framework | 核心：IoC、AOP、事务、MVC |
| Spring Boot | 自动配置、起步依赖、内嵌容器，简化 Spring 应用搭建 |
| Spring Cloud | 在 Spring Boot 之上提供微服务治理能力 |

Spring Boot 不是替代 Spring，而是**让 Spring 更易用**。理解 Spring Framework 的核心，才能理解 Boot 的自动配置在帮你做什么。
