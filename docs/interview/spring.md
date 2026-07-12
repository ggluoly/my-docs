---
title: 'Spring 面试题'
description: 'Spring 面试题整理，覆盖 IoC、AOP、事务、Bean 作用域、Spring MVC 流程和常见框架原理问题。'
outline: [2, 3]
---

# Spring 面试题

本页整理 Spring Framework 和 Spring MVC 高频面试题，覆盖 IoC、Bean、AOP、事务、自动装配和 Web MVC 流程。传统 XML、Struts 对比等内容完整保留，面试时可说明其主要出现在老项目中。

## IoC 与 Bean

### IoC 是什么？

IoC 是控制反转，对象的创建、依赖管理和生命周期交给 Spring 容器处理。开发者不再主动 new 依赖对象，而是声明依赖关系，由容器负责装配。

#### 常见追问

- BeanFactory 和 ApplicationContext 有什么区别？
- Spring 如何完成依赖注入？

#### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

### Spring 主要模块有哪些？

Spring 常见模块包括 Core Container、Context、AOP、Beans、Expression、JDBC / DAO、ORM、Transaction、Web 和 Spring MVC。面试不需要死记所有包名，重点说明 Spring 用容器管理对象，用 AOP 处理横切逻辑，用事务和 Web 模块支撑企业应用。

#### 常见追问

- Spring Core 解决什么问题？
- Spring AOP 用在哪些场景？
- Spring MVC 属于哪个层面的能力？

### Spring 常用注入方式有哪些？

常见依赖注入方式包括构造器注入、Setter 注入和字段注入。现在更推荐构造器注入，因为依赖不可变、便于测试，也能更早暴露循环依赖问题；字段注入写法简单，但不利于单元测试和依赖显式表达。

#### 常见追问

- 为什么不推荐字段注入？
- 构造器注入如何解决必需依赖？
- `@Resource` 和 `@Autowired` 有什么区别？

### @Autowired 有什么作用？

`@Autowired` 用于按类型自动注入 Spring 容器中的 Bean，可以标注在构造器、字段、Setter 或普通方法上。如果同类型 Bean 有多个，需要结合 `@Qualifier` 或 `@Primary` 指定候选 Bean。

#### 常见追问

- `@Autowired` 默认按什么规则注入？
- 多个同类型 Bean 怎么处理？

### Bean 生命周期是什么？

Bean 生命周期大致包括实例化、属性填充、Aware 回调、BeanPostProcessor 前置处理、初始化方法、BeanPostProcessor 后置处理、使用、销毁。理解生命周期有助于排查注入、代理和初始化问题。

#### 常见追问

- BeanPostProcessor 有什么作用？
- AOP 代理对象在哪个阶段生成？
- 初始化方法有哪些配置方式？

#### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

### Spring Bean 是否线程安全？

Spring 默认单例 Bean 本身不保证线程安全。无状态 Bean 通常是线程安全的；如果 Bean 内部保存可变成员变量，多线程访问就可能出问题。解决方式包括避免共享可变状态、使用局部变量、加锁、改为 prototype 或把状态放到请求上下文中。

#### 常见追问

- Controller 单例为什么通常没问题？
- 有状态 Bean 怎么处理？
- prototype Bean 一定线程安全吗？

### Spring Bean 作用域有哪些？

常见作用域包括 `singleton`、`prototype`、`request`、`session` 和早期 Portlet 环境中的 `globalSession`。`singleton` 是默认作用域，一个容器一个实例；`prototype` 每次获取创建新实例；`request` 和 `session` 主要用于 Web 环境。

#### 常见追问

- singleton 和 prototype 生命周期有什么区别？
- request scope 在非 Web 环境可用吗？
- 单例 Bean 引用 prototype Bean 有什么问题？

### Spring 如何解决循环依赖？

Spring 通过三级缓存解决单例 Bean 的部分循环依赖，本质是在 Bean 完成属性填充前提前暴露对象引用。但构造器循环依赖无法解决，原型 Bean 循环依赖也不适用。

#### 常见追问

- 为什么构造器循环依赖无法解决？
- 三级缓存分别存什么？
- AOP 代理和循环依赖有什么关系？

#### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

## XML 与自动装配

### Spring XML 装载 Bean 的过程是什么？

传统 XML 配置中，Spring 会读取配置文件，解析 BeanDefinition，注册到 BeanFactory，然后在需要时或容器启动时实例化 Bean，完成属性注入、初始化回调和后置处理。现代 Spring Boot 项目更多使用注解和自动配置，但理解 XML 有助于理解 Spring 容器底层。

#### 常见追问

- BeanDefinition 是什么？
- XML 配置和注解配置最终都会变成什么？
- BeanFactoryPostProcessor 在哪个阶段执行？

### Spring 自动装配方式有哪些？

