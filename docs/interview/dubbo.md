---
title: 'Dubbo 面试题'
description: 'Dubbo 面试题整理，覆盖 RPC、调用流程、服务发现、SPI、负载均衡、集群容错和 RPC 框架设计，并说明 Dubbo 3.x 与传统实现差异。'
outline: [2, 3]
---

# Dubbo 面试题

> 本页以 Dubbo 3.x 为主线整理 17 道 Dubbo 面试题。页面保留旧协议、XML 配置和接口级服务发现等内容会明确标记为传统项目背景。

## Dubbo 与 RPC

### Dubbo是什么？RPC又是什么？

Dubbo 是面向微服务的 RPC 和服务治理框架，提供服务定义、服务发现、远程调用、负载均衡、流量治理、容错、可观测性和安全等能力。

RPC（Remote Procedure Call，远程过程调用）是一种编程模型：调用方以本地接口或方法的形式发起调用，框架负责把请求转换成网络消息，服务端执行目标方法后再返回结果。RPC 不是某一种固定协议，底层可使用 TCP、HTTP/2 等传输承载。

一个完整 RPC 调用通常需要解决服务寻址、动态代理、编解码、序列化、网络传输、超时、重试、负载均衡和可观测性等问题。通俗理解，**远程调用就是本地机器通过代理调用远程机器的方法，并获得返回结果的过程**。

![Dubbo RPC 概览](/images/interview/dubbo/dubbo-rpc-overview.png)

### Dubbo能做什么？

Dubbo的核心功能主要包含：

![Dubbo 核心能力](/images/interview/dubbo/dubbo-core-capabilities.png)

- **远程通讯**：`dubbo-remoting` 模块提供对多种基于长连接的 NIO 框架抽象封装，包括多种线程模型、序列化，以及“请求-响应”模式的信息交换方式。
- **集群容错**：提供基于接口方法的透明远程过程调用，包括多协议支持，以及软负载均衡、失败容错、地址路由、动态配置等集群支持。
- **自动发现**：基于注册中心目录服务，使服务消费方能动态查找服务提供方，使地址透明，使服务提供方可以平滑增加或减少机器。

## 调用流程与协议

### 能说下Dubbo的总体的调用过程吗？

调用过程图：

![Dubbo 服务调用流程](/images/interview/dubbo/dubbo-service-invocation-flow.png)

1. Consumer 调用本地代理，代理把方法调用封装为 `Invocation`，交给消费者侧 `Invoker`。
2. 消费者侧 Filter 链可在调用外围处理上下文传递、鉴权、监控、限流和日志等能力。
3. Cluster Invoker 通过 Directory 获取当前可用 Provider Invoker 列表；Directory 的地址来自服务发现，Router 会按条件、标签或动态规则过滤实例。
4. LoadBalance 从过滤后的实例中选择一个 Provider；默认是加权随机。Cluster 决定调用失败后是重试、快速失败还是其他容错行为。
5. Protocol 层将请求编码、序列化并通过 Client 发送到服务端。
6. Provider 接收请求后解码、反序列化并按线程模型派发；Provider Filter 链完成服务端增强。
7. 框架根据服务键找到 Exporter / Invoker，调用真实服务实现，将结果经序列化和网络传输返回给 Consumer。

### 说说Dubbo 支持哪些协议，每种协议的应用场景和优缺点？

![Dubbo 协议概览](/images/interview/dubbo/dubbo-protocol-overview.png)

当前 Dubbo 3.x 的协议选型主线如下：

1. **triple / tri**：基于 HTTP/1、HTTP/2 的现代协议，兼容 gRPC，支持一元调用、流式调用和 REST 风格 HTTP 服务。新项目优先评估 Triple，尤其适合跨语言、网关接入或需要流式能力的场景。
2. **dubbo**：基于 TCP 的高性能私有协议，适合 Dubbo SDK 间的高性能 Java 服务调用。序列化可配置；Dubbo 3.2+ 会自动协商序列化，满足依赖条件时默认使用 Fastjson2，否则回退 Hessian2，不能笼统说固定使用 Hessian。
3. **REST**：适合需要 HTTP / REST 互操作的场景，通常用于对外接口或与非 Dubbo 客户端集成。

