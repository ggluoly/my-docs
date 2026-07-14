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
    MyBatis 本质上是对 JDBC 的封装，底层还是通过 JDBC 操作数据库。
    JDBC 需要手动写获取连接、创建 Statement、设置参数、执行 SQL、处理 ResultSet、关闭资源这些代码，比较繁琐，也容易出错。
    MyBatis 把这些通用流程封装掉了，开发时主要关注 SQL 和参数映射、结果映射，代码更简洁。
    另外 MyBatis 支持动态 SQL、Mapper 接口、一级缓存、结果集自动映射，也更方便和 Spring 集成。
    简单说，JDBC 更底层、更灵活，但开发成本高；MyBatis 在保留 SQL 可控性的同时，减少了大量模板代码，更适合业务开发。
- Mapper 接口为什么不用写实现类？
    Mapper 接口不用写实现类，是因为 MyBatis 在运行时会通过 JDK 动态代理为接口生成代理对象。
    调用 Mapper 方法时，实际进入的是 MyBatis 的代理逻辑，它会根据接口的全限定名和方法名，找到对应的 mappedStatement，也就是 XML 里或注解上配置的 SQL。
    然后 MyBatis 完成参数处理、SQL 执行、结果映射，最后把结果返回给调用方。
    所以 Mapper 接口本身只定义方法，真正的执行逻辑由 MyBatis 的动态代理和 SQL 映射文件完成。

### MyBatis 的优点和缺点是什么？

MyBatis 的优点是 SQL 可控、学习成本较低、和数据库特性结合灵活，适合复杂查询和性能调优；
缺点是需要维护 SQL，表结构变化时 Mapper 和结果映射可能要同步调整，对复杂对象关系的自动管理不如完整 ORM。业务系统中通常用 MyBatis 或 MyBatis-Plus 平衡效率和可控性。

#### 常见追问

- MyBatis 为什么适合复杂报表？
    MyBatis 适合复杂报表，主要是因为 SQL 可控性强。
    复杂报表通常会有多表关联、分组统计、子查询、动态条件、排序分页等逻辑，如果用 ORM 自动生成 SQL，可能不够直观，也不好优化。
    MyBatis 可以直接手写 SQL，方便针对执行计划、索引、慢 SQL 做优化，同时也支持动态 SQL，可以根据不同查询条件拼接不同的 where、order by。
    另外 MyBatis 的结果映射也比较灵活，复杂查询结果可以映射成 DTO 或嵌套对象。
    所以复杂报表场景下，MyBatis 既保留了 JDBC 级别的 SQL 控制能力，又减少了手写 JDBC 的模板代码。
- MyBatis 会不会增加 SQL 维护成本？
    会有一定可能，主要看项目 SQL 管理方式。
    MyBatis 的 SQL 通常是手写的，如果业务复杂、XML 文件很多、动态 SQL 写得很长，就容易出现 SQL 分散、可读性下降、字段变更时修改点多的问题，这会增加维护成本。
    但它的好处是 SQL 清晰可控，复杂查询和性能优化更方便。
    实际项目里一般会通过规范 Mapper 分层、SQL 命名、控制动态 SQL 复杂度、公共 SQL 片段复用来降低维护成本。
    所以 MyBatis 不一定必然增加维护成本，但如果缺少规范，复杂业务下确实容易让 SQL 维护变重。
- MyBatis-Plus 解决了哪些重复 CRUD 问题？
    MyBatis-Plus 主要解决了单表 CRUD 的重复代码问题。
    像根据主键新增、删除、修改、查询，根据条件查询列表、分页查询、批量操作这些常见逻辑，不需要每个 Mapper 都重复写 SQL。
    它通过 BaseMapper、ServiceImpl、Wrapper 条件构造器等能力，把通用 CRUD 封装好了，开发时只要定义实体和 Mapper 接口，就可以直接调用这些方法。
    这样可以减少 XML 和 Mapper 方法数量，提高开发效率。
    不过它更适合标准单表操作，复杂联表查询、复杂报表这类场景，通常还是会回到手写 SQL。

## 参数绑定

### MyBatis 中 #{} 和 ${} 有什么区别？

`#{}` 是预编译参数绑定，会使用 `PreparedStatement` 的占位符，能有效防止 SQL 注入；
`${}` 是字符串替换，会把内容直接拼到 SQL 中，存在注入风险。
普通查询条件应使用 `#{}`，只有动态表名、字段名、排序方向等不能参数化的位置才谨慎使用 `${}`，并做好白名单校验。

#### 常见追问

- 为什么表名不能用 `#{}` 参数化？
    MyBatis 里 `#{}` 不能用来参数化表名，核心原因是它对应的是 JDBC 的 `PreparedStatement` 占位符，只能替换 SQL 里的“值”，不能替换表名、字段名、关键字这类 SQL 结构。
    比如 `select * from #{tableName}`，最终会被当成 `select * from ?`，数据库会把 `?` 当成参数值处理，而不是表名，所以语法不成立。
    表名、列名这类内容如果要动态拼接，只能用 `${}`，因为它是字符串替换，比如 `select * from ${tableName}`。
    但是 `${}` 有 SQL 注入风险，所以动态表名不能直接接收外部参数，一般要在代码里做白名单校验或枚举映射，确认是合法表名后再拼接。
- 排序字段动态传入怎么防注入？
    动态排序字段不能直接用前端传入的值拼到 `order by ${}` 里，否则有 SQL 注入风险。
    一般做法是白名单控制，比如前端传 `createTime`、`name`，后端用枚举或 Map 映射成固定数据库字段 `create_time`、`name`，不在白名单里的直接拒绝或使用默认排序。
    排序方向也要单独校验，只允许 `ASC`、`DESC`，不能直接透传。
    在 MyBatis 里排序字段不能用 `#{}`，因为字段名属于 SQL 结构，只能用 `${}` 拼接，所以必须在进入 SQL 前完成白名单校验。
    核心原则就是：**动态字段可以拼接，但不能信任用户输入，只能拼接后端确认过的固定值**。
- MyBatis 如何处理参数类型？
    MyBatis 处理参数类型主要靠 `parameterType`、参数名解析和 `TypeHandler`。
    如果 Mapper 方法只有一个简单参数，比如 `Integer`、`String`，普通 `#{}` 绑定中常可使用 `#{value}` 或 `#{_parameter}`。为避免依赖内部命名行为，实际项目更推荐使用 `@Param("id")` 后写 `#{id}`；单参数对象则写对象属性名。
    如果是多个参数，MyBatis 会封装成一个 Map，默认可以用 `param1`、`param2`，也可以用 `@Param` 指定名字，这种方式更推荐。
    如果参数是对象，`#{}` 里写的是对象属性名，MyBatis 会通过反射取值，比如 `#{userName}`。
    真正给 `PreparedStatement` 赋值时，MyBatis 会根据 Java 类型和 JDBC 类型选择对应的 `TypeHandler`，完成 Java 类型到数据库类型的转换。
    所以整体流程就是：先解析参数名，再取出参数值，最后通过 `TypeHandler` 设置到 SQL 占位符里。

