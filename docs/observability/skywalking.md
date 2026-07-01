---
title: '链路追踪（SkyWalking / OpenTelemetry）'
description: 'SkyWalking 与 OpenTelemetry 链路追踪文档，介绍调用链、Trace、Span 和 Java 后端故障定位实践。'
---

# 链路追踪（SkyWalking / OpenTelemetry）

## 是什么

- `SkyWalking`：开源 APM，分布式链路追踪、性能分析，国内项目常用。
- `OpenTelemetry`：可观测性标准（指标、链路、日志统一规范），新项目推荐关注。
- `Zipkin`：轻量级链路追踪系统。
- `Tempo`：Grafana 生态的 Trace 存储。

## 解决什么问题

微服务一个请求会穿过多个服务，出问题时很难定位是哪一环慢、哪一环报错。链路追踪给每个请求分配 `traceId`，串起整条调用链，定位性能瓶颈和异常节点。

## 典型调用链

```
前端
  -> Gateway        (traceId=abc)
  -> user-service   (traceId=abc)
  -> order-service  (traceId=abc)
  -> payment-service(traceId=abc)
```

同一个 `traceId` 贯穿所有服务，可以还原完整调用路径和每段耗时。

## 选型建议

- 国内项目用得最多的是 `SkyWalking`，无侵入（Java Agent 方式），部署即用。
- 新项目推荐关注 `OpenTelemetry`，它是更通用的可观测性标准，能统一指标、链路、日志的采集，避免被单一厂商绑定。
- 链路追踪要和[日志](./logging)的 `traceId` 打通，才能从一条慢请求直接跳到对应日志。

## 配套

- 指标监控见 [Prometheus + Grafana](./prometheus-grafana)。
- 日志全链路见[日志体系](./logging)。
