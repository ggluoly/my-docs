# Spring Boot 面试题

## Spring Boot 自动配置原理是什么？

### 标准回答

Spring Boot 通过自动配置类、条件注解和配置属性，在满足条件时自动创建 Bean。开发者引入 starter 后，Boot 根据 classpath、配置项和条件注解决定哪些配置生效。

### 常见追问

- `@SpringBootApplication` 包含哪些注解？
- 条件注解有哪些？
- 自动配置为什么有时不生效？

### 关联文档

- [Spring Boot](/framework/spring-boot)

## Starter 机制解决什么问题？

### 标准回答

Starter 把某类功能所需的依赖和自动配置打包成统一入口，减少手动引入依赖和配置的成本。比如 Web、Validation、Actuator 都有对应 starter。

### 关联文档

- [Spring Boot](/framework/spring-boot)

## 配置文件加载顺序为什么重要？

### 标准回答

不同环境、命令行参数、环境变量和配置文件有优先级。理解加载顺序可以排查配置不生效、线上环境覆盖错误、多环境 profile 混乱等问题。

### 关联文档

- [Spring Boot](/framework/spring-boot)
