# 数据同步

## 是什么

数据同步负责把业务库的数据实时或离线同步到搜索引擎、缓存、数仓等其他存储，常用于多存储协同的场景。

## 同类组件

| 组件 | 说明 |
| --- | --- |
| `Canal` | 监听 MySQL binlog，同步数据 |
| `Debezium` | CDC 数据同步 |
| `Flink CDC` | 实时数据同步 |
| `DataX` | 离线数据同步 |
| `Maxwell` | MySQL binlog 同步 |

## 典型场景

```
MySQL 同步到 Elasticsearch
MySQL 同步到 Redis
业务库同步到数仓
订单数据同步到报表系统
```

## 常见链路

```
MySQL binlog
  -> Canal / Debezium
  -> MQ
  -> 消费者
  -> Elasticsearch / Redis / ClickHouse
```

## 选型建议

- 实时同步到 ES / Redis，常用 Canal / Debezium + MQ 链路。
- 离线批量同步到数仓，常用 DataX。
- 实时流式计算场景，可用 Flink CDC。