#### 关联文档

- [MyBatis-Plus](/storage/mybatis-plus)
- [JavaWeb 面试题](/interview/java-web)

### resultMap 和 resultType 有什么区别？

`resultType` 适合字段名和对象属性名基本一致的简单映射；`resultMap` 适合复杂映射，例如字段名不一致、嵌套对象、一对一、一对多、分步查询和延迟加载。简单查询可以用 `resultType`，复杂对象关系或字段映射规则明确时使用 `resultMap`。

#### 常见追问

- 字段名和属性名不一致怎么处理？
    MyBatis 里字段名和属性名不一致，常见有三种处理方式。
    第一种是 SQL 里起别名，让查询结果字段名和 Java 属性名一致，比如 `user_name as userName`。
    第二种是使用 `resultMap` 显式映射，用 `<result column="user_name" property="userName"/>`，适合字段比较多或者映射关系复杂的情况。
    第三种是开启驼峰映射，配置 `mapUnderscoreToCamelCase=true`，这样 `user_name` 可以自动映射到 `userName`。
    如果只是下划线转驼峰，一般开启驼峰映射就够了；如果命名差异没有规律，通常用 `resultMap` 更合适。
- 一对多映射用什么标签？
    MyBatis 一对多映射用 `resultMap` 里的 `<collection>` 标签。
    `<collection>` 用来映射集合属性，比如一个用户有多个订单，Java 对象里通常是 `List<Order>`。
    常用属性有 `property` 表示 Java 里的集合属性名，`ofType` 表示集合元素类型。
    实现方式可以用嵌套结果映射，也可以用嵌套查询；如果是联表查询，一般配合 `<id>` 去重，避免主对象重复创建。
    一对一用的是 `<association>`，一对多用的是 `<collection>`。
- `association` 和 `collection` 有什么区别？
    `association` 和 `collection` 都是 `resultMap` 里的关联映射标签，区别主要在映射对象关系不同。
    `association` 用来映射一对一或多对一关系，属性类型通常是一个对象，比如订单里有一个用户。
    `collection` 用来映射一对多关系，属性类型通常是集合，比如用户里有多个订单。
    配置上，`association` 常用 `javaType` 指定对象类型，`collection` 常用 `ofType` 指定集合元素类型。
    简单说，属性是单个对象用 `association`，属性是集合用 `collection`。

## 分页

### MyBatis 逻辑分页和物理分页有什么区别？

**逻辑分页**是先查询出较多数据，再在内存中截取需要的部分；
**物理分页**是在 SQL 层面加 `limit`、`offset` 等分页语句，只让数据库返回当前页数据。生产环境大数据量分页应使用物理分页，避免内存浪费和数据库压力。

#### 常见追问

- 深分页为什么慢？
    深分页慢主要是因为数据库需要先扫描并排序大量数据，然后再丢弃前面的数据。
    比如 `limit 1000000, 10`，并不是直接定位到第 1000000 条，而是先找到前 1000010 条，再跳过前 1000000 条，只返回 10 条。
    如果还涉及 `order by`、回表、索引不合适，性能会更差，因为扫描行数、排序成本和 IO 成本都会很高。
    常见优化方式是用索引覆盖、子查询延迟关联，或者改成基于上一次最大 ID 的游标分页，比如 `where id > lastId limit 10`，避免大量 offset 跳过数据。
- 如何优化 `limit offset` 深分页？
    优化 `limit offset` 深分页，核心是避免数据库扫描大量数据后再丢弃。
    常见做法有几种：
    第一种是**游标分页**，也叫基于上一次查询位置分页，比如用 `where id > lastId order by id limit 10`，这样可以走索引范围查询，性能最好，但不适合随意跳页。
    第二种是**延迟关联**，先通过覆盖索引查出主键，比如 `select id from table order by id limit 1000000,10`，再根据这些 id 回表查完整数据，减少回表成本。
    第三种是**保证排序字段有合适索引**，尽量让 `where` 和 `order by` 命中联合索引，避免全表扫描和文件排序。
    第四种是**限制最大可翻页数**，业务上不允许无限深翻页，深页数据可以通过搜索条件缩小范围。
    如果必须支持跳到很深的页，一般会结合缓存、ES 或者预计算结果来做，单纯依赖 `limit offset` 性能会比较差。
- 分页插件如何识别数据库方言？
    分页插件识别数据库方言一般有两种方式。
    一种是**手动配置**，比如配置 `helperDialect=mysql`，插件直接按指定数据库生成对应的分页 SQL。
    另一种是**自动识别**，插件会通过数据源拿到 `Connection`，再通过 `DatabaseMetaData#getDatabaseProductName()` 或 JDBC URL 判断数据库类型，比如 MySQL、Oracle、PostgreSQL，然后选择对应方言。
    识别出方言后，插件会在 MyBatis 执行 SQL 前拦截原 SQL，根据不同数据库改写成对应的分页语句，比如 MySQL 用 `limit`，Oracle 会用嵌套查询加 `rownum`。
    **实际项目中更推荐显式配置方言**，避免多数据源或连接获取异常时识别不准确。

### RowBounds 会一次性查询全部结果吗？

`RowBounds` 是 MyBatis 提供的逻辑分页能力，通常不会简单把所有结果一次性加载成 List 再截取，但它仍然依赖 JDBC 拉取结果并在客户端跳过数据，数据量大时效率较低。生产环境更推荐 SQL 物理分页或分页插件。

#### 常见追问

- RowBounds 适合什么场景？
    `RowBounds` 适合小数据量、结果集可控的场景，比如后台简单列表、内存中做少量数据分页，或者配合分页插件使用。
    它本身在 MyBatis 里默认是逻辑分页，SQL 不会自动加 `limit`。MyBatis 会在结果集处理阶段跳过 `offset` 前的行，并至多映射 `limit` 行，而不是必然先把所有行装入 List；但数据库端仍执行未加分页限制的 SQL，深 offset 下数据库扫描、网络传输和客户端遍历成本仍可能很高。
    如果接了分页插件，插件可以拦截 `RowBounds` 并改写成数据库物理分页 SQL，这种情况下才适合正式分页查询。
    所以一般不建议单独用 `RowBounds` 做大表分页，尤其不适合深分页。
