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
  Runnable 的 run() 方法没有返回值，Callable 的 call() 方法有返回值。
  Runnable 的 run() 不能直接抛出受检异常，Callable 的 call() 可以抛出异常。
  Runnable 通常配合 Thread 或线程池使用，Callable 一般配合线程池和 Future 使用。
  Runnable 提交到线程池用 execute() 或 submit()，Callable 只能用 submit()。
- 为什么生产环境不推荐直接 `new Thread()`？
  频繁创建和销毁线程成本高，会消耗 CPU 和内存资源。
  线程数量不可控，如果请求量一大，每个请求都 new Thread()，可能导致线程过多，甚至 OOM。
  缺少统一管理，像线程命名、异常处理、监控、超时控制、拒绝策略都不好做。
  任务执行结果也不好获取，不像线程池可以配合 Future。
  线程复用能力差，执行完就销毁，资源利用率低。
- 线程池如何复用线程？
  线程池复用线程的核心是：线程执行完一个任务后不会立即销毁，而是继续从任务队列里取下一个任务执行。

#### 关联文档

- [线程基础](/java-core/thread-basics)

### Runnable 和 Callable 有什么区别？

`Runnable` 的 `run()` 方法没有返回值，也不能直接抛出受检异常；`Callable` 的 `call()` 方法有返回值，可以抛出异常，通常配合 `Future` 或线程池的 `submit()` 使用。

#### 常见追问

- `Future` 如何获取执行结果？
  Future 获取执行结果主要是调用 get() 方法。
  比如：
    `Future<String> future = executorService.submit(callable)`;
    `String result = future.get()`;
  这里 get() 会阻塞当前线程，直到任务执行完成并返回结果。
  如果不想一直阻塞，可以用带超时时间的：
    `future.get(3, TimeUnit.SECONDS)`;
  如果任务执行过程中抛异常，调用 get() 时会抛出 `ExecutionException`，真正的异常在 `getCause()` 里。
  如果任务被取消了，`get()` 会抛 `CancellationException`。
  一般配合 `isDone()` 判断是否完成，或者用超时 `get()`，避免主线程无限等待。
- `FutureTask` 的作用是什么？
  主要是把 Callable 或 Runnable 包装成一个既可以执行、又可以获取结果的任务。同时实现了 Runnable 和 Future 接口，所以有两个能力：
  可以作为 Runnable 被线程执行，比如 new Thread(futureTask).start()。
  可以作为 Future 获取执行结果，比如调用 futureTask.get()。
  **FutureTask 的作用就是：把异步任务和结果获取能力封装在一起。**
- 异步任务异常怎么处理？
  异步任务的异常不能只依赖日志，因为异常可能被线程池吞掉，关键是按提交方式处理。
  如果用 submit() 提交任务，通过 future.get() 获取，捕获 ExecutionException，再通过 getCause() 拿到真实异常：
  如果用 execute() 提交 Runnable，通过自定义线程工厂统一设置异常处理器。
  如果是 CompletableFuture，使用 exceptionally() 做兜底，或者用 handle() 同时处理正常结果和异常。
  在 Spring 的 @Async 中，返回 Future 或 CompletableFuture 时同样通过结果对象处理；如果返回 void，需要配置 AsyncUncaughtExceptionHandler。
  实际项目里会统一记录任务参数、链路标识和完整异常；对于可重试任务再结合重试机制或消息队列补偿，避免异常只被记录但业务没有恢复。

### run 和 start 有什么区别？

`start()` 会启动一个新线程，由 JVM 调度后执行 `run()`；直接调用 `run()` 只是普通方法调用，不会创建新线程。一个线程对象只能调用一次 `start()`，重复调用会抛出 `IllegalThreadStateException`。

#### 常见追问

- 为什么线程启动只能调用一次？
  因为一个 Thread 对象只能对应一次完整的线程生命周期。
  第一次调用 start() 后，线程状态会从 NEW 变为 RUNNABLE，JVM 会创建并调度对应的底层原生线程；线程执行结束后状态变为 TERMINATED。再次调用时，线程已经不处于 NEW 状态，JDK 会直接抛出 IllegalThreadStateException。
  再次执行相同逻辑，应该创建新的 Thread 对象，或者更推荐提交任务到线程池。直接调用 run() 可以调用多次，但它只是普通方法调用，不会创建新线程。
