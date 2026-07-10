---
title: '并发容器'
description: '基于 JDK 8 梳理 Java 并发容器，包括 ConcurrentHashMap、CopyOnWriteArrayList、BlockingQueue、ConcurrentLinkedQueue 和跳表集合。'
outline: [2, 3]
---

# 并发容器

> 本页默认以 JDK 8 为技术基线。

并发容器用于在多线程场景下安全读写数据。它们不是“更快的普通集合”，而是在特定并发读写模式下提供正确性和性能平衡。

## ConcurrentHashMap

`ConcurrentHashMap` 是高并发 Map 的首选。

JDK 8 特点：

- 底层仍是数组 + 链表 + 红黑树。
- 不再使用 JDK 7 的 Segment 分段锁结构。
- 主要通过 CAS、`synchronized` 和红黑树控制并发。
- 读操作大多不加锁，写操作只锁局部桶节点。

常见用法：

```java
ConcurrentHashMap<String, User> map = new ConcurrentHashMap<>();
map.put("u1", user);
User value = map.get("u1");
```

复合操作建议使用原子方法：

```java
map.computeIfAbsent(key, k -> loadUser(k));
```

不要用 `containsKey()` 加 `put()` 自己拼复合逻辑，否则仍可能有竞态。

## CopyOnWriteArrayList

`CopyOnWriteArrayList` 写入时复制数组，读操作不加锁。

适合：

- 读多写少。
- 数据量不大。
- 读操作远多于写操作。

典型场景：监听器列表、配置快照。

不适合：

- 高频写入。
- 大列表。
- 对实时一致性要求很高的场景。

## BlockingQueue

`BlockingQueue` 是阻塞队列接口，是线程池和生产者消费者模型的基础。

常见实现：

| 实现 | 特点 |
| --- | --- |
| `ArrayBlockingQueue` | 有界数组队列 |
| `LinkedBlockingQueue` | 链表队列，可设置容量 |
| `PriorityBlockingQueue` | 优先级阻塞队列，默认无界 |
| `SynchronousQueue` | 不存储元素，直接移交 |
| `DelayQueue` | 延迟队列 |

生产者消费者示例：

```java
BlockingQueue<Task> queue = new ArrayBlockingQueue<>(1000);

queue.put(task);
Task task = queue.take();
```

## ConcurrentLinkedQueue

`ConcurrentLinkedQueue` 是基于链表的无锁并发队列，适合高并发非阻塞入队出队。

特点：

- 非阻塞。
- 基于 CAS。
- 适合不需要阻塞等待的队列场景。

如果需要生产者消费者之间阻塞协调，优先使用 `BlockingQueue`。

## 跳表集合

JDK 提供并发有序集合：

- `ConcurrentSkipListMap`
- `ConcurrentSkipListSet`

它们基于跳表实现，适合并发场景下需要排序或范围查询的集合。

## synchronized 包装器

`Collections` 提供同步包装器：

```java
List<String> list = Collections.synchronizedList(new ArrayList<String>());
```

这种方式通过方法级同步保证线程安全，但并发性能和组合操作灵活性通常不如专门的并发容器。

## 选型建议

| 场景 | 推荐 |
| --- | --- |
| 高并发 Map | `ConcurrentHashMap` |
| 读多写少列表 | `CopyOnWriteArrayList` |
| 生产者消费者 | `BlockingQueue` |
| 非阻塞并发队列 | `ConcurrentLinkedQueue` |
| 并发有序 Map | `ConcurrentSkipListMap` |

并发容器只能解决容器自身的线程安全问题。如果多个容器之间存在一致性约束，仍然需要额外锁、事务或重新设计数据结构。
