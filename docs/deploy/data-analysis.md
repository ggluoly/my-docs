# 数据分析

当项目需要报表、实时大屏、用户行为分析时，普通的 MySQL + Elasticsearch 已经不够，需要专门的 OLAP 分析数据库和流批计算引擎。这一层不是普通微服务的必需组件。

## 常见组件

| 组件 | 类别 | 主要作用 |
| --- | --- | --- |
| ClickHouse | OLAP 数据库 | 列式存储，海量数据的快速聚合分析。 |
| Apache Doris | 实时分析数据库 | 实时 OLAP，支持高并发查询。 |
| StarRocks | 实时分析数据库 | 实时 OLAP，兼容 MySQL 协议。 |
| Flink | 实时计算 | 流式计算、实时数仓、CEP。 |
| Kafka Streams | 流式计算 | 轻量级流处理，依附 Kafka。 |
| Spark | 批处理 | 大数据批处理和离线计算。 |

## 适合场景

```
报表系统
实时大屏
用户行为分析
日志分析
风控系统
实时统计
```

## 选型建议

- 离线报表、海量数据聚合：`ClickHouse`。
- 实时分析、高并发查询：`Apache Doris` / `StarRocks`。
- 实时流式计算：`Flink`，常配合 [Kafka](/messaging/kafka) 构建实时数仓。
- 数据来源通常通过[数据同步](/storage/data-sync)（Canal / Flink CDC）从业务库 MySQL 同步而来。
