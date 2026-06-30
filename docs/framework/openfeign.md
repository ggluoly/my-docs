# OpenFeign

## 是什么

OpenFeign 是声明式 HTTP 客户端，用接口方式完成微服务之间的远程调用。

## 常见组件

服务调用层常见的组件：

- `OpenFeign`：声明式 HTTP 调用。
- `Spring Cloud LoadBalancer`：客户端负载均衡。
- `RestTemplate`：老式 HTTP 调用方式。
- `WebClient`：响应式 HTTP 客户端。
- `Dubbo`：RPC 服务调用，部分企业使用。

## 最常见组合

```
OpenFeign + Spring Cloud LoadBalancer
```

## 示例

```java
@FeignClient("user-service")
public interface UserClient {

    @GetMapping("/users/{id}")
    UserDTO getUser(@PathVariable Long id);
}
```

## 常见依赖

```xml
spring-cloud-starter-openfeign
```
