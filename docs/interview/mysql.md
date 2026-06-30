# MySQL 面试题

## 为什么数据库索引常用 B+ 树？

### 标准回答

B+ 树层级低、磁盘 IO 次数少，叶子节点按顺序连接，适合范围查询和排序。相比普通二叉树或哈希结构，B+ 树更适合磁盘存储和范围检索。

### 关联文档

- [MySQL 数据库](/storage/mysql)
- [SQL 优化与索引](/practice/sql-optimization)

## 什么情况下索引会失效？

### 标准回答

常见情况包括对索引列做函数或计算、隐式类型转换、最左前缀不满足、前置模糊匹配、OR 条件使用不当、低区分度字段不适合单独建索引等。

### 关联文档

- [SQL 优化与索引](/practice/sql-optimization)

## 事务隔离级别有哪些？

### 标准回答

事务隔离级别包括读未提交、读已提交、可重复读和串行化。MySQL InnoDB 默认可重复读，并通过 MVCC 和锁机制解决多数并发读写问题。

### 关联文档

- [Spring 事务原理](/spring-core/transaction)
- [MySQL 数据库](/storage/mysql)

## MVCC 是什么？

### 标准回答

MVCC 是多版本并发控制，通过保存数据版本和 Read View，让读写在多数场景下互不阻塞，提高并发性能。它是 InnoDB 实现一致性读的重要机制。

### 关联文档

- [SQL 优化与索引](/practice/sql-optimization)

## 慢 SQL 怎么排查？

### 标准回答

先通过慢查询日志定位 SQL，再用 `EXPLAIN` 查看执行计划，重点关注索引使用、扫描行数、排序、临时表和回表情况。最后结合业务场景优化索引、SQL 写法或数据结构。

### 关联文档

- [SQL 优化与索引](/practice/sql-optimization)
