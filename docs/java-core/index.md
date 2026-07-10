---
title: 'Java 基础'
description: 'Java 基础技术文档，以 JDK 8 讲解语言、JVM、并发与存量项目基础，并补充 Java 17/21 和现代 Spring Boot 3.x 新项目基线。'
---

# Java 基础

> 本栏目为知识库新增内容，不属于《Spring 技术套件》原文档。它补齐企业 Java 后端开发的语言与运行时根基——这是微服务技术栈的前提，却常被「技术栈地图」类资料默认跳过。

> 本栏目采用双基线：语言、JVM、并发原理和存量项目维护默认以 JDK 8 讲解；现代 Spring Boot 3.x 新项目最低使用 Java 17，并在框架、依赖、Agent 和部署环境兼容时选择 Java 17 / 21，优先评估 Java 21 LTS。JDK 8 是基础与存量基线，不是现代新项目的默认运行版本。

Spring Cloud 的每一个微服务，本质上都是一个跑在 JVM 上的 Java 应用。框架解决的是「服务怎么治理」，而语言、运行时和并发能力决定的是「单个服务能不能写对、跑稳、查得了问题」。线上排查的很多疑难（内存溢出、CPU 飙高、线程死锁、GC 停顿），最终都要落到这一层。

## 本栏目内容

- 语言基础：[基础语法](./basic-syntax)、[集合框架](./collections)、[泛型](./generics)、[异常体系](./exceptions)、[IO 与 NIO](./io-nio)、[注解与反射](./annotations-reflection)。
- JVM：[运行时内存结构](./runtime-memory)、[垃圾回收](./garbage-collection)、[类加载机制](./class-loading)、[线上问题排查](./troubleshooting)、[JVM 启动参数](./jvm-options)。
- 并发编程：[线程基础](./thread-basics)、[线程安全](./thread-safety)、[JUC 并发包](./juc)、[线程池](./thread-pool)、[锁](./locks)、[并发容器](./concurrent-containers)、[AQS / CAS](./aqs-cas)。
- Java 版本特性：[Java 8 特性](./features/java-8)、[Java 9-11 特性](./features/java-9-11)、[Java 12-17 特性](./features/java-12-17)、[Java 18-21 特性](./features/java-18-21)、[Java 22-25 特性](./features/java-22-25)。

## 能力入口

| 能力 | 先看什么 | 重点问题 |
| --- | --- | --- |
| 语言基础 | [基础语法](./basic-syntax)、[集合框架](./collections)、[泛型](./generics) | 类型怎么选、集合怎么用、对象怎么设计 |
| 运行时 | [运行时内存结构](./runtime-memory)、[垃圾回收](./garbage-collection)、[线上问题排查](./troubleshooting) | OOM、Full GC、CPU 飙高怎么定位 |
| 并发能力 | [线程安全](./thread-safety)、[线程池](./thread-pool)、[AQS / CAS](./aqs-cas) | 高并发下如何保证正确性和稳定性 |
| 版本演进 | [Java 8 特性](./features/java-8)、[Java 12-17 特性](./features/java-12-17)、[Java 18-21 特性](./features/java-18-21) | JDK 8 存量基线是什么，Java 17 / 21 新项目基线能带来什么 |

## 知识地图

| 方向 | 关键点 | 为什么重要 |
| --- | --- | --- |
| 语言核心 | 基础语法、基本数据类型、集合框架、泛型、异常体系、Stream / Lambda、反射 | 日常写业务代码的基本功，也是框架底层原理的基础 |
| JVM | 运行时内存、GC、类加载、调优 | 线上 OOM、Full GC、内存泄漏排查的根基 |
| 并发 | 线程模型、`synchronized`/`volatile`、线程池、`JUC` | 高并发接口、异步任务、数据一致性的关键 |
| 版本特性 | Java 8 基础能力、Java 9+ 演进、Java 17 / 21 LTS 差异 | 帮助区分存量维护与新项目基线，判断升级收益和兼容性风险 |

## 建议学习顺序

```
语言核心（先能写对）
  -> 并发编程（再能扛住高并发）
  -> JVM（最后能调优和排障）
  -> Java 版本特性（理解升级收益和风险）
```

新手优先打牢语言核心；有一定经验后，并发和 JVM 是从「会写」到「写好」的分水岭，也是面试和线上排障的高频区。

## 高频问题

- `HashMap` 为什么线程不安全？什么时候用 `ConcurrentHashMap`？
- `volatile` 能保证原子性吗？和 `synchronized` 有什么区别？
- 为什么生产环境不推荐直接用 `Executors` 创建线程池？
- Full GC 频繁、CPU 飙高、线程死锁分别怎么排查？