- 线程启动后什么时候执行由谁决定？
  调用 start() 后，线程只是进入 RUNNABLE 状态，不代表会立刻执行。
  具体什么时候真正拿到 CPU 执行，由操作系统的线程调度器决定，JVM 不能精确控制。
  开发中不能依赖线程的启动顺序或执行先后；如果有顺序要求，使用 join()、CountDownLatch、Semaphore、CyclicBarrier 或锁等同步工具来保证。

### Java 线程有哪些状态？

Java 线程状态包括 `NEW`、`RUNNABLE`、`BLOCKED`、`WAITING`、`TIMED_WAITING`、`TERMINATED`。其中 `RUNNABLE` 包含就绪和运行中，是否真正占用 CPU 由操作系统调度决定。

#### 常见追问

- `BLOCKED` 和 `WAITING` 有什么区别？
  BLOCKED 是线程在等待获取 synchronized 的监视器锁，比如其他线程还没有释放锁；拿到锁后才会继续执行。此时调用 interrupt() 不会让它立即退出锁竞争。
  WAITING 是线程主动进入无限期等待，通常由 Object.wait()、Thread.join()、LockSupport.park() 触发；需要其他线程通过 notify()、unpark()、目标线程结束，或中断来唤醒。
  简单说，**BLOCKED 是“等锁”，WAITING 是“等通知或条件成立”**。
- `sleep()` 后线程进入什么状态？
  会进入 TIMED_WAITING 状态。等待时间结束后，线程回到 RUNNABLE 状态，等待操作系统再次调度执行。sleep() 不会释放已经持有的 synchronized 监视器锁；如果需要释放锁等待条件，应使用 wait()。
- 如何查看线程状态？
  代码中调用 `thread.getState()`，可以得到 Java 线程状态，例如 RUNNABLE、BLOCKED、WAITING、TIMED_WAITING。
  线上排查常用 `jstack <pid> `导出线程快照，查看每个线程的状态、调用栈以及是否在等锁。
  使用 `jcmd <pid> Thread.print`，效果和 jstack 类似。
  图形化工具可以用 JConsole、VisualVM 或 Arthas 的 thread 命令。 需要注意，jstack 里显示的 RUNNABLE 不一定代表线程正在占用 CPU，也可能处于可运行但等待系统调度的状态。

### 守护线程是什么？

守护线程是为用户线程提供后台服务的线程，例如 GC 线程。当 JVM 中只剩守护线程时，JVM 会退出，守护线程也会随之结束。业务关键任务不应该依赖守护线程保证最终执行完成。

#### 常见追问

- 如何设置守护线程？
  通过 Thread#setDaemon(true) 设置，并且必须在线程启动前调用：
  ```
  Thread thread = new Thread(task);
  thread.setDaemon(true);
  thread.start();
  ```
  守护线程会随所有用户线程结束而自动退出，常用于垃圾回收、监控或后台任务。
  如果线程已经调用 start()，再设置会抛出 IllegalThreadStateException。
- 守护线程适合做什么？
  适合执行不需要保证完成的后台辅助任务，例如：
    日志刷新、监控采集、定时清理缓存。
    心跳检测、连接保活等后台维护任务。
    JVM 的垃圾回收线程也是守护线程。 核心原则是：任务可以随 JVM 退出直接终止，不能用于订单落库、文件写入、消息消费等必须可靠完成的业务。
- 为什么不能把业务落库任务放到守护线程？
  因为当所有非守护线程结束后，JVM 会直接退出，守护线程不会等待任务执行完成。
  如果把落库放在守护线程，可能出现数据还没提交、事务没完成、连接没释放，进程就退出了，导致数据丢失或状态不一致。
  所以核心业务任务要使用用户线程或线程池，并配合事务、重试和优雅停机保证执行完成。

## 线程通信

### sleep 和 wait 有什么区别？

`sleep()` 是 `Thread` 的静态方法，让当前线程暂停一段时间，不释放已持有的锁；`wait()` 是 `Object` 的方法，必须在同步代码块中调用，调用后会释放对象锁，等待其他线程 `notify()`、`notifyAll()` 或超时唤醒。

#### 常见追问

