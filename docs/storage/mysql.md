# MySQL

## 是什么

MySQL 是最常见的关系型业务数据库，负责保存核心业务数据和事务数据。在企业 Java 项目中，它几乎是默认的存储选择。

## 同类组件

| 组件 | 说明 |
| --- | --- |
| `MySQL` | 最常见业务数据库 |
| `PostgreSQL` | 功能更强的关系型数据库 |
| `Oracle` | 金融、政企老系统常见 |
| `SQL Server` | 部分企业系统常见 |

## 连接池

数据库连接池负责管理和复用数据库连接，避免频繁创建销毁连接的开销。

| 组件 | 说明 |
| --- | --- |
| `HikariCP` | Spring Boot 默认高性能数据库连接池 |
| `Druid` | 国内常用连接池，带监控能力 |

## 数据库版本管理

企业多人协作时，数据库表结构必须有版本管理，否则后期很容易混乱。

| 组件 | 说明 |
| --- | --- |
| `Flyway` | 数据库版本管理 |
| `Liquibase` | 数据库版本管理 |

## 常见组合

国内企业项目常见组合：

```
MySQL + MyBatis-Plus + HikariCP / Druid
```

建议补充版本管理：

```
Flyway / Liquibase
```

## 常见依赖

```xml
mysql-connector-j
flyway-core
```

## 选型建议

- 新项目默认 `MySQL`，连接池用默认的 `HikariCP` 即可，需要监控能力时再换 `Druid`。
- 多人协作项目从第一天就引入 `Flyway` 管理表结构变更。
- 需要更强功能（如复杂类型、向量检索）时考虑 `PostgreSQL`。

## 延伸阅读

- 索引原理、执行计划分析、慢查询排查与锁机制，见 [SQL 优化与索引](/practice/sql-optimization)。
- 单库内的事务控制见 [Spring 事务原理](/spring-core/transaction)；跨库跨服务的一致性见 [Seata 分布式事务](/messaging/seata)。
- 单表数据量过大时的水平拆分见 [分库分表](./sharding)。
