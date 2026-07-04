---
title: 'MyBatis 面试题'
description: 'MyBatis 面试题整理，覆盖参数绑定、分页、缓存、延迟加载、执行器、分页插件和自定义插件机制。'
outline: [2, 3]
---

# MyBatis 面试题

本页整理 MyBatis 高频面试题，覆盖参数绑定、分页、延迟加载、缓存、执行器和插件机制。MyBatis-Plus 是 MyBatis 的增强工具，底层很多问题仍要回到 MyBatis 本身理解。

## 参数绑定

### MyBatis 中 #{} 和 ${} 有什么区别？

`#{}` 是预编译参数绑定，会使用 `PreparedStatement` 的占位符，能有效防止 SQL 注入；`${}` 是字符串替换，会把内容直接拼到 SQL 中，存在注入风险。普通查询条件应使用 `#{}`，只有动态表名、字段名、排序方向等不能参数化的位置才谨慎使用 `${}`，并做好白名单校验。

#### 常见追问

- 为什么表名不能用 `#{}` 参数化？
- 排序字段动态传入怎么防注入？
- MyBatis 如何处理参数类型？

#### 关联文档

- [MyBatis-Plus](/storage/mybatis-plus)
- [JavaWeb 面试题](/interview/java-web)

## 分页

### MyBatis 逻辑分页和物理分页有什么区别？

逻辑分页是先查询出较多数据，再在内存中截取需要的部分；物理分页是在 SQL 层面加 `limit`、`offset` 等分页语句，只让数据库返回当前页数据。生产环境大数据量分页应使用物理分页，避免内存浪费和数据库压力。

#### 常见追问

- 深分页为什么慢？
- 如何优化 `limit offset` 深分页？
- 分页插件如何识别数据库方言？

### RowBounds 会一次性查询全部结果吗？

`RowBounds` 是 MyBatis 提供的逻辑分页能力，通常不会简单把所有结果一次性加载成 List 再截取，但它仍然依赖 JDBC 拉取结果并在客户端跳过数据，数据量大时效率较低。生产环境更推荐 SQL 物理分页或分页插件。

#### 常见追问

- RowBounds 适合什么场景？
- 为什么逻辑分页不适合大数据量？
- MyBatis-Plus 分页属于哪种？

### MyBatis 分页插件原理是什么？

分页插件通常通过 MyBatis 插件机制拦截 `Executor` 或 `StatementHandler`，在 SQL 执行前根据数据库方言改写 SQL，追加分页语句，并可能额外执行 count 查询。PageHelper 和 MyBatis-Plus 分页插件都属于这类思路。

#### 常见追问

- 为什么分页插件要识别数据库方言？
- count 查询如何优化？
- 分页插件和手写 limit 有什么区别？

## 延迟加载与缓存

### MyBatis 是否支持延迟加载？

支持。开启 `lazyLoadingEnabled` 后，关联对象或集合可以在真正访问属性时再触发查询。延迟加载适合减少不必要的关联查询，但如果使用不当，可能导致 N+1 查询问题。

#### 常见追问

- 什么是 N+1 查询？
- 延迟加载底层怎么触发？
- MyBatis 和 Hibernate 的延迟加载有什么区别？

### MyBatis 一级缓存和二级缓存有什么区别？

一级缓存是 `SqlSession` 级别，默认开启，同一个 `SqlSession` 中相同查询可以复用缓存；二级缓存是 Mapper namespace 级别，默认关闭，需要显式配置。涉及更新操作时缓存会被清理，避免读到旧数据。

#### 常见追问

- 为什么一级缓存可能导致脏读误解？
- 二级缓存为什么默认关闭？
- 分布式环境下 MyBatis 二级缓存有什么风险？

## MyBatis 与 Hibernate

### MyBatis 和 Hibernate 有什么区别？

MyBatis 是半自动 ORM，需要开发者编写 SQL，灵活度高，适合复杂查询和强 SQL 控制场景；Hibernate 是完整 ORM，更强调对象关系映射和自动 SQL 生成，开发效率高但学习成本和调优复杂度更高。互联网业务常偏向 MyBatis，传统企业系统可能更多见 Hibernate / JPA。

#### 常见追问

- MyBatis 算不算 ORM？
- Hibernate 为什么调优难？
- JPA、Hibernate、MyBatis 怎么选？

#### 关联文档

- [Hibernate 面试题](/interview/hibernate)
- [Spring Boot 面试题](/interview/spring-boot)

## 执行器与插件

### MyBatis Executor 有哪些类型？

常见执行器包括 `SimpleExecutor`、`ReuseExecutor` 和 `BatchExecutor`。`SimpleExecutor` 每次执行都会创建 Statement；`ReuseExecutor` 会复用 Statement；`BatchExecutor` 用于批量执行更新语句，减少数据库交互次数。

#### 常见追问

- 批量插入为什么更快？
- BatchExecutor 使用时要注意什么？
- Statement 复用有什么收益？

### MyBatis 自定义插件怎么实现？

MyBatis 插件需要实现 `Interceptor` 接口，通过 `@Intercepts` 和 `@Signature` 指定拦截目标，可以拦截 `Executor`、`StatementHandler`、`ParameterHandler`、`ResultSetHandler`。核心方法包括 `intercept()`、`plugin()` 和 `setProperties()`。

#### 常见追问

- MyBatis 插件能拦截哪些对象？
- 分页插件为什么常拦截 StatementHandler？
- 插件链顺序会影响结果吗？

#### 关联文档

- [MyBatis-Plus](/storage/mybatis-plus)