- 为什么逻辑分页不适合大数据量？
    逻辑分页不适合大数据量，主要是因为它不在数据库层面限制 SQL 的扫描和返回范围。MyBatis 原生 `RowBounds` 会在结果集处理阶段跳过 `offset` 前的行，并至多映射 `limit` 行，而不是必然先把全部结果装入 List。
    这样会带来几个问题：
    第一，数据库需要扫描和返回大量无用数据，IO 和网络传输成本高。
    第二，驱动和网络可能仍要传输大量无用行，客户端也需要遍历或由驱动定位偏移前行，资源成本会随 offset 增大。
    第三，深分页时前面大量数据都会被丢弃，`offset` 越大浪费越明显。
    所以大数据量分页更适合用数据库物理分页，比如 MySQL 的 `limit`，或者基于游标、索引条件的分页方式。
- MyBatis-Plus 分页属于哪种？
    MyBatis-Plus 的分页属于物理分页。
    它的分页插件会拦截 MyBatis 执行的 SQL，根据数据库方言把原 SQL 改写成带分页语法的 SQL，比如 MySQL 会拼接 `limit`，同时也可以生成 `count` 查询。
    所以它不是把全部数据查到内存里再截取，不属于 MyBatis 原生 `RowBounds` 那种默认逻辑分页。
    需要注意的是，只有正确配置了分页插件并使用 `Page` 等分页参数时，才会走 MyBatis-Plus 的物理分页能力。MyBatis-Plus 3.5.9+ 还需要显式引入 `mybatis-plus-jsqlparser`，并注册 `PaginationInnerInterceptor`；多插件时分页内拦截器建议最后添加。

### MyBatis 分页插件原理是什么？

分页插件通常通过 MyBatis 插件机制在 `Executor` 或 `StatementHandler` 层处理分页，根据数据库方言让实际执行 SQL 带上分页语义，并可能额外执行 count 查询。具体拦截点取决于插件实现：PageHelper 的主拦截点是 `Executor.query`，MyBatis-Plus 的分页也通过 `MybatisPlusInterceptor` 的 Executor 查询链处理；另一些插件会拦截 `StatementHandler.prepare` 改写 SQL。

#### 常见追问

- 为什么分页插件要识别数据库方言？
    因为不同数据库的分页 SQL 语法不一样，分页插件要根据数据库方言生成对应的物理分页 SQL。
    比如 MySQL 通常用 `limit offset,size`，Oracle 旧版本常用 `rownum` 包一层查询，SQL Server 可能用 `offset fetch` 或 `top`。如果不识别数据库方言，插件就无法正确改写 SQL，可能导致语法错误或者分页结果不正确。
    另外，`count` SQL 的优化、关键字处理、排序分页语法等也可能和数据库有关，所以分页插件一般需要配置或自动识别数据库类型。
- count 查询如何优化？
    第一，尽量让 `count` 走索引，避免全表扫描，比如统计条件字段建立合适索引。
    第二，分页时如果不需要总数，可以关闭 `count` 查询，比如 MyBatis-Plus 里设置不查询总数。
    第三，复杂 SQL 可以手写 `count` 语句，避免插件自动生成的 `count` SQL 过于复杂。
    第四，减少不必要的 `join`、`order by`、子查询，`count` 只保留统计需要的条件。
    第五，大数据量下如果总数不要求绝对实时，可以用缓存、汇总表或者异步统计。
    核心就是**减少扫描范围，尽量利用索引，并避免每次分页都做昂贵的全量统计**。
- 分页插件和手写 limit 有什么区别？
    分页插件和手写 `limit` 本质上都是物理分页，最终都会把分页条件加到 SQL 里。
    区别主要是**分页插件更通用**，它会根据数据库方言自动生成分页 SQL，不需要在每个 SQL 里手写 `limit`，换数据库时改动也更小。
    另外分页插件通常会**自动处理总数查询**，比如生成 `count` SQL，配合 `Page` 对象返回总条数、页码、页大小等信息。
    手写 `limit` 更直观，SQL 可控性更强，适合特殊复杂场景，但需要自己计算偏移量、自己写 `count`，也容易在多数据库适配时产生重复代码。
    所以一般业务分页用分页插件，复杂 SQL 或性能要求特别高的场景可以手写分页和 `count` SQL。

## 延迟加载与缓存

### MyBatis 是否支持延迟加载？

支持。开启 `lazyLoadingEnabled` 后，关联对象或集合可以在真正访问属性时再触发查询。延迟加载适合减少不必要的关联查询，但如果使用不当，可能导致 N+1 查询问题。

#### 常见追问

- 什么是 N+1 查询？
    N+1 查询是指先查询一次主数据，得到 N 条记录后，又针对每条记录分别再查一次关联数据，最终变成 1 次主查询加 N 次子查询。
    比如先查出 100 个订单，然后每个订单再单独查一次用户信息，就会执行 101 次 SQL。
    这种问题会导致数据库访问次数暴增，性能很差，数据量越大越明显。
    常见优化方式是用 `join` 一次查出关联数据，或者先批量查出关联 ID，再用 `in` 查询关联数据，然后在内存里组装结果。
- 延迟加载底层怎么触发？
    延迟加载底层一般是通过代理对象触发的。
    查询主对象时，关联对象不会马上查出来，而是先放一个代理对象或者代理集合。
    当代码真正访问关联属性时，比如调用 `getUser()`、`getOrders()`，代理对象会拦截这个方法调用，判断数据是否已经加载。
    如果还没加载，就根据关联关系和主键生成 SQL 去数据库查询，查完后把结果填充到代理对象里，后续再访问就直接返回缓存的数据。
    MyBatis 通常通过结果对象代理和 `ResultLoaderMap` 记录待加载属性；访问 getter 或配置的触发方法时，代理会执行对应的嵌套查询。这里不是 MyBatis 插件 `Interceptor` 机制。当前默认代理工厂是 Javassist，CGLIB 在 MyBatis 3.5.10 起已废弃；Hibernate 则常见通过代理对象或字节码增强实现。
    所以延迟加载不是自动“凭空发生”的，而是访问关联属性的方法调用时被代理拦截后触发的。
