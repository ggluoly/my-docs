---
title: 'Spring Boot 面试题'
description: 'Spring Boot 面试题整理，覆盖自动配置、Starter、配置加载、热部署、JPA 和工程实践常见问题。'
outline: [2, 3]
---

# Spring Boot 面试题

本页整理 Spring Boot 高频面试题，覆盖自动配置、Starter、配置文件、热部署和 JPA / Hibernate 对比。涉及 `bootstrap.yml` 等旧机制时，会结合当前 Spring Boot / Spring Cloud 版本说明。

## 自动配置与 Starter

### Spring Boot 自动配置原理是什么？

Spring Boot 通过自动配置类、条件注解和配置属性，在满足条件时自动创建 Bean。开发者引入 starter 后，Boot 根据 classpath、配置项和条件注解决定哪些配置生效。

#### 常见追问

- 条件注解有哪些？
- 自动配置为什么有时不生效？

#### 关联文档

- [Spring Boot](/framework/spring-boot)

### @SpringBootApplication 包含哪些注解？

`@SpringBootApplication` 是组合注解，核心包括 `@SpringBootConfiguration`、`@EnableAutoConfiguration` 和 `@ComponentScan`。它表示当前类是配置类，启用自动配置，并扫描当前包及子包下的组件。

#### 常见追问

- 为什么启动类建议放在根包？
- `@EnableAutoConfiguration` 做了什么？
- 如何排除某个自动配置？

### Starter 机制解决什么问题？

Starter 把某类功能所需的依赖和自动配置打包成统一入口，减少手动引入依赖和配置的成本。比如 Web、Validation、Actuator 都有对应 starter。

#### 常见追问

- 自定义 starter 怎么做？
- starter 和自动配置是什么关系？
- 为什么 starter 通常不写业务代码？

#### 关联文档

- [Spring Boot](/framework/spring-boot)

## 配置文件

### 配置文件加载顺序为什么重要？

不同环境、命令行参数、环境变量和配置文件有优先级。理解加载顺序可以排查配置不生效、线上环境覆盖错误、多环境 profile 混乱等问题。

#### 常见追问

- 命令行参数和配置文件谁优先？
- profile 怎么激活？
- 为什么线上配置不要打死在 jar 包里？

#### 关联文档

- [Spring Boot](/framework/spring-boot)

### bootstrap.yml 和 application.yml 有什么区别？

`application.yml` 是 Spring Boot 应用配置文件，用于配置端口、数据源、日志、业务参数等。`bootstrap.yml` 常见于早期 Spring Cloud，用于更早阶段加载配置中心、注册中心等引导配置。新版本 Spring Cloud 中 bootstrap 机制不一定默认启用，很多项目改用 `spring.config.import` 引入配置中心。

#### 常见追问

- 为什么配置中心配置要更早加载？
- 新版 Spring Cloud 如何导入 Nacos 配置？
- bootstrap 配置不生效怎么排查？

### properties 和 yml 有什么区别？

`.properties` 使用 key-value 扁平写法，简单直接；`.yml` 使用缩进表示层级，结构更清晰，适合复杂配置。需要注意缩进和空格敏感问题。传统 `@PropertySource` 对 YAML 支持有限，通常更适合加载 properties 文件。

#### 常见追问

- yml 缩进错误会导致什么问题？
- 多环境 profile 怎么写？
- 配置绑定到对象用什么注解？

## 工程实践

### Spring Boot 热部署方式有哪些？

常见方式包括 Spring Boot DevTools、IDE 自动编译配合应用重启、JRebel 等。DevTools 会监听 classpath 变化并触发快速重启，适合开发环境；生产环境不应该启用热部署能力。

#### 常见追问

- DevTools 是热替换还是重启？
- 为什么生产不能使用 DevTools？
- JRebel 和 DevTools 有什么区别？

### JPA 和 Hibernate 有什么区别？

JPA 是 Java 持久化 API 规范，定义 ORM 操作接口和注解；Hibernate 是 JPA 的一种实现，也提供了自身扩展能力。简单说，JPA 是规范，Hibernate 是实现。项目中使用 Spring Data JPA 时，底层常见实现就是 Hibernate。

#### 常见追问

- JPA 和 MyBatis 怎么选？
- Hibernate 为什么需要无参构造？
- ORM 框架有什么优缺点？

#### 关联文档

- [Hibernate 面试题](./hibernate)
- [MyBatis 面试题](./mybatis)
