# Nacos

## 是什么

Nacos 是国内项目推荐的注册中心和配置中心，负责服务注册发现以及统一配置管理。

## 常见组件

注册中心和配置中心层常见的组件：

- `Nacos Discovery`：服务注册与发现，国内项目推荐。
- `Nacos Config`：配置中心，国内项目推荐。
- `Eureka`：服务注册与发现，老项目常见。
- `Consul`：服务发现、配置、健康检查，部分企业使用。
- `Spring Cloud Config`：Spring 官方配置中心方案。

国内新项目通常推荐：

```
Nacos Discovery + Nacos Config
```

## 典型作用

```
user-service 注册到 Nacos
order-service 注册到 Nacos
gateway 从 Nacos 发现服务
配置文件统一放到 Nacos 管理
```

## 常见依赖

```xml
spring-cloud-starter-alibaba-nacos-discovery
spring-cloud-starter-alibaba-nacos-config
```
