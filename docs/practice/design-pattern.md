---
title: '设计模式与架构'
description: '设计模式与架构文档，介绍单例、工厂、代理、策略、分层架构和 Java 后端代码组织方法。'
---

# 设计模式与架构

> 本页内容为新增的工程实践部分，不来自原《Spring 技术套件》文档。

## 是什么

设计模式是针对常见问题的可复用解决方案，架构风格则决定整个系统的代码组织方式。后端开发中，恰当的模式和分层能让代码更易维护、扩展和测试。

## 常用设计模式

后端代码里出现频率最高的几类：

| 模式 | 典型场景 | Spring 中的体现 |
| --- | --- | --- |
| 单例 | 全局唯一对象 | Bean 默认单例 |
| 工厂 | 根据条件创建不同实现 | `BeanFactory`、`FactoryBean` |
| 策略 | 一个行为多种算法，运行时切换 | 多实现 + `Map<String, XxxStrategy>` 注入 |
| 模板方法 | 固定流程，部分步骤可变 | `JdbcTemplate`、`RestTemplate` |
| 代理 | 增强对象行为 | AOP、事务、`@Async` |
| 观察者 | 事件发布订阅 | `ApplicationEvent` |
| 建造者 | 构造复杂对象 | Lombok `@Builder` |
| 责任链 | 一系列处理器依次处理 | 过滤器、拦截器 |
| 适配器 | 接口转换、对接老系统 | `HandlerAdapter` |

## 策略模式实战

后端最实用的模式之一，用来消除大量 `if-else`。例如支付方式：

```java
public interface PayStrategy {
    String type();
    void pay(Order order);
}

@Service
public class PayStrategyFactory {

    private final Map<String, PayStrategy> strategies;

    // Spring 自动把所有 PayStrategy 实现注入成 Map
    public PayStrategyFactory(List<PayStrategy> list) {
        this.strategies = list.stream()
            .collect(Collectors.toMap(PayStrategy::type, s -> s));
    }

    public void pay(String type, Order order) {
        strategies.get(type).pay(order);
    }
}
```

新增一种支付方式只需加一个实现类，无需改动调用方。

## 分层架构

经典三层（或四层）是企业项目的默认组织方式：

```
Controller   接收请求、参数校验、组装返回
    |
Service       业务逻辑、事务边界
    |
Mapper/DAO    数据访问
    |
DB
```

配合的对象类型：

```
DTO   接口传输对象（入参/出参）
VO    展示层对象
Entity / PO  数据库实体
```

用 MapStruct 在这些对象之间做转换，避免手写大量 getter/setter。

## DDD 简述

领域驱动设计适合业务复杂的中大型系统，核心是按业务领域而非技术分层组织代码：

```
应用层    编排用例，不含业务规则
领域层    实体、值对象、领域服务、聚合根（核心业务规则）
基础设施层  数据库、MQ、外部接口的具体实现
```

DDD 不是银弹，简单 CRUD 系统用三层就够，强行 DDD 反而增加复杂度。

## 选型建议

- 大多数业务系统用清晰的三层 + DTO/VO/Entity 划分就足够。
- 用策略、模板、责任链等模式替代大段 `if-else` 和重复流程，但不要为了用模式而用模式。
- 只有当业务规则复杂、团队对领域有共识时，才考虑引入 DDD。
- 优先遵循 SOLID 原则：职责单一、面向接口、依赖倒置，这比记住具体模式更重要。
