---
title: '线上问题排查'
description: '基于 JDK 8 梳理 JVM 线上问题排查方法，包括 OOM、Full GC、CPU 飙高、线程死锁、堆转储和常用诊断工具。'
outline: [2, 3]
---

# 线上问题排查

> 本页默认以 JDK 8 为技术基线。命令和参数优先使用 JDK 8 可用写法。

JVM 知识最终要落到线上问题排查。常见问题包括 OOM、Full GC 频繁、CPU 飙高、线程死锁和服务响应变慢。

## 常用工具

| 工具 | 作用 |
| --- | --- |
| `jps` | 查看 Java 进程 |
| `jstat` | 查看 GC、类加载、JIT 等统计信息 |
| `jstack` | 导出线程栈，排查死锁和 CPU 高 |
| `jmap` | 查看堆信息，导出堆转储 |
| `jinfo` | 查看或调整部分 JVM 参数 |
| VisualVM / MAT / JProfiler | 图形化分析堆、线程和性能 |

常用命令：

```bash
jps -l
jstat -gc <pid> 1000 10
jstack <pid> > thread.txt
jmap -dump:format=b,file=heap.hprof <pid>
```

## OOM 排查

常见 OOM：

| 错误 | 常见原因 |
| --- | --- |
| `Java heap space` | 堆太小、大对象、内存泄漏 |
| `GC overhead limit exceeded` | GC 花费大量时间但回收效果很差 |
| `Metaspace` | 类加载过多、动态代理过多、类加载器泄漏 |
| `unable to create new native thread` | 线程数过多或系统资源不足 |

排查流程：

```text
确认 OOM 类型
-> 保留错误日志和堆转储
-> 用 MAT / JProfiler 分析大对象和引用链
-> 判断是容量不足、瞬时峰值还是内存泄漏
-> 修复代码或调整 JVM 参数
```

生产建议开启：

```text
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/data/dump
```

## Full GC 频繁

可能原因：

- 老年代空间不足。
- 大对象直接进入老年代。
- 内存泄漏导致对象长期存活。
- 元空间压力触发 Full GC。
- 新生代设置不合理，对象过早晋升。

排查方向：

- 查看 GC 日志中的 Full GC 频率和耗时。
- 观察老年代 GC 后是否明显下降。
- 如果 GC 后老年代占用仍高，优先怀疑内存泄漏或缓存无限增长。
- 结合堆转储分析对象引用链。

## CPU 飙高

排查流程：

```text
top 找到高 CPU 进程
-> top -Hp <pid> 找到高 CPU 线程
-> printf "%x\n" <tid> 转十六进制
-> jstack <pid> 查找对应 nid
-> 定位业务代码、死循环、锁竞争或频繁 GC
```

常见原因：

- 死循环。
- 正则表达式回溯严重。
- 频繁 GC。
- 锁竞争或自旋。
- 大量序列化、压缩、加密计算。

## 线程死锁

使用 `jstack` 可以看到死锁提示：

```text
Found one Java-level deadlock
```

常见原因：

- 多把锁加锁顺序不一致。
- 持有锁时调用外部服务或执行耗时操作。
- 线程池任务互相等待。

避免方式：

- 统一加锁顺序。
- 缩小锁范围。
- 使用超时锁，例如 `tryLock()`。
- 避免在线程池任务中同步等待同一个线程池的其他任务。

## 响应变慢

排查慢接口不要只看 JVM：

| 方向 | 检查点 |
| --- | --- |
| JVM | GC 停顿、线程阻塞、CPU 使用率 |
| 数据库 | 慢 SQL、锁等待、连接池耗尽 |
| 缓存 | Redis 慢命令、热点 key、大 key |
| 下游服务 | 超时、重试、熔断、线程池隔离 |
| 系统资源 | CPU、内存、磁盘 IO、网络 |

生产环境推荐接入 [可观测性](/observability/) 体系，把 JVM 指标、接口耗时、日志和链路追踪统一观察。

## 实践建议

- 先保留现场，再重启服务。
- 诊断命令要控制频率，避免排查动作加重线上压力。
- GC 日志、堆转储、线程栈和业务日志要结合分析。
- 问题复盘时要补监控、告警和压测用例，避免只修一次代码。
