---
title: 'Hibernate 面试题'
description: 'Hibernate 面试题整理，覆盖 ORM 基础、Session、查询方式、缓存、对象状态和传统持久化框架问题。'
outline: [2, 3]
---

# Hibernate 面试题

本页整理 Hibernate 和传统 ORM 面试题。Hibernate 在新项目中不一定是首选，但在 JPA、老系统和企业应用维护中仍然常见，建议掌握核心概念和与 MyBatis 的差异。

## ORM 基础

### ORM 框架是什么？

ORM 是对象关系映射，用对象模型映射数据库表、字段和关系。开发者操作对象，ORM 框架负责生成 SQL、执行数据库操作并把结果映射回对象。Hibernate 是典型 ORM 框架，JPA 是 ORM 规范。

#### 常见追问

- ORM 有什么优缺点？
    ORM 的优点主要是能把表和对象做映射，减少大量 JDBC 手写代码，比如结果集封装、参数绑定、基础 CRUD 这些都可以简化。
    它还能提升开发效率，代码更偏面向对象，配合事务、缓存、懒加载、关联映射等机制，业务代码会更清晰。
    缺点是 SQL 执行细节被框架封装后，复杂场景不容易掌控，可能出现 N+1 查询、懒加载异常、生成 SQL 不符合预期等问题。
    另外 ORM 对复杂 SQL、批量操作、性能优化不一定方便，有时还不如直接写 SQL 清楚。
    所以一般简单 CRUD 和对象关系比较清晰的场景适合用 ORM；复杂报表、高性能批处理、强 SQL 优化场景，更倾向于手写 SQL 或结合 MyBatis 这类半 ORM 框架。
- JPA 和 Hibernate 有什么关系？
    JPA 是 Java 持久化规范，定义了一套 ORM 标准，比如实体映射、`EntityManager`、JPQL、生命周期管理这些接口和规则。
    Hibernate 是 JPA 的一种实现，也是比较常用的 ORM 框架。
    可以理解为：**JPA 是接口和标准，Hibernate 是具体实现**。
    项目里如果使用 JPA 注解和 `EntityManager` 编程，底层可以选择 Hibernate、EclipseLink 等实现；实际开发中 Spring Data JPA 默认常用的实现就是 Hibernate。
    另外 Hibernate 本身也有一些 JPA 标准之外的扩展能力，比如自己的缓存、注解和查询特性。
- MyBatis 算不算 ORM？
    MyBatis 一般不算严格意义上的 ORM，更准确说是半 ORM 或 SQL Mapper 框架。
    它能把 SQL 查询结果映射成 Java 对象，也能把对象参数映射到 SQL 参数里，所以具备一部分 ORM 能力。
    但它不像 Hibernate/JPA 那样自动管理实体状态、自动生成 SQL、做脏检查、级联关系维护、完整的一二级缓存和对象生命周期管理。
    MyBatis 的核心还是开发者自己写 SQL，框架负责参数绑定和结果映射，所以 SQL 可控性更强，适合复杂 SQL 和性能要求比较明确的场景。

#### 关联文档

- [Spring Boot 面试题](/interview/spring-boot)
- [MyBatis 面试题](/interview/mybatis)

### Hibernate 如何打印 SQL？

可以配置 `hibernate.show_sql=true` 在控制台输出 SQL，也可以结合日志框架打印 SQL 和参数。生产环境不建议长期打开详细 SQL 日志，避免影响性能和泄漏敏感信息。

#### 常见追问

- 如何打印 SQL 参数？
    Hibernate 里 `show_sql=true` 只能打印 SQL，不会打印绑定参数。
    如果要打印参数，一般通过日志级别配置：
    `org.hibernate.SQL=DEBUG` 用来打印 SQL；
    `org.hibernate.type.descriptor.sql.BasicBinder=TRACE` 用来打印参数绑定值。
    如果是 Spring Boot，可以这样配：
    `logging.level.org.hibernate.SQL=debug`
    `logging.level.org.hibernate.type.descriptor.sql.BasicBinder=trace`
    这样日志里能看到类似 `binding parameter [1] as [VARCHAR] - [xxx]` 的内容。
    Hibernate 6 里参数日志的包名有变化，一般配置：
    `logging.level.org.hibernate.orm.jdbc.bind=trace`
    实际排查时也可以用 P6Spy、datasource-proxy 这类工具，打印出来的 SQL 和参数会更直观。
