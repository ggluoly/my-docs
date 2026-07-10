---
title: '基础语法'
description: '基于 JDK 8 梳理 Java 基础语法，包括基本数据类型、包装类型、流程控制、字符串、面向对象、常用关键字和值传递。'
outline: [2, 3]
---

# 基础语法

> 本页默认以 JDK 8 为技术基线。Java 9 及之后版本的语言演进统一放在 Java 版本特性模块。

基础语法是后续集合、并发、JVM 和 Spring 框架学习的前提。企业开发不需要死记所有语法细节，但必须理解类型、对象、字符串、流程控制和面向对象这些基本概念。

## 基本数据类型

Java 有 8 种基本数据类型：

| 类型 | 位数 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `byte` | 8 | `0` | 字节 |
| `short` | 16 | `0` | 短整型 |
| `int` | 32 | `0` | 整型，最常用 |
| `long` | 64 | `0L` | 长整型，ID、时间戳常用 |
| `float` | 32 | `0.0f` | 单精度浮点 |
| `double` | 64 | `0.0d` | 双精度浮点 |
| `char` | 16 | `'\u0000'` | 字符 |
| `boolean` | JVM 规范未明确固定位数 | `false` | 布尔值 |

要点：

- 基本类型存储的是值，包装类型是对象。
- `int` 是整数默认类型，`double` 是小数默认类型。
- 金额计算不要用 `float` / `double`，应使用 `BigDecimal`。
- 包装类型比较不要随意用 `==`，应优先用 `equals()` 或 `Objects.equals()`。

## 包装类型与自动装箱

Java 为每个基本类型提供了对应包装类型：

| 基本类型 | 包装类型 |
| --- | --- |
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

自动装箱和拆箱让基本类型与包装类型可以自动转换，但也容易产生隐藏问题：

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b); // true，Integer 缓存范围内

Integer c = 128;
Integer d = 128;
System.out.println(c == d); // false，超出缓存范围
```

实践建议：

- 数据库实体字段通常用包装类型，便于表达 `null`。
- 局部计算变量可以用基本类型，避免不必要的装箱拆箱。
- 比较包装类型优先用 `Objects.equals(a, b)`。
- 自动拆箱可能触发空指针，例如 `Integer value = null; int n = value;`。

## 运算符与流程控制

常用流程控制：

```java
if / else
switch
for
while
do while
break
continue
return
```

注意：

- JDK 8 中 `switch` 支持整数类型、枚举、`String` 等。
- `break` 跳出循环，`continue` 跳过本次循环。
- 复杂条件判断应拆成有语义的方法，避免一行里堆太多业务逻辑。
- 业务代码中不要滥用三目运算符，嵌套过深会明显降低可读性。

## 字符串

常用字符串类型：

| 类型 | 特点 | 场景 |
| --- | --- | --- |
| `String` | 不可变 | 大多数普通字符串 |
| `StringBuilder` | 可变，非线程安全 | 单线程拼接 |
| `StringBuffer` | 可变，线程安全 | 老代码中较常见，新项目较少用 |

示例：

```java
String name = "Java";
StringBuilder builder = new StringBuilder();
builder.append("Hello ").append(name);
```

注意：

- 循环中大量拼接字符串不要用 `+`，应使用 `StringBuilder`。
- 判断字符串内容用 `equals()`，不要用 `==`。
- 判空建议统一使用工具方法或明确判断，避免空指针。
- JDK 8 中 `String` 底层主要是 `char[]`；JDK 9 以后主要是 `byte[] + coder`。

## 面向对象基础

Java 面向对象核心是：

- 类和对象
- 封装
- 继承
- 多态
- 接口
- 抽象类

实践建议：

- 字段尽量 `private`，通过方法暴露行为。
- 优先组合，谨慎继承。
- 接口定义能力，抽象类复用公共逻辑。
- 业务代码不要为了“面向对象”而过度抽象。

## 常用关键字

| 关键字 | 作用 |
| --- | --- |
| `static` | 属于类，不属于对象 |
| `final` | 修饰类、方法、变量，表示不可继承、不可重写或引用不可重新赋值 |
| `this` | 当前对象 |
| `super` | 父类对象 |
| `public` | 所有地方可见 |
| `protected` | 同包可见；跨包子类中只能通过子类自身引用访问继承成员 |
| 默认访问修饰符 | 同包可见 |
| `private` | 当前类可见 |

`final` 修饰引用变量时，表示引用不能再指向其他对象，不代表对象内部状态一定不可变。

## 值传递

Java 只有值传递。对象作为参数传递时，传递的是对象引用的副本。

```java
void change(User user) {
    user.setName("new name");
}
```

这类方法可以修改对象内部状态，但不能让外部引用指向一个新对象：

```java
void reset(User user) {
    user = new User();
}
```

`reset()` 只能改变方法内部的引用副本，不会改变调用方原来的引用。

## 实践建议

- 基础类型用于局部计算，包装类型用于需要表达 `null` 的对象字段。
- 字符串判等始终用 `equals()` 或 `Objects.equals()`。
- 面向对象设计优先表达业务语义，不要为了继承而继承。
- 维护 JDK 8 存量代码时，不要使用 `var`、`record`、`sealed`、`Stream.toList()` 等后续版本能力；现代新项目按 Java 17 / 21 实际基线选择语法。
