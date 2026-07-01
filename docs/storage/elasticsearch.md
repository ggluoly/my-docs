---
title: 'Elasticsearch'
description: 'Elasticsearch 技术文档，介绍 Java 后端数据存储中的核心概念、应用场景、性能优化和选型建议。'
---

# Elasticsearch

## 是什么

Elasticsearch 是分布式搜索和分析引擎，负责全文搜索、复杂检索、聚合分析和日志检索。它不是替代 MySQL，而是作为搜索和分析能力的补充。

## 同类组件

| 组件 | 说明 |
| --- | --- |
| `Elasticsearch` | 全文搜索、复杂检索、聚合分析、日志检索 |
| `Kibana` | Elasticsearch 数据可视化 |
| `Logstash` | 日志采集处理 |
| `Fluentd / Fluent Bit` | 日志采集 |
| `Spring Data Elasticsearch` | Spring 集成 ES |
| `Elasticsearch Java API Client` | Elastic 官方 Java 客户端 |

## 三者的典型关系

```
MySQL：保存核心业务数据
Redis：保存热点缓存数据
Elasticsearch：保存可搜索的数据副本
```

## 典型业务场景

```
商品搜索
文章搜索
订单复杂查询
日志检索
用户搜索
数据聚合统计
AI 知识库检索
```

## 常见数据同步方式

```
业务数据写入 MySQL
  -> 发送 MQ 消息
  -> search-service 消费消息
  -> 写入 Elasticsearch
```

## 常见依赖

```xml
spring-boot-starter-data-elasticsearch
elasticsearch-java
```

## 选型建议

- ES 用来承载搜索和分析，核心业务数据仍然以 MySQL 为准。
- 数据同步推荐走 MQ 异步链路，避免双写一致性问题，详见[数据同步](./data-sync)。