- 生产环境如何排查慢 SQL？
    生产环境排查慢 SQL 一般先从现象和范围入手，确认是接口整体慢、数据库慢，还是某几条 SQL 慢。
    首先看应用日志、APM、链路追踪，定位慢接口对应的 SQL 和耗时；如果有慢查询日志，比如 MySQL 的 slow query log，也可以直接从里面找执行时间长、扫描行数多、执行频率高的 SQL。
    拿到 SQL 后会用 `EXPLAIN` 看执行计划，重点看有没有走索引、访问类型、扫描行数、是否有 filesort、temporary、回表过多等情况。
    然后结合表结构和数据量分析索引是否合理，比如查询条件、排序字段、关联字段是否有合适索引，联合索引顺序是否匹配，是否存在索引失效，比如函数计算、隐式类型转换、`like '%xxx'`、范围条件后面的索引失效等。
    如果是关联查询慢，会看 join 字段是否有索引、驱动表是否合适、返回数据量是否过大。
    如果 SQL 本身没问题，还要看数据库运行状态，比如锁等待、事务未提交、连接数打满、Buffer Pool 命中率、CPU、IO、磁盘延迟等。
    处理方式一般是**优化 SQL、补充或调整索引、减少返回字段和数据量、分页优化、拆分复杂查询，必要时做缓存、读写分离、分库分表**。
    生产环境操作会比较谨慎，建索引和改 SQL 要先评估影响，尽量在低峰期执行，并做好回滚方案。
- Hibernate 生成的 SQL 为什么可能很复杂？
    Hibernate 生成的 SQL 可能复杂，**主要是因为它是按对象模型和映射关系来生成 SQL，不是单纯按表来写 SQL**。
    如果实体之间有一对多、多对一、多对多关系，特别是配置了级联、懒加载、立即加载、`join fetch`，Hibernate 可能会生成很多关联查询或者很长的 `join` SQL。
    另外，继承映射、复杂条件查询、动态查询、分页、排序、过滤器、软删除、多租户等功能，也会让生成的 SQL 变复杂。
    Hibernate 还要维护对象状态，比如一级缓存、脏检查、关联关系同步，所以有时会多发一些查询来保证实体状态一致。
    如果映射配置不合理，比如默认抓取策略不合适，或者在循环里触发懒加载，还容易出现 N+1 查询问题。
    所以 Hibernate 的优点是开发效率高、对象模型友好，但代价是 SQL 可控性不如 MyBatis，复杂场景下需要关注生成 SQL 和执行计划。

### Hibernate 查询方式有哪些？

常见查询方式包括 HQL、原生 SQL、Criteria API，以及 JPA 中的 JPQL。HQL / JPQL 面向对象模型，原生 SQL 面向数据库表，Criteria 适合动态拼接条件但可读性较差。

#### 常见追问

- HQL 和 SQL 有什么区别？
    HQL 是 Hibernate Query Language，面向对象查询；SQL 是面向数据库表查询。
    HQL 操作的是实体类和实体属性，比如写的是类名、属性名；SQL 操作的是表名和字段名。
    HQL 会经过 Hibernate 翻译成具体数据库的 SQL，所以有一定数据库无关性；SQL 直接依赖具体数据库语法。
    HQL 支持对象关系，比如可以基于实体关联属性做查询；SQL 需要自己写表关联和字段映射。
    HQL 查询结果通常是实体对象或属性结果；SQL 查询结果一般是表字段结果，需要手动映射或由框架映射。
    不过 HQL 不适合特别复杂、强依赖数据库特性的 SQL 场景，这种情况一般会用原生 SQL。