RMI、WebService、HttpInvoke、Hessian、Memcached、Redis 等属于扩展协议或传统项目兼容能力。它们应按目标系统互操作需求选择，不应作为新 Dubbo 项目的默认协议清单；涉及 Java 原生序列化时还要额外评估反序列化安全风险。

## 扩展与设计

### Dubbo中都用到哪些设计模式？

![Dubbo 设计模式](/images/interview/dubbo/dubbo-design-patterns.png)

Dubbo 源码中常见的设计思想包括责任链、观察者、装饰器、工厂、适配器和代理。具体实现类会随版本演进，面试中应重点说明设计目的，而不是把某个类名当成跨版本固定结论。

**责任链模式**：Dubbo 的调用链可通过 `Filter` 串联，消费者和服务提供者两端均可在调用前后增加监控、日志、鉴权、上下文传递和限流等能力。传统源码中可见 `ProtocolFilterWrapper` 等包装实现。

**观察者模式**：Dubbo中使用观察者模式最典型的例子是 `RegistryService`。消费者在初始化的时候会调用 `subscribe` 方法，注册一个观察者，如果观察者引用的服务地址列表发生改变，就会通过 `NotifyListener` 通知消费者。此外，Dubbo的 `InvokerListener`、`ExporterListener` 也实现了观察者模式，只要实现该接口并注册，就可以接收到 consumer 端调用 `refer` 和 provider 端调用 `export` 的通知。

**修饰器模式**：Dubbo中还大量用到了修饰器模式。比如 `ProtocolFilterWrapper` 类是对 `Protocol` 类的修饰。在 `export` 和 `refer` 方法中，配合责任链模式，把Filter组装成责任链，实现对Protocol功能的修饰。其他还有 `ProtocolListenerWrapper`、`ListenerInvokerWrapper`、`InvokerWrapper` 等。

**工厂方法模式**：`CacheFactory` 的实现采用的是工厂方法模式。`CacheFactory` 接口定义 `getCache` 方法，然后定义一个 `AbstractCacheFactory` 抽象类实现 `CacheFactory`，并将实际创建 cache 的 `createCache` 方法分离出来，设置为抽象方法。这样具体 cache 的创建工作就留给具体的子类去完成。

**抽象工厂模式**：`ProxyFactory` 负责生成 Consumer 代理和 Provider Invoker。不同版本可使用不同动态代理实现，具体实现和默认值应以当前版本配置为准。

**适配器模式**：为了让用户根据自己的需求选择日志组件，Dubbo自定义了自己的Logger接口，并为常见的日志组件（包括 jcl、jdk、log4j、slf4j）提供相应的适配器。并且利用简单工厂模式提供一个 `LoggerFactory`，客户可以创建抽象的Dubbo自定义Logger，而无需关心实际使用的日志组件类型。

**代理模式**：Dubbo consumer 使用 Proxy 类创建远程服务的本地代理，本地代理实现和远程服务一样的接口，并且屏蔽了网络通信的细节，使得用户在使用本地代理的时候，感觉和使用本地服务一样。

### 如果Dubbo中provider提供的服务由多个版本怎么办？

可以通过 Dubbo 配置中的 `version` 区分同一接口的多个兼容版本，Provider 和 Consumer 必须使用匹配的版本值。

```xml
<dubbo:service interface="com.xxxx.rent.service.IDemoService" ref="iDemoServiceFirst" version="1.0.0"/>
<dubbo:service interface="com.xxxx.rent.service.IDemoService" ref="iDemoServiceSecond" version="1.0.1"/>
```