- MyBatis 和 Hibernate 的延迟加载有什么区别？
    MyBatis 和 Hibernate 都可以通过代理对象实现延迟加载，但侧重点不一样。
    MyBatis 的延迟加载通常依赖 `association`、`collection` 配合嵌套查询来实现，本质还是**访问属性时再执行一条配置好的 SQL**，SQL 需要开发者自己写，可控性强，但自动化程度低。
    Hibernate 是完整 ORM，延迟加载和对象状态、Session、一级缓存绑定得更深，访问代理对象或持久化集合时自动触发查询，开发者一般不需要直接写关联查询 SQL。
    另外 Hibernate 如果在 Session 关闭后访问懒加载属性，容易出现 `LazyInitializationException`；MyBatis 没有这么强的持久化上下文概念，更多是执行映射中定义好的延迟查询。
    简单说，MyBatis 的延迟加载更偏“**按配置延迟执行 SQL**”，Hibernate 更偏“**通过 ORM 管理对象关系并自动延迟加载**”。

### MyBatis 一级缓存和二级缓存有什么区别？

一级缓存是 Executor / `SqlSession` 本地缓存，默认 `localCacheScope=SESSION`。只有由 statementId、最终 SQL、参数值、`RowBounds`、环境等组成的缓存键一致时才能复用；若设为 `STATEMENT`，跨语句调用不共享本地缓存。
二级缓存是 Mapper namespace 级别。全局 `cacheEnabled` 默认是 `true`，但 Mapper namespace 必须显式声明 `<cache/>` 或等价配置才会实际拥有二级缓存；涉及更新操作时相关缓存通常会被清理，避免读到旧数据。

#### 常见追问

- 为什么一级缓存可能导致脏读误解？
    一级缓存可能导致“脏读误解”，主要是因为同一个 `SqlSession` 或 Hibernate `Session` 里，第一次查到的数据会被缓存，后面再查相同数据时可能直接从一级缓存返回，不一定重新查数据库。
    如果这期间数据库里的数据被其他事务改了，当前会话再查还是拿到旧值，看起来像“读到了不对的数据”，但这不是真正的数据库脏读。
    真正的脏读是读到了其他事务还没提交的数据；而一级缓存更多是“读到了当前会话缓存中的旧数据”，本质上是缓存一致性问题或者会话级缓存带来的可重复读效果。
    在 MyBatis 默认 `SESSION` 范围下，执行 `update`、`commit`、`rollback` 会清本地缓存，配置 `flushCache="true"` 的查询也会清理；若设为 `STATEMENT`，每次顶层查询结束即清理，`close` 则释放整个会话缓存。在 Hibernate 里，一级缓存就是持久化上下文，可以用 `refresh`、`clear`、`evict` 让数据重新从数据库加载。
- 为什么项目中通常不启用二级缓存？
    MyBatis 全局 `cacheEnabled` 默认允许二级缓存，但 namespace 必须显式声明 `<cache/>` 才会实际启用。项目中通常不启用的主要原因是一致性风险比较大。
    它是 `namespace` 级别的缓存，同一个 Mapper 里的查询可以共享缓存，但如果数据被其他 Mapper、其他系统或者直接 SQL 修改了，当前 namespace 的缓存不一定能及时失效，就可能读到旧数据。
    另外二级缓存跨 `SqlSession` 共享，影响范围比一级缓存大，如果业务里有多表关联查询、频繁更新、分布式部署，缓存同步和失效会更复杂。
    所以 MyBatis 默认更偏向保证数据准确性，把是否开启二级缓存交给开发者根据业务决定。一般适合读多写少、数据变化不频繁、对实时性要求不高的场景。
- 分布式环境下 MyBatis 二级缓存有什么风险？
    分布式环境下 MyBatis 二级缓存主要风险是**缓存不一致**。
    MyBatis 默认二级缓存是本地 JVM 级别的，多个服务节点各自维护自己的缓存。某个节点更新了数据，只会清理本节点对应 `namespace` 的缓存，其他节点的缓存不会自动失效，可能继续读到旧数据。
    另外如果数据被其他系统、定时任务、直连数据库 SQL 修改，MyBatis 也感知不到，二级缓存同样可能不刷新。
    还有一个问题是事务提交前后和缓存刷新时机处理不好，可能出现短时间旧数据；如果缓存对象可变或者序列化配置不合理，也可能带来数据污染或异常。
    所以分布式场景一般不建议直接使用 MyBatis 默认二级缓存，通常会关闭它，改用 Redis 这类集中式缓存，并设计统一的失效策略。

## MyBatis 与 Hibernate

### MyBatis 和 Hibernate 有什么区别？

MyBatis 是半自动 ORM，需要开发者编写 SQL，灵活度高，适合复杂查询和强 SQL 控制场景；
Hibernate 是完整 ORM，更强调对象关系映射和自动 SQL 生成，开发效率高但学习成本和调优复杂度更高。
互联网业务常偏向 MyBatis，传统企业系统可能更多见 Hibernate / JPA。

#### 常见追问

- MyBatis 算不算 ORM？
    严格来说，MyBatis 不算完整意义上的 ORM，更准确地说是 SQL Mapper，或者半 ORM 框架。
    它能把 SQL 查询结果映射成 Java 对象，也能把对象参数映射到 SQL 里，所以具备 ORM 的一部分能力。
    但是它不像 Hibernate/JPA 那样自动生成 SQL、自动维护对象关系、脏检查、级联操作等，MyBatis 的 SQL 主要还是开发者自己写，数据库操作也更贴近 SQL。
    所以面试里可以说：**广义上 MyBatis 有 ORM 映射能力，但严格来说它是半 ORM，更偏向 SQL 映射框架**。
- Hibernate 为什么调优难？
    Hibernate 调优难主要是因为它**屏蔽了很多 SQL 细节**，开发时操作的是对象，但真正执行的是自动生成的 SQL，问题不一定直观。
    比如对象关联关系复杂时，容易出现 N+1 查询、懒加载失效、级联操作过多、一次加载大量数据等问题，这些都可能导致 SQL 数量和执行成本不可控。
    另外 Hibernate 有一级缓存、二级缓存、脏检查、事务上下文这些机制，性能问题不一定只在 SQL 上，也可能和 Session 生命周期、缓存命中率、flush 时机有关。
    相比 MyBatis，Hibernate 自动化程度更高，但可控性更弱，调优时既要懂 ORM 机制，又要能分析最终 SQL 和数据库执行计划，所以调优成本会更高。
