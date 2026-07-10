---
title: '线程安全'
description: '基于 JDK 8 梳理 Java 线程安全，包括原子性、可见性、有序性、volatile、synchronized、ThreadLocal 和共享状态控制。'
outline: [2, 3]
---

# 线程安全

> 本页默认以 JDK 8 为技术基线。

线程安全的本质是多个线程同时访问共享可变状态时，程序仍然能得到正确结果。

## 三要素

| 要素 | 含义 | 常见解决手段 |
| --- | --- | --- |
| 原子性 | 一个操作不可被中断 | `synchronized`、锁、原子类 |
| 可见性 | 一个线程修改后，其他线程能看到 | `volatile`、`synchronized`、锁 |
| 有序性 | 避免指令重排导致错误结果 | `volatile`、锁、happens-before 规则 |

线程安全问题通常不是单一原因，而是多个要素组合导致。

## 共享可变状态

线程安全重点关注共享可变状态：

```java
private int count = 0;

public void increment() {
    count++;
}
```

`count++` 包含读取、加一、写回三个步骤，不是原子操作，多线程下会丢失更新。

## volatile

`volatile` 保证可见性和有序性，但不保证复合操作的原子性。

适合状态标志：

```java
private volatile boolean running = true;

public void stop() {
    running = false;
}
```

不适合计数器：

```java
private volatile int count;

public void increment() {
    count++; // 仍然不是原子操作
}
```

计数场景应使用 `AtomicInteger`、`LongAdder` 或锁。

## synchronized

`synchronized` 可以保证原子性、可见性和有序性。

常见用法：

```java
public synchronized void increment() {
    count++;
}
```

或：

```java
public void increment() {
    synchronized (this) {
        count++;
    }
}
```

JDK 6 之后 `synchronized` 做了大量优化，包括偏向锁、轻量级锁和重量级锁等锁升级机制，不能简单认为它一定性能差。

## happens-before

happens-before 是 Java 内存模型中的可见性规则。

常见规则：

- 程序顺序规则：同一线程内前面的操作 happens-before 后面的操作。
- 锁规则：对同一个锁的 unlock happens-before 后续 lock。
- volatile 规则：对 volatile 变量的写 happens-before 后续读。
- 线程启动规则：`Thread.start()` happens-before 线程内动作。
- 线程终止规则：线程内动作 happens-before 其他线程检测到它结束。

## ThreadLocal

`ThreadLocal` 为每个线程提供独立变量副本，常用于保存用户上下文、链路追踪 ID、日期格式化对象等。

```java
private static final ThreadLocal<String> TRACE_ID = new ThreadLocal<>();
```

使用建议：

- 在线程池中使用后必须清理，避免上下文串扰和内存泄漏。
- 清理放在 `finally` 中。

```java
try {
    TRACE_ID.set(traceId);
    doWork();
} finally {
    TRACE_ID.remove();
}
```

## 实践建议

- 优先避免共享可变状态。
- 能用局部变量就不要用成员变量。
- 共享计数用 `AtomicLong` 或 `LongAdder`。
- 复杂临界区用锁保护，并尽量缩小锁范围。
- 不要把线程安全问题交给“多测几次”，并发 bug 往往难以稳定复现。
