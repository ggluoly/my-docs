# 密钥与配置安全

> 企业项目中的数据库密码、API Key、证书等敏感信息不能明文写死，需要专门的密钥管理方案。

## 是什么

密钥与配置安全是指对项目中的敏感配置进行加密存储和受控访问，避免明文泄露。

## 常见组件

- `Vault`：密钥管理。
- `Spring Cloud Vault`：Spring 集成 Vault。
- `Jasypt`：配置加密。
- `KMS`：云厂商密钥管理。
- `Sealed Secrets`：Kubernetes Secret 加密。

## 不应明文写死的内容

```
数据库密码
Redis 密码
API Key
第三方密钥
证书
Token Secret
```

## 选型建议

- 简单项目：`Jasypt`（配置项加密即可）
- 大型项目：`Vault / KMS`（集中式密钥管理、动态密钥、审计）
- K8s 环境：`Sealed Secrets` 加密 Secret
