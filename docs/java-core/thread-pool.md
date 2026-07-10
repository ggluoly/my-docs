---
title: '线程池'
description: '基于 JDK 8 梳理 Java 线程池，包括 ThreadPoolExecutor 核心参数、执行流程、拒绝策略、队列选择和生产配置建议。'
outline: [2, 3]
---

# 线程池

> 本页默认以 JDK 8 为技术基线。

线程池用于复用线程、限制并发、管理任务队列和统一处理拒绝策略。生产环境几乎不应该直接无限制创建线程。

## ThreadPoolExecutor

核心构造方法：

```java
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    corePoolSize,
    maximumPoolSize,
    keepAliveTime,
    TimeUnit.SECONDS,
    workQueue,
    threadFactory,
    rejectedHandler
);
```

参数说明：

| 参数 | 说明 |
| --- | --- |
| `corePoolSize` | 核心线程数 |
| `maximumPoolSize` | 最大线程数 |
| `keepAliveTime` | 非核心线程空闲存活时间 |
| `workQueue` | 任务队列 |
| `threadFactory` | 线程工厂，建议自定义线程名 |
| `rejectedHandler` | 拒绝策略 |

## 执行流程

任务提交后的简化流程：

```text
提交任务
-> 当前线程数 < corePoolSize，创建核心线程
-> 否则尝试进入任务队列
-> 队列满且线程数 < maximumPoolSize，创建非核心线程
-> 仍无法处理，执行拒绝策略
```

这个流程决定了队列选择和线程数设置的效果。

## 常见队列

| 队列 | 特点 | 风险 |
| --- | --- | --- |
| `ArrayBlockingQueue` | 有界数组队列 | 容量需要评估 |
| `LinkedBlockingQueue` | 可有界也可无界 | 无界时可能 OOM |
| `SynchronousQueue` | 不存储任务，直接移交 | 容易快速创建大量线程 |
| `PriorityBlockingQueue` | 优先级队列 | 默认无界，需谨慎 |

生产环境优先使用有界队列，避免任务堆积拖垮服务。

## 拒绝策略

JDK 内置拒绝策略：

| 策略 | 行为 |
| --- | --- |
| `AbortPolicy` | 抛出异常，默认策略 |
| `CallerRunsPolicy` | 调用方线程执行任务，形成反压 |
| `DiscardPolicy` | 直接丢弃任务 |
| `DiscardOldestPolicy` | 丢弃队列最旧任务再提交 |

业务系统中常用自定义拒绝策略记录日志、打点告警，并返回明确失败结果。

## 为什么不推荐 Executors

`Executors` 工厂方法隐藏了关键参数：

| 方法 | 风险 |
| --- | --- |
| `newFixedThreadPool` | 默认使用无界队列，任务过多可能 OOM |
| `newSingleThreadExecutor` | 默认使用无界队列，任务堆积风险 |
| `newCachedThreadPool` | 最大线程数近似无界，可能创建过多线程 |
| `newScheduledThreadPool` | 队列风险和异常处理容易被忽略 |

生产环境应显式使用 `ThreadPoolExecutor`，把线程数、队列和拒绝策略写清楚。

## 参数估算

常见经验：

- CPU 密集型：线程数接近 CPU 核数或核数 + 1。
- IO 密集型：线程数可以更大，但必须结合下游容量、连接池和超时设置。

不要只按公式设置线程池。最终参数要通过压测、监控和业务峰值验证。

## 实践建议

- 按业务隔离线程池，避免慢任务拖垮核心接口。
- 线程必须命名，便于日志和 `jstack` 排查。
- 队列使用有界队列。
- 拒绝策略必须可观测，不能静默丢任务。
- 线程池指标要纳入监控，包括活跃线程数、队列长度、拒绝次数和任务耗时。
