---
title: '可观测性'
description: 'Java 后端可观测性文档，覆盖 Prometheus、Grafana、SkyWalking、日志体系和线上问题定位。'
---

# 可观测性

可观测性(Observability)是企业微服务项目的必备能力。服务一旦拆分成几十个进程，靠登录机器看日志已经无法定位问题，必须有统一的指标、链路和日志体系。

## 三大支柱

| 支柱 | 回答的问题 | 代表组件 |
| --- | --- | --- |
| 指标 Metrics | 系统现在健康吗？ | Actuator、Micrometer、Prometheus、Grafana |
| 链路 Tracing | 这个请求慢在哪一环？ | SkyWalking、OpenTelemetry、Zipkin |
| 日志 Logging | 这次报错的具体堆栈是什么？ | Logback、ELK、Loki |

## 最低要求

企业项目至少要具备：

```
Actuator
Prometheus
Grafana
日志采集
链路追踪
```

## 常见监控内容

```
服务是否存活
接口耗时
QPS
错误率
JVM 内存
线程数
GC 情况
慢 SQL
接口异常
服务调用链
```

## 本栏目内容

- [指标监控（Prometheus + Grafana）](./prometheus-grafana)
- [链路追踪（SkyWalking / OpenTelemetry）](./skywalking)
- [日志体系](./logging)

新项目建议重点关注 `OpenTelemetry`，因为它是更通用的可观测性标准，能统一指标、链路、日志三类数据的采集口径。
