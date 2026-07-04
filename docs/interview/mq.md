---
title: '消息队列面试题'
description: '消息队列面试题整理，覆盖 MQ 通用问题、RabbitMQ、Kafka、Apache Pulsar、消息可靠性、顺序消息和延迟队列。'
outline: [2, 3]
---

# 消息队列面试题

本页整理 MQ 通用问题、RabbitMQ、Kafka 和 Apache Pulsar 高频面试题。RabbitMQ 内容完整保留为传统消息中间件考点，Kafka 部分会说明 ZooKeeper 和 KRaft 的版本差异，Pulsar 部分重点关注多租户、订阅模式和存储分离。

## MQ 通用问题

### MQ 解决什么问题？

MQ 主要解决异步解耦、削峰填谷、事件驱动和最终一致性问题。它能降低服务之间的同步耦合，但也会引入消息丢失、重复消费、顺序性和一致性等新问题。

#### 常见追问

- 哪些场景不适合引入 MQ？
- MQ 如何削峰？
- 引入 MQ 后系统复杂度体现在哪？

#### 关联文档

- [RocketMQ](/messaging/rocketmq)
- [Kafka](/messaging/kafka)

### 消息重复消费怎么办？

消费者必须保证幂等。常见做法包括业务唯一键、去重表、状态机校验、Redis 去重和数据库唯一约束。不要假设 MQ 只投递一次。

#### 常见追问

- 为什么 MQ 会重复投递？
- 消费端幂等放在哪里做？
- 去重表如何设计？

#### 关联文档

- [API 设计规范](/practice/api-design)

### 如何保证消息不丢失？

生产端确认发送成功，Broker 持久化和多副本保障，消费端处理成功后再提交确认。关键业务还可以加本地消息表和补偿任务。

#### 常见追问

- 生产者发送失败怎么处理？
- Broker 宕机如何保证消息不丢？
- 消费者先提交 offset 再处理会怎样？

#### 关联文档

- [RocketMQ](/messaging/rocketmq)
- [Kafka](/messaging/kafka)

### 顺序消息怎么实现？

把同一业务维度的消息发送到同一个队列或分区，并由单线程顺序消费。顺序性通常只能在局部业务维度上保证，而不是全局顺序。

#### 常见追问

- 全局顺序为什么代价高？
- Kafka 如何保证分区内有序？
- 消费失败会不会阻塞后续消息？

#### 关联文档

- [Kafka](/messaging/kafka)
- [RocketMQ](/messaging/rocketmq)

### 最终一致性怎么做？

通过本地事务 + 消息发送 + 消费端幂等 + 补偿任务实现最终一致性。复杂跨服务事务可以评估 Seata，但不要一上来就使用分布式事务框架。

#### 常见追问

- 本地消息表怎么设计？
- 事务消息解决什么问题？
- 补偿任务如何避免重复执行？

#### 关联文档

- [Seata 分布式事务](/messaging/seata)

## RabbitMQ

### RabbitMQ 中有哪些重要角色？

RabbitMQ 重要角色包括生产者、消费者和 Broker。生产者发送消息，消费者消费消息，Broker 负责接收、路由、存储和投递消息。Broker 内部还包含交换机、队列、绑定等概念。

#### 常见追问

- Broker 和 Queue 有什么区别？
- 生产者是否直接把消息发到队列？
- 消费者如何确认消息？

### RabbitMQ 有哪些重要组件？

核心组件包括 ConnectionFactory、Connection、Channel、Exchange、Queue、RoutingKey 和 BindingKey。客户端通过连接和 Channel 与 Broker 通信，生产者把消息发到 Exchange，Exchange 根据绑定关系和路由键把消息路由到 Queue。

#### 常见追问

- 为什么需要 Channel？
- Exchange 和 Queue 是什么关系？
- RoutingKey 和 BindingKey 有什么区别？

### RabbitMQ vhost 有什么作用？

vhost 是 RabbitMQ 的虚拟主机，用来隔离交换机、队列、绑定和权限。不同业务或环境可以使用不同 vhost，避免资源命名冲突，也方便做权限控制。

#### 常见追问

- vhost 和数据库 schema 类似吗？
- 用户权限如何绑定 vhost？
- 多租户场景如何隔离？

### RabbitMQ 消息是怎么发送的？

客户端先建立 TCP 连接并完成认证，然后创建 AMQP Channel，通过 Channel 把消息发布到 Exchange。Exchange 根据类型、RoutingKey 和 BindingKey 把消息路由到匹配队列，消费者从队列中拉取或接收推送消息。

#### 常见追问