- Criteria 为什么类型安全？
    Criteria 类型安全主要是因为它不是直接拼字符串，而是**用 Java API 和泛型来构建查询**。
    比如 `CriteriaQuery<T>`、`Root<T>`、`Path<T>` 都带泛型，查询结果类型、实体类型、字段类型可以在编译期检查。
    如果配合 JPA 的静态元模型，比如 `User_` 这种类，字段引用也不是字符串，而是类型化的属性对象，字段写错或者类型不匹配，编译阶段就能发现。
    相比 HQL 或 SQL 字符串，Criteria 可以减少字段名写错、返回类型不匹配这类运行时错误。
    不过如果写成 `root.get("name")` 这种字符串形式，类型安全会变弱，所以真正类型安全一般要配合泛型和静态元模型使用。
- 什么时候需要原生 SQL？
    一般在 HQL、Criteria 不好表达，或者性能、数据库特性要求比较高的时候，会使用原生 SQL。
    比如**查询逻辑特别复杂**，需要大量子查询、窗口函数、递归查询、复杂聚合，HQL 写起来不方便或者生成的 SQL 不理想。
    还有一些数据库特有能力，比如存储过程、特定函数、Hint、分区表、全文索引等，HQL 不一定支持，这时适合用原生 SQL。
    另外在性能敏感场景，如果需要精确控制 join、索引、执行计划，原生 SQL 会更可控。
    不过原生 SQL 会降低数据库可移植性，也需要自己注意结果集和实体或 DTO 的映射。

## 实体与映射

### Hibernate 实体类可以定义为 final 吗？

不推荐。Hibernate 常通过代理实现延迟加载，final 类无法被继承生成代理，可能影响懒加载和增强能力。实体类方法也不建议随意声明为 final。

#### 常见追问

- Hibernate 为什么需要代理？
    Hibernate 需要代理**主要是为了实现懒加载**。
    比如一个实体关联了另一个实体，Hibernate 不会马上把关联对象查出来，而是先放一个代理对象进去。这个代理对象保存了目标对象的 id，等真正访问它的属性时，再通过 Session 发送 SQL 加载真实数据。
    这样可以避免一次查询加载太多无用数据，提升性能。
    代理还可以让 Hibernate 在访问对象时做一些拦截，比如判断对象是否已经初始化、是否还在 Session 管理范围内。
    如果 Session 已经关闭，再访问未初始化的代理对象，就可能出现 `LazyInitializationException`。
    需要注意的是，**实体懒加载通常用代理实现**，**集合懒加载一般是通过 Hibernate 自己的集合包装类实现**。
- final 方法会影响懒加载吗？
    会影响，主要影响**基于代理的懒加载**。
    Hibernate 的实体代理通常是通过继承实体类生成子类来实现的，代理需要重写方法来拦截访问，然后触发初始化。
    如果方法被 `final` 修饰，代理子类就不能重写这个方法，也就没法在调用时拦截并触发懒加载。
    所以实体类的 getter、业务方法如果需要被代理拦截，一般不建议声明成 `final`。
    同理，如果实体类本身是 `final`，Hibernate 也无法基于子类生成代理，会影响实体级别的懒加载。
    实际开发中，Hibernate 实体类通常不要写成 `final`，需要懒加载的访问方法也不要写成 `final`。
