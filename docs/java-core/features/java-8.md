---
title: 'Java 8 特性'
description: '梳理 Java 8 关键特性，包括 Lambda、函数式接口、方法引用、Stream、Optional、java.time、CompletableFuture 和接口默认方法。'
outline: [2, 3]
---

# Java 8 特性

> 本页以 JDK 8 讲解 Java 基础能力和存量项目基线。现代 Spring Boot 3.x 新项目最低使用 Java 17，并在完整技术栈兼容时选择 Java 17 / 21。

Java 8 是现代 Java 的分水岭，核心变化是函数式编程、集合处理方式、日期时间 API 和异步编排能力。

## 核心特性总览

| 特性 | 说明 | 后端开发价值 |
| --- | --- | --- |
| Lambda 表达式 | 用更简洁的语法传递行为 | 简化回调、排序、过滤、异步任务等代码 |
| 函数式接口 | 只有一个抽象方法的接口 | 配合 Lambda 构建可组合逻辑 |
| 方法引用 | `User::getName` 这类更简洁的 Lambda 写法 | 提升集合转换、事件处理代码可读性 |
| Stream API | 声明式集合处理 | 简化过滤、映射、分组、聚合 |
| Optional | 显式表达可能为空的结果 | 降低空指针风险，但不能滥用 |
| 接口默认方法和静态方法 | 接口可以提供默认实现和工具方法 | 支持接口平滑演进 |
| 新日期时间 API | `java.time` 包 | 替代 `Date`、`Calendar`、`SimpleDateFormat` |
| CompletableFuture | 异步任务编排 | 并行调用多个服务并聚合结果 |
| Base64 API | 标准编解码 API | 减少第三方工具依赖 |
| 重复注解与类型注解 | 注解能力增强 | 服务框架、校验和静态分析 |

## Lambda 表达式

Lambda 用简洁语法表达一段行为：

```java
List<String> names = Arrays.asList("Tom", "Jerry", "Alice");
names.sort((a, b) -> a.compareTo(b));
```

本质上，Lambda 需要目标类型，这个目标类型通常是函数式接口。

## 函数式接口

函数式接口只有一个抽象方法，可以用 `@FunctionalInterface` 标注。

常见函数式接口：

| 接口 | 输入 | 输出 | 场景 |
| --- | --- | --- | --- |
| `Function<T, R>` | T | R | 类型转换 |
| `Predicate<T>` | T | boolean | 条件判断 |
| `Consumer<T>` | T | void | 消费数据 |
| `Supplier<T>` | 无 | T | 提供数据 |
| `Runnable` | 无 | void | 无返回任务 |

示例：

```java
Predicate<User> adult = user -> user.getAge() >= 18;
Function<User, String> getName = User::getName;
```

## 方法引用

方法引用是 Lambda 的简化形式：

```java
users.stream()
    .map(User::getName)
    .collect(Collectors.toList());
```

常见形式：

- 静态方法引用：`Integer::parseInt`
- 实例方法引用：`user::getName`
- 类实例方法引用：`User::getName`
- 构造方法引用：`User::new`

## Stream API

Stream 提供声明式集合处理能力。

```java
List<String> names = users.stream()
    .filter(user -> user.getAge() > 18)
    .map(User::getName)
    .collect(Collectors.toList());
```

常用操作：

| 操作 | 说明 |
| --- | --- |
| `filter()` | 过滤 |
| `map()` | 映射转换 |
| `flatMap()` | 扁平化 |
| `sorted()` | 排序 |
| `distinct()` | 去重 |
| `collect()` | 收集结果 |
| `groupingBy()` | 分组 |
| `joining()` | 字符串拼接 |

注意：JDK 8 没有 `Stream.toList()`，应使用 `collect(Collectors.toList())`。

## Optional

`Optional` 用于表达返回值可能为空：

```java
Optional<User> user = findUser(id);
String name = user.map(User::getName).orElse("unknown");
```

使用建议：

- 适合作为方法返回值。
- 不建议作为实体字段。
- 不建议作为方法参数。
- 不要直接 `get()`，应使用 `orElse()`、`orElseGet()`、`orElseThrow()` 等方法。

## 接口默认方法和静态方法

Java 8 允许接口定义默认方法和静态方法：

```java
public interface Named {
    String getName();

    default boolean hasName() {
        return getName() != null && !getName().isEmpty();
    }

    static Named empty() {
        return () -> "";
    }
}
```

主要价值是接口演进。接口新增方法时可以提供默认实现，避免破坏已有实现类。

## 新日期时间 API

`java.time` 包提供线程安全、语义清晰的日期时间 API。

常用类型：

| 类型 | 说明 |
| --- | --- |
| `LocalDate` | 日期 |
| `LocalTime` | 时间 |
| `LocalDateTime` | 日期时间，无时区 |
| `Instant` | 时间戳 |
| `Duration` | 时间间隔 |
| `Period` | 日期间隔 |
| `DateTimeFormatter` | 日期格式化，线程安全 |

示例：

```java
LocalDate today = LocalDate.now();
LocalDateTime time = LocalDateTime.now();
String text = time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
```

## CompletableFuture

Java 8 引入 `CompletableFuture`，用于异步执行、结果转换、任务组合和异常处理。它属于 `java.util.concurrent` 并发工具体系；完整方法说明、组合示例和线程池注意事项见 [JUC 并发包：CompletableFuture](/java-core/juc#completablefuture)。

## 选型建议

- 集合简单遍历和复杂流程控制用普通循环更直接。
- 过滤、映射、分组、统计适合 Stream。
- `Optional` 用于表达返回值为空，不要为了链式调用滥用。
- 日期时间统一使用 `java.time`，避免继续使用 `Date` 和 `SimpleDateFormat`。
- 异步编排用 `CompletableFuture` 时必须关注线程池、超时和异常处理，详见 [JUC 并发包](/java-core/juc#completablefuture)。
