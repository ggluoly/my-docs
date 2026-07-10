---
title: '集合框架'
description: '基于 JDK 8 梳理 Java 集合框架，包括 List、Set、Map、Queue、HashMap、ConcurrentHashMap、迭代器和集合选型建议。'
outline: [2, 3]
---

# 集合框架

> 本页默认以 JDK 8 为技术基线。Java 9 及之后的集合 API 增强统一放在 Java 版本特性模块。

集合框架是业务代码最高频使用的基础设施。选错集合会影响性能、线程安全和语义表达。

## 集合体系

常见集合接口和实现：

| 接口 | 常用实现 | 特点 | 典型场景 |
| --- | --- | --- | --- |
| `List` | `ArrayList` | 数组结构，随机访问快，增删慢 | 大部分有序列表 |
| `List` | `LinkedList` | 链表结构，头尾增删快，随机访问慢 | 队列、双端队列，业务中使用较少 |
| `Set` | `HashSet` | 哈希去重，无序 | 普通去重集合 |
| `Set` | `LinkedHashSet` | 去重并保留插入顺序 | 需要稳定遍历顺序的去重 |
| `Set` | `TreeSet` | 去重并排序 | 需要排序的集合 |
| `Map` | `HashMap` | 哈希表，无序，非线程安全 | 绝大多数键值映射 |
| `Map` | `LinkedHashMap` | 保留插入顺序或访问顺序 | LRU 缓存、稳定输出 |
| `Map` | `TreeMap` | 按 key 排序 | 范围查询、排序遍历 |
| `Queue` | `ArrayDeque` | 双端队列，非线程安全 | 栈、队列、BFS 等算法场景 |

多数业务场景默认选择 `ArrayList` 和 `HashMap`，只有明确需要排序、去重、线程安全或队列语义时再换其他实现。

## List

`List` 表示有序、可重复集合。

| 实现 | 特点 | 注意点 |
| --- | --- | --- |
| `ArrayList` | 底层数组，随机访问快 | 中间插入和删除需要移动元素 |
| `LinkedList` | 双向链表，头尾操作方便 | 随机访问慢，节点对象额外占内存 |

实践建议：

- 大部分业务列表优先用 `ArrayList`。
- 已知容量时可以指定初始容量，减少扩容成本。
- 不要因为“频繁增删”就直接选择 `LinkedList`，实际业务中中间查找和遍历成本常常更高。

## Set

`Set` 用来表达不重复元素。

| 实现 | 去重依据 | 顺序 |
| --- | --- | --- |
| `HashSet` | `hashCode()` + `equals()` | 不保证顺序 |
| `LinkedHashSet` | `hashCode()` + `equals()` | 插入顺序 |
| `TreeSet` | `Comparable` 或 `Comparator` | 排序顺序 |

对象放入 `HashSet` 前，必须保证 `equals()` 和 `hashCode()` 逻辑一致，否则可能出现重复元素或查找失败。

## Map

`Map` 用来表达 key 到 value 的映射。

| 实现 | 特点 | 场景 |
| --- | --- | --- |
| `HashMap` | 查询和写入平均 O(1)，无序 | 通用键值映射 |
| `LinkedHashMap` | 保留插入顺序或访问顺序 | LRU、稳定 JSON 输出 |
| `TreeMap` | 红黑树排序 | 按 key 排序或范围查询 |
| `Hashtable` | 方法级同步，历史类 | 不推荐新代码使用 |

JDK 8 中 `HashMap` 采用“数组 + 链表 + 红黑树”：

- 默认初始容量是 16。
- 默认负载因子是 0.75。
- 链表长度超过 8 且数组容量至少 64 时，链表可能转为红黑树。
- 哈希冲突严重时，红黑树能降低查询退化风险。

## Queue 与 Deque

`Queue` 表示队列语义，多数情况下是 FIFO，但 `PriorityQueue` 按优先级出队。

常用实现：

| 实现 | 特点 | 场景 |
| --- | --- | --- |
| `ArrayDeque` | 数组双端队列 | 单线程队列、栈 |
| `PriorityQueue` | 优先级队列 | Top N、调度优先级 |
| `ConcurrentLinkedQueue` | 无锁并发队列 | 高并发非阻塞队列 |
| `BlockingQueue` | 阻塞队列接口 | 线程池、生产者消费者 |

单线程栈结构不推荐使用历史类 `Stack`，优先用 `ArrayDeque`。

## 迭代器与 fail-fast

普通集合在迭代过程中如果被结构性修改，可能抛出 `ConcurrentModificationException`，这类机制称为 fail-fast。

错误示例：

```java
for (String item : list) {
    if (item.startsWith("tmp")) {
        list.remove(item);
    }
}
```

JDK 8 中可以使用 `removeIf()`：

```java
list.removeIf(item -> item.startsWith("tmp"));
```

## 线程安全集合

普通 `ArrayList`、`HashMap`、`HashSet` 都不是线程安全的。

并发场景常用：

- `ConcurrentHashMap`
- `CopyOnWriteArrayList`
- `ConcurrentLinkedQueue`
- `BlockingQueue`
- `Collections.synchronizedList()` 等同步包装器

JDK 8 中 `ConcurrentHashMap` 不再使用 JDK 7 的 Segment 分段锁结构，主要通过 CAS、`synchronized` 和链表红黑树结构实现并发控制。

## 选型建议

| 场景 | 推荐 |
| --- | --- |
| 普通列表 | `ArrayList` |
| 普通键值映射 | `HashMap` |
| 去重 | `HashSet` |
| 去重且保留顺序 | `LinkedHashSet` |
| key 排序 | `TreeMap` |
| 读多写少并发列表 | `CopyOnWriteArrayList` |
| 高并发 Map | `ConcurrentHashMap` |
| 生产者消费者 | `BlockingQueue` |

集合选型先看语义，再看性能，最后看线程安全。不要用 `Vector`、`Hashtable` 这类历史同步容器作为新项目默认选择。
