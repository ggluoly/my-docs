---
title: 'Redis 面试题'
description: 'Redis 面试题整理，覆盖数据类型、缓存场景、持久化、分布式锁、淘汰策略、客户端和性能问题。'
outline: [2, 3]
---

# Redis 面试题

本页整理 Redis 高频面试题，覆盖基础能力、数据结构、缓存问题、分布式锁、持久化、淘汰策略和性能排查。

## 基础与场景

### Redis 是什么？适合哪些场景？

Redis 是基于内存的高性能键值数据库，支持多种数据结构、持久化、复制、哨兵和集群。常见场景包括缓存热点数据、计数器、排行榜、分布式锁、会话存储、限流、消息队列和临时状态存储。

#### 常见追问

- Redis 为什么适合做缓存？
- 哪些数据不适合放 Redis？
- Redis 能不能替代数据库？

#### 关联文档

- [Redis 缓存](/storage/redis)

### Redis 为什么快？

Redis 主要基于内存读写，数据结构高效，单线程模型避免了大量线程切换和锁竞争，同时使用 IO 多路复用处理大量连接。Redis 6 之后引入多线程 IO，但命令执行核心仍以单线程模型为主。

#### 常见追问

- Redis 单线程为什么还能高并发？
- IO 多路复用是什么？
- Redis 6 多线程解决什么问题？

#### 关联文档

- [Redis 缓存](/storage/redis)

### Redis 有哪些功能？

Redis 常见功能包括数据缓存、分布式锁、持久化、事务、发布订阅、消息队列、Lua 脚本、过期淘汰、主从复制、哨兵和集群。面试时要说明 Redis 不只是缓存，而是高性能内存数据结构服务。

#### 常见追问

- Redis 事务是否支持回滚？
- Lua 脚本有什么作用？
- Redis Stream 适合什么场景？

### Redis 和 Memcached 有什么区别？

Redis 支持 string、hash、list、set、zset 等多种结构，支持持久化、主从复制、Lua 和丰富命令；Memcached 更偏简单 key-value 缓存，不支持复杂数据结构和持久化。现在 Java 后端项目通常更常用 Redis。

#### 常见追问

- Memcached 还有什么优势？
- Redis value 最大可以多大？
- 复杂数据结构会带来什么风险？

## 数据结构与客户端

### Redis 常见数据类型有哪些？

常见数据类型包括 string、list、hash、set、sorted set。string 可做缓存和计数器；list 可做队列；hash 适合存对象字段；set 适合去重和交并差；zset 适合排行榜和带权重排序。

#### 常见追问

- 点赞数用什么类型？
- 排行榜用什么类型？
- 用户对象适合用 string 还是 hash？

### Redis Java 客户端有哪些？

常见 Java 客户端包括 Jedis、Lettuce 和 Redisson。Jedis 是较早的同步阻塞客户端；Lettuce 基于 Netty，支持异步和响应式；Redisson 提供分布式锁、集合、队列等高级对象抽象。

#### 常见追问

- Spring Boot 默认常用哪个客户端？
- Redisson 分布式锁有什么优势？
- Jedis 连接池为什么重要？

### Jedis 和 Redisson 有什么区别？

Jedis 更像 Redis 命令客户端，直接执行 Redis 命令；Redisson 在 Redis 之上封装了分布式对象和并发工具，比如分布式锁、信号量、阻塞队列、延迟队列等。需要简单命令操作可以用 Jedis / Lettuce，需要分布式锁等高级能力常用 Redisson。

#### 常见追问

- Redisson 锁如何续期？
- Lettuce 和 Jedis 有什么区别？
- 为什么不要自己随便实现 Redis 锁？

## 缓存问题

### 缓存穿透、击穿、雪崩是什么？

缓存穿透是查询不存在的数据绕过缓存打到数据库；缓存击穿是热点 Key 过期瞬间大量请求打到数据库；缓存雪崩是大量 Key 同时过期或缓存集群故障导致数据库压力骤增。

#### 常见解决方案

- 穿透：缓存空值、布隆过滤器。
- 击穿：互斥锁、逻辑过期、热点 Key 预热。
- 雪崩：过期时间加随机值、多级缓存、限流降级。

#### 关联文档

- [Redis 缓存](/storage/redis)

### 缓存和数据库一致性怎么保证？

常见方案是更新数据库后删除缓存，并通过重试、消息队列或延迟双删增强可靠性。强一致成本很高，多数业务追求最终一致性。读多写少场景要特别注意并发读写导致旧值回写缓存。

#### 常见追问

- 为什么通常是删除缓存而不是更新缓存？
- 延迟双删解决什么问题？
- Canal + MQ 如何做缓存一致性？

#### 关联文档

- [Redis 缓存](/storage/redis)
- [消息与事务](/messaging/)

## 分布式锁

### Redis 分布式锁怎么实现？

常见实现是 `SET key value NX PX timeout`，加锁时设置唯一值和过期时间，释放锁时校验唯一值后删除，避免误删其他线程的锁。释放锁建议用 Lua 脚本保证校验和删除的原子性。生产环境可以使用 Redisson。

#### 常见追问

- 为什么要设置唯一 value？
- 为什么释放锁要用 Lua？
- Redisson watchdog 是什么？

#### 关联文档

- [Redis 缓存](/storage/redis)
- [线程安全](/java-core/thread-safety)

### Redis 分布式锁有什么缺陷？

常见问题包括锁过期导致业务没执行完锁已释放、线程误删别人锁、主从切换导致锁丢失、单点 Redis 故障等。解决思路包括唯一值校验、Lua 原子释放、合理过期时间、自动续期和 Redisson 等成熟实现。

#### 常见追问

- RedLock 是否一定可靠？
- 分布式锁超时怎么设置？
- 数据库锁和 Redis 锁怎么选？

## 持久化、内存与淘汰

### RDB 和 AOF 有什么区别？

RDB 是定期快照，恢复快但可能丢失最近数据；AOF 记录写命令，数据更完整但文件更大、恢复较慢。生产环境常结合使用。

#### 常见追问

- RDB 什么时候触发？
- AOF rewrite 是什么？
- 两者同时开启时 Redis 如何恢复？

#### 关联文档

- [Redis 缓存](/storage/redis)

### Redis 内存如何优化？

可以减少大 key 和无意义 key，设置合理过期时间，使用 hash 聚合小对象字段，选择紧凑的数据结构，压缩 value，避免保存重复数据。很多小 key 会带来额外元数据开销，用 hash 管理对象字段有时能减少内存占用。

#### 常见追问

- 什么是 big key？
- 如何扫描大 key？
- hash 一定比 string 省内存吗？

### Redis 淘汰策略有哪些？

常见淘汰策略包括 `volatile-lru`、`volatile-ttl`、`volatile-random`、`allkeys-lru`、`allkeys-random`、`noeviction`，新版本还支持 LFU 类策略。`volatile-*` 只淘汰设置了过期时间的 key，`allkeys-*` 会从所有 key 中淘汰。

#### 常见追问

- LRU 和 LFU 有什么区别？
- noeviction 会发生什么？
- 缓存场景通常选哪种策略？

### Redis 常见性能问题有哪些？

常见问题包括 big key、hot key、慢查询、持久化 fork 开销、AOF rewrite、主从复制延迟、网络带宽瓶颈和阻塞命令。主从节点最好部署在低延迟网络环境中，避免复制延迟扩大。

#### 常见追问

- RDB 快照为什么可能影响性能？
- 主从复制延迟怎么排查？
- Redis 慢查询怎么查看？
