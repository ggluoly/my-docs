# CI/CD 持续集成与交付

CI/CD 负责编译、测试、构建镜像和自动发布，把代码从提交到上线的流程自动化。

## 解决什么问题

- 自动编译、测试、扫描、构建、部署。
- 减少手工发布的出错和耗时。
- 配合代码质量门禁，保证交付质量。

## 常见组件

- `Jenkins`：老牌 CI/CD 工具。
- `GitLab CI`：与 GitLab 集成的流水线。
- `GitHub Actions`：与 GitHub 集成的流水线。
- `Argo CD`：GitOps 部署。
- `Harbor`：镜像仓库。
- `Nexus` / `Artifactory`：Maven 私服 / 制品仓库。

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

## 选型建议

- 用 GitLab 托管代码：优先 `GitLab CI`。
- 用 GitHub 托管代码：优先 `GitHub Actions`。
- 自建、需要复杂插件生态：`Jenkins`。
- 走 GitOps、声明式部署：`Argo CD`。

镜像统一推送到 `Harbor`，Maven 制品统一走 `Nexus / Artifactory`。
