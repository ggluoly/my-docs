---
title: 'IO 与 NIO'
description: '基于 JDK 8 梳理 Java IO 与 NIO，包括 BIO、NIO、Buffer、Channel、Selector、AIO 和后端网络 IO 选型。'
outline: [2, 3]
---

# IO 与 NIO

> 本页默认以 JDK 8 为技术基线。

IO 影响文件处理、网络通信和高并发服务性能。理解 BIO、NIO 和多路复用，是学习 Tomcat、Netty、Kafka 等组件的基础。

## BIO

BIO 是传统 `java.io` 模型，同步阻塞，面向流。

特点：

- 一个连接通常需要一个线程处理。
- 读写操作会阻塞当前线程。
- 编程模型简单，适合连接数不高的场景。

典型 API：

```java
InputStream
OutputStream
Reader
Writer
Socket
ServerSocket
```

问题：当连接数很高时，线程数量、上下文切换和内存占用都会成为瓶颈。

## NIO

NIO 是 `java.nio` 模型，同步非阻塞，面向缓冲区、通道和选择器。

核心组件：

| 组件 | 作用 |
| --- | --- |
| `Buffer` | 数据缓冲区，读写数据都经过 Buffer |
| `Channel` | 数据通道，连接文件、Socket 等数据源 |
| `Selector` | 多路复用器，一个线程可以管理多个 Channel |

NIO 适合大量连接、单次请求处理较快的网络服务。

## Buffer

`Buffer` 是一块可读写的内存区域，常见实现包括：

- `ByteBuffer`
- `CharBuffer`
- `IntBuffer`

核心属性：

| 属性 | 说明 |
| --- | --- |
| `capacity` | 容量 |
| `position` | 当前读写位置 |
| `limit` | 当前可读写边界 |

常见操作：

```java
buffer.put(data);
buffer.flip();
channel.write(buffer);
buffer.clear();
```

## Channel

`Channel` 表示数据通道，常见类型：

- `FileChannel`
- `SocketChannel`
- `ServerSocketChannel`
- `DatagramChannel`

和传统流不同，Channel 通常可以双向读写，并且可以配合 Buffer 和 Selector 实现非阻塞 IO。

## Selector

`Selector` 是 NIO 多路复用的核心。一个线程可以监听多个 Channel 的事件，例如连接、读、写。

典型流程：

```text
创建 Selector
创建 ServerSocketChannel
设置非阻塞
注册 accept/read/write 事件
循环调用 selector.select()
处理就绪事件
```

Tomcat NIO 连接器、Netty、Kafka 等高并发组件底层都依赖类似思想。

## AIO

AIO 是异步非阻塞模型，JDK 7 引入，核心 API 在 `java.nio.channels` 包中，例如 `AsynchronousSocketChannel`。

它的使用频率低于 NIO。Java 后端工程中，更常见的是通过 Netty、Servlet 容器或框架间接使用成熟网络模型。

## 选型建议

| 场景 | 建议 |
| --- | --- |
| 普通文件读写 | `java.io` 或 NIO 工具类都可以 |
| 少量连接、简单网络程序 | BIO 足够 |
| 高并发网络服务 | NIO 或基于 NIO 的框架 |
| 自研网络协议 | 优先考虑 Netty |
| 业务系统 HTTP 服务 | 使用成熟 Web 容器，不直接手写 Selector |

业务开发中不需要频繁手写 NIO，但必须理解它的模型，否则很难理解 Tomcat、Netty、RocketMQ、Kafka 等组件的性能基础。
