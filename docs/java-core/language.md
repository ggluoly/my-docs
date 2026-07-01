---
title: '语言核心'
description: 'Java 语言核心技术文档，梳理基础语法、集合、泛型、异常、IO 与 NIO、注解反射和 Java 8+ 特性。'
---

# 语言核心

> 本页为知识库新增内容，不属于《Spring 技术套件》原文档。

企业 Java 开发每天都在用的语言基础。这里不展开语法教学，只梳理后端开发必须掌握、且在线上和面试中高频出现的要点。

## 基础语法 {#basic-syntax}

基础语法是后续集合、并发、JVM 和 Spring 框架学习的前提。企业开发不需要死记语法细节，但必须理解类型、对象、字符串、流程控制和面向对象这些基本概念。

### 基本数据类型

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

### 包装类型与自动装箱

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

### 运算符与流程控制

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

- `switch` 支持整数类型、枚举、`String` 等。
- `break` 跳出循环，`continue` 跳过本次循环。
- 复杂条件判断应拆成有语义的方法，避免一行里堆太多业务逻辑。

### 字符串

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

- 循环中大量拼接字符串不要用 `+`。
- 判断字符串内容用 `equals()`，不要用 `==`。
- 判空建议统一使用工具方法或明确判断，避免空指针。

### 面向对象基础

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

### 常用关键字

| 关键字 | 作用 |
| --- | --- |
| `static` | 属于类，不属于对象 |
| `final` | 修饰类、方法、变量，表示不可变或不可重写 |
| `this` | 当前对象 |
| `super` | 父类对象 |
| `public` | 所有地方可见 |
| `protected` | 同包或子类可见 |
| 默认访问修饰符 | 同包可见 |
| `private` | 当前类可见 |

### 值传递

Java 只有值传递。对象作为参数传递时，传递的是对象引用的副本。

```java
void change(User user) {
    user.setName("new name");
}
```

这类方法可以修改对象内部状态，但不能让外部引用指向一个新对象。

## 集合框架 {#collections}

最常用的几类容器，选错会直接影响性能和正确性。

| 接口 | 常用实现 | 特点 | 典型场景 |
| --- | --- | --- | --- |
| `List` | `ArrayList` | 数组结构，随机访问快，增删慢 | 大部分有序列表 |
| `List` | `LinkedList` | 链表结构，头尾增删快 | 队列、双端队列 |
| `Map` | `HashMap` | 哈希表，无序，非线程安全 | 绝大多数键值映射 |
| `Map` | `LinkedHashMap` | 保留插入/访问顺序 | LRU 缓存 |
| `Map` | `TreeMap` | 按 key 排序 | 需要有序遍历 |
| `Map` | `ConcurrentHashMap` | 线程安全，分段/CAS | 并发读写 |
| `Set` | `HashSet` | 去重，无序 | 去重集合 |

要点：

- `HashMap` 在 JDK 8 后采用「数组 + 链表 + 红黑树」，链表长度超过 8 且容量达 64 时转红黑树。
- `HashMap` 非线程安全，多线程并发扩容历史上可能死循环（JDK 7），并发场景一律用 `ConcurrentHashMap`。
- 重写 `equals()` 必须同时重写 `hashCode()`，否则在 `HashMap`/`HashSet` 中行为异常。

## 泛型 {#generics}

编译期类型检查，运行期类型擦除（type erasure）。

```java
List<String> list = new ArrayList<>();   // 编译期约束为 String
// 运行期擦除为 List，泛型信息不保留
```

- 通配符：`? extends T`（上界，能读不能写，生产者）、`? super T`（下界，能写不能读，消费者）——即 PECS 原则。
- 因为类型擦除，不能 `new T[]`、不能用泛型做 `instanceof`。

## 异常体系 {#exceptions}

```
Throwable
├── Error            // 系统级错误，不应捕获（OutOfMemoryError、StackOverflowError）
└── Exception
    ├── RuntimeException   // 非受检异常（NPE、IllegalArgument…）
    └── 其他               // 受检异常（IOException、SQLException…）
```

后端实践：

- 业务异常用自定义 `RuntimeException`，配合全局异常处理器（`@RestControllerAdvice`）统一返回。
- 不要吞异常（`catch` 后空处理），至少要记日志并保留堆栈。
- `finally` 中不要 `return`，会覆盖正常返回值并吞掉异常。

## IO 与 NIO {#io-nio}

| 类型 | 模型 | 特点 |
| --- | --- | --- |
| BIO（`java.io`） | 同步阻塞，面向流 | 简单，连接数高时线程开销大 |
| NIO（`java.nio`） | 同步非阻塞，面向缓冲区 + 通道 + 多路复用 | `Selector` 单线程管理多连接，高并发基础 |
| AIO | 异步非阻塞 | 使用较少 |

Netty、Tomcat NIO 连接器、Kafka 等高并发组件底层都依赖 NIO 的多路复用模型。

## 注解与反射 {#annotations-reflection}

- **注解**：本质是元数据。Spring 的 `@Component`、`@Autowired`、`@Transactional` 都靠反射在运行期读取注解来工作。
- **反射**：运行期动态获取类信息、创建对象、调用方法。是框架实现 IoC、AOP、ORM 映射的基础，但有性能开销，不应在热点路径滥用。

```java
Class<?> clazz = Class.forName("com.example.User");
Object obj = clazz.getDeclaredConstructor().newInstance();
Method m = clazz.getMethod("getName");
Object name = m.invoke(obj);
```

## Java 8+ 关键特性 {#java-8-plus}

后端代码里出现频率最高的现代特性：

- **Lambda 与函数式接口**：`Runnable`、`Function`、`Predicate`、`Supplier`、`Consumer`。
- **Stream**：声明式集合处理。

  ```java
  List<String> names = users.stream()
      .filter(u -> u.getAge() > 18)
      .map(User::getName)
      .collect(Collectors.toList());
  ```

- **Optional**：显式表达「可能为空」，减少 NPE，但不要滥用于字段和参数。
- **新日期时间 API**：`LocalDate`、`LocalDateTime`、`Duration`，线程安全，取代老旧的 `Date`/`SimpleDateFormat`。

较新版本值得关注：

- **`var`（10）**：局部变量类型推断。
- **`Record`（16）**：不可变数据载体，适合 DTO/VO。
- **`sealed`（17）**：密封类，限制继承范围。
- **虚拟线程（21）**：轻量级线程，极大降低高并发 IO 场景的线程成本，是 Java 高并发的重要演进方向。

## 选型与实践建议

- 新项目基线选 **LTS 版本**（Java 17 或 21），Spring Boot 3.x 要求 Java 17 起步。
- DTO/VO 优先用 `Record`，减少样板代码。
- 集合默认 `ArrayList` / `HashMap`，并发场景换并发容器，不要用 `Vector`/`Hashtable` 这类过时同步容器。
