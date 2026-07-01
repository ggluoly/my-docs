---
title: '部署运维'
description: 'Java 后端部署运维文档，覆盖 Docker、Kubernetes、CI/CD、服务网格、灰度发布和数据分析能力。'
---

# 部署运维

把开发完成的微服务打包、发布到生产环境，并保证可扩缩容、可灰度、可回滚。这一层是企业项目从"能跑"到"能持续交付"的关键。

## 本栏目内容

- [Docker 容器化](./docker)：把应用和运行环境打包成标准镜像。
- [Kubernetes 容器编排](./kubernetes)：服务部署、扩缩容、滚动发布、故障恢复。
- [CI/CD 持续交付](./cicd)：从提交代码到自动发布的完整流水线。
- [服务网格与灰度发布](./mesh)：Istio、灰度发布、流量治理。
- [数据分析](./data-analysis)：ClickHouse、Flink 等 OLAP 与实时计算。
- [AI 能力](./ai)：Spring AI、向量数据库、RAG 知识库。

## 组件速览

| 组件 | 类别 | 主要作用 |
| --- | --- | --- |
| Docker | 容器化 | 把应用和运行环境打包成标准镜像，方便部署和迁移。 |
| Docker Compose | 编排 | 本地或小规模编排。 |
| Kubernetes | 容器编排 | 服务部署、扩缩容、滚动发布、故障恢复。 |
| Helm | 包管理 | Kubernetes 应用包管理。 |
| Kustomize | 配置管理 | Kubernetes 配置管理。 |
| Jenkins / GitLab CI / GitHub Actions | CI/CD | 编译、测试、构建镜像、自动发布。 |
| Argo CD | GitOps | GitOps 部署。 |
| Harbor | 镜像仓库 | 存储 Docker 镜像。 |
| Nexus / Artifactory | 制品仓库 | 存储 Maven 制品。 |
| Istio / Linkerd | 服务网格 | 服务间流量治理、mTLS。 |

## 典型发布链路

```
提交代码
  -> CI 拉取代码
  -> 编译
  -> 测试
  -> 代码扫描
  -> 构建镜像
  -> 推送 Harbor
  -> 部署 Kubernetes
  -> 监控和告警
```