- JPA、Hibernate、MyBatis 怎么选？
    一般按 **SQL 可控性、业务模型复杂度和团队熟悉度**来选。
    如果项目更偏标准 ORM，希望少写 CRUD，领域对象关系比较清晰，可以选 JPA；Hibernate 是 JPA 的一种常见实现。
    如果对象关系复杂、想通过实体关联、级联、懒加载这些能力提升开发效率，可以用 Hibernate，但要注意 N+1、懒加载、缓存、自动生成 SQL 带来的调优成本。
    如果业务里复杂 SQL 多、性能要求高、需要精确控制 SQL，比如报表、统计、高并发接口，更适合 MyBatis，因为 SQL 可见、可控，排查和优化更直接。
    简单说，重开发效率和对象模型选 JPA/Hibernate，重 SQL 可控性和性能优化选 MyBatis。实际项目中也可以组合使用，普通 CRUD 用 JPA，复杂查询用 MyBatis。

#### 关联文档

- [Hibernate 面试题](/interview/hibernate)
- [Spring Boot 面试题](/interview/spring-boot)

## 执行器与插件

### MyBatis 动态 SQL 是什么？常见标签有哪些？

动态 SQL 是 MyBatis 根据参数条件动态拼接 SQL 的能力，常见标签包括 `if`、`choose`、`when`、`otherwise`、`where`、`set`、`trim`、`foreach`。它适合条件查询、批量操作和动态更新，但要注意 SQL 可读性和参数安全，避免滥用 `${}`。

#### 常见追问

- `where` 标签解决什么问题？
    `where` 标签主要解决动态 SQL 里 `WHERE` 拼接不方便的问题。
    在 MyBatis 里，如果多个查询条件都是动态的，手写 `WHERE` 容易出现两类问题：没有条件时多出一个 `WHERE`，或者第一个条件前面多出 `AND / OR`，导致 SQL 语法错误。
    `where` 标签会在内部有条件成立时自动加上 `WHERE`，并且会自动去掉开头多余的 `AND` 或 `OR`。
    所以它主要是让动态查询条件拼接更安全、更简洁，避免手动处理 `WHERE 1=1` 或字符串拼接问题。
- `foreach` 常用于哪些场景？
    `foreach` 主要用于遍历集合参数来拼接动态 SQL。
    常见场景是 `IN` 查询，比如根据一批 id 查询数据；也可以用于批量插入、批量更新，或者拼接多个动态条件。
    它可以遍历 `List`、数组、`Map` 等参数，通过 `item`、`index`、`open`、`close`、`separator` 控制生成的 SQL 格式。
    面试里可以简单说：`foreach` 最常见就是**处理集合参数**，尤其是 `where id in (...)` 和批量操作场景。
- 动态 SQL 如何避免 SQL 注入？
    动态 SQL 避免 SQL 注入，核心是使用 `#{}`，不要直接用 `${}` 拼接用户输入。
    `#{}` 底层会走 `PreparedStatement` 预编译参数绑定，用户输入只会作为参数值处理，不会改变 SQL 结构。
    `${}` 是字符串直接替换，适合表名、字段名这类无法预编译的位置，但这些值不能直接来自用户输入，必须做白名单校验。
    另外，动态 SQL 里像 `if`、`where`、`foreach` 本身不是防注入手段，关键还是参数绑定和控制可拼接内容。
    所以面试里可以说：**普通条件值一律用 `#{}`，必须用 `${}` 的地方要限制来源或做白名单校验**。

### MyBatis 如何进行事务管理？

MyBatis 自身支持 JDBC 事务和 MANAGED 事务。单独使用 MyBatis 时可以通过 `SqlSession` 提交或回滚；在 Spring 项目中通常交给 Spring 事务管理，由 `DataSourceTransactionManager` 统一控制连接、提交和回滚。生产项目更常见的是用 `@Transactional` 管理事务边界。

#### 常见追问

- Spring 事务和 MyBatis 事务是什么关系？
    Spring 事务和 MyBatis 事务不是两套同时各管各的关系，整合后一般是由 Spring 统一管理事务。
    MyBatis 本身有事务能力，比如通过 `SqlSession` 手动 `commit`、`rollback`，底层也是基于数据库连接来控制事务。
    但在 Spring 中使用 MyBatis 时，通常通过 `DataSourceTransactionManager` 管理事务，MyBatis 会参与到 Spring 事务里，使用 Spring 绑定到当前线程的同一个数据库连接。
    所以加了 `@Transactional` 后，MyBatis 执行的 SQL 会受 Spring 事务控制，方法正常结束提交，出现符合回滚规则的异常就回滚。
    实际开发中一般不直接调用 MyBatis 的 `commit`、`rollback`，而是交给 Spring 事务统一处理。
- 为什么同一个事务要复用同一个数据库连接？
    因为数据库事务是和连接绑定的。
    在 JDBC 里，一个事务通常是通过同一个 `Connection` 控制的，比如关闭自动提交、执行多条 SQL、最后 `commit` 或 `rollback`。
    如果同一个事务里的 SQL 使用了不同连接，那这些 SQL 实际上就可能处在不同的数据库会话和事务上下文里，提交和回滚也不能作为一个整体保证。
    所以 Spring 事务会把当前事务使用的数据库连接绑定到当前线程，MyBatis 执行 SQL 时从 Spring 获取这个连接，保证同一个事务内复用同一个连接。
    这样才能保证多条 SQL 要么一起提交，要么一起回滚，满足事务的一致性。
- Mapper 方法里能不能手动提交事务？
    Mapper 接口不提供提交事务的能力，也不应承担事务边界职责。
    原生 MyBatis 中，应由持有 `SqlSession` 的调用方执行 `commit()` 或 `rollback()`；Spring 整合 MyBatis 时，事务通常由 Spring 统一管理，Mapper 执行 SQL 使用的是 Spring 绑定到当前线程的连接，提交和回滚由 `@Transactional` 或事务管理器控制。
    在 Spring 场景下，不要尝试在 Mapper 或业务 SQL 调用中手动提交，否则可能破坏 Spring 的事务边界，导致后续异常时无法整体回滚。实际开发中，**事务提交和回滚应该放在 Service 层交给 Spring 管理**。

### MyBatis Executor 有哪些类型？

常见执行器包括 `SimpleExecutor`、`ReuseExecutor` 和 `BatchExecutor`。
`SimpleExecutor` 每次执行都会创建 Statement；`ReuseExecutor` 会复用 Statement；`BatchExecutor` 用于批量执行更新语句，减少数据库交互次数。

#### 常见追问

- 批量插入为什么更快？
    批量插入更快，主要是因为**减少了数据库交互次数**。
    逐条插入时，每插入一条数据都要经历一次 SQL 发送、解析、执行、返回结果，网络 IO 和数据库处理开销都比较大。
    批量插入可以一次发送多条数据，减少网络往返次数，也减少 SQL 解析和执行计划生成的次数。
    若将多条写操作置于较少的事务中统一 `commit`，还能减少频繁事务提交带来的日志刷盘和事务管理开销；这与 JDBC `addBatch()` / `executeBatch()`、MyBatis `flushStatements()` 合并 SQL 执行是两个不同层次的优化。
    所以它不是每一条数据执行得更快，而是把大量重复的固定成本合并了，整体吞吐量更高。
