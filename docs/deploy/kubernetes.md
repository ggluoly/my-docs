---
title: 'Kubernetes 容器编排'
description: 'Kubernetes 容器编排文档，介绍 Pod、Deployment、Service、配置管理和 Java 后端云原生部署实践。'
---

# Kubernetes 容器编排

Kubernetes（K8s）负责容器的部署、扩缩容、滚动发布和故障恢复，是大型微服务集群的运行底座。

## 解决什么问题

- 自动调度和管理大量容器。
- 滚动发布、自动扩缩容、故障自愈。
- 配合服务发现、负载均衡、配置管理。

## 常见组件

- `Kubernetes`：容器编排核心。
- `Helm`：Kubernetes 应用包管理。
- `Kustomize`：Kubernetes 配置管理。
- `Kubernetes Ingress`：流量入口。

## 典型部署链路

```
构建镜像
  -> 推送 Harbor
  -> Helm / Kustomize 渲染配置
  -> kubectl apply 部署到集群
  -> 滚动发布
  -> 监控和告警
```

## Helm 应用包管理

Helm 把一组 K8s 资源打包成可参数化的 Chart，便于多环境复用：

```
helm install my-service ./chart -f values-prod.yaml
```

## 灰度发布与服务网格

大型项目在 K8s 之上还会引入流量治理能力：

- `Istio` / `Linkerd`：服务网格，提供 mTLS、流量镜像、服务间治理。
- `Argo Rollouts`：蓝绿、金丝雀、灰度发布。
- `Envoy`：高性能代理。

普通中小项目可以先不用服务网格，复杂度较高。简单灰度可以用 `Gateway + Nacos` 做路由控制。
