---
title: 'Java 9-11 特性'
description: '梳理 Java 9 到 Java 11 的关键特性，包括模块化、JShell、集合工厂方法、var、HTTP Client、JFR 和字符串 API 增强。'
outline: [2, 3]
---

# Java 9-11 特性

> Java 基础原理和存量项目维护以 JDK 8 为讲解基线；本页用于理解升级到 Java 11 的收益与风险。现代 Spring Boot 3.x 新项目应从 Java 17 / 21 中选择。

Java 9 到 11 是从传统 JDK 走向模块化、轻量化和云原生运行环境的过渡阶段。Java 11 是 LTS 版本，很多企业系统仍以 Java 11 作为基础运行版本。

## 特性总览

| 版本 | 重点特性 | 说明 |
| --- | --- | --- |
| Java 9 | JPMS 模块化系统 | 引入 `module-info.java`，增强模块边界 |
| Java 9 | JShell | 交互式 Java REPL |
| Java 9 | 集合工厂方法 | `List.of()`、`Set.of()`、`Map.of()` |
| Java 9 | 接口私有方法 | 接口内部复用默认方法逻辑 |
| Java 9 | Stream / Optional 增强 | `takeWhile()`、`dropWhile()`、`ofNullable()`、`Optional.stream()` |
| Java 9 | G1 成为默认 GC | 服务端默认 GC 转向 G1 |
| Java 10 | `var` 局部变量类型推断 | 只能用于局部变量 |
| Java 10 | 容器感知增强 | JVM 更好识别容器 CPU 和内存限制 |
| Java 11 | HTTP Client 标准化 | 标准库支持 HTTP/2 和异步请求 |
| Java 11 | 单文件源码运行 | 可以直接 `java Hello.java` |
| Java 11 | Lambda 参数支持 `var` | 便于统一参数写法和添加注解 |
| Java 11 | 字符串和文件 API 增强 | `isBlank()`、`strip()`、`repeat()`、`Files.readString()` 等 |
| Java 11 | JFR 开源可用 | 低开销运行时诊断工具 |

## Java 9 模块化

JPMS 引入模块描述文件：

```java
module com.example.user {
    requires java.sql;
    exports com.example.user.api;
}
```

影响：

- JDK 自身被模块化。
- 内部 API 访问逐步收紧。
- 反射访问非开放包时可能受限制。
- 大型系统可以用模块表达边界，但普通 Spring Boot 项目不一定需要主动模块化。

## 集合工厂方法

Java 9 提供不可变集合工厂方法：

```java
List<String> names = List.of("a", "b", "c");
Set<String> tags = Set.of("java", "spring");
Map<String, Integer> scores = Map.of("a", 1, "b", 2);
```

注意：这些集合不可修改，且不允许 `null`。

## 接口私有方法

Java 9 支持接口私有方法，便于默认方法内部复用：

```java
public interface Checker {
    default boolean check(String value) {
        return notEmpty(value);
    }

    private boolean notEmpty(String value) {
        return value != null && !value.isEmpty();
    }
}
```

Java 8 接口只有抽象方法、默认方法和静态方法，没有私有方法。

## var 局部变量类型推断

Java 10 引入 `var`：

```java
var users = userRepository.findActiveUsers();
```

限制：

- 只能用于局部变量。
- 不能用于字段。
- 不能用于方法参数和返回值。
- 不能在没有明确初始化值时使用。

实践建议：类型明显时可以使用，类型不明显时不要为了少写几个字符牺牲可读性。

## HTTP Client

Java 11 标准化 HTTP Client：

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
```

它支持 HTTP/2 和异步请求，但企业项目中仍常见 OkHttp、Apache HttpClient、Feign、RestTemplate、WebClient 等框架封装。

## JFR

Java Flight Recorder 在 Java 11 中开源可用，用于低开销采集运行时事件。

适合分析：

- CPU 热点。
- 锁竞争。
- GC 情况。
- 对象分配。
- IO 和线程行为。

## 升级注意事项

- 从 JDK 8 升级到 11 时，重点排查非法反射、JDK 内部 API、移除模块和第三方依赖兼容性。
- 容器部署建议验证 JVM 是否正确识别容器资源限制。
- 字符串、集合、HTTP API 增强可以逐步使用，但不要影响 JDK 8 分支代码。