- BatchExecutor 使用时要注意什么？
    `BatchExecutor` 使用时主要注意这几点。
    首先它不是马上执行 SQL，而是先把 SQL 和参数攒起来，等 `flushStatements`、`commit` 或实际数据库查询触发时才真正发送到数据库，所以异常可能会延后暴露。
    其次批量数据量不能无限大，参数对象和 SQL 会在内存里堆积，数据很多时要分批 `flushStatements`，避免内存压力过大。
    然后要注意事务控制，最好放在 Spring 事务里统一提交或回滚，不要在 Mapper 里手动提交。
    还有就是批处理适合相同 SQL 结构的操作，如果 SQL 频繁变化，批处理效果会变差。
    如果中间发生实际数据库查询，MyBatis 会先刷新之前的批处理语句，可能影响预期的批量效果；若查询命中一级或二级缓存，则不会进入数据库查询，也不应把查询当作可靠的 flush 手段。
    最后，`SqlSession` 本身不是线程安全的，不能多个线程共用同一个 `SqlSession` 或 `BatchExecutor`。
- Statement 复用有什么收益？
    `ReuseExecutor` 的确定收益是同一 Executor / 会话内按相同 SQL 复用客户端 JDBC `Statement`，减少客户端对象创建、关闭和重复 prepare 调用。
    是否进一步复用服务端预编译或执行计划，取决于 JDBC 驱动、连接配置和数据库，不应作为 `ReuseExecutor` 的固定承诺。
    `BatchExecutor` 中相同 SQL、相同 `MappedStatement` 会复用同一个 Statement 并不断 `addBatch`，从而实现批量执行；网络往返减少和批量合并属于 `BatchExecutor` 的能力，不是 `ReuseExecutor` 的固有收益。

### MyBatis 自定义插件怎么实现？

MyBatis 插件需要实现 `Interceptor` 接口，通过 `@Intercepts` 和 `@Signature` 指定拦截目标，可以拦截 `Executor`、`StatementHandler`、`ParameterHandler`、`ResultSetHandler`。核心方法包括 `intercept()`、`plugin()` 和 `setProperties()`。

#### 常见追问

- MyBatis 插件能拦截哪些对象？
    MyBatis 插件主要能拦截四大核心对象：`Executor`、`StatementHandler`、`ParameterHandler`、`ResultSetHandler`。
    `Executor` 负责 SQL 执行，可以拦截查询、更新、事务提交回滚等操作。
    `StatementHandler` 负责创建和处理 `Statement`，常用于拦截 SQL，比如分页、SQL 改写。
    `ParameterHandler` 负责参数设置，可以拦截参数绑定过程。
    `ResultSetHandler` 负责结果集映射，可以拦截查询结果处理过程。
    实际开发里最常拦截的是 `Executor` 和 `StatementHandler`，比如分页插件、SQL 日志、数据权限、慢 SQL 统计这些场景。
- 分页插件为什么常拦截 StatementHandler？
    `StatementHandler.prepare` 是一种常见 SQL 改写切点：它离 SQL 真正执行很近，可以在创建 Statement 前拿到待执行 SQL 和参数信息，再改写为带 `limit`、`offset` 等分页语义的 SQL。
    但不是所有分页插件都采用这一路径。PageHelper 的主拦截点是 `Executor.query`，MyBatis-Plus 的分页也以 `MybatisPlusInterceptor` 的 Executor 查询链为核心；它们会在更上层处理分页 SQL、参数和 count 查询。
    所以应理解为：分页插件可在 `Executor` 或 `StatementHandler` 层实现，具体拦截点和 SQL 改写方式取决于插件版本与实现。
- 插件链顺序会影响结果吗？
    会影响。
    MyBatis 多个插件会形成一层层代理，后注册的插件在外层，执行时会先进入外层插件，所以拦截顺序和插件注册顺序有关。
    如果多个插件都修改同一个对象，比如都改 SQL、都处理分页或数据权限，顺序不同可能导致最终 SQL 不一样，结果也可能不一样。
    所以实际使用时需要关注插件顺序，尤其是分页插件、数据权限插件、SQL 改写插件这类会改变 SQL 语义的插件。

#### 关联文档

- [MyBatis-Plus](/storage/mybatis-plus)

### MyBatis 批处理如何实现？

MyBatis 可以使用 `BatchExecutor` 或批处理相关配置把多条更新语句批量发送给数据库，减少网络交互次数。批处理适合大量插入、更新场景，但要控制批次大小，避免 SQL 过大、事务过长或内存占用过高。

#### 常见追问

- `BatchExecutor` 什么时候真正执行 SQL？
    `BatchExecutor` 不是每次调用 `update` 就马上执行 SQL，而是先把 SQL 和参数通过 `Statement.addBatch()` 加到批处理中。
    真正执行 SQL 的时机是在 `flushStatements()` 的时候，底层会调用 JDBC 的 `Statement.executeBatch()`。
    常见触发时机有几个：手动调用 `SqlSession.flushStatements()`、事务 `commit()`、`SqlSession.close()`，以及在批处理过程中发生实际数据库查询前，MyBatis 也会先 `flushStatements()`，避免前面的更新还没落库影响查询结果。若查询命中一级或二级缓存，则不进入实际查询，也不应把查询当作可靠的 flush 手段。
    所以总结就是：**`BatchExecutor` 的 `update` 阶段只是攒批，真正发给数据库执行是在 `flushStatements` 阶段**。
- 批量插入为什么要分批提交？
    批量插入分批提交主要是为了**控制资源和风险**。
    如果一次性插入太多数据，客户端会占用大量内存，数据库也会产生大量 undo/redo 日志，事务时间变长，锁持有时间也会变长，容易影响其他业务。
    另外，单次批量过大还可能触发 SQL 长度限制、网络包大小限制、JDBC 驱动或数据库参数限制，甚至导致超时。
    分批提交后，每个事务更小，执行更稳定，失败时回滚成本也更低，不至于因为一条异常数据导致整个大批次全部回滚。
    所以实际开发中一般会按固定条数分批，比如几百到几千一批，具体大小要看数据量、字段大小、数据库性能和业务对事务一致性的要求。
