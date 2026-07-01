---
title: 'JVM'
description: 'JVM 技术文档，梳理运行时内存、垃圾回收、类加载机制、线上问题排查和 Java 后端调优重点。'
---

# JVM

> 本页为知识库新增内容，不属于《Spring 技术套件》原文档。

JVM 是 Java 后端绕不开的底层。线上排查内存溢出、GC 停顿、CPU 飙高等问题，都要求理解 JVM 的内存结构和垃圾回收机制。

## 运行时内存结构 {#runtime-memory}

```
JVM 内存
├── 堆（Heap）          // 对象实例，GC 主战场，线程共享
│   ├── 新生代（Young）  // Eden + S0 + S1
│   └── 老年代（Old）
├── 方法区/元空间        // 类元信息，JDK 8 后用 Metaspace（本地内存）
├── 虚拟机栈（Stack）    // 方法调用的栈帧，线程私有
├── 本地方法栈           // native 方法
└── 程序计数器           // 当前执行字节码行号，线程私有
```

要点：

- **堆**是线程共享的，对象基本都分配在这里，也是 GC 的主要区域。
- **栈**是线程私有的，每次方法调用创建一个栈帧，存放局部变量、操作数栈。栈深度超限抛 `StackOverflowError`。
- JDK 8 移除了永久代（PermGen），改用**元空间（Metaspace）**，使用本地内存，类加载过多时可能 `Metaspace OOM`。

## 垃圾回收 {#garbage-collection}

### 对象存活判定

主流用**可达性分析**：从 GC Roots（栈引用、静态变量、常量、JNI 引用等）出发，不可达的对象判定为可回收。

### 分代回收

- 新对象分配在 **Eden**，Minor GC 后存活对象进入 Survivor，多次存活后晋升老年代。
- 老年代满触发 **Full GC**，停顿时间长，应尽量避免频繁 Full GC。

### 常见垃圾回收器

| 回收器 | 特点 | 适用 |
| --- | --- | --- |
| Parallel | 吞吐量优先 | 批处理、后台计算 |
| CMS | 低停顿（已废弃） | 老项目 |
| **G1** | 分区回收，可控停顿，JDK 9+ 默认 | 大多数服务端应用 |
| **ZGC** | 超低停顿（亚毫秒），大堆 | 低延迟、大内存场景 |
| Shenandoah | 低停顿 | 类似 ZGC |

新项目大堆、低延迟场景可关注 **ZGC**；通用场景 **G1** 即可。

## 类加载机制 {#class-loading}

类加载过程：**加载 → 验证 → 准备 → 解析 → 初始化**。

**双亲委派模型**：类加载请求先委派给父加载器，父加载器无法完成才自己加载。

```
Bootstrap ClassLoader   （核心类库 rt.jar）
      ↑
Extension ClassLoader    （扩展类库）
      ↑
Application ClassLoader   （应用 classpath）
```

作用：保证核心类（如 `java.lang.Object`）不被篡改，避免重复加载。Tomcat、热部署、SPI 等场景会打破双亲委派。

## 线上问题排查 {#troubleshooting}

企业开发最实用的部分——JVM 知识最终要落到排查问题上。

### 常见问题与方向

| 现象 | 可能原因 | 排查方向 |
| --- | --- | --- |
| `OutOfMemoryError: Java heap space` | 内存泄漏、堆太小、大对象 | 堆转储分析 |
| `OutOfMemoryError: Metaspace` | 类加载过多、动态代理泄漏 | 类加载监控 |
| Full GC 频繁 | 老年代压力大、内存泄漏 | GC 日志分析 |
| CPU 飙高 | 死循环、频繁 GC | 线程栈分析 |

### 常用工具

```bash
jps              # 查看 Java 进程
jstat -gc <pid>  # 查看 GC 统计
jstack <pid>     # 导出线程栈，排查死锁、CPU 高
jmap -dump:format=b,file=heap.hprof <pid>   # 导出堆转储
```

- **堆转储**用 MAT、JProfiler、VisualVM 分析，定位内存泄漏的对象。
- **GC 日志**（`-Xlog:gc*`）分析停顿时间和频率。
- 生产环境推荐接入 [可观测性](/observability/)体系，把 JVM 指标（堆、GC、线程）持续采集到 Prometheus + Grafana。

## 关键启动参数 {#jvm-options}

```bash
-Xms2g -Xmx2g                 # 初始/最大堆，生产建议设为相等避免动态扩容
-Xmn1g                        # 新生代大小
-XX:MetaspaceSize=256m        # 元空间初始大小
-XX:+UseG1GC                  # 使用 G1
-XX:+HeapDumpOnOutOfMemoryError   # OOM 时自动转储
-XX:HeapDumpPath=/path/heap.hprof
```

## 选型与实践建议

- 容器化部署（Docker/K8s）务必用 JDK 10+ 的容器感知能力，或显式设置堆大小，避免 JVM 误读宿主机内存导致 OOM。
- `-Xms` 与 `-Xmx` 设为相等，避免运行期堆动态伸缩带来的停顿。
- 一定要开启 `HeapDumpOnOutOfMemoryError`，否则 OOM 现场难以复原。
- JVM 指标纳入监控告警，不要等线上崩了才看。
