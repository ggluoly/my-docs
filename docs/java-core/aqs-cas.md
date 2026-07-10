---
title: 'AQS / CAS'
description: '基于 JDK 8 梳理 AQS 与 CAS，包括 AbstractQueuedSynchronizer、state、CLH 队列、CAS、ABA 问题和自旋开销。'
outline: [2, 3]
---

# AQS / CAS

> 本页默认以 JDK 8 为技术基线。

AQS 和 CAS 是理解 JUC 的核心。`ReentrantLock`、`Semaphore`、`CountDownLatch`、`ThreadPoolExecutor` 中的许多并发能力都依赖这些底层思想。

## CAS

CAS 是 Compare And Swap，比较并交换。

它包含三个值：

- 内存位置 V。
- 期望旧值 A。
- 新值 B。

只有当 V 当前值等于 A 时，才把 V 更新为 B，否则更新失败。

示意：

```text
if (value == expected) {
    value = newValue;
}
```

真实 CAS 由 CPU 原子指令保证，不是普通 Java if 判断。

## 原子类与 CAS

JDK 8 原子类常用 CAS 实现：

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
```

适合简单共享变量更新，例如计数器、状态标记、引用替换。

## ABA 问题

ABA 指一个值从 A 变成 B，又变回 A。CAS 只比较当前值，可能误以为没有变化。

解决方式：使用版本号或时间戳。

JDK 提供：

- `AtomicStampedReference`
- `AtomicMarkableReference`

示例：

```java
AtomicStampedReference<String> ref = new AtomicStampedReference<>("A", 1);
```

## 自旋开销

CAS 更新失败时通常会重试，称为自旋。

问题：

- 竞争激烈时反复失败，浪费 CPU。
- 只适合较短临界区和简单操作。
- 复杂业务逻辑不适合完全依赖 CAS。

高并发计数场景，`LongAdder` 通过分散热点降低竞争，通常比单点 CAS 的 `AtomicLong` 更适合。

## AQS 是什么

AQS 是 `AbstractQueuedSynchronizer`，JUC 中很多同步器的基础框架。

核心组成：

| 组成 | 说明 |
| --- | --- |
| `volatile int state` | 同步状态 |
| CLH 等待队列 | 管理获取锁失败的线程 |
| CAS | 修改同步状态和队列节点 |
| 模板方法 | 子类实现获取和释放逻辑 |

## AQS 工作思路

以独占锁为例：

```text
线程尝试 CAS 修改 state
-> 成功则获得锁
-> 失败则进入等待队列
-> 前驱节点释放后唤醒后继节点
-> 被唤醒线程再次尝试获取锁
```

AQS 屏蔽了排队、阻塞、唤醒等复杂细节，具体同步器只需要定义 state 的含义和获取释放规则。

## AQS 典型应用

| 工具 | state 含义示例 |
| --- | --- |
| `ReentrantLock` | 锁重入次数 |
| `Semaphore` | 剩余许可数 |
| `CountDownLatch` | 剩余计数 |
| `ReentrantReadWriteLock` | 读锁和写锁状态 |

## 独占与共享

AQS 支持两种模式：

- 独占模式：同一时刻只有一个线程获取成功，例如 `ReentrantLock`。
- 共享模式：同一时刻多个线程可以获取成功，例如 `Semaphore`、`CountDownLatch`。

## 实践建议

- 会用 JUC 工具比手写 AQS 更重要。
- 阅读源码时重点看 state 含义、获取锁失败后的入队逻辑、释放锁后的唤醒逻辑。
- CAS 适合简单原子更新，不适合复杂业务临界区。
- 高竞争场景要关注 CAS 自旋导致的 CPU 消耗。