老版本 `version=1.0.0`，新版本 `version=1.0.1`。`group` 更适合逻辑隔离同名服务，例如不同业务线或环境；版本升级和灰度发布还可配合标签路由、动态配置和流量规则，不能只依赖 `version`。

## 服务暴露与引用

### 服务暴露的流程是怎么样的？

![Dubbo 服务暴露流程](/images/interview/dubbo/dubbo-service-export-flow.png)

在 Dubbo 3 / Spring Boot 项目中，通常由 `@DubboService`、配置属性和 `DubboBootstrap` 驱动服务导出；传统 Spring XML 项目才会通过 `<dubbo:service>` 标签解析和 Spring 生命周期触发。

1. 框架读取服务接口、实现、协议、端口和注册发现配置，创建 `ServiceConfig`。
2. `ProxyFactory` 将服务实现封装为 Provider Invoker，Invoker 持有目标接口、方法调用和 URL 等信息。
3. `Protocol.export()` 将 Invoker 导出为 Exporter，启动 Server 监听相应协议端口，并在本地维护服务键到 Exporter 的映射。
4. 服务通过注册中心注册实例和元数据；Dubbo 3 新项目推荐应用级服务发现，例如配置 `register-mode: instance`。
5. 注册、元数据上报或端口监听失败时，服务启动应按配置快速失败或进入可恢复状态，而不是假设固定由某个 `RegistryProtocol` 完成全部工作。

![Dubbo 服务暴露细节](/images/interview/dubbo/dubbo-service-export-details.png)

### 服务引用的流程是怎么样的？

在 Dubbo 3 / Spring Boot 项目中，Consumer 通常通过 `@DubboReference` 或 `ReferenceConfig` 引用服务。

1. Consumer 从注册中心订阅服务实例和元数据；应用级服务发现下，先发现服务应用，再获取可调用实例，地址变化会更新 Directory。
2. Directory 根据服务发现结果维护 Invoker 列表；Router、LoadBalance 和 Cluster 在实际调用时参与实例选择和容错。
3. `Protocol.refer()` 为远端地址创建 Invoker，必要时初始化或复用 Client 连接；`ProxyFactory` 再为服务接口生成本地代理。
4. 调用代理时才按调用链执行路由、负载均衡、编解码和网络通信。直连 Provider、`check=false` 等配置会改变启动时连接检查和恢复行为。

![Dubbo 服务引用流程](/images/interview/dubbo/dubbo-service-reference-flow.png)

## 注册发现与 SPI

### Dubbo的注册中心有哪些？

![Dubbo 注册中心](/images/interview/dubbo/dubbo-registry-options.png)

Dubbo 支持多种服务发现实现，当前常见的是 **Nacos、ZooKeeper、Consul 和 Kubernetes**。Dubbo 3 新项目通常使用应用级服务发现；例如 Nacos 可配置 `register-mode: instance`。

Redis、Multicast、Simple 等属于传统或特定环境下的实现：Multicast 多用于局域网测试，Simple 适合简单静态场景，Redis 注册中心一般只在遗留项目中见到。选择注册中心时还要评估高可用、健康检查、命名空间隔离、权限和运维能力。

### 聊聊Dubbo SPI机制？

SPI（Service Provider Interface）是服务提供者接口或扩展点加载机制，不是服务发现机制。它将扩展接口的实现类与名称写入配置，框架按名称和运行时配置选择实现，从而在不修改 Dubbo 源码的情况下扩展协议、注册中心、路由、负载均衡、序列化和过滤器等能力。

Dubbo SPI 是对 Java SPI 的增强。扩展接口通常使用 `@SPI` 标识默认扩展；`@Adaptive` 可根据 URL 参数在运行时选择扩展；`@Activate` 可按 Consumer / Provider 端、URL 条件和顺序自动激活 Filter 等扩展；还支持依赖注入和 Wrapper 包装。

SPI在Dubbo应用很多，包括协议扩展、集群扩展、路由扩展、序列化扩展等等。

Dubbo 会从以下目录加载扩展配置：