- 实体类设计有哪些注意点？
    Hibernate 实体类设计一般要注意这些点：
    实体类不要声明成 `final`，需要懒加载的方法也不要声明成 `final`，否则会影响代理。
    要提供无参构造方法，至少是 `protected`，因为 Hibernate 创建对象时需要用到。
    要有主键字段，通常用包装类型，比如 `Long`，避免基本类型默认值带来的判断问题。
    持久化访问方式要保持一致：`@Id` 标在字段上时是字段访问，Hibernate 可直接读写字段，getter、setter 不是必需；`@Id` 标在 getter 上时是属性访问，需要提供访问器。字段通常仍建议设为 `private`，对外通过方法暴露业务需要的访问。
    `equals` 和 `hashCode` 要谨慎实现，尤其是主键生成策略下，避免对象持久化前后 hash 值变化。
    关联关系默认不要随便用 `EAGER`，优先使用 `LAZY`，避免查询时加载过多数据。
    `toString` 里不要直接访问懒加载关联对象，避免触发额外 SQL，甚至出现循环调用。
    集合字段建议使用接口类型，比如 `List`、`Set`，不要直接写具体实现类，方便 Hibernate 替换成自己的集合实现。
    实体类尽量保持简单，不要放太复杂的业务逻辑，也不要和数据库无关的状态混太多。

### Hibernate 中 Integer 和 int 映射有什么区别？

`Integer` 是包装类型，可以表示 null；`int` 是基本类型，不能表示 null，默认值是 0。数据库字段允许为空时，实体字段应使用包装类型，避免把 null 和 0 混淆。

#### 常见追问

- 为什么实体类字段推荐使用包装类型？
    实体类字段推荐使用包装类型，**主要是因为包装类型可以表示 `null`，基本类型不能**。
    在 Hibernate 里，`null` 可以表示这个字段还没有赋值，或者数据库里就是空值；如果用基本类型，比如 `int`，默认值是 `0`，就分不清是没赋值还是业务上真的为 `0`。
    主键字段尤其推荐用包装类型，比如 `Long`，因为新对象在持久化前主键通常是 `null`，保存后才由数据库或 Hibernate 生成。如果用 `long`，默认就是 `0`，容易影响 Hibernate 判断对象状态。
    所以实体类里像主键、可为空字段、数据库字段映射，一般都更推荐使用包装类型，比如 `Integer`、`Long`、`Boolean`。
- Boolean 和 boolean 映射有什么区别？
    `Boolean` 和 `boolean` 映射到数据库字段时，**核心区别是是否能表示 `null`**。
    `boolean` 是基本类型，只有 `true` 和 `false`。如果数据库字段允许 `null`，Hibernate 回填实体时无法把 SQL `NULL` 赋给基本类型，通常会抛出异常；它不会可靠地自动变成 `false`。
    `Boolean` 是包装类型，可以表示 `true`、`false`、`null` 三种状态，更适合映射允许为空的数据库字段。
    所以如果数据库字段是 `not null`，并且业务上只有是和否两种状态，可以用 `boolean`；如果字段允许为空，或者需要表达“未知、未设置”这种状态，应该用 `Boolean`。
    在实体类里一般更推荐用 `Boolean`，尤其是数据库字段可能为空，或者是表单、接口传入时需要区分没传和传了 `false` 的场景。
- 数据库 null 如何映射到 Java？
    数据库里的 `null` 映射到 Java 时，一般会映射成引用类型的 `null`。
    比如字段类型是 `Integer`、`Long`、`Boolean`、`String`、`Date` 这类引用类型，数据库为 `null` 时，Java 对象里的字段就是 `null`。
    如果实体类字段用的是基本类型，比如 `int`、`long`、`boolean`，它们不能表示 `null`；数据库读出的 SQL `NULL` 回填到这类字段通常会失败。`0`、`0L`、`false` 只是新建 Java 对象字段的初始值，不是数据库 `NULL` 的可靠映射结果。
    所以数据库字段允许为空时应使用包装类型，比如 `Integer`、`Boolean`；使用基本类型时，数据库列应为 `NOT NULL`，并有明确的默认值或业务保证。

### Hibernate 实体类为什么需要无参构造？

Hibernate 需要通过反射创建实体对象，因此实体类通常需要提供无参构造方法。按 JPA 规范，该构造方法应为 `public` 或 `protected`；Hibernate 原生映射也接受包可见构造方法。启用 Hibernate 字节码增强时可进一步放宽这一要求，但常规项目仍建议显式保留无参构造。

#### 常见追问

