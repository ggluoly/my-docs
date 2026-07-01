---
title: 'ZooKeeper 面试题'
description: 'ZooKeeper 面试题整理，覆盖分布式协调、主节点选举、ZAB 协议、Watcher 机制和集群可用性。'
outline: [2, 3]
---

# ZooKeeper 面试题

本页整理 ZooKeeper 面试题。ZooKeeper 是传统分布式协调组件，曾广泛用于 Kafka、Dubbo、Hadoop 等生态。虽然部分新组件已弱化对 ZooKeeper 的依赖，但其设计思想仍值得掌握。

## 基础概念

### ZooKeeper 是什么？

#### 标准回答

ZooKeeper 是一个分布式协调服务，提供一致性数据存储和事件通知能力。它常用于配置维护、命名服务、集群管理、主节点选举、分布式锁等场景。ZooKeeper 的数据以类似文件系统的 znode 组织。

#### 常见追问

- znode 有哪些类型？
- ZooKeeper 适合存大数据吗？
- ZooKeeper 和 Redis 分布式锁有什么区别？

### ZooKeeper 有哪些功能？

#### 标准回答

常见功能包括集群管理、主节点选举、分布式锁、命名服务、配置中心和状态通知。它通过临时节点、顺序节点和 Watcher 机制实现这些协调能力。

#### 常见追问

- 临时节点有什么特点？
- 顺序节点适合做什么？
- Watcher 是一次性的吗？

## 部署与集群

### ZooKeeper 有哪些部署模式？

#### 标准回答

常见部署模式包括单机模式、集群模式和伪集群模式。生产环境通常使用集群模式，并部署奇数个节点，便于多数派投票。伪集群是在一台机器上启动多个实例，主要用于学习和测试。

#### 常见追问

- 为什么 ZooKeeper 集群建议奇数台？
- 3 台和 4 台容错能力有什么区别？
- ZooKeeper 节点越多越好吗？

### 集群为什么要有主节点？

#### 标准回答

主节点负责协调写请求和事务提案，避免多个节点同时做决策导致数据不一致。ZooKeeper 中 Leader 负责发起提案，Follower 参与投票并同步数据，保证集群状态一致。

#### 常见追问

- Leader 宕机后怎么办？
- 读请求一定走 Leader 吗？
- ZooKeeper 如何保证顺序一致性？

### 3 台 ZooKeeper 宕机 1 台还能用吗？

#### 标准回答

可以。ZooKeeper 依赖多数派机制，3 台节点只要存活 2 台就能继续对外服务；如果只剩 1 台，就无法形成多数派，集群不可用。

#### 常见追问

- 5 台最多能宕机几台？
- 为什么不是只要剩一台就能工作？
- 网络分区时如何避免脑裂？

## ZAB 与 Watcher

### ZooKeeper 如何保证主从同步？

#### 标准回答

ZooKeeper 使用 ZAB 协议保证数据一致性。ZAB 包括恢复模式和广播模式：恢复模式用于选举 Leader 并同步数据；广播模式用于 Leader 接收写请求后发起事务提案，Follower 多数确认后提交。

#### 常见追问

- ZAB 和 Paxos 有什么关系？
- 什么是 zxid？
- Leader 选举时如何比较数据新旧？

### Watcher 通知机制是什么？

#### 标准回答

客户端可以对 znode 注册 Watcher，当节点数据或子节点发生变化时，服务端会通知客户端。Watcher 通常是一次性触发，触发后如果还需要继续监听，需要重新注册。

#### 常见追问

- Watcher 是服务端主动推送吗？
- Watcher 会不会丢事件？
- Curator 如何封装 Watcher？

## 生态关系

### Kafka 是否可以脱离 ZooKeeper？

#### 标准回答

早期 Kafka 依赖 ZooKeeper 管理 Broker 元数据、Controller 选举等；新版本 Kafka 引入 KRaft 模式，可以不依赖 ZooKeeper。面试时要说明版本差异，不能简单回答“必须依赖”或“完全不依赖”。

#### 常见追问

- KRaft 模式解决了什么问题？
- Kafka 为什么要去 ZooKeeper？
- 老 Kafka 中 ZooKeeper 存哪些信息？

#### 关联文档

- [消息队列面试题](/interview/mq)
- [Kafka](/messaging/kafka)
