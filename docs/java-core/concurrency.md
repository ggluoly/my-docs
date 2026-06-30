# 并发编程

> 本页为知识库新增内容，不属于《Spring 技术套件》原文档。

后端服务天然是多线程的（每个请求一个线程）。理解并发，才能写出线程安全的代码、用好线程池、排查死锁和竞态问题。

## 线程基础

创建线程的方式：继承 `Thread`、实现 `Runnable`、实现 `Callable`（有返回值）。实际开发中**几乎不直接 new 线程**，而是用线程池。

线程状态：`NEW → RUNNABLE → BLOCKED / WAITING / TIMED_WAITING → TERMINATED`。

## 线程安全三要素

| 要素 | 含义 | 解决手段 |
| --- | --- | --- |
| **原子性** | 操作不可中断 | `synchronized`、`Atomic` 类、锁 |
| **可见性** | 一个线程的修改对其他线程可见 | `volatile`、`synchronized` |
| **有序性** | 禁止指令重排 | `volatile`、`happens-before` 规则 |

### volatile

保证**可见性**和**有序性**，但**不保证原子性**。适用于状态标志位（如 `volatile boolean running`），不适用于 `i++` 这类复合操作。

### synchronized

保证原子性、可见性、有序性。JDK 6 后引入偏向锁、轻量级锁、重量级锁的**锁升级**机制，性能已大幅优化。

## JUC 并发包

`java.util.concurrent` 是企业开发最常用的并发工具集。

### 线程池（重点）

```java
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    corePoolSize,      // 核心线程数
    maximumPoolSize,   // 最大线程数
    keepAliveTime,     // 空闲线程存活时间
    TimeUnit.SECONDS,
    workQueue,         // 任务队列
    threadFactory,     // 线程工厂（建议自定义命名，便于排查）
    rejectedHandler    // 拒绝策略
);
```

**为什么不用 `Executors` 工厂方法**：`newFixedThreadPool` / `newCachedThreadPool` 的队列或线程数无界，容易 OOM。生产环境应**手动 new `ThreadPoolExecutor`** 并显式设置队列大小和拒绝策略。

任务提交后的执行流程：核心线程 → 队列 → 非核心线程 → 拒绝策略。

### 锁

| 工具 | 说明 |
| --- | --- |
| `ReentrantLock` | 可重入锁，比 synchronized 更灵活（可中断、可超时、公平锁） |
| `ReentrantReadWriteLock` | 读写锁，读读不互斥，适合读多写少 |
| `StampedLock` | JDK 8，支持乐观读，性能更高 |

### 并发容器

| 容器 | 替代 | 说明 |
| --- | --- | --- |
| `ConcurrentHashMap` | HashMap | 高并发下的线程安全 Map，JDK 8 用 CAS + synchronized 分段 |
| `CopyOnWriteArrayList` | ArrayList | 读多写少场景 |
| `ConcurrentLinkedQueue` | — | 无锁并发队列 |
| `BlockingQueue` | — | 阻塞队列，线程池和生产者-消费者模型基础 |

### 原子类

`AtomicInteger`、`AtomicLong`、`LongAdder`（高并发计数优于 AtomicLong）等，基于 **CAS** 实现无锁原子操作。

### 协调工具

- `CountDownLatch`：等待多个任务完成。
- `CyclicBarrier`：多线程相互等待到同一屏障点。
- `Semaphore`：信号量，控制并发资源数。
- `CompletableFuture`：异步编排，组合多个异步任务（替代 Future）。

```java
CompletableFuture.supplyAsync(() -> queryUser(id))
    .thenCombine(
        CompletableFuture.supplyAsync(() -> queryOrders(id)),
        (user, orders) -> assemble(user, orders))
    .thenAccept(result -> log.info("done"));
```

## AQS 原理

`AbstractQueuedSynchronizer` 是 `ReentrantLock`、`Semaphore`、`CountDownLatch` 等的底层框架。核心：一个 `volatile int state` 状态 + 一个 CLH 等待队列。理解 AQS 能看懂大部分 JUC 同步器的实现。

## CAS 与 ABA

CAS（Compare And Swap）是无锁并发的基础，由 CPU 指令保证原子性。问题：

- **ABA 问题**：值从 A 改成 B 又改回 A，CAS 察觉不到。用 `AtomicStampedReference` 加版本号解决。
- **自旋开销**：高竞争下 CAS 反复失败重试，消耗 CPU。

## 虚拟线程（JDK 21+）

Project Loom 引入的**虚拟线程**是轻量级线程，由 JVM 调度，可创建百万级。适合 IO 密集型场景，大幅简化高并发编程，未来会逐步替代「线程池 + 异步回调」的复杂写法。Spring Boot 3.2+ 已支持。

## 实践建议

- 线程池**手动创建**并合理命名，按业务隔离（不同业务用不同线程池，避免互相拖垮）。
- 线程池参数根据任务类型设置：CPU 密集型 ≈ 核数 + 1；IO 密集型可更大。
- 共享可变状态优先用 JUC 工具，避免裸用 `synchronized` 大锁。
- 分布式环境下的并发控制（如防重复提交）要用[分布式锁](/storage/redis)，单机锁无效。
- 排查死锁、CPU 飙高用 `jstack`（见 [JVM](./jvm) 排查章节）。