- 反射创建对象有什么要求？
    反射创建对象主要**要求类本身必须是可以实例化的**，不能是接口、抽象类、数组、基本类型这些。
    如果用 JDK8 里的 `Class.newInstance()`，要求类有无参构造方法，而且这个无参构造方法通常要是 `public` 的，否则可能会抛异常。
    更常用的是通过 `Constructor` 创建对象，比如 `clazz.getDeclaredConstructor().newInstance()`，它可以指定构造方法；如果构造方法是私有的，JDK8 下可以通过 `setAccessible(true)` 放开访问限制。
    另外类的构造方法执行时本身不能抛出未处理异常，否则反射调用时也会包装成异常抛出来。
    新版本里 `Class.newInstance()` 已经过时，更推荐用 `getDeclaredConstructor().newInstance()`；从 JDK9 模块化以后，对非开放模块里的私有成员反射访问限制更严格，`setAccessible(true)` 不一定都能成功。
- protected 无参构造可以吗？
    可以，但要看反射方式和访问权限。
    如果用 `Class.newInstance()`，`protected` 无参构造不一定能直接调用，只有调用方本身按 Java 访问规则能访问这个构造方法时才可以，否则会抛 `IllegalAccessException`。
    如果用 `getDeclaredConstructor().newInstance()`，可以拿到 `protected` 无参构造；在 JDK8 下如果访问不到，可以先调用 `setAccessible(true)` 再创建对象。
    所以面试里可以说：**`protected` 无参构造不是不能反射创建，但不能用只查 `public` 构造的方式；通常要用 `getDeclaredConstructor()`，必要时配合 `setAccessible(true)`**。
- Lombok 会不会影响实体类？
    会影响，但主要是在编译期影响。
    Lombok 会在编译期通过注解处理器生成代码，比如 `getter/setter`、构造方法、`toString`、`equals`、`hashCode` 等，编译后的 `.class` 里是有这些方法的。
    对实体类来说，常见影响是如果使用 `@Data`，会自动生成 `equals/hashCode`，在 JPA 实体、懒加载对象、双向关联里可能带来问题；如果使用 `@AllArgsConstructor`，又没有保留无参构造，ORM 或反射创建对象可能会失败。
    所以实体类可以用 Lombok，但要注意保留无参构造，字段类型和访问权限要符合框架要求，`equals/hashCode`、`toString` 也不要随便让 Lombok 自动包含关联字段。

## Session 与查询

### Hibernate 工作流程是什么？

典型流程是读取配置和映射，创建 `SessionFactory`，打开 `Session`，开启事务，执行持久化操作，提交或回滚事务，最后关闭 `Session`。`SessionFactory` 重量级且线程安全，通常全局复用；`Session` 轻量且非线程安全，按请求或事务使用。

#### 常见追问

- SessionFactory 为什么要复用？
    `SessionFactory` 要复用，因为**它是 Hibernate 里的重量级对象，创建成本很高**。
    创建 `SessionFactory` 时会解析配置和映射文件，构建元数据、缓存、SQL 生成策略等资源，有时还会关联连接池、二级缓存这些资源。如果每次操作数据库都创建一个，会非常消耗性能和内存。
    而且 `SessionFactory` 是线程安全的，设计上就是给整个应用共享使用的，通常一个数据库对应一个 `SessionFactory`。
    真正每次业务操作要创建的是 `Session`，`Session` 是轻量级的，但它不是线程安全的，一般按请求或事务创建，用完关闭。
    所以面试里可以说：**`SessionFactory` 重量级且线程安全，适合全局复用；`Session` 轻量级且非线程安全，适合短生命周期使用**。
- Session 是线程安全的吗？
    `Session` 不是线程安全的。
    Hibernate 的 `Session` 代表一次数据库会话，里面维护了一级缓存、持久化上下文、脏检查状态等信息，这些状态都是和当前业务操作相关的。如果多个线程共享同一个 `Session`，可能会出现数据状态混乱、并发修改异常等问题。
    所以 `Session` 一般是短生命周期的，通常按一次请求或一个事务创建，用完就关闭。
    线程安全、可以复用的是 `SessionFactory`，不是 `Session`。
