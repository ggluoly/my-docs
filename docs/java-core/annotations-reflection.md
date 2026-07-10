---
title: '注解与反射'
description: '基于 JDK 8 梳理 Java 注解与反射，包括元注解、运行期注解、Class、Constructor、Method、Field 和框架应用场景。'
outline: [2, 3]
---

# 注解与反射

> 本页默认以 JDK 8 为技术基线。

注解和反射是 Spring、MyBatis、JUnit、序列化框架等技术的基础。业务代码不应滥用反射，但必须理解框架如何在运行期识别类、创建对象和调用方法。

## 注解是什么

注解是代码上的元数据，本身不直接改变业务逻辑，需要编译器、框架或运行时代码读取后产生效果。

常见注解：

```java
@Override
@Deprecated
@SuppressWarnings
@FunctionalInterface
```

Spring 中常见注解：

```java
@Component
@Service
@Autowired
@Transactional
@RequestMapping
```

## 元注解

元注解用于修饰注解：

| 元注解 | 作用 |
| --- | --- |
| `@Target` | 限制注解可以标在哪些位置 |
| `@Retention` | 指定注解保留到源码、字节码还是运行期 |
| `@Documented` | 是否进入 Javadoc |
| `@Inherited` | 子类是否继承父类上的注解 |

运行期框架通常需要 `RetentionPolicy.RUNTIME`：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyComponent {
    String value() default "";
}
```

## 反射是什么

反射是在运行期动态获取类信息、创建对象、访问字段和调用方法的能力。

常见入口：

```java
Class<?> clazz = Class.forName("com.example.User");
Object object = clazz.getDeclaredConstructor().newInstance();
Method method = clazz.getMethod("getName");
Object name = method.invoke(object);
```

常用类型：

| 类型 | 说明 |
| --- | --- |
| `Class` | 类的运行期描述 |
| `Constructor` | 构造方法 |
| `Method` | 方法 |
| `Field` | 字段 |
| `Annotation` | 注解 |

## 访问控制

反射可以通过 `setAccessible(true)` 访问非 public 成员：

```java
Field field = clazz.getDeclaredField("name");
field.setAccessible(true);
Object value = field.get(object);
```

JDK 8 中这种访问限制相对宽松。Java 9 之后引入模块化和更严格封装，未开放模块包时强行反射可能失败，这类差异放在 Java 版本特性模块中说明。

## 框架中的应用

注解与反射常见应用：

| 场景 | 机制 |
| --- | --- |
| Spring IoC | 扫描注解，反射创建 Bean，注入依赖 |
| Spring MVC | 读取 `@RequestMapping`，反射调用 Controller 方法 |
| Spring AOP | 读取切面注解，创建代理对象 |
| MyBatis | 反射映射结果集到对象属性 |
| JUnit | 识别测试注解并反射执行测试方法 |
| JSON 序列化 | 反射读取字段或 getter/setter |

## 动态代理

JDK 动态代理基于接口创建代理对象，是 Spring AOP 的重要基础之一：

```java
UserService proxy = (UserService) Proxy.newProxyInstance(
    UserService.class.getClassLoader(),
    new Class<?>[] { UserService.class },
    (obj, method, args) -> {
        System.out.println("before");
        return method.invoke(target, args);
    });
```

JDK 动态代理要求目标对象实现接口。如果没有接口，Spring 常见做法是使用 CGLIB 创建子类代理。

## 实践建议

- 业务代码不要在热点路径频繁反射调用，必要时缓存 `Class`、`Method`、`Field`。
- 注解设计要控制职责，不要把大量业务配置塞进单个注解。
- 反射异常要保留原始异常，避免排查时丢失堆栈。
- 如果项目未来升级 Java 17 或 21，要提前排查非法反射和 JDK 内部 API 依赖。
