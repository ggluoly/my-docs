---
title: 'Apache Pulsar'
description: 'Apache Pulsar 技术文档，介绍分布式消息、流式数据、多租户、订阅模式、BookKeeper 存储和 Java 后端消息系统选型。'
---

# Apache Pulsar

## 是什么

Apache Pulsar 是 Apache 开源的分布式消息与流式数据平台，支持发布订阅、持久化消息、多租户、分层存储和多种订阅模式。

它和 Kafka、RocketMQ 一样可以作为消息中间件使用，但 Pulsar 的一个重要特点是 Broker 与存储分离：Broker 负责接入、路由和调度，底层通过 Apache BookKeeper 保存消息数据。

## 解决什么问题

Pulsar 主要解决这些问题：

```text
异步解耦
削峰填谷
事件驱动
流式数据处理
多租户消息隔离
跨地域消息复制
消息与流统一接入
```

如果系统既需要消息队列能力，又需要流式数据、租户隔离、跨集群复制和存储扩展能力，Pulsar 会比传统单一消息队列更适合评估。

## 核心概念

| 概念 | 说明 |
| --- | --- |
| `Tenant` | 租户，用于多业务、多团队隔离 |
| `Namespace` | 命名空间，用于组织 Topic 和策略 |
| `Topic` | 消息主题，生产者和消费者围绕 Topic 通信 |
| `Producer` | 生产者，负责发送消息 |
| `Consumer` | 消费者，负责接收和确认消息 |
| `Subscription` | 订阅关系，决定一组消费者如何消费 Topic |
| `Broker` | 接入和调度层，处理客户端连接和消息分发 |
| `BookKeeper` | 持久化存储层，负责消息日志存储 |

Pulsar 的 Topic 常见格式如下：

```text
persistent://tenant/namespace/topic
```

## 订阅模式

| 模式 | 说明 | 适用场景 |
| --- | --- | --- |
| `Exclusive` | 一个订阅只能有一个消费者消费 | 严格单消费者场景 |
| `Failover` | 多消费者中一个为主，主消费者故障后切换 | 需要高可用的顺序消费 |
| `Shared` | 多消费者共同消费，消息分发给不同消费者 | 高吞吐并发消费 |
| `Key_Shared` | 相同 key 的消息进入同一个消费者 | 局部有序 + 并发消费 |

`Shared` 更关注吞吐量，但不保证全局顺序；`Key_Shared` 可以在提高并发度的同时，让同一个业务 key 的消息保持顺序。

## 定位差异

Pulsar 更偏多租户、计算存储分离、分层存储和消息流统一的平台型架构，Kafka 更偏成熟的高吞吐事件流生态，RocketMQ 更偏交易类业务消息。RabbitMQ 仅作为传统 AMQP 方案参考与面试考点。完整对比见 [消息与事务：MQ 对比与选型](/messaging/#mq-对比与选型)。

## 典型场景

Pulsar 适合这些场景：

- 平台型系统，需要按租户、团队或业务线隔离消息资源。
- 同时存在消息队列和流式数据处理需求。
- 需要跨地域复制或多集群部署。
- 消息保留周期较长，需要更灵活的存储扩展。
- 希望计算层和存储层可以独立扩缩容。

## Java 客户端示例

生产者示例：

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();

Producer<String> producer = client.newProducer(Schema.STRING)
        .topic("persistent://public/default/order-events")
        .create();

producer.send("order-created");
```

消费者示例：

```java
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topic("persistent://public/default/order-events")
        .subscriptionName("order-service")
        .subscriptionType(SubscriptionType.Key_Shared)
        .subscribe();

Message<String> message = consumer.receive();
try {
    String body = message.getValue();
    consumer.acknowledge(message);
} catch (Exception e) {
    consumer.negativeAcknowledge(message);
}
```

## 选型建议

如果团队已经围绕 Kafka 构建了成熟的数据管道和生态，继续使用 Kafka 成本更低。如果平台天然是多租户、跨地域、消息与流统一的架构，Pulsar 更值得评估。

## 面试关注点

面试中关于 Pulsar 常见关注点包括：

- Pulsar 和 Kafka 的区别。
- Pulsar 的订阅模式。
- `Shared` 和 `Key_Shared` 的区别。
- Broker 与 BookKeeper 存储分离的意义。
- 多租户模型如何隔离资源。
- 什么场景下选择 Pulsar，而不是 Kafka 或 RocketMQ。

相关面试题可参考 [消息队列面试题](/interview/mq)。
