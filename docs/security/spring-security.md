# Spring Security

> Spring 官方安全框架，负责登录认证、接口鉴权、Token 校验和权限控制。

## 是什么

Spring Security 是 Spring 官方的安全框架，提供认证（Authentication）和授权（Authorization）两大核心能力，是 Spring 生态中权限控制的标准方案。

## 解决什么问题

- 登录认证
- 接口鉴权
- Token 校验
- 权限控制（角色、菜单、按钮）

## 在微服务中的角色

标准 Spring 方案通常组合使用：

```
Spring Security + OAuth2 + JWT
```

常见企业架构：

```
Gateway 统一认证
业务服务解析用户上下文
权限中心统一管理用户、角色、菜单、按钮权限
```

## 选型建议

- 标准 Spring 生态、需要对接 OAuth2/OIDC：`Spring Security`
- 国内中小项目、追求轻量：考虑 [Sa-Token](./sa-token)
- 老项目权限框架：`Shiro`

详见 [OAuth2 与 JWT](./oauth2-jwt)。
