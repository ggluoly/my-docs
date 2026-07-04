---
title: '并发编程面试题'
description: 'Java 并发编程面试题整理，覆盖线程基础、线程池、锁、ThreadLocal、AQS、CAS 和并发安全。'
outline: [2, 3]
---

# 并发编程面试题

本页整理 Java 并发面试高频题，重点覆盖线程基础、线程通信、线程池、锁、`ThreadLocal`、AQS、CAS 和原子类。回答时先说明结论，再补充底层机制和工程取舍。

## 线程基础

### 创建线程有哪几种方式？

常见方式包括继承 `Thread`、实现 `Runnable`、实现 `Callable` 配合 `FutureTask`、提交任务到线程池。生产环境更推荐线程池统一管理线程，避免频繁创建和销毁线程。

#### 常见追问

- `Runnable` 和 `Callable` 有什么区别？
- 为什么生产环境不推荐直接 `new Thread()`？
- 线程池如何复用线程？

#### 关联文档

- [线程基础](/java-core/concurrency#thread-basics)

### Runnable 和 Callable 有什么区别？

`Runnable` 的 `run()` 方法没有返回值，也不能直接抛出受检异常；`Callable` 的 `call()` 方法有返回值，可以抛出异常，通常配合 `Future` 或线程池的 `submit()` 使用。

#### 常见追问

- `Future` 如何获取执行结果？
- `FutureTask` 的作用是什么？
- 异步任务异常怎么处理？

### run 和 start 有什么区别？

`start()` 会启动一个新线程，由 JVM 调度后执行 `run()`；直接调用 `run()` 只是普通方法调用，不会创建新线程。一个线程对象只能调用一次 `start()`，重复调用会抛出 `IllegalThreadStateException`。

#### 常见追问

- 为什么线程启动只能调用一次？
- 线程启动后什么时候执行由谁决定？
- 线程执行完还能再次启动吗？

### Java 线程有哪些状态？

Java 线程状态包括 `NEW`、`RUNNABLE`、`BLOCKED`、`WAITING`、`TIMED_WAITING`、`TERMINATED`。其中 `RUNNABLE` 包含就绪和运行中，是否真正占用 CPU 由操作系统调度决定。

#### 常见追问

- `BLOCKED` 和 `WAITING` 有什么区别？
- `sleep()` 后线程进入什么状态？
- 如何查看线程状态？

### 守护线程是什么？

守护线程是为用户线程提供后台服务的线程，例如 GC 线程。当 JVM 中只剩守护线程时，JVM 会退出，守护线程也会随之结束。业务关键任务不应该依赖守护线程保证最终执行完成。

#### 常见追问

- 如何设置守护线程？
- 守护线程适合做什么？
- 为什么不能把业务落库任务放到守护线程？

## 线程通信

### sleep 和 wait 有什么区别？

`sleep()` 是 `Thread` 的静态方法，让当前线程暂停一段时间，不释放已持有的锁；`wait()` 是 `Object` 的方法，必须在同步代码块中调用，调用后会释放对象锁，等待其他线程 `notify()`、`notifyAll()` 或超时唤醒。

#### 常见追问

- 为什么 `wait()` 必须在同步代码块里调用？
- `wait()` 被唤醒后会立刻执行吗？
- `sleep()` 会释放锁吗？

#### 关联文档

- [线程安全](/java-core/concurrency#thread-safety)

### notify 和 notifyAll 有什么区别？

`notify()` 随机唤醒一个等待在该对象监视器上的线程；`notifyAll()` 唤醒所有等待线程。被唤醒的线程不会立刻执行，而是重新竞争对象锁。条件复杂或多个条件等待时更推荐 `notifyAll()`，避免唤醒错误线程导致假死。

#### 常见追问

- 为什么推荐用 while 判断等待条件？
- 什么是虚假唤醒？
- `Condition` 和 `wait/notify` 有什么区别？

## 线程池

### 线程池核心参数有哪些？

线程池核心参数包括核心线程数、最大线程数、空闲线程存活时间、任务队列、线程工厂和拒绝策略。任务执行流程是核心线程、队列、非核心线程、拒绝策略。

#### 常见追问

- CPU 密集型和 IO 密集型线程池怎么设置？
- 拒绝策略有哪些？
- 不同业务为什么要隔离线程池？

#### 关联文档

- [线程池](/java-core/concurrency#thread-pool)

### 为什么不推荐 Executors？

`Executors` 的部分工厂方法会创建无界队列或无界线程数的线程池，在高并发或任务堆积时容易 OOM。生产环境应该显式创建 `ThreadPoolExecutor` 并设置有界队列和拒绝策略。

#### 常见追问

- `newFixedThreadPool` 的风险是什么？
- `newCachedThreadPool` 的风险是什么？
- 线程池队列为什么要有界？

#### 关联文档

- [线程池](/java-core/concurrency#thread-pool)

### 线程池有哪些创建方式？

常见方式包括 `Executors.newSingleThreadExecutor()`、`newFixedThreadPool()`、`newCachedThreadPool()`、`newScheduledThreadPool()`、`newWorkStealingPool()`，以及直接使用 `ThreadPoolExecutor`。面试可以说明这些工厂方法的用途，但生产更推荐直接使用 `ThreadPoolExecutor` 明确参数。

#### 常见追问

- 定时任务线程池底层怎么实现？
- `ForkJoinPool` 适合什么场景？
- 为什么阿里 Java 规范不推荐 `Executors`？

### 线程池有哪些状态？

线程池状态包括 `RUNNING`、`SHUTDOWN`、`STOP`、`TIDYING`、`TERMINATED`。`RUNNING` 接收并处理任务；`SHUTDOWN` 不再接收新任务但处理队列任务；`STOP` 不接收新任务也不处理队列任务，并尝试中断运行中任务。

#### 常见追问

- `shutdown()` 和 `shutdownNow()` 有什么区别？
- 线程池如何优雅关闭？
- 线程池状态存在哪里？

### submit 和 execute 有什么区别？

`execute()` 只能提交 `Runnable`，没有返回值；`submit()` 可以提交 `Runnable` 或 `Callable`，会返回 `Future`。异常处理也不同：`execute()` 的异常通常由线程的异常处理器处理，`submit()` 的异常会封装在 `Future` 中，需要调用 `get()` 才会抛出。

#### 常见追问

- 为什么 `submit()` 后异常看起来被吞了？
- `Future.get()` 会阻塞吗？
- 如何设计异步任务超时？

## 锁与同步

### volatile 能保证原子性吗？

不能。`volatile` 保证可见性和有序性，但不保证复合操作的原子性。比如 `i++` 包含读取、计算、写回三个步骤，多线程下仍然会丢失更新。

#### 常见追问

- `volatile` 适合什么场景？
- `synchronized` 和 `volatile` 有什么区别？
- 什么是 happens-before？

#### 关联文档

- [线程安全三要素](/java-core/concurrency#thread-safety)

### synchronized 底层怎么实现？

`synchronized` 在字节码层面通过 `monitorenter` 和 `monitorexit` 实现，底层依赖对象监视器 monitor。进入同步块时线程尝试获取对象 monitor，退出时释放 monitor。JDK 6 之后 JVM 对锁做了大量优化，包括偏向锁、轻量级锁、自旋和锁消除等。

#### 常见追问

- 对象头里存了哪些锁信息？
- 同步方法和同步代码块字节码有什么区别？
- 为什么异常退出也能释放锁？

#### 关联文档

- [锁](/java-core/concurrency#locks)

### synchronized 锁升级过程是什么？

锁升级是 JVM 为降低同步成本做的优化，典型过程是无锁、偏向锁、轻量级锁、重量级锁。无竞争时偏向第一个线程；轻微竞争时使用轻量级锁和 CAS；竞争激烈时膨胀为重量级锁，由操作系统互斥量参与调度。新版本 JDK 中偏向锁已逐步废弃，但面试仍常考锁优化思想。

#### 常见追问

- 锁能降级吗？
- 自旋锁解决什么问题？
- 重量级锁为什么开销大？

### synchronized 和 ReentrantLock 有什么区别？

`synchronized` 是 JVM 内置锁，使用简单，自动释放；`ReentrantLock` 是 JUC 显式锁，支持可中断、可超时、公平锁和多个条件队列，但需要手动释放。

#### 常见追问

- `ReentrantLock` 为什么要放在 finally 中释放？
- 公平锁和非公平锁有什么区别？
- `Condition` 解决什么问题？

#### 关联文档

- [锁](/java-core/concurrency#locks)

### synchronized 和 Lock 有什么区别？

`synchronized` 是语言级关键字，自动加锁和释放锁；`Lock` 是接口，需要手动调用 `lock()` 和 `unlock()`。`Lock` 提供更灵活的能力，比如尝试加锁、超时加锁、可中断加锁、公平锁和多个条件队列。

#### 常见追问

- `tryLock()` 适合什么场景？
- `Lock` 使用不当有什么风险？
- 为什么 `synchronized` 越来越常用？

### synchronized 和 volatile 有什么区别？

`volatile` 只保证变量可见性和有序性，不保证复合操作原子性；`synchronized` 同时保证互斥、可见性和原子性。读多写少且只需要状态标记时可以用 `volatile`，涉及临界区和复合操作时应使用锁或原子类。

#### 常见追问

- `volatile` 为什么禁止指令重排？
- 单例双重检查为什么需要 `volatile`？
- `AtomicInteger` 和 `volatile int` 有什么区别？

### 什么是死锁？怎么预防？

死锁是多个线程互相持有对方需要的锁，导致所有线程都无法继续执行。预防方式包括固定加锁顺序、减少锁粒度、避免锁嵌套、使用 `tryLock()` 超时退出、缩短持锁时间和使用并发工具类替代手写锁。

#### 常见追问

- 死锁的四个必要条件是什么？
- 线上如何排查死锁？
- 数据库死锁和 Java 死锁有什么区别？

## ThreadLocal 与原子类

### ThreadLocal 是什么？适合什么场景？

`ThreadLocal` 为每个线程保存独立变量副本，线程之间互不影响。常见场景包括用户上下文、链路追踪 traceId、数据库连接、事务上下文等。使用线程池时必须注意清理，避免线程复用导致数据串号和内存泄漏。

#### 常见追问

- `ThreadLocalMap` 的 key 为什么是弱引用？
- 为什么线程池中使用后要 `remove()`？
- `InheritableThreadLocal` 解决什么问题？

### atomic 原理是什么？

JUC 原子类主要基于 `volatile`、CAS 和底层 CPU 原子指令实现。CAS 会比较内存中的旧值是否等于预期值，如果相等则更新，否则失败重试。它避免了重量级锁，但可能存在 ABA、自旋开销和只能保证单变量原子更新等问题。

#### 常见追问

- CAS 有什么缺点？
- ABA 问题怎么解决？
- `AtomicInteger` 和 `LongAdder` 有什么区别？

#### 关联文档

- [AQS / CAS](/java-core/concurrency#aqs)

### AQS 是什么？

AQS 是 JUC 同步器的基础框架，核心是一个 `volatile int state` 和一个 CLH 等待队列。`ReentrantLock`、`Semaphore`、`CountDownLatch` 等都基于 AQS 实现。

#### 常见追问

- AQS 独占模式和共享模式有什么区别？
- `state` 在不同同步器里表示什么？
- AQS 为什么使用队列？

#### 关联文档

- [AQS 原理](/java-core/concurrency#aqs)