- 为什么 `wait()` 必须在同步代码块里调用？
  因为 wait() 会释放当前对象的监视器锁，并让线程进入该对象的等待队列，必须先持有这个对象的锁才能保证操作正确。
- `wait()` 被唤醒后会立刻执行吗？
  不会立刻执行。notify() 或 notifyAll() 只是让等待线程从 WAITING 状态进入锁竞争状态，它还需要重新获取对应对象的监视器锁。只有拿到锁后，wait() 才会返回并继续执行同步代码；如果锁仍被其他线程持有，就会继续阻塞。
- `sleep()` 会释放锁吗？
  不会。Thread.sleep() 只是让当前线程进入 TIMED_WAITING 状态，线程仍然持有已经获取的 synchronized 锁。
  因此其他线程无法进入同一个对象的同步代码块，直到该线程睡眠结束并退出同步块释放锁。

#### 关联文档

- [线程安全](/java-core/thread-safety)

### notify 和 notifyAll 有什么区别？

`notify()` 随机唤醒一个等待在该对象监视器上的线程；`notifyAll()` 唤醒所有等待线程。被唤醒的线程不会立刻执行，而是重新竞争对象锁。条件复杂或多个条件等待时更推荐 `notifyAll()`，避免唤醒错误线程导致假死。

#### 常见追问

- 为什么推荐用 while 判断等待条件？
- 什么是虚假唤醒？
- `Condition` 和 `wait/notify` 有什么区别？

### wait、notify 和 notifyAll 为什么定义在 Object 中？

`wait()`、`notify()` 和 `notifyAll()` 都依赖对象监视器锁，线程是在某个对象的等待队列上等待和唤醒的，因此它们定义在 `Object` 中，而不是 `Thread` 中。这样任意对象都可以作为同步锁和线程协作载体。

#### 常见追问

- 调用 `wait()` 前为什么必须先持有对象锁？
- `notify()` 唤醒的是线程还是对象？
- `Condition` 为什么可以支持多个等待队列？

## 线程池

### 线程池核心参数有哪些？

线程池核心参数包括核心线程数、最大线程数、空闲线程存活时间、任务队列、线程工厂和拒绝策略。任务执行流程是核心线程、队列、非核心线程、拒绝策略。

#### 常见追问

- CPU 密集型和 IO 密集型线程池怎么设置？
- 拒绝策略有哪些？
- 不同业务为什么要隔离线程池？

#### 关联文档

- [线程池](/java-core/thread-pool)

### 为什么不推荐 Executors？

`Executors` 的部分工厂方法会创建无界队列或无界线程数的线程池，在高并发或任务堆积时容易 OOM。生产环境应该显式创建 `ThreadPoolExecutor` 并设置有界队列和拒绝策略。

#### 常见追问

- `newFixedThreadPool` 的风险是什么？
- `newCachedThreadPool` 的风险是什么？
- 线程池队列为什么要有界？

#### 关联文档

- [线程池](/java-core/thread-pool)

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

- [线程安全三要素](/java-core/thread-safety)

### synchronized 底层怎么实现？

`synchronized` 在字节码层面通过 `monitorenter` 和 `monitorexit` 实现，底层依赖对象监视器 monitor。进入同步块时线程尝试获取对象 monitor，退出时释放 monitor。JDK 6 之后 JVM 对锁做了大量优化，包括偏向锁、轻量级锁、自旋和锁消除等。

#### 常见追问

- 对象头里存了哪些锁信息？
- 同步方法和同步代码块字节码有什么区别？
- 为什么异常退出也能释放锁？

#### 关联文档

- [锁](/java-core/locks)

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

- [锁](/java-core/locks)

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
- 避免嵌套锁能不能完全解决死锁？

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

- [AQS / CAS](/java-core/aqs-cas)

### AQS 是什么？

AQS 是 JUC 同步器的基础框架，核心是一个 `volatile int state` 和一个 CLH 等待队列。`ReentrantLock`、`Semaphore`、`CountDownLatch` 等都基于 AQS 实现。

#### 常见追问

- AQS 独占模式和共享模式有什么区别？
- `state` 在不同同步器里表示什么？
- AQS 为什么使用队列？

#### 关联文档

- [AQS 原理](/java-core/aqs-cas)
