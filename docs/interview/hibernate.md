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
- JPA 和 Hibernate 有什么关系？
- MyBatis 算不算 ORM？

#### 关联文档

- [Spring Boot 面试题](/interview/spring-boot)
- [MyBatis 面试题](/interview/mybatis)

### Hibernate 如何打印 SQL？

可以配置 `hibernate.show_sql=true` 在控制台输出 SQL，也可以结合日志框架打印 SQL 和参数。生产环境不建议长期打开详细 SQL 日志，避免影响性能和泄漏敏感信息。

#### 常见追问

- 如何打印 SQL 参数？
- 生产环境如何排查慢 SQL？
- Hibernate 生成的 SQL 为什么可能很复杂？

### Hibernate 查询方式有哪些？

常见查询方式包括 HQL、原生 SQL、Criteria API，以及 JPA 中的 JPQL。HQL / JPQL 面向对象模型，原生 SQL 面向数据库表，Criteria 适合动态拼接条件但可读性较差。

#### 常见追问

- HQL 和 SQL 有什么区别？
- Criteria 为什么类型安全？
- 什么时候需要原生 SQL？

## 实体与映射

### Hibernate 实体类可以定义为 final 吗？

不推荐。Hibernate 常通过代理实现延迟加载，final 类无法被继承生成代理，可能影响懒加载和增强能力。实体类方法也不建议随意声明为 final。

#### 常见追问

- Hibernate 为什么需要代理？
- final 方法会影响懒加载吗？
- 实体类设计有哪些注意点？

### Hibernate 中 Integer 和 int 映射有什么区别？

`Integer` 是包装类型，可以表示 null；`int` 是基本类型，不能表示 null，默认值是 0。数据库字段允许为空时，实体字段应使用包装类型，避免把 null 和 0 混淆。

#### 常见追问

- 为什么实体类字段推荐使用包装类型？
- Boolean 和 boolean 映射有什么区别？
- 数据库 null 如何映射到 Java？

### Hibernate 实体类为什么需要无参构造？

Hibernate 需要通过反射创建实体对象，因此实体类通常需要提供无参构造方法。这个构造方法可以是 public 或 protected，便于框架实例化对象并填充属性。

#### 常见追问

- 反射创建对象有什么要求？
- protected 无参构造可以吗？
- Lombok 会不会影响实体类？

## Session 与查询

### Hibernate 工作流程是什么？

典型流程是读取配置和映射，创建 `SessionFactory`，打开 `Session`，开启事务，执行持久化操作，提交或回滚事务，最后关闭 `Session`。`SessionFactory` 重量级且线程安全，通常全局复用；`Session` 轻量且非线程安全，按请求或事务使用。

#### 常见追问

- SessionFactory 为什么要复用？
- Session 是线程安全的吗？
- Hibernate 事务如何和 Spring 集成？

### get 和 load 有什么区别？

`get()` 会立即访问数据库，查不到返回 null；`load()` 通常返回代理对象，真正访问属性时才查询，查不到时可能抛出异常。现在使用时更关注 JPA 的 `find()` 和 `getReference()` 类似区别。

#### 常见追问

- `load()` 为什么能懒加载？
- 代理对象什么时候初始化？
- 查不到数据时分别会怎样？

### getCurrentSession 和 openSession 有什么区别？

`openSession()` 每次打开新的 Session，需要手动关闭；`getCurrentSession()` 获取绑定到当前上下文的 Session，通常由事务或 Spring 管理，事务结束后自动关闭。Spring 集成中更常见上下文绑定方式。

#### 常见追问

- Session 不关闭有什么问题？
- Session 和数据库连接是什么关系？
- Spring 如何管理 Hibernate Session？

## 缓存与对象状态

### Hibernate 缓存机制是什么？

Hibernate 一级缓存是 Session 级别，默认开启；二级缓存是 SessionFactory 级别，需要配置缓存实现。一级缓存减少同一 Session 内重复查询，二级缓存可以跨 Session 复用数据，但要注意一致性和失效策略。

#### 常见追问

- 一级缓存什么时候失效？
- 二级缓存适合缓存什么数据？
- 查询缓存和二级缓存有什么区别？

### Hibernate 对象状态有哪些？

Hibernate 对象状态包括瞬时态、持久态和游离态。瞬时态对象没有和 Session 关联，也没有数据库记录；持久态对象被 Session 管理，变更会被追踪；游离态对象曾经被持久化，但当前已经脱离 Session 管理。

#### 常见追问

- 持久态对象为什么修改后不用显式 update？
- 游离态对象如何重新持久化？
- 脏检查机制是什么？
