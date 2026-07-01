---
title: '安全与认证'
description: 'Java 后端安全认证技术文档，覆盖 Spring Security、OAuth2、JWT、Sa-Token 和密钥配置安全实践。'
---

# 安全与认证

微服务的认证授权、密钥与配置安全。统一原则：**网关统一认证，业务服务解析用户上下文，权限中心统一管理用户、角色、菜单、按钮权限**。

## 本栏目内容

| 文档 | 说明 |
| --- | --- |
| [Spring Security](./spring-security) | Spring 官方安全框架 |
| [OAuth2 与 JWT](./oauth2-jwt) | 授权协议与 Token 格式 |
| [Sa-Token](./sa-token) | 国内轻量级权限认证框架 |
| [密钥与配置安全](./secrets) | Vault、Jasypt、KMS 等 |

## 认证授权组件

- `Spring Security`：Spring 官方安全框架。
- `OAuth2`：授权协议。
- `JWT`：Token 格式。
- `Spring Authorization Server`：OAuth2 授权服务器。
- `Keycloak`：开源身份认证系统。
- `Sa-Token`：国内轻量级权限认证框架。
- `Shiro`：老项目常见权限框架。

## 常见企业方案

```
Gateway 统一认证
业务服务解析用户上下文
权限中心统一管理用户、角色、菜单、按钮权限
```

标准 Spring 方案：

```
Spring Security + OAuth2 + JWT
```

国内中小项目常见：

```
Sa-Token + JWT
```
