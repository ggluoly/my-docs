---
title: 工程能力
---

# 工程能力

工程能力层覆盖业务之外、但企业项目几乎都会用到的配套能力：文件存储、定时任务、接口文档、测试和代码质量。这些内容容易被忽略，但缺了它们项目很难长期维护。

## 本栏组件

| 组件 | 类别 | 主要作用 |
| --- | --- | --- |
| [MinIO / OSS](./minio) | 文件存储 | 图片、附件、合同、Excel、PDF 等文件存储 |
| [XXL-Job](./xxl-job) | 定时任务 | 分布式任务调度，定时执行、分片执行 |
| [Knife4j / Springdoc](./api-doc) | 接口文档 | OpenAPI 文档、前后端联调、接口调试 |
| [JUnit 5 / Testcontainers](./testing) | 测试 | 单元测试、集成测试、契约测试 |
| [SonarQube / JaCoCo](./quality) | 代码质量 | 代码扫描、覆盖率、规范检查 |

## 开发辅助插件

除上述组件外，企业 Java 项目还常用一批开发辅助插件：

- `Lombok`：减少 getter、setter、构造器代码。
- `MapStruct`：DTO、Entity、VO 转换。
- `Maven Compiler Plugin`：Java 编译配置。
- `Spring Boot Maven Plugin`：Spring Boot 打包。
- `Maven Surefire Plugin`：单元测试执行。
- `Maven Failsafe Plugin`：集成测试执行。
- `Flatten Maven Plugin`：发布 POM 优化。
- `Jib`：构建 Docker 镜像。
- `Docker Maven Plugin`：构建 Docker 镜像。
- `Git Commit Id Plugin`：生成 Git 版本信息。

企业 Java 项目常见组合：

```
Lombok
MapStruct
Spring Boot Maven Plugin
Maven Compiler Plugin
JaCoCo
Surefire
Docker / Jib
```