- 批处理失败如何定位具体数据？
    批处理失败定位具体数据，通常不能只看异常信息，要**结合批次和返回结果**来判断。
    如果是 JDBC，可以捕获 `BatchUpdateException`，通过 `getUpdateCounts()` 看每条语句的执行结果，正常是影响行数，失败可能是 `Statement.EXECUTE_FAILED`，但不同数据库驱动支持程度不完全一样。
    如果是 MyBatis 的 `BatchExecutor`，`flushStatements()` 会返回 `List<BatchResult>`，里面也有 `updateCounts`，可以结合本批次的数据顺序定位。
    实际开发里一般会给每批数据记录批次号、数据下标、业务主键，失败时先定位到哪一批；如果驱动不能精确告诉哪一条失败，就把失败批次缩小，比如二分拆批或逐条重试，最终定位到具体问题数据。
    另外要注意，如果整个批次在一个事务里，失败后可能整体回滚，所以定位和补偿逻辑最好和业务主键、错误日志一起设计。

### 什么是 MyBatis 的 SqlSource？

`SqlSource` 表示一条 SQL 的来源和生成逻辑。静态 SQL 通常会被解析成固定 SQL，动态 SQL 会根据运行时参数生成最终 SQL。MyBatis 执行 Mapper 方法时，会从 `MappedStatement` 中拿到 `SqlSource`，再生成 `BoundSql`。

#### 常见追问

- 静态 SQL 和动态 SQL 的 SqlSource 有什么区别？
    静态 SQL 一般对应 `RawSqlSource`，动态 SQL 一般对应 `DynamicSqlSource`。
    区别主要在解析时机和执行开销。
    静态 SQL 不包含动态标签或 `${}`，MyBatis 在启动加载 Mapper 时就会把 SQL 解析好，参数占位符也会处理成 `?`，运行时直接生成 `BoundSql`，性能开销相对小。
    动态 SQL 包含 `<if>`、`<foreach>`、`<where>` 等动态标签，MyBatis 启动时只是把动态 SQL 节点解析成一棵 SQL 节点树，真正的 SQL 拼接要等到运行时根据参数执行，然后再生成 `BoundSql`。
    所以简单说，`RawSqlSource` 是“提前解析”，`DynamicSqlSource` 是“运行时解析”，最终都会生成 `BoundSql` 给后续的参数处理和 SQL 执行使用。
- `MappedStatement` 和 `SqlSource` 是什么关系？
    `MappedStatement` 可以理解为 Mapper 中一条 SQL 语句的完整描述，像 `selectById` 这种方法最终都会对应一个 `MappedStatement`。
    `SqlSource` 是 `MappedStatement` 里面的一个核心属性，负责生成 SQL。
    它们的关系是：`MappedStatement` 管理这条语句的整体执行信息，比如 statementId、SQL 类型、缓存配置、超时时间、参数映射、结果映射等；而 `SqlSource` 只负责根据入参生成 `BoundSql`。
    执行 Mapper 方法时，MyBatis 会先根据 `namespace + 方法名` 找到对应的 `MappedStatement`，然后通过它内部的 `SqlSource` 调用 `getBoundSql(parameterObject)`，得到最终要执行的 SQL 和参数信息。
    所以可以简单说：**`MappedStatement` 是一条 Mapper SQL 的元信息封装，`SqlSource` 是它内部负责生成 SQL 的组件**。
- 为什么动态 SQL 要运行时生成？
    动态 SQL 要运行时生成，是因为它的**最终 SQL 取决于方法调用时传入的参数**。
    比如 `<if>`、`<choose>`、`<foreach>` 这些标签，只有拿到实际参数后，MyBatis 才知道哪些条件要拼接、集合有多少个元素、`where` 或 `set` 该怎么处理。
    所以动态 SQL 在 Mapper 加载阶段只能先解析成动态节点结构，不能提前确定最终 SQL。
    等执行 Mapper 方法时，MyBatis 会根据入参计算这些动态节点，拼出最终 SQL，再生成 `BoundSql`。
    简单说，动态 SQL 的条件、字段、集合长度都可能随参数变化，所以必须运行时生成。

### 什么是 MyBatis 的 SqlNode？

`SqlNode` 是动态 SQL 语法树中的节点抽象，`if`、`where`、`foreach` 等标签都会被解析成不同类型的节点。执行时这些节点根据参数上下文拼接 SQL 片段，最终形成可执行 SQL。

#### 常见追问

- `if` 标签底层如何判断条件？
    `if` 标签底层不是自己手写解析条件，而是用 OGNL 表达式来判断 `test` 条件。
    MyBatis 解析到 `<if test="xxx">` 时，会创建 `IfSqlNode`，运行时调用它的 `apply` 方法，然后通过 `ExpressionEvaluator.evaluateBoolean(test, context.getBindings())` 判断条件是否成立。
    这里的 `context.getBindings()` 里保存了当前入参，比如 `_parameter`、`param1`、方法参数名等，OGNL 会从这里取值并计算表达式。
    判断规则大致是：如果结果是 `Boolean`，就直接用这个值；如果是数字，就判断是否不等于 0；其他对象就判断是否不为 `null`。
    条件为 `true` 时，才会继续拼接 `if` 标签内部的 SQL；否则这段 SQL 会被跳过。
- `foreach` 为什么能生成批量参数？
    `foreach` 能生成批量参数，是因为它运行时会遍历传入的集合，然后为每个元素动态拼接一段 SQL，并生成对应的参数映射。
    底层对应的是 `ForEachSqlNode`，它会先通过 OGNL 拿到 `collection` 对应的集合，然后逐个遍历元素。每次遍历时，会把当前元素绑定成 `item`，下标绑定成 `index`，再应用标签内部的 SQL。
    为了避免参数名冲突，MyBatis 不会简单都叫 `item`，而是会生成类似 `__frch_item_0`、`__frch_item_1` 这样的唯一参数名，并先把这些值绑定到 `DynamicContext.bindings`。
    `DynamicSqlSource` 创建 `BoundSql` 时会将这些绑定复制到 `additionalParameters`。最终 SQL 类似 `in (?, ?, ?)`，对应 foreach 占位符的 `ParameterMapping` 会优先从 `additionalParameters` 取值；普通占位符通常仍从原始 `parameterObject` 取值。
    所以 `foreach` 本质上是**运行时根据集合长度重复生成 SQL 片段，并为每个元素生成独立参数绑定**。
