---
title: '日志体系（ELK / Loki）'
description: 'ELK 与 Loki 日志体系文档，介绍日志采集、检索、告警、链路关联和 Java 后端线上排查实践。'
---

# 日志体系（ELK / Loki）

## 是什么

- `Logback`：Spring Boot 默认日志框架。
- `Log4j2`：高性能日志框架。
- `SLF4J`：日志门面（统一日志 API）。
- `ELK`：Elasticsearch + Logstash + Kibana，日志采集、存储、检索、分析。
- `EFK`：Elasticsearch + Fluentd + Kibana。
- `Loki`：Grafana 生态的轻量日志系统，成本低。
- `Fluent Bit` / `Filebeat`：日志采集 Agent。

## 解决什么问题

微服务分散在多台机器、多个容器，日志散落各处。集中式日志平台把所有服务的日志收集到一起，支持统一检索、过滤、告警，排查问题不用再逐台登录看文件。

## 企业日志需要关注的字段

```
traceId
用户 ID
请求路径
请求耗时
异常堆栈
服务名
环境标识
机器 IP
```

## 全链路日志

微服务项目最好统一接入 **traceId 全链路日志**：

```
一个请求 -> 生成 traceId -> 贯穿所有服务的日志 -> 按 traceId 聚合查看
```

否则跨服务排查问题会非常困难。`traceId` 要和[链路追踪](./skywalking)打通。

## 选型建议

- 已经用了 Elasticsearch 的项目，日志直接走 `ELK / EFK` 比较自然。
- 想降低存储成本、已用 Grafana 的项目，推荐 `Loki`。
- 采集端用 `Filebeat` 或 `Fluent Bit` 都可以，轻量优先 Fluent Bit。
