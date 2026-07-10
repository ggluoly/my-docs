---
title: '锁'
description: '基于 JDK 8 梳理 Java 锁机制，包括 synchronized、ReentrantLock、读写锁、StampedLock、公平锁、死锁和锁选型建议。'
outline: [2, 3]
---

# 锁

> 本页默认以 JDK 8 为技术基线。

锁用于保护共享可变状态，保证临界区同一时刻只被一个或有限数量线程访问。锁能解决并发正确性问题，但也会引入阻塞、死锁和性能开销。

## synchronized

`synchronized` 是 Java 内置锁，可以修饰方法或代码块。

```java
public synchronized void update() {
    count++;
}
```

代码块写法：

```java
public void update() {
    synchronized (this) {
        count++;
    }
}
```

特点：

- 可重入。
- 自动加锁和释放锁。
- 异常退出时也会释放锁。
- JDK 6 以后有偏向锁、轻量级锁、重量级锁等优化。

## ReentrantLock

`ReentrantLock` 是 JUC 提供的可重入锁。

```java
Lock lock = new ReentrantLock();

lock.lock();
try {
    update();
} finally {
    lock.unlock();
}
```

相比 `synchronized`，它提供更多能力：

- 可中断锁等待。
- 可超时获取锁。
- 可选择公平锁。
- 可创建多个 `Condition`。

## 公平锁与非公平锁

公平锁按等待顺序获取锁，非公平锁允许插队。

```java
Lock fairLock = new ReentrantLock(true);
Lock unfairLock = new ReentrantLock(false);
```

实践中默认非公平锁吞吐量通常更高。只有业务明确要求先来先服务时才考虑公平锁。

## 读写锁

`ReentrantReadWriteLock` 适合读多写少场景：

- 读读不互斥。
- 读写互斥。
- 写写互斥。

```java
ReadWriteLock rwLock = new ReentrantReadWriteLock();
Lock readLock = rwLock.readLock();
Lock writeLock = rwLock.writeLock();
```

如果写操作频繁，读写锁未必比普通互斥锁更好。

## StampedLock

`StampedLock` 是 JDK 8 引入的锁，支持乐观读。

```java
long stamp = lock.tryOptimisticRead();
Data data = readData();
if (!lock.validate(stamp)) {
    stamp = lock.readLock();
    try {
        data = readData();
    } finally {
        lock.unlockRead(stamp);
    }
}
```

适合读多写少且读操作较短的场景。它不是可重入锁，使用复杂度比 `ReentrantReadWriteLock` 更高。

## Condition

`Condition` 类似 `wait/notify`，但可以为一个锁创建多个等待队列。

```java
Condition notEmpty = lock.newCondition();
Condition notFull = lock.newCondition();
```

阻塞队列等并发工具底层会使用类似机制实现生产者消费者协调。

## 死锁

死锁常见条件：

- 互斥。
- 持有并等待。
- 不可抢占。
- 循环等待。

典型原因是多个线程获取多把锁的顺序不一致。

避免方式：

- 固定加锁顺序。
- 减少锁嵌套。
- 使用 `tryLock()` 设置超时。
- 持锁期间不要调用慢 SQL、RPC 或不可控外部逻辑。

## 选型建议

| 场景 | 建议 |
| --- | --- |
| 简单临界区 | `synchronized` |
| 需要超时、可中断、公平锁 | `ReentrantLock` |
| 读多写少 | `ReentrantReadWriteLock` |
| 极端读多写少且能接受复杂度 | `StampedLock` |
| 分布式多实例互斥 | Redis、ZooKeeper、数据库等分布式锁方案 |

单机锁只能保护当前 JVM 内的线程，不能保护分布式部署下的多个实例。
