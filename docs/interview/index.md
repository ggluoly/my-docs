---
title: '面试库'
description: 'Java 后端面试题库，覆盖高频问题、回答要点、常见追问、场景题和系统设计复习重点。'
---

# 面试库

本栏目整理 Java 后端面试中的高频问题、底层原理、场景题和系统设计题。它不是孤立的八股文，而是和技术文档互相链接：面试题给出回答框架，详细原理回到对应技术页继续深挖。

## 使用方式

1. 先看 Java、JVM、并发、JavaWeb 和 Spring，这是大部分后端面试的基础盘。
2. 再看 MySQL、MyBatis、Redis、消息队列、ZooKeeper、Dubbo 和 Spring Cloud，这是业务系统高频技术栈。
3. 对传统项目补充 Hibernate、ZooKeeper、JSP / Servlet 等老技术栈，面试中遇到时能说明历史背景和现代替代方案。
4. 最后看场景题和系统设计题，用来串联多个技术点。

## 专题目录

| 专题 | 重点 |
| --- | --- |
| [Java 高频题](./java) | 基础语法、集合、泛型、异常、IO、字符串 |
| [JVM 高频题](./jvm) | 内存结构、GC、类加载、线上排障 |
| [并发编程](./concurrency) | 线程安全、线程池、锁、AQS、CAS |
| [JavaWeb](./java-web) | Servlet、JSP、Session、Cookie、SQL 注入 |
| [Spring 面试题](./spring) | IoC、AOP、事务、Bean 生命周期 |
| [Spring Boot](./spring-boot) | 自动配置、Starter、配置加载、工程实践 |
| [Spring Cloud](./spring-cloud) | 注册发现、服务调用、网关、限流熔断 |
| [MySQL 面试题](./mysql) | 索引、事务、锁、MVCC、慢 SQL |
| [MyBatis 面试题](./mybatis) | 参数绑定、分页、缓存、Executor、插件机制 |
| [Hibernate 面试题](./hibernate) | ORM、Session、缓存、对象状态、JPA 对比 |
| [Redis 面试题](./redis) | 缓存、分布式锁、持久化、高可用 |
| [消息队列](./mq) | 重复消费、顺序消息、事务消息、最终一致性 |
| [ZooKeeper 面试题](./zookeeper) | 分布式协调、ZAB、Watcher、集群选举 |
| [Dubbo 面试题](./dubbo) | RPC、服务发现、SPI、负载均衡、容错、服务治理 |
| [安全认证](./security) | 登录认证、JWT、OAuth2、权限控制 |
| [DevOps / 部署](./devops) | Docker、Kubernetes、CI/CD、可观测性 |
| [场景题](./scenario) | 幂等、防重复提交、超卖、缓存一致性 |
| [系统设计](./system-design) | 秒杀、订单、权限、日志、文件服务 |

## 回答模板

每道题建议按这个结构准备：

```text
问题 -> 回答要点 -> 深入解释 -> 常见追问 -> 关联文档
```

面试现场先给结论，再补关键原理，最后结合场景说明取舍。