- 动态 SQL 解析发生在启动时还是运行时？
    动态 SQL 分两步看。
    启动时，MyBatis 会解析 Mapper XML，把动态标签解析成对应的 `SqlNode` 树，比如 `IfSqlNode`、`ForEachSqlNode`、`WhereSqlNode` 等，并封装成 `DynamicSqlSource`。
    运行时，真正根据入参计算动态标签，拼接最终 SQL。比如 `<if>` 是否成立、`<foreach>` 遍历多少次，都是执行 Mapper 方法时才确定的。
    所以准确说，**动态 SQL 的结构解析发生在启动加载 Mapper 时，最终 SQL 生成发生在运行时**。

### 什么是 MyBatis 的 ParameterMapping？

`ParameterMapping` 描述 SQL 占位符和 Java 参数之间的映射关系，包括参数名、Java 类型、JDBC 类型和类型处理器等信息。执行 SQL 前，MyBatis 会根据这些映射把方法参数设置到 `PreparedStatement` 中。

#### 常见追问

- `TypeHandler` 在参数处理中做什么？
    `TypeHandler` 主要**负责 Java 类型和 JDBC 类型之间的转换**。
    在参数处理阶段，MyBatis 会通过 `ParameterHandler` 给 `PreparedStatement` 设置参数。它会遍历 `BoundSql` 里的 `ParameterMapping`，取出每个参数值，然后找到对应的 `TypeHandler`。
    最后调用 `typeHandler.setParameter(ps, index, value, jdbcType)`，把 Java 对象设置到 `PreparedStatement` 里，比如 `Integer` 调 `setInt`，`String` 调 `setString`。
    如果参数是 `null`，还会结合配置的 `jdbcTypeForNull` 或参数上指定的 `jdbcType` 来设置空值。
    所以 `TypeHandler` 在参数处理中就是负责把 Java 参数安全、正确地绑定到 JDBC 占位符上。
- `#{}` 为什么能防止 SQL 注入？
    `#{}` 能防止 SQL 注入，是因为它不会把参数值直接拼进 SQL 字符串，而是**会生成 `?` 占位符**。
    MyBatis 执行时会使用 `PreparedStatement`，再通过 `TypeHandler` 调用 `setParameter` 把参数绑定到占位符上。
    这样参数会被数据库当成普通数据处理，而不是 SQL 语法的一部分，所以即使传入 `1 or 1=1`，也只是一个参数值，不会改变原 SQL 结构。
    底层上，`#{}` 会被解析成 `ParameterMapping`，最终 SQL 是预编译 SQL，参数和值是分离的。
    需要注意的是，`#{}` 只能保护参数值位置，像表名、字段名、排序字段这类 SQL 结构不能用 `#{}` 直接替代，如果用了 `${}` 拼接，就仍然有 SQL 注入风险。
- 参数为对象时 MyBatis 如何取属性？
    参数是对象时，MyBatis 会通过反射取属性值。
    `#{name}` 这种写法，本质上会根据参数对象创建 `MetaObject`，然后按照属性名调用 getter 方法取值，比如调用 `getName()`。
    如果是嵌套属性，比如 `#{user.name}`，也会按属性路径逐层取值。
    取到值之后，再根据 `ParameterMapping` 找到对应的 `TypeHandler`，把值设置到 `PreparedStatement` 的占位符上。
    所以对象参数不是直接整体传给 SQL，而是根据 `#{}` 里的属性表达式，从对象中取出具体属性值。

### 什么是 MyBatis 的 BoundSql？

`BoundSql` 是 MyBatis 最终生成的可执行 SQL 信息，包含带 `?` 占位符的 SQL 字符串、参数映射列表和附加参数。插件、分页组件和日志工具经常会读取或修改 `BoundSql` 来实现 SQL 改写、参数打印或分页追加。

#### 常见追问

- `BoundSql` 中的 SQL 是最终发给数据库的吗？
    `BoundSql` 里的 SQL 基本上**是 MyBatis 解析完成后要交给 JDBC 的 SQL**，但它**不是带真实参数值的最终完整 SQL**。
    因为 `#{}` 会被解析成 `?` 占位符，真实参数值会通过 `ParameterHandler` 和 `TypeHandler` 设置到 `PreparedStatement` 里。
    所以 `BoundSql.getSql()` 看到的是类似 `select * from user where id = ?`，不是 `select * from user where id = 1`。
    如果 SQL 里用了 `${}`，那部分会在生成 `BoundSql` 时直接拼接进去。
    另外如果有分页插件、自定义拦截器之类的逻辑，也可能在执行前修改 SQL。
    所以更准确地说，**`BoundSql` 中的 SQL 是 MyBatis 生成的待执行 SQL 模板，通常会作为 `PreparedStatement` 的 SQL 发给 JDBC，但参数值是另外绑定的**。
- 分页插件为什么常修改 `BoundSql`？
    分页本质上**要改变最终执行的 SQL**，而 `BoundSql` 保存了 MyBatis 生成的 SQL 文本和参数映射，因此它常会成为分页处理需要调整或替换的对象。
    比如原 SQL 是普通查询，分页插件需要根据数据库方言改成带 `limit`、`offset`，或者 `rownum` 的分页 SQL。
    插件可以修改或替换 `BoundSql`，也可以重建相关执行上下文，让 JDBC 最终执行分页后的 SQL；具体方式取决于插件版本与实现，并不要求所有插件都直接修改 `BoundSql` 字段。
    有些分页还需要额外执行 `count` 查询，这时也会基于原始 `BoundSql` 生成一条统计 SQL。
    需要注意的是，`BoundSql` 的 SQL 字段本身没有公开 setter，所以很多插件会通过反射或重新构造 `MappedStatement`、`BoundSql` 的方式来替换 SQL。
- 如何打印完整 SQL 和参数？
    MyBatis 自带日志可以打印 SQL 和参数，但一般是分开的，不是完整拼接后的 SQL。
    可以在配置里打开日志，比如配置 `logImpl=STDOUT_LOGGING`，或者接入 `slf4j`、`logback`，执行时会看到类似：
    `Preparing: select * from user where id = ?`
    `Parameters: 1(Integer)`
    如果想打印“完整 SQL”，常见做法有两种。
    一种是在 MyBatis 拦截器里拦截 `StatementHandler.prepare`，拿到 `BoundSql.getSql()`、`ParameterMapping` 和参数对象，再根据属性名取值，把 `?` 替换成实际参数，仅用于日志排查。
    另一种是用现成组件，比如 `p6spy`、`log4jdbc`，它们能在 JDBC 层打印最终 SQL 和参数，使用起来更方便。
    需要注意，拼接出来的完整 SQL 主要用于排查问题，真实执行时还是 `PreparedStatement` 加占位符参数绑定，不是把完整字符串直接发给数据库执行。