- 为什么不每次发送都新建连接？
- Channel 是线程安全的吗？
- 消息没有路由到队列会怎样？

### RabbitMQ 如何保证发送稳定性？

可以使用事务或 publisher confirm 机制。事务模式简单但性能较差；confirm 模式由 Broker 异步确认消息是否成功到达，更适合高吞吐场景。关键消息还要结合持久化、重试和补偿机制。

#### 常见追问

- confirm 和 return callback 有什么区别？
- 事务模式为什么性能差？
- 生产者重试如何避免重复消息？

### RabbitMQ 如何避免消息丢失？

需要同时保证队列持久化、消息持久化、交换机持久化，以及消费者手动 ack。消息只有投递到持久化交换机并路由到持久化队列，且消息本身设置为持久化，Broker 重启后才更可能恢复。

#### 常见追问

- durable 队列是否能保证消息不丢？
- 消费者自动 ack 有什么风险？
- RabbitMQ 镜像队列或 quorum queue 解决什么问题？

### RabbitMQ 持久化有什么缺点？

持久化会增加磁盘 IO，降低吞吐量和写入性能。生产中需要在可靠性和性能之间权衡，可以使用 SSD、批量确认、合理队列设计和高可用队列降低影响。

#### 常见追问

- 所有消息都需要持久化吗？
- 持久化和高可用是一回事吗？
- 磁盘满了会发生什么？

### RabbitMQ 交换器类型有哪些？

常见类型包括 direct、fanout、topic 和 headers。direct 按精确 routing key 路由；fanout 广播到所有绑定队列；topic 支持通配符模式匹配；headers 根据消息头匹配，使用较少。

#### 常见追问

- 日志广播适合哪种交换器？
- topic 中 `*` 和 `#` 有什么区别？
- direct 和 topic 如何选择？

### RabbitMQ 延迟队列怎么实现？

常见方式是 TTL + 死信交换机：消息过期后进入死信交换机，再路由到真正消费队列。也可以使用 `rabbitmq-delayed-message-exchange` 插件实现延迟消息。插件方式更直观，但需要额外安装和维护。

#### 常见追问

- TTL 设置在队列和消息上有什么区别？
- 死信队列还能处理哪些场景？
- 延迟消息适合订单超时关闭吗？

### RabbitMQ 集群有什么作用？

RabbitMQ 集群用于提升可用性和容量。普通集群会同步元数据，但队列消息默认不一定完整复制到所有节点；高可用消息需要镜像队列或 quorum queue 等机制。设计集群时要区分元数据高可用和消息高可用。

#### 常见追问

- RabbitMQ 集群节点会完整复制所有消息吗？
- 镜像队列有什么问题？
- quorum queue 解决什么问题？

### RabbitMQ 节点类型有哪些？

传统 RabbitMQ 节点分为磁盘节点和内存节点。磁盘节点把元数据持久化到磁盘，内存节点主要保存在内存中。生产集群至少需要一个磁盘节点，通常也会部署多个磁盘节点提高可靠性。

#### 常见追问

- 唯一磁盘节点宕机会怎样？
- 为什么生产不建议只有一个磁盘节点？
- 节点类型和消息持久化是什么关系？

### RabbitMQ 集群搭建要注意什么？

要确保节点之间网络互通，Erlang cookie 一致，节点名和主机名解析正确，并至少有一个磁盘节点。停止集群时传统建议先停内存节点，最后停磁盘节点，避免元数据变更丢失风险。

#### 常见追问

- Erlang cookie 不一致会怎样？
- 为什么节点名解析很重要？
- 集群扩容如何迁移队列？

## Kafka

### Kafka 是什么？

Kafka 是分布式事件流平台，具备高吞吐、低延迟、持久化和可扩展能力，常用于日志采集、行为埋点、异步解耦、削峰和数据管道。Kafka 的核心抽象包括 Topic、Partition、Producer、Consumer、Consumer Group 和 Broker。

#### 常见追问

- Kafka 为什么吞吐高？
- Topic 和 Partition 有什么关系？
- Consumer Group 解决什么问题？

#### 关联文档

- [Kafka](/messaging/kafka)

### Kafka 可以脱离 ZooKeeper 吗？

早期 Kafka 依赖 ZooKeeper 管理元数据和 Controller 选举；新版本 Kafka 支持 KRaft 模式，可以不依赖 ZooKeeper。面试时要说明版本差异，传统项目仍可能使用 ZooKeeper，新项目可以评估 KRaft。

#### 常见追问

- KRaft 解决什么问题？
- ZooKeeper 在旧 Kafka 中负责什么？
- Kafka 为什么要去 ZooKeeper？

