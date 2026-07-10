---
title: 'Redis'
description: 'Redis 技术文档，介绍热点缓存、Token、验证码、排行榜，以及 Redisson 分布式锁、限流和多级缓存选型。'
---

# Redis

## 是什么

Redis 是内存缓存数据库，负责缓存、分布式锁、验证码、Token 和热点数据加速，是企业项目几乎必用的组件。

## 同类组件

| 组件 | 说明 |
| --- | --- |
| `Redis` | 缓存、计数器、验证码、Token、热点数据 |
| `Redisson` | 分布式锁、延迟队列、限流、分布式集合 |
| `Caffeine` | 本地缓存 |
| `Spring Cache` | Spring 缓存抽象 |

## 最常见组合

```
Redis + Redisson
```

## 常见使用场景

```
用户登录 Token
验证码
热点商品缓存
接口限流
分布式锁
排行榜
防重复提交
订单超时处理
```

## 常见依赖

```xml
spring-boot-starter-data-redis
redisson-spring-boot-starter
```

## 选型建议

- 缓存和热点数据加速直接用 `Redis`。
- 需要分布式锁、延迟队列、限流时引入 `Redisson`。
- 单机进程内的高频读取可叠加 `Caffeine` 做本地缓存，形成多级缓存。
