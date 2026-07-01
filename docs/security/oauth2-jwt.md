---
title: 'OAuth2 与 JWT'
description: 'OAuth2 与 JWT 技术文档，介绍授权流程、Token 设计、无状态认证和 Java 后端登录鉴权实践。'
---

# OAuth2 与 JWT

> OAuth2 是授权协议，JWT 是 Token 格式，二者常配合 Spring Security 构成标准认证方案。

## 是什么

- **OAuth2**：授权协议，定义了第三方应用获取资源访问权限的标准流程。
- **JWT**：JSON Web Token，一种自包含的 Token 格式，服务端无需存储会话即可校验。
- **Spring Authorization Server**：Spring 官方的 OAuth2 授权服务器实现。
- **Keycloak**：开源身份认证系统，提供完整的 IAM 能力。

## 解决什么问题

- 统一登录认证与单点登录（SSO）
- 无状态 Token 校验，便于微服务横向扩展
- 标准化的授权流程，便于对接第三方

## 标准方案

```
Spring Security + OAuth2 + JWT
```

典型流程：

```
用户登录 -> 认证中心签发 JWT
请求携带 JWT -> Gateway 校验
业务服务从 Token 解析用户上下文
```

## 选型建议

- 标准企业方案：`Spring Security + OAuth2 + JWT`
- 需要完整 IAM 系统：`Keycloak` / `Spring Authorization Server`
- 国内轻量项目：`Sa-Token + JWT`，见 [Sa-Token](./sa-token)