- Hibernate 事务如何和 Spring 集成？
    Hibernate 事务通常是交给 Spring 管理的。
    集成时会把 `SessionFactory` 配置到 Spring 容器里，然后配置事务管理器，比如 `HibernateTransactionManager`；如果是 JPA 方式，一般用 `JpaTransactionManager`。
    业务方法上加 `@Transactional` 后，Spring 会通过 AOP 拦截方法调用，在方法开始前开启事务，并把当前 Hibernate `Session` 绑定到当前线程；方法正常结束就提交事务，出现运行时异常默认回滚事务。
    这样业务代码里就不需要手动 `beginTransaction`、`commit`、`rollback`，只需要关注业务逻辑。
    简单说就是：**Hibernate 负责 ORM 和数据库操作，Spring 负责事务边界、提交、回滚以及和当前线程的 Session 绑定**。

### get 和 load 有什么区别？

`get()` 通常返回已初始化实体：会先检查当前 `Session` 的持久化上下文，一级或二级缓存命中时不访问数据库，未命中才查询，查不到返回 `null`；`load()` 通常返回代理对象，真正访问属性时才查询，查不到时可能抛出异常。现在使用时更关注 JPA 的 `find()` 和 `getReference()` 的类似区别。

#### 常见追问

- `load()` 为什么能懒加载？
    `load()` 能懒加载，核心是因为它一开始不一定真正查数据库，而是**先根据实体类型和主键 id 创建一个代理对象**。
    这个代理对象里面保存了实体的 class、id、当前 `Session` 等信息，但真实数据还没加载。访问普通属性时，代理对象会拦截方法调用，然后通过绑定的 `Session` 去数据库查询，再把结果填充到代理对象里。
    如果只访问 id，一般不需要触发查询，因为 id 在创建代理时已经知道了。
    如果真正初始化代理时发现数据库没有这条记录，`load()` 就可能抛出 `ObjectNotFoundException`，而不是像 `get()` 一样直接返回 `null`。
    所以 `load()` 懒加载的本质是：**Hibernate 返回的是代理对象，代理对象持有关联的 `Session` 和主键，等访问非 id 属性时再触发查询**。
    需要注意的是，如果代理对象初始化时 `Session` 已经关闭，就会出现 `LazyInitializationException`。
- 代理对象什么时候初始化？
    代理对象会在**需要访问真实数据时初始化**。
    常见触发时机有：
    1. 访问非主键属性，比如 `user.getName()`。
    2. 调用需要真实对象状态的方法，比如普通业务方法。
    3. 显式调用 `Hibernate.initialize(proxy)`。
    4. 对代理对象做强制解代理，比如某些场景下调用 `unproxy`。
    如果只是访问主键 id，一般不会初始化，因为 `load()` 创建代理时 id 已经有了。
    初始化时，代理会通过关联的 `Session` 去数据库查询真实记录，然后把数据加载进持久化上下文。
    如果初始化时 `Session` 已经关闭，就会抛出 `LazyInitializationException`；如果数据库中没有对应记录，可能抛出 `ObjectNotFoundException`。
- 查不到数据时分别会怎样？
    get() 查不到返回 null，
    load() 查不到一般不是立刻发现，而是在使用代理对象触发加载时抛异常。

### getCurrentSession 和 openSession 有什么区别？

`openSession()` 每次打开新的 Session，需要手动关闭；`getCurrentSession()` 获取绑定到当前上下文的 Session。它是否与事务绑定、事务结束后是否自动关闭，取决于配置的 `CurrentSessionContext`；在 Spring 或 JTA 等事务绑定上下文中通常由框架管理并在事务结束后清理。Spring 集成中更常见这种上下文绑定方式。

#### 常见追问