1. `META-INF/services/` 目录：该目录下的 SPI 配置文件用于兼容 Java SPI。
2. `META-INF/dubbo/` 目录：该目录存放用户自定义的 SPI 配置文件。

   ```text
   key=com.xxx.xxx
   ```

3. `META-INF/dubbo/internal/` 目录：该目录存放 Dubbo 内部使用的 SPI 配置文件。

### Dubbo的SPI和JAVA的SPI有什么区别？

![Dubbo SPI 与 Java SPI 对比](/images/interview/dubbo/dubbo-spi-comparison.png)

**Java SPI**：Java 的 `ServiceLoader` 通过 `META-INF/services/` 查找实现，通常按迭代需要懒加载实现类；它的不足主要是缺少按名称选择、默认扩展、条件激活、依赖注入和 Wrapper 包装等 Dubbo 所需能力，而不是必然一次性实例化全部实现。

**Dubbo SPI**：

1. 通过扩展名选择实现，扩展 Dubbo 不需要修改源码。
2. 扩展实例按需创建并缓存，可通过 `@SPI` 配置默认实现。
3. `@Adaptive` 根据 URL 参数自适应选择扩展，`@Activate` 可按调用端、条件和顺序激活扩展。
4. 支持扩展点依赖注入和 Wrapper 包装，例如 Protocol 的 Filter、Listener 等包装链。

## 负载均衡与容错

### 有哪些负载均衡策略？

Dubbo 默认使用**加权随机**负载均衡，由 Consumer 在路由后的 Provider 列表中选择实例。常见策略如下：

1. **加权随机**：比如有三台服务器 `[A, B, C]`，权重为 `[4, 5, 6]`，按权重区间随机选择实例。适合实例性能和容量存在差异、请求量大的通用场景。

   ![Dubbo 加权随机负载均衡](/images/interview/dubbo/dubbo-loadbalance-weighted-random.png)

2. **最小活跃数**：每个服务提供者对应活跃调用数，调用开始时加 1、结束时减 1。性能更好或响应更快的实例通常活跃数更低，因此优先获得新请求。

   ![Dubbo 最小活跃数负载均衡](/images/interview/dubbo/dubbo-loadbalance-least-active.png)

3. **一致性 Hash**：对 Dubbo Provider Invoker 和调用参数计算 Hash，将同一业务 key 尽量路由到相同实例，适合会话黏滞、缓存局部性或同 key 局部有序场景。节点增减时仍可能造成部分 key 迁移。

   ![Dubbo 一致性 Hash 负载均衡](/images/interview/dubbo/dubbo-loadbalance-consistent-hash.png)

4. **加权轮询**：按权重比例轮流分配请求。例如权重为 `[4, 5, 6]` 的三台实例，在足够多请求下会近似获得对应比例的流量。

   ![Dubbo 加权轮询负载均衡](/images/interview/dubbo/dubbo-loadbalance-weighted-round-robin.png)

新版本还提供最短响应时间、P2C 等策略或可通过 SPI 自定义。选型应结合实例性能、调用耗时、连接数和业务键，而不是只看算法名称。

### 集群容错方式有哪些？

1. **Failover Cluster 失败自动切换**：Dubbo 默认容错策略，调用失败时会切换到其他可用节点重试。`retries` 表示首次调用之外的额外重试次数，例如 `retries="2"` 最多执行 3 次调用。重试会扩大延迟并可能重复执行，通常只适用于幂等读操作。
2. **Failback Cluster 失败自动恢复**：调用失败后记录失败信息并异步补偿重试，调用方通常立即返回；具体返回语义、重试周期和次数应以当前版本与配置为准，不能假定固定每 5 秒重试。
3. **Failfast Cluster 快速失败**：只会调用一次，失败后立刻抛出异常。
4. **Failsafe Cluster 失败安全**：调用出现异常，记录日志不抛出，返回空结果。
5. **Forking Cluster 并行调用多个服务提供者**：通过线程池创建多个线程，并发调用多个 provider，结果保存到阻塞队列，只要有一个 provider 成功返回结果，就会立刻返回结果。
6. **Broadcast Cluster 广播模式**：逐个调用每个 Provider，通常用于通知、缓存刷新等需要全量执行的场景；任何一个实例失败会在循环结束后抛出异常。

