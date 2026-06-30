# Spring Cloud Gateway

## 是什么

Spring Cloud Gateway 是微服务的统一入口，是 Spring Cloud 项目中最常用的网关。

## 常见组件

网关层常见的组件：

- `Spring Cloud Gateway`：微服务统一入口。
- `Nginx`：反向代理、负载均衡、静态资源。
- `Kong`：API 网关。
- `Apache APISIX`：API 网关。
- `Traefik`：云原生网关。

Spring Cloud 项目中最常用的是：

```
Spring Cloud Gateway
```

## 解决什么问题

它负责：

```
统一入口
路由转发
跨域处理
统一鉴权
限流
日志记录
灰度发布
请求头处理
负载均衡
```

## 典型调用链

```
前端
  -> Gateway
  -> user-service
  -> order-service
```

## 常见依赖

```xml
spring-cloud-starter-gateway
```
