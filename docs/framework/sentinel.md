# Sentinel

## 是什么

Sentinel 是熔断限流组件，负责限流、熔断、降级、热点参数限流，国内项目常用。

## 常见组件

熔断限流层常见的组件：

- `Sentinel`：限流、熔断、降级、热点参数限流，国内项目常用。
- `Resilience4j`：熔断、限流、重试、隔离、超时，Spring 官方生态常用。
- `Hystrix`：老项目常见，已不推荐新项目使用。

## 选型建议

国内常见选择：

```
Sentinel
```

偏 Spring 官方生态常见选择：

```
Resilience4j
```

## 解决什么问题

Sentinel 主要解决：

```
服务雪崩
接口限流
服务降级
热点参数限流
异常比例熔断
慢调用熔断
```

## 常见依赖

```xml
spring-cloud-starter-alibaba-sentinel
```
