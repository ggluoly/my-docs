---
title: 'Spring Boot'
description: 'Spring Boot 技术文档，介绍应用启动、自动配置、Starter、配置管理和 Java 后端单服务开发实践。'
---

# Spring Boot

## 是什么

Spring Boot 是单个服务的基础开发框架，负责应用启动、自动配置和业务接口开发。在微服务体系中，每个微服务本质上都是一个独立的 Spring Boot 应用，基本必用。

## 核心配套

围绕 Spring Boot，常见的基础组件包括：

- **Spring Web**：开发 REST API。
- **Spring Validation**：参数校验。
- **Spring AOP**：切面处理，例如日志、权限、事务增强。

> Spring Boot 只是把这些能力「装配」起来。它们背后的 [IoC / 依赖注入](/spring-core/ioc)、[AOP](/spring-core/aop)、[事务](/spring-core/transaction) 机制见 [Spring 核心](/spring-core/) 栏目。

## 解决什么问题

- 自动配置：约定优于配置，减少样板配置。
- 内嵌容器：内置 Tomcat / Jetty，打成 jar 即可运行。
- 起步依赖：通过 starter 快速集成各类组件。
- 生产就绪：配合 Actuator 提供健康检查与指标暴露。

## 选型建议

现代新项目推荐使用 **Spring Boot 3.x**。Spring Boot 3.x 的最低 Java 基线是 Java 17；新项目可根据 Spring Boot 小版本、第三方依赖、Java Agent 和部署环境的兼容情况选择 Java 17 或 Java 21，条件允许时优先评估 Java 21 LTS。

JDK 8 仍适合本文档中的 Java 基础原理学习和存量项目维护，但不能运行 Spring Boot 3.x。升级时还要同步检查 Spring Framework、ORM、数据库驱动、监控探针和构建插件，不能只替换 JDK。
