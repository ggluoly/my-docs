# Spring 事务原理

Spring 用 `@Transactional` 把数据库事务的开启、提交、回滚交给框架统一管理。理解它的底层机制和失效场景，是写对业务代码的前提。

> 本页内容为补充的 Java 后端通用知识，不属于原 Spring Cloud 技术栈文档。

## 基本用法

```java
@Service
public class OrderService {

    @Transactional(rollbackFor = Exception.class)
    public void createOrder(Order order) {
        orderMapper.insert(order);       // 写订单
        stockMapper.decrease(order);     // 扣库存
        // 任一步抛异常，两条 SQL 一起回滚
    }
}
```

## 实现原理

`@Transactional` 本质是一个 [AOP](./aop) 环绕通知：

```
代理对象
  -> 开启事务（获取连接，关闭自动提交）
  -> 执行目标方法
  -> 正常返回：提交事务
  -> 抛出异常：回滚事务
```

因为依赖代理，所以事务的失效场景几乎都和「代理没生效」有关。

## 事务传播行为

当一个事务方法调用另一个事务方法时，`propagation` 决定事务如何传播：

| 传播行为 | 含义 |
| --- | --- |
| `REQUIRED`（默认） | 有事务就加入，没有就新建 |
| `REQUIRES_NEW` | 总是新建事务，挂起当前事务 |
| `NESTED` | 在当前事务内开启嵌套事务（savepoint） |
| `SUPPORTS` | 有事务就加入，没有就以非事务方式执行 |
| `NOT_SUPPORTED` | 以非事务方式执行，挂起当前事务 |
| `MANDATORY` | 必须在已有事务中执行，否则抛异常 |
| `NEVER` | 必须非事务执行，否则抛异常 |

最常用的是 `REQUIRED`。需要「无论外层是否回滚，这段都要独立提交」（如记录操作日志）时用 `REQUIRES_NEW`。

## 隔离级别

| 隔离级别 | 解决的问题 |
| --- | --- |
| `READ_UNCOMMITTED` | 无（会脏读） |
| `READ_COMMITTED` | 解决脏读 |
| `REPEATABLE_READ` | 解决脏读、不可重复读（MySQL InnoDB 默认） |
| `SERIALIZABLE` | 解决所有并发问题，但性能最差 |

`@Transactional(isolation = ...)` 一般用 `DEFAULT`，跟随数据库默认即可。

## 事务失效的常见场景

这是面试和实际开发的高频问题，绝大多数失效都源于代理机制：

| 场景 | 原因 | 解决 |
| --- | --- | --- |
| **自调用** | 同类内 `this.method()` 不走代理 | 拆到别的 Bean，或注入自身代理 |
| **方法非 public** | Spring 默认只对 public 方法织入事务 | 改为 public |
| **异常被 catch 吞掉** | 没有异常抛出，框架以为成功 | 重新抛出，或手动 `setRollbackOnly()` |
| **抛出 checked 异常** | 默认只对 `RuntimeException` 回滚 | 加 `rollbackFor = Exception.class` |
| **类没有被 Spring 管理** | 不是 Bean，没有代理 | 加 `@Service` 等注解 |
| **数据库引擎不支持事务** | 如 MyISAM | 改用 InnoDB |

## 最佳实践

- 事务方法尽量**短小**，只包住必要的写操作。不要把远程调用、文件 IO、长耗时计算放进事务，否则数据库连接被长时间占用。
- 默认加 `rollbackFor = Exception.class`，避免 checked 异常不回滚的坑。
- 跨服务、跨库的一致性不要靠本地事务硬扛，优先用[消息最终一致性](/messaging/)，复杂场景再上 [Seata](/messaging/seata)。
- 大事务拆分：批量操作考虑分批提交，避免长事务和锁等待。

## 与分布式事务的关系

`@Transactional` 只能保证**单个数据库连接内**的一致性。一旦操作跨多个服务或多个数据库，本地事务就无能为力了，需要：

- 优先本地事务
- 其次[消息最终一致性](/messaging/)
- 复杂场景再考虑 [Seata](/messaging/seata)

这与 Notion 原文「分布式事务不能滥用」的优先级建议一致。