#### 关联文档

- [ZooKeeper 面试题](/interview/zookeeper)

### Kafka 数据保留策略有哪些？

Kafka 数据保留可以按时间和大小控制，例如保留 7 天或保留到日志段总大小达到阈值。只要任一条件满足，就可能触发清理。Kafka 还支持基于 key 的日志压缩 compaction，用于保留最新状态。

#### 常见追问

- 同时设置 7 天和 10G 怎么清理？
- Kafka 删除消息是立刻删除吗？
- compaction 和 delete 有什么区别？

### Kafka 变慢可能是什么原因？

常见原因包括磁盘 IO 瓶颈、网络带宽瓶颈、CPU 压力、分区过多、消费者处理慢、ISR 抖动、批量参数不合理和消息过大。排查时要结合 Broker 指标、Consumer Lag、磁盘和网络监控。

#### 常见追问

- Consumer Lag 变大怎么排查？
- 分区越多越好吗？
- Kafka 为什么依赖顺序写磁盘？

### Kafka 集群节点数量怎么考虑？

Kafka 节点数量不是越多越好，要结合吞吐、分区数、副本因子、磁盘容量和故障容忍度。传统协调组件如 ZooKeeper 常建议奇数节点；Kafka Broker 本身节点数没有必须奇数的要求，但要保证副本合理分布和故障后仍有足够容量。

#### 常见追问

- 副本因子通常设置多少？
- 分区数如何规划？
- Broker 扩容后数据会自动均衡吗？

## Apache Pulsar

### Pulsar 是什么？

Apache Pulsar 是分布式消息与流式数据平台，支持发布订阅、持久化消息、多租户、跨集群复制和多种订阅模式。它既可以作为消息队列，也可以承载流式数据场景。

#### 常见追问

- Pulsar 适合什么场景？
- Pulsar 和传统 MQ 有什么区别？
- Pulsar 的 Topic 格式是什么？

#### 关联文档

- [Apache Pulsar](/messaging/pulsar)

### Pulsar 和 Kafka 有什么区别？

Kafka 以分区日志模型为核心，生态成熟，适合高吞吐日志、埋点和实时计算。Pulsar 强调云原生、多租户、消息与流统一，并采用 Broker 与 BookKeeper 存储分离架构，计算层和存储层可以独立扩展。

#### 常见追问

- Kafka 的优势是什么？
- Pulsar 的存储分离有什么好处？
- 什么场景优先选 Pulsar？

#### 关联文档

- [Kafka](/messaging/kafka)
- [Apache Pulsar](/messaging/pulsar)

### Pulsar 的订阅模式有哪些？

Pulsar 常见订阅模式包括 `Exclusive`、`Failover`、`Shared` 和 `Key_Shared`。`Exclusive` 只允许一个消费者；`Failover` 支持主备切换；`Shared` 支持多个消费者并发消费；`Key_Shared` 可以让相同 key 的消息进入同一个消费者，兼顾并发和局部有序。

#### 常见追问

- `Shared` 为什么不保证全局顺序？
- `Failover` 和 `Exclusive` 有什么区别？
- `Key_Shared` 适合哪些业务？

### Pulsar 为什么适合多租户？

Pulsar 原生提供 Tenant 和 Namespace 模型，可以按租户、业务线或环境隔离 Topic、权限、配额和策略。平台型系统中，不同团队可以共享同一套集群，同时保持资源和权限边界。

#### 常见追问

- Tenant 和 Namespace 分别解决什么问题？
- 多租户和普通 Topic 命名规范有什么区别？
- 多业务共用集群要注意什么？

### Pulsar 的 Broker 和存储分离有什么好处？

Pulsar Broker 负责客户端接入、消息路由和调度，BookKeeper 负责持久化存储。两者分离后，计算和存储可以独立扩容，Broker 故障后也更容易由其他 Broker 接管 Topic 服务。

#### 常见追问

- BookKeeper 在 Pulsar 中负责什么？
- 存储分离会带来哪些复杂度？
- Kafka 和 Pulsar 的架构差异体现在哪里？

### Pulsar 的 Key_Shared 订阅解决什么问题？

`Key_Shared` 订阅可以让相同 key 的消息始终分发给同一个消费者，从而保证同一业务维度的消息顺序，同时允许不同 key 的消息并发消费。它适合订单、用户、设备等需要局部有序的业务。

#### 常见追问

- 局部有序和全局有序有什么区别？
- key 设计不合理会有什么问题？
- `Key_Shared` 和 Kafka 分区有序有什么区别？
