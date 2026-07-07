---
title: 'MyBatis 面试题'
description: 'MyBatis 面试题整理，覆盖参数绑定、分页、缓存、延迟加载、执行器、分页插件和自定义插件机制。'
outline: [2, 3]
---

# MyBatis 面试题

本页整理 MyBatis 高频面试题，覆盖参数绑定、分页、延迟加载、缓存、执行器和插件机制。MyBatis-Plus 是 MyBatis 的增强工具，底层很多问题仍要回到 MyBatis 本身理解。

## 核心概念

### 什么是 MyBatis？核心模块有哪些？

MyBatis 是半自动 ORM / SQL 映射框架，负责把 Java 方法、SQL 语句、参数和结果对象映射起来。核心模块包括配置解析、Mapper 代理、SQL 解析、参数处理、执行器、结果映射和插件机制。它保留手写 SQL 的灵活性，适合复杂查询和强 SQL 控制场景。

#### 常见追问

- MyBatis 和 JDBC 有什么区别？
- Mapper 接口为什么不用写实现类？

### MyBatis 的优点和缺点是什么？

MyBatis 的优点是 SQL 可控、学习成本较低、和数据库特性结合灵活，适合复杂查询和性能调优；缺点是需要维护 SQL，表结构变化时 Mapper 和结果映射可能要同步调整，对复杂对象关系的自动管理不如完整 ORM。业务系统中通常用 MyBatis 或 MyBatis-Plus 平衡效率和可控性。

#### 常见追问

- MyBatis 为什么适合复杂报表？
- MyBatis 会不会增加 SQL 维护成本？
- MyBatis-Plus 解决了哪些重复 CRUD 问题？

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

### resultMap 和 resultType 有什么区别？

`resultType` 适合字段名和对象属性名基本一致的简单映射；`resultMap` 适合复杂映射，例如字段名不一致、嵌套对象、一对一、一对多、分步查询和延迟加载。简单查询可以用 `resultType`，复杂对象关系或字段映射规则明确时使用 `resultMap`。

#### 常见追问

- 字段名和属性名不一致怎么处理？
- 一对多映射用什么标签？
- `association` 和 `collection` 有什么区别？

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

### MyBatis 动态 SQL 是什么？常见标签有哪些？

动态 SQL 是 MyBatis 根据参数条件动态拼接 SQL 的能力，常见标签包括 `if`、`choose`、`when`、`otherwise`、`where`、`set`、`trim`、`foreach`。它适合条件查询、批量操作和动态更新，但要注意 SQL 可读性和参数安全，避免滥用 `${}`。

#### 常见追问

- `where` 标签解决什么问题？
- `foreach` 常用于哪些场景？
- 动态 SQL 如何避免 SQL 注入？

### MyBatis 如何进行事务管理？

MyBatis 自身支持 JDBC 事务和 MANAGED 事务。单独使用 MyBatis 时可以通过 `SqlSession` 提交或回滚；在 Spring 项目中通常交给 Spring 事务管理，由 `DataSourceTransactionManager` 统一控制连接、提交和回滚。生产项目更常见的是用 `@Transactional` 管理事务边界。

#### 常见追问

- Spring 事务和 MyBatis 事务是什么关系？
- 为什么同一个事务要复用同一个数据库连接？
- Mapper 方法里能不能手动提交事务？

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

### MyBatis 批处理如何实现？

MyBatis 可以使用 `BatchExecutor` 或批处理相关配置把多条更新语句批量发送给数据库，减少网络交互次数。批处理适合大量插入、更新场景，但要控制批次大小，避免 SQL 过大、事务过长或内存占用过高。

#### 常见追问

- `BatchExecutor` 什么时候真正执行 SQL？
- 批量插入为什么要分批提交？
- 批处理失败如何定位具体数据？

### 什么是 MyBatis 的 SqlSource？

`SqlSource` 表示一条 SQL 的来源和生成逻辑。静态 SQL 通常会被解析成固定 SQL，动态 SQL 会根据运行时参数生成最终 SQL。MyBatis 执行 Mapper 方法时，会从 `MappedStatement` 中拿到 `SqlSource`，再生成 `BoundSql`。

#### 常见追问

- 静态 SQL 和动态 SQL 的 SqlSource 有什么区别？
- `MappedStatement` 和 `SqlSource` 是什么关系？
- 为什么动态 SQL 要运行时生成？

### 什么是 MyBatis 的 SqlNode？

`SqlNode` 是动态 SQL 语法树中的节点抽象，`if`、`where`、`foreach` 等标签都会被解析成不同类型的节点。执行时这些节点根据参数上下文拼接 SQL 片段，最终形成可执行 SQL。

#### 常见追问

- `if` 标签底层如何判断条件？
- `foreach` 为什么能生成批量参数？
- 动态 SQL 解析发生在启动时还是运行时？

### 什么是 MyBatis 的 ParameterMapping？

`ParameterMapping` 描述 SQL 占位符和 Java 参数之间的映射关系，包括参数名、Java 类型、JDBC 类型和类型处理器等信息。执行 SQL 前，MyBatis 会根据这些映射把方法参数设置到 `PreparedStatement` 中。

#### 常见追问

- `TypeHandler` 在参数处理中做什么？
- `#{}` 为什么能防止 SQL 注入？
- 参数为对象时 MyBatis 如何取属性？

### 什么是 MyBatis 的 BoundSql？

`BoundSql` 是 MyBatis 最终生成的可执行 SQL 信息，包含带 `?` 占位符的 SQL 字符串、参数映射列表和附加参数。插件、分页组件和日志工具经常会读取或修改 `BoundSql` 来实现 SQL 改写、参数打印或分页追加。

#### 常见追问

- `BoundSql` 中的 SQL 是最终发给数据库的吗？
- 分页插件为什么常修改 `BoundSql`？
- 如何打印完整 SQL 和参数？