此外还有 Available、Mergeable、ZoneAware 等内置 Cluster 扩展。无论采用哪种容错方式，超时、重试和幂等都必须一起设计，不能把重试当作消息不丢或业务成功的保证。

## 分层与服务治理

### 说说Dubbo的分层？

分层图：

![Dubbo 分层架构](/images/interview/dubbo/dubbo-code-architecture.png)

从大的范围来说，Dubbo 分为三层：

- **business 业务逻辑层**：由我们自己来提供接口、实现和一些配置信息。
- **RPC 层**：真正的 RPC 调用核心层，封装整个 RPC 的调用过程、负载均衡、集群容错、代理。
- **remoting 层**：对网络传输协议和数据转换的封装。

Service 和 Config 两层可以认为是 API 层，主要提供给 API 使用者，使用者只需要配置和完成业务代码。后面所有层级是 SPI 层，主要提供给扩展者使用，主要用来做 Dubbo 的二次开发扩展功能。再划分到更细的层面，就是图中的 10 层模式。

### 服务提供者能实现失效踢出是什么原理？

服务动态上下线依赖所使用的注册发现实现：Provider 正常关闭会注销实例，Consumer 通过订阅通知更新可用地址；异常实例则由注册中心的心跳、健康检查、租约或会话超时机制判定并剔除。

使用 ZooKeeper 作为注册中心时，Provider 通常注册临时节点，Session 失效后节点会被删除并通知 Consumer。它依赖 Session 生命周期，不是 TCP 连接断开即刻删除；使用 Nacos、Consul、Kubernetes 时则分别遵循其心跳、健康检查或 Endpoints 更新机制，不能将 ZooKeeper 临时节点泛化为 Dubbo 的通用原理。

### 为什么要通过代理对象通信？

![Dubbo 代理通信](/images/interview/dubbo/dubbo-proxy-invocation.png)

主要是为了将调用细节封装起来，将调用远程方法变得和调用本地方法一样简单，还可以做一些其他方面的增强，比如负载均衡、容错机制、过滤操作、调用数据统计。

## RPC 框架设计

### 怎么设计一个RPC框架？

关于这个问题，核心考察点是对于 RPC 框架的理解，一个成熟的 RPC 框架可以完成哪些功能。举个例子：

1. 若需要动态服务发现和弹性扩缩容，需要注册中心或其他服务发现机制管理 Provider 地址；也可以使用直连、静态配置、DNS、Kubernetes Service 或服务网格寻址。
2. 当有了注册中心后，可能会有很多个 provider 节点，那么需要一个负载均衡模块来负责节点调用；用户指定路由规则可以作为额外的优化点。
3. 具体调用会牵扯到通信协议，所以需要一个模块对通信协议进行封装，网络传输还要考虑序列化。
4. 调用失败后怎么处理？还需要一个容错模块，负责失败情况的处理。
5. 做完这些，一个基础模型已经搭建好；还需要补充超时与取消、限流熔断、认证授权、可观测性、配置管理、灰度路由、幂等和安全的序列化白名单等生产能力。

![RPC 框架组件](/images/interview/dubbo/rpc-framework-components.png)

## 参考资料

- 原文与图片来源：[《面试八股文》之Dubbo17卷](https://mp.weixin.qq.com/s?__biz=MzkwODE5ODM0Ng==&mid=2247491592&idx=1&sn=454ae3d6a661a1eb63ffbad767ccb479&chksm=c0cf08adf7b881bbfd7d2a2ad150e7621756ccc06a6ffacd52833e7f4b84d5d01e16e5a6770f&scene=27#wechat_redirect)
