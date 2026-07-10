---
title: '线程基础'
description: '基于 JDK 8 梳理 Java 线程基础，包括线程创建方式、线程状态、start 与 run、interrupt、join、sleep 和守护线程。'
outline: [2, 3]
---

# 线程基础

> 本页默认以 JDK 8 为技术基线。虚拟线程属于 Java 21 特性，放在 Java 18-21 版本特性页面中。

后端服务天然是多线程的。每个请求、异步任务、定时任务和消息消费线程都可能同时访问共享资源。

## 创建线程

常见方式：

| 方式 | 说明 |
| --- | --- |
| 继承 `Thread` | 简单但不利于复用，业务中少用 |
| 实现 `Runnable` | 无返回值任务 |
| 实现 `Callable` | 有返回值任务，配合 `Future` |
| 线程池 | 生产环境推荐方式 |

示例：

```java
ExecutorService executor = Executors.newFixedThreadPool(4);
Future<String> future = executor.submit(new Callable<String>() {
    @Override
    public String call() {
        return "ok";
    }
});
```

生产环境不推荐直接 `new Thread()` 执行业务任务，应通过线程池统一管理线程数量、队列和拒绝策略。

## start 与 run

`start()` 会启动新线程，由 JVM 调度执行 `run()`。

`run()` 只是普通方法调用，不会创建新线程。

```java
Thread thread = new Thread(task);
thread.start(); // 正确：启动新线程
thread.run();   // 普通方法调用
```

## 线程状态

JDK 8 中线程状态：

```text
NEW
RUNNABLE
BLOCKED
WAITING
TIMED_WAITING
TERMINATED
```

说明：

| 状态 | 含义 |
| --- | --- |
| `NEW` | 线程对象已创建，尚未启动 |
| `RUNNABLE` | 可运行或正在运行 |
| `BLOCKED` | 等待进入 synchronized 临界区 |
| `WAITING` | 无限期等待其他线程唤醒 |
| `TIMED_WAITING` | 有超时时间的等待 |
| `TERMINATED` | 执行结束 |

## sleep、wait、join

| 方法 | 作用 | 是否释放锁 |
| --- | --- | --- |
| `Thread.sleep()` | 当前线程休眠指定时间 | 不释放已持有的锁 |
| `Object.wait()` | 当前线程等待其他线程通知 | 释放当前对象锁 |
| `Thread.join()` | 等待目标线程执行结束 | 内部依赖等待通知机制 |

`wait()` 必须在持有对象监视器的同步块或同步方法中调用，否则会抛出 `IllegalMonitorStateException`。

## interrupt

`interrupt()` 不是强制杀死线程，而是设置中断标记，或让处于阻塞等待状态的线程抛出 `InterruptedException`。

推荐写法：

```java
while (!Thread.currentThread().isInterrupted()) {
    doWork();
}
```

捕获 `InterruptedException` 后通常应恢复中断标记：

```java
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}
```

## 守护线程

守护线程是为其他线程服务的后台线程。当 JVM 中只剩守护线程时，JVM 可以退出。

```java
Thread thread = new Thread(task);
thread.setDaemon(true);
thread.start();
```

业务关键任务不要依赖守护线程完成，因为 JVM 退出时守护线程可能来不及收尾。

## 实践建议

- 业务任务优先交给线程池，不直接创建大量线程。
- 线程要命名，便于 `jstack` 和日志排查。
- 正确处理中断，不要吞掉 `InterruptedException`。
- 不要使用 `Thread.stop()`、`suspend()`、`resume()` 这类不安全方法。
