---
title: 'JVM 启动参数'
description: '基于 JDK 8 梳理 JVM 常用启动参数，包括堆、元空间、GC 选择、GC 日志、OOM 转储和容器部署建议。'
outline: [2, 3]
---

# JVM 启动参数

> 本页默认以 JDK 8 为技术基线。Java 9 之后的统一日志参数不作为本页主线。

JVM 参数决定内存上限、GC 策略、日志输出和异常现场保留。生产环境至少要明确堆大小、元空间、GC 日志和 OOM 转储策略。

## 堆参数

常用参数：

```text
-Xms2g
-Xmx2g
-Xmn1g
```

说明：

| 参数 | 作用 |
| --- | --- |
| `-Xms` | 初始堆大小 |
| `-Xmx` | 最大堆大小 |
| `-Xmn` | 新生代大小 |

实践建议：

- 生产环境 `-Xms` 和 `-Xmx` 通常设为相同，避免动态扩容带来的抖动。
- 不要把堆设置到机器内存极限，还要给元空间、直接内存、线程栈和系统预留空间。
- 容器部署时要特别关注 JVM 是否正确识别容器内存限制。

## 元空间参数

JDK 8 使用元空间替代永久代。

```text
-XX:MetaspaceSize=256m
-XX:MaxMetaspaceSize=512m
```

说明：

- `MetaspaceSize` 是触发元空间 GC 的初始阈值，不等于固定初始占用。
- `MaxMetaspaceSize` 限制元空间最大值。
- 如果不设置最大值，元空间可能持续使用本地内存，直到系统资源不足。

## 线程栈参数

```text
-Xss1m
```

`-Xss` 控制每个线程的栈大小。线程数很多时，栈内存会显著影响本地内存占用。

设置过小可能导致递归或深调用链出现 `StackOverflowError`；设置过大则会降低可创建线程数量。

## GC 选择

JDK 8 常见选择：

```text
-XX:+UseParallelGC
-XX:+UseConcMarkSweepGC
-XX:+UseG1GC
```

说明：

| 参数 | 说明 | 场景 |
| --- | --- | --- |
| `UseParallelGC` | 吞吐量优先 | 批处理、后台任务 |
| `UseConcMarkSweepGC` | CMS，低停顿老年代回收 | JDK 8 老项目常见 |
| `UseG1GC` | G1，分区回收 | 服务端大堆、可控停顿 |

G1 常见参数：

```text
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
```

CMS 常见参数：

```text
-XX:+UseConcMarkSweepGC
-XX:+UseParNewGC
-XX:CMSInitiatingOccupancyFraction=70
-XX:+UseCMSInitiatingOccupancyOnly
```

## GC 日志

JDK 8 常用 GC 日志参数：

```text
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-XX:+PrintGCTimeStamps
-Xloggc:/data/logs/gc.log
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=5
-XX:GCLogFileSize=100M
```

Java 9 之后使用统一日志，例如 `-Xlog:gc*`。JDK 8 项目不要直接照搬 Java 9+ 的日志写法。

## OOM 转储

生产环境建议开启：

```text
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/data/dump
```

作用：OOM 发生时自动导出堆转储，便于后续分析对象引用链和内存泄漏原因。

## 典型配置

G1 示例：

```text
-Xms2g
-Xmx2g
-XX:MetaspaceSize=256m
-XX:MaxMetaspaceSize=512m
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:/data/logs/gc.log
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/data/dump
```

CMS 示例：

```text
-Xms2g
-Xmx2g
-XX:MetaspaceSize=256m
-XX:MaxMetaspaceSize=512m
-XX:+UseConcMarkSweepGC
-XX:+UseParNewGC
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-Xloggc:/data/logs/gc.log
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/data/dump
```

## 实践建议

- 参数调整必须基于监控和 GC 日志，不要盲目套模板。
- 先保证 OOM 转储和 GC 日志，再谈调优。
- 容器环境中要明确 JVM 版本对容器限制的支持情况。
- 调整参数后要压测验证，不能只在本地启动成功就上线。
