---
title: 'Sa-Token'
description: 'Sa-Token 技术文档，介绍登录认证、权限校验、会话管理和 Java 后端轻量级安全框架实践。'
---

# Sa-Token

> Sa-Token 是国内轻量级权限认证框架，API 简单，适合中小项目快速落地登录鉴权。

## 是什么

Sa-Token 是一个国内流行的 Java 权限认证框架，封装了登录认证、权限校验、会话管理、单点登录等能力，使用门槛低于 Spring Security。

## 解决什么问题

- 登录认证与登录态管理
- 角色 / 权限校验
- Token 生成与校验
- 单点登录、踢人下线、账号封禁

## 典型场景

```
用户登录发放 Token
接口权限校验
角色菜单按钮权限
分布式会话共享（配合 Redis）
```

## 国内中小项目常见组合

```
Sa-Token + JWT
```

## 选型建议

- 追求快速落地、团队熟悉度低：`Sa-Token`
- 需要标准 OAuth2 协议、对接第三方：用 [Spring Security + OAuth2](./oauth2-jwt)
- 老项目权限框架：`Shiro`