- Session 不关闭有什么问题？
    `Session` 不关闭主要会有几个问题：
    1. 数据库连接可能无法及时释放，连接池连接被占满后，后续请求就拿不到连接。
    2. 一级缓存一直存在，里面的持久化对象越来越多，容易造成内存占用过高，甚至内存泄漏。
    3. 事务资源可能没有正常释放，可能导致锁、游标等资源长时间占用。
    4. 数据状态容易混乱，因为同一个 `Session` 持有旧的一级缓存数据，后续查询可能拿到过期对象。
    5. 并发场景下也不安全，`Session` 本身不是线程安全的，长时间复用容易出问题。
    所以一般 `Session` 要和一次业务操作或一次请求绑定，用完及时关闭，事务也要提交或回滚。
- Session 和数据库连接是什么关系？
    `Session` 是 Hibernate **提供的持久化操作对象**，数据库连接是它**底层真正执行 SQL 的资源**。
    在 JDK8 常见的 Hibernate 使用里，可以理解为：`Session` 会通过 `ConnectionProvider` 或连接池获取 JDBC `Connection`，然后用这个连接执行查询、更新等操作。
    但 `Session` 不一定一创建就立刻拿数据库连接，通常是在真正需要访问数据库时才获取连接，比如执行 SQL、开启事务等。
    `Session` 关闭时会清理 Hibernate 持有的 JDBC 资源；从数据源获取的连接通常会按连接处理模式归还连接池。若 `Session` 使用的是调用方传入的 JDBC `Connection`，连接的最终关闭责任仍取决于调用方约定。
    所以关系可以概括为：**`Session` 是上层操作入口，`Connection` 是底层数据库通道，`Session` 按连接获取和释放策略使用数据库连接来完成持久化操作**。
- Spring 如何管理 Hibernate Session？
    Spring 主要是通过**事务管理**来管理 Hibernate `Session`。
    在使用 `HibernateTransactionManager` 时，Spring 会在事务开始时从 `SessionFactory` 获取一个 `Session`，并把它绑定到当前线程。业务代码通过 `getCurrentSession()` 拿到的就是这个线程绑定的 `Session`。
    事务提交时，Spring 会根据情况执行 `flush`，然后提交事务；如果发生异常就回滚事务。事务结束后，Spring 会解除线程绑定并关闭 `Session`，释放数据库连接等资源。
    所以面试里可以说：**Spring 把 Hibernate `Session` 和当前线程、事务生命周期绑定起来，开发者通常不用手动打开和关闭 `Session`，只要通过 `@Transactional` 控制事务即可**。

## 缓存与对象状态

### Hibernate 缓存机制是什么？

Hibernate 一级缓存是 Session 级别，默认开启；二级缓存是 SessionFactory 级别，需要配置缓存实现。一级缓存减少同一 Session 内重复查询，二级缓存可以跨 Session 复用数据，但要注意一致性和失效策略。

#### 常见追问

- 一级缓存什么时候失效？
    Hibernate 一级缓存本质上跟 `Session` 生命周期绑定，主要在这些情况下失效：
    1. `Session` 关闭，一级缓存整体失效，这是最常见的情况。
    2. 调用 `session.clear()`，会清空当前 `Session` 里的所有缓存对象。
    3. 调用 `session.evict(entity)`，会把某个对象从一级缓存中移除。
    4. 对象变成游离态，比如被移出当前 `Session` 管理后，也就不再受一级缓存管理。
    5. 在 Spring 事务管理下，通常事务结束后 `Session` 会关闭，所以一级缓存也随之失效。
    需要注意的是，`flush` 和事务 `commit` 本身不是清空一级缓存，只是把变更同步到数据库；如果 `Session` 没关闭，一级缓存还在。批量更新、原生 SQL 这类操作可能绕过一级缓存，容易产生旧数据，通常需要手动 `clear` 或重新查询。
