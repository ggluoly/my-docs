---
title: Knife4j / 接口文档
---

# Knife4j / Springdoc OpenAPI

## 是什么

接口文档层负责自动生成和展示 REST API 文档，支持前后端联调、接口调试和参数说明。

## 常见组件

- `Springdoc OpenAPI`：OpenAPI 文档。
- `Knife4j`：国内常用 Swagger 增强版。
- `Swagger UI`：接口文档页面。
- `Apifox`：API 管理和调试工具。
- `Postman`：接口调试工具。

## 典型用途

```
接口文档
前后端联调
接口调试
接口分组
参数说明
```

## 选型建议

国内项目常见：

```
Knife4j
```

标准 Spring Boot 3 项目推荐：

```
Springdoc OpenAPI
```

Knife4j 基于 Springdoc 增强 UI 体验，提供更友好的中文界面、接口分组和调试功能；Springdoc 则是标准 OpenAPI 3 实现，兼容性更好。