传统 XML 自动装配方式包括 `no`、`byName`、`byType`、`constructor` 和早期的 `autodetect`。现在实际项目更多使用 `@Autowired`、`@Resource`、构造器注入和 Spring Boot 自动配置。面试时可说明这些 XML 方式主要用于老项目。

#### 常见追问

- `byName` 和 `byType` 有什么区别？
- 多个同类型 Bean 时 byType 会怎样？
- 注解注入和 XML 自动装配有什么关系？

## AOP 与事务

### AOP 是什么？

AOP 是面向切面编程，用于把日志、事务、权限、监控、异常处理等横切逻辑从业务代码中抽离出来。Spring AOP 主要基于动态代理，在方法调用前后织入增强逻辑。

#### 常见追问

- 切点、通知、切面分别是什么？
- Spring AOP 和 AspectJ 有什么区别？
- AOP 为什么会有自调用失效问题？

#### 关联文档

- [AOP 面向切面](/spring-core/aop)

### AOP 底层怎么实现？

Spring AOP 底层主要基于动态代理。接口代理通常使用 JDK 动态代理，类代理通常使用 CGLIB。方法调用进入代理对象后，代理对象按切面链执行前置、后置、异常等增强逻辑。

#### 常见追问

- JDK 动态代理和 CGLIB 有什么区别？
- final 方法能被代理增强吗？
- Spring Boot 默认使用哪种代理？

#### 关联文档

- [AOP 面向切面](/spring-core/aop)

### Spring 事务实现方式有哪些？

Spring 事务主要有编程式事务和声明式事务。编程式事务通过 `TransactionTemplate` 或事务管理器手动控制；声明式事务通过 `@Transactional` 和 AOP 代理实现，业务代码侵入更低，是项目中最常用的方式。

#### 常见追问

- 声明式事务为什么依赖代理？
- 编程式事务适合什么场景？
- 多数据源事务怎么处理？

#### 关联文档

- [事务原理](/spring-core/transaction)

### Spring 事务隔离级别有哪些？

Spring 事务隔离级别包括 `DEFAULT`、`READ_UNCOMMITTED`、`READ_COMMITTED`、`REPEATABLE_READ` 和 `SERIALIZABLE`。`DEFAULT` 表示使用数据库默认隔离级别，MySQL InnoDB 默认通常是可重复读。

#### 常见追问

- 不同隔离级别解决什么问题？
- Spring 隔离级别和数据库隔离级别是什么关系？
- 可重复读如何避免幻读？

### @Transactional 为什么会失效？

常见原因包括方法不是 public、自调用绕过代理、异常被捕获没有抛出、抛出受检异常但未配置回滚、事务方法所在类没有被 Spring 管理、传播行为配置不符合预期。

#### 常见追问

- Spring 事务传播行为有哪些？
- 默认回滚哪些异常？
- 本地事务和分布式事务有什么区别？

#### 关联文档

- [事务原理](/spring-core/transaction)

## Spring MVC

### Spring MVC 运行流程是什么？

请求先进入 `DispatcherServlet`，再由 `HandlerMapping` 找到处理器，经过适配器调用 Controller 方法，返回 ModelAndView 或响应体，最后由 `ViewResolver` 解析视图或由消息转换器写出 JSON。前后端分离项目中通常直接返回 JSON，不一定走传统视图解析。

#### 常见追问

- `DispatcherServlet` 的作用是什么？
- HandlerMapping 和 HandlerAdapter 有什么区别？
- `@ResponseBody` 是怎么返回 JSON 的？

### Spring MVC 核心组件有哪些？

核心组件包括 `DispatcherServlet`、`HandlerMapping`、`HandlerAdapter`、Controller、`ModelAndView`、`ViewResolver`、消息转换器和拦截器。现在 REST API 场景下，消息转换器和参数解析器也很重要。

#### 常见追问

- 拦截器和过滤器有什么区别？
- 参数绑定是谁做的？
- JSON 序列化由哪个组件完成？

### @RequestMapping 有什么作用？

`@RequestMapping` 用于把 HTTP 请求路径、方法、参数、请求头等条件映射到 Controller 类或方法上。实际项目中常用 `@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping` 这些组合注解。

#### 常见追问

- `@GetMapping` 和 `@RequestMapping` 有什么关系？
- 路径变量和请求参数怎么接收？

### Spring MVC 和 Struts 有什么区别？

Struts 是传统 MVC 框架，通常以 Action 为核心；Spring MVC 是 Spring 生态中的 Web MVC 框架，和 IoC、AOP、事务等能力整合更自然。Spring MVC 以方法为粒度处理请求，更适合 REST API 和现代 Web 应用。Struts 现在主要出现在老项目维护场景。

#### 常见追问

- 为什么现在更常用 Spring MVC？
- Struts2 的 Action 是线程安全的吗？
- Spring MVC 如何支持前后端分离？
