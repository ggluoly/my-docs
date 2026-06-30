# 并发编程面试题

## volatile 能保证原子性吗？

### 标准回答

不能。`volatile` 保证可见性和有序性，但不保证复合操作的原子性。比如 `i++` 包含读取、计算、写回三个步骤，多线程下仍然会丢失更新。

### 常见追问

- `volatile` 适合什么场景？
- `synchronized` 和 `volatile` 有什么区别？
- 什么是 happens-before？

### 关联文档

- [线程安全三要素](/java-core/concurrency#thread-safety)

## synchronized 和 ReentrantLock 有什么区别？

### 标准回答

`synchronized` 是 JVM 内置锁，使用简单，自动释放；`ReentrantLock` 是 JUC 显式锁，支持可中断、可超时、公平锁和多个条件队列，但需要手动释放。

### 关联文档

- [锁](/java-core/concurrency#locks)

## 线程池核心参数有哪些？

### 标准回答

线程池核心参数包括核心线程数、最大线程数、空闲线程存活时间、任务队列、线程工厂和拒绝策略。任务执行流程是核心线程、队列、非核心线程、拒绝策略。

### 常见追问

- CPU 密集型和 IO 密集型线程池怎么设置？
- 拒绝策略有哪些？
- 不同业务为什么要隔离线程池？

### 关联文档

- [线程池](/java-core/concurrency#thread-pool)

## 为什么不推荐 Executors？

### 标准回答

`Executors` 的部分工厂方法会创建无界队列或无界线程数的线程池，在高并发或任务堆积时容易 OOM。生产环境应该显式创建 `ThreadPoolExecutor` 并设置有界队列和拒绝策略。

### 关联文档

- [线程池](/java-core/concurrency#thread-pool)

## AQS 是什么？

### 标准回答

AQS 是 JUC 同步器的基础框架，核心是一个 `volatile int state` 和一个 CLH 等待队列。`ReentrantLock`、`Semaphore`、`CountDownLatch` 等都基于 AQS 实现。

### 关联文档

- [AQS 原理](/java-core/concurrency#aqs)