- 二级缓存适合缓存什么数据？
    Hibernate 二级缓存适合缓存这些数据：
    1. 读多写少的数据，比如字典表、配置表、地区表、权限菜单等。
    2. 变化频率低的数据，也就是数据更新不频繁，缓存失效成本比较低。
    3. 多个 `Session` 都会重复访问的数据，这样二级缓存跨 `Session` 才有意义。
    4. 数据量相对可控的数据，避免把大量业务明细数据都放进二级缓存。
    5. 对实时一致性要求不特别高的数据，因为二级缓存和数据库之间要处理一致性问题。
    不太适合缓存频繁更新的数据、强一致性要求很高的数据、大批量明细数据，比如订单流水、库存扣减、账户余额这类数据。
- 查询缓存和二级缓存有什么区别？
    查询缓存和二级缓存不是一回事。
    二级缓存缓存的是实体或集合的缓存数据，作用范围是 `SessionFactory` 级别，可以跨 `Session` 复用。比如根据主键查询某个实体时，命中二级缓存就可以少查数据库。
    查询缓存缓存的是查询结果集。其内部存储形式取决于 Hibernate 版本、查询类型和 `hibernate.cache.query_cache_layout` 配置：`SHALLOW` 布局主要保存实体标识或键，通常依赖实体二级缓存；`FULL` 布局可保存已获取的数据。因此不能一概而论查询缓存只保存主键。
    二级缓存适合缓存读多写少的实体数据；查询缓存适合查询条件比较固定、结果变化不频繁的查询。
    另外，查询缓存对表数据变化比较敏感，只要相关表发生更新，查询缓存就容易失效。如果查询条件很多、数据变动频繁，开启查询缓存反而可能降低性能。

### Hibernate 对象状态有哪些？

Hibernate 对象状态包括瞬时态、持久态、游离态和移除态。
瞬时态对象尚未与 Session 关联；持久态对象被 Session 管理，变更会被追踪；游离态对象有持久化标识但当前已脱离 Session 管理；移除态对象仍由当前 Session 管理，但已经被标记删除，通常在 flush 或事务提交时执行删除 SQL。

#### 常见追问

- 持久态对象为什么修改后不用显式 update？
    持久态对象已经被当前 `Session` 管理，Hibernate 一级缓存里会保存它的快照。
    当对象属性被修改后，Hibernate 会在 `flush` 时做脏检查，把当前对象状态和快照进行比较。
    如果发现数据变了，就会自动生成对应的 `update SQL` 同步到数据库，所以不需要显式调用 `update`。
    `update` 主要是给游离态对象重新关联到 `Session` 用的，不是持久态对象修改时必须调用的方法。
    需要注意的是，只有在事务正常提交或触发 `flush` 时，修改才会真正同步到数据库。
- 游离态对象如何重新持久化？
    现代 Hibernate/JPA 中，处理游离对象通常优先使用 `merge`。
    `merge` 会把游离对象的状态复制到当前 `Session` 中的持久态对象上，并返回该持久态对象；原来的游离对象本身不会变成持久态。后续应使用返回值继续操作。
    旧版 Hibernate 原生 API 中，`update` 会直接将原对象重新关联到当前 `Session`，但要求当前 Session 中不存在同主键的持久态对象，否则会报异常；`saveOrUpdate` 也是遗留项目常见的旧式语义。
    `Session.lock()` 的核心用途是施加显式锁。旧式 `LockMode.NONE` 可用于未修改对象的无锁重关联，但不应作为常规的游离对象合并方案。
    面试里重点说：**`update` 直接重新关联原对象且容易与同标识受管对象冲突；`merge` 复制状态并返回新的持久态对象，是更常用的选择**。
- 脏检查机制是什么？
    脏检查是 Hibernate 自动检测持久态对象是否被修改的机制。
    对象变成持久态时，Hibernate 会在一级缓存中保存一份对象快照。
    在 `flush` 的时候，会把当前对象状态和快照进行比较，如果发现属性发生变化，就认为这个对象是脏对象。
    然后 Hibernate 会自动生成对应的 `update SQL`，把变化同步到数据库。
    所以持久态对象修改后，不需要显式调用 `update`。
    脏检查通常发生在**事务提交**、**手动调用 `flush`**，或者**某些查询执行前触发 `flush` **的时候。
