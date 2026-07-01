---
title: 'IoC 与依赖注入'
description: 'Spring IoC 与依赖注入技术文档，介绍控制反转、Bean 管理、依赖装配和 Java 后端框架原理。'
---

# IoC 与依赖注入

> 本栏目为知识库新增内容，不属于《Spring 技术套件》原文档。

## 是什么

**IoC（Inversion of Control，控制反转）** 是一种设计思想：把对象的创建和依赖关系的管理，从代码里交给容器统一负责。**DI（Dependency Injection，依赖注入）** 是 IoC 的具体实现方式——容器在创建对象时，自动把它依赖的其他对象「注入」进来。

```java
// 不用 IoC：自己 new，自己管理依赖
public class OrderService {
    private UserService userService = new UserServiceImpl();
}

// 用 IoC：声明依赖，容器负责注入
@Service
public class OrderService {
    private final UserService userService;

    public OrderService(UserService userService) {  // 构造器注入
        this.userService = userService;
    }
}
```

## 解决什么问题

- **解耦**：业务类不关心依赖怎么创建，只声明「我需要什么」。
- **可测试**：测试时可以注入 Mock 对象。
- **统一管理**：对象的生命周期、单例复用、AOP 增强都由容器统一处理。

## Bean 的注入方式

| 方式 | 写法 | 推荐度 |
| --- | --- | --- |
| 构造器注入 | 构造函数参数 | 推荐，可声明 `final`、避免 null、便于测试 |
| Setter 注入 | `@Autowired` 在 setter 上 | 用于可选依赖 |
| 字段注入 | `@Autowired` 直接标字段 | 不推荐，无法 final、难测试、隐藏依赖 |

```java
// 推荐：构造器注入（配合 Lombok @RequiredArgsConstructor 更简洁）
@Service
@RequiredArgsConstructor
public class OrderService {
    private final UserService userService;
    private final ProductService productService;
}
```

## Bean 生命周期

一个 Bean 从创建到销毁的主要阶段：

```
实例化（构造器）
  -> 属性填充（依赖注入）
  -> Aware 接口回调（BeanNameAware、ApplicationContextAware 等）
  -> BeanPostProcessor 前置处理
  -> 初始化（@PostConstruct -> InitializingBean -> init-method）
  -> BeanPostProcessor 后置处理（AOP 代理在此织入）
  -> 使用中
  -> 销毁（@PreDestroy -> DisposableBean -> destroy-method）
```

关键点：**AOP 代理是在初始化后的 BeanPostProcessor 阶段生成的**，这解释了很多 AOP 失效问题（见 [AOP](./aop) 和[事务](./transaction)）。

## 循环依赖

A 依赖 B，B 又依赖 A。Spring 通过**三级缓存**解决单例 Bean 的循环依赖：

```
一级缓存 singletonObjects：完整的成品 Bean
二级缓存 earlySingletonObjects：早期暴露的半成品（已实例化未填充属性）
三级缓存 singletonFactories：Bean 工厂，用于生成早期引用（支持 AOP 代理）
```

但有两种情况 Spring **解决不了**，会直接报错：

- **构造器注入的循环依赖**：实例化阶段就互相等待，无法提前暴露。
- **`@Async` 标注的循环依赖**：代理对象和原始对象不一致。

> 实践建议：循环依赖往往是设计问题的信号。优先通过重构（抽取公共服务、调整职责）消除，而不是依赖容器兜底。

## 常用注解

| 注解 | 作用 |
| --- | --- |
| `@Component` / `@Service` / `@Repository` / `@Controller` | 声明 Bean，交给容器管理 |
| `@Autowired` | 按类型注入 |
| `@Qualifier` | 按名称注入，解决一个类型多个实现 |
| `@Primary` | 多个候选时优先选择 |
| `@Bean` | 在 `@Configuration` 类中声明 Bean |
| `@Value` | 注入配置项 |
| `@Lazy` | 延迟初始化 |

## 排查建议

- **注入为 null**：检查这个类自己是不是被 Spring 管理的 Bean（自己 new 的对象不会被注入）。
- **找到多个候选 Bean**：用 `@Qualifier` 或 `@Primary` 指定。
- **循环依赖报错**：改用 setter/字段注入打破，或重构消除。
