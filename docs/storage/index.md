# 数据存储

数据存储层负责业务数据的持久化、读取加速、全文检索以及大规模数据的拆分与同步。一个企业项目通常不是只用一个数据库，而是按数据特征分别选型：核心数据放关系型数据库，热点数据放缓存，可搜索数据放搜索引擎。

## 典型关系

```
MySQL：保存核心业务数据
Redis：保存热点缓存数据
Elasticsearch：保存可搜索的数据副本
```

## 本栏目内容

| 文档 | 说明 |
| --- | --- |
| [MySQL](./mysql) | 最常见的关系型业务数据库 |
| [MyBatis-Plus](./mybatis-plus) | 简化 CRUD 的 ORM 框架 |
| [Redis](./redis) | 缓存、分布式锁、热点数据加速 |
| [Elasticsearch](./elasticsearch) | 全文搜索与聚合分析 |
| [分库分表](./sharding) | 单表数据量过大时的水平拆分 |
| [分布式 ID](./distributed-id) | 全局唯一 ID 生成方案 |
| [数据同步](./data-sync) | MySQL 到 ES / Redis / 数仓的同步 |

## 选型速查

- 数据存哪里：`MySQL / PostgreSQL`
- 数据怎么访问：`MyBatis-Plus / JPA`
- 热点数据怎么加速：`Redis`
- 分布式锁怎么做：`Redisson`
- 搜索怎么做：`Elasticsearch`
- 数据量太大怎么办：`ShardingSphere`
- 跨存储怎么同步：`Canal / Debezium / Flink CDC`
