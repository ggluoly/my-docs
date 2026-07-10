---
title: 'JUC 并发包'
description: '基于 JDK 8 梳理 java.util.concurrent 并发包，包括同步器、原子类、Future、CompletableFuture、阻塞队列和常用工具。'
outline: [2, 3]
---

# JUC 并发包

> 本页默认以 JDK 8 为技术基线。

`java.util.concurrent` 是 Java 后端并发编程最常用的工具集，提供线程池、锁、原子类、并发容器、阻塞队列和任务编排能力。

## 核心组成

| 类别 | 常见类型 |
| --- | --- |
| 线程池 | `ExecutorService`、`ThreadPoolExecutor`、`ScheduledThreadPoolExecutor` |
| 锁 | `ReentrantLock`、`ReentrantReadWriteLock`、`StampedLock` |
| 原子类 | `AtomicInteger`、`AtomicLong`、`AtomicReference`、`LongAdder` |
| 并发容器 | `ConcurrentHashMap`、`CopyOnWriteArrayList`、`BlockingQueue` |
| 同步器 | `CountDownLatch`、`CyclicBarrier`、`Semaphore`、`Exchanger` |
| 异步任务 | `Future`、`FutureTask`、`CompletableFuture` |

线程池、锁、并发容器和 AQS / CAS 有独立页面，本页重点梳理 JUC 总体能力和常用同步工具。

## CountDownLatch

`CountDownLatch` 用于等待多个任务完成。

```java
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    executor.execute(() -> {
        try {
            doWork();
        } finally {
            latch.countDown();
        }
    });
}

latch.await();
```

典型场景：主线程等待多个子任务完成后再汇总结果。

## CyclicBarrier

`CyclicBarrier` 用于让多个线程相互等待，到达同一个屏障点后继续执行。

适合分阶段计算、批量任务对齐等场景。

和 `CountDownLatch` 的区别：

- `CountDownLatch` 一次性使用，主线程等其他线程。
- `CyclicBarrier` 可以复用，多个线程相互等待。

## Semaphore

`Semaphore` 信号量用于控制并发访问资源数量。

```java
Semaphore semaphore = new Semaphore(10);

semaphore.acquire();
try {
    callRemoteService();
} finally {
    semaphore.release();
}
```

典型场景：限制同时访问下游服务、文件句柄、外部接口的并发数。

## Future 与 FutureTask

`Future` 表示异步任务结果：

```java
Future<User> future = executor.submit(() -> queryUser(id));
User user = future.get();
```

问题：

- `get()` 会阻塞。
- 多任务编排不方便。
- 异常处理和回调组合较弱。

## CompletableFuture

JDK 8 引入 `CompletableFuture`，用于异步编排。

```java
CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> queryUser(id), executor);
CompletableFuture<List<Order>> orderFuture = CompletableFuture.supplyAsync(() -> queryOrders(id), executor);

CompletableFuture<Result> resultFuture = userFuture.thenCombine(orderFuture, (user, orders) -> {
    return assemble(user, orders);
});
```

常用方法：

| 方法 | 说明 |
| --- | --- |
| `supplyAsync()` | 异步执行并返回结果 |
| `runAsync()` | 异步执行无返回任务 |
| `thenApply()` | 转换结果 |
| `thenCompose()` | 扁平化串联异步任务 |
| `thenCombine()` | 合并两个异步结果 |
| `exceptionally()` | 异常兜底 |
| `allOf()` | 等待多个任务完成 |

实践中建议传入自定义线程池，不要默认使用公共 ForkJoinPool 承载业务阻塞任务。

## 原子类

原子类基于 CAS 实现无锁原子操作。

常见类型：

- `AtomicInteger`
- `AtomicLong`
- `AtomicReference`
- `AtomicStampedReference`
- `LongAdder`

高并发计数场景下，`LongAdder` 通常比 `AtomicLong` 更适合，因为它通过分散热点降低竞争。

## 实践建议

- 等待多个任务完成用 `CountDownLatch`。
- 控制并发许可用 `Semaphore`。
- 复杂异步编排用 `CompletableFuture`，并指定业务线程池。
- 原子类适合简单状态更新，复杂临界区仍应使用锁或重新设计数据结构。
