# 指标监控（Prometheus + Grafana）

## 是什么

- `Spring Boot Actuator`：健康检查、指标暴露端点。
- `Micrometer`：指标采集门面，屏蔽底层监控系统差异。
- `Prometheus`：时序数据库，负责拉取和存储指标。
- `Grafana`：监控看板，负责可视化展示。
- `Alertmanager`：告警组件，负责按规则触发告警通知。

## 解决什么问题

把每个服务的运行状态（接口耗时、QPS、错误率、JVM 内存、线程、GC、慢 SQL 等）持续采集成指标，集中存储并可视化，做到系统状态实时可见、异常可告警。

## 工作链路

```
Spring Boot 应用
  -> Actuator 暴露 /actuator/prometheus
  -> Micrometer 采集指标
  -> Prometheus 定时拉取(pull)
  -> Grafana 查询展示
  -> Alertmanager 触发告警
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
```

## 常见依赖

```xml
spring-boot-starter-actuator
micrometer-registry-prometheus
```

暴露 Prometheus 端点的关键配置：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus
  metrics:
    tags:
      application: ${spring.application.name}
```

## 选型建议

- 指标监控的标准组合就是 `Actuator + Micrometer + Prometheus + Grafana`，企业项目基本无争议。
- 告警接入 `Alertmanager`，对接钉钉、企业微信、邮件等渠道。
- 新项目可考虑用 `OpenTelemetry` 统一指标与链路的采集，见[链路追踪](./skywalking)。
