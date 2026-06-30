---
title: 代码质量与开发辅助
---

# 代码质量与开发辅助

## 是什么

代码质量层通过静态扫描、规范检查、覆盖率统计等手段保障代码可维护性；开发辅助插件则减少样板代码、简化构建流程。

## 代码质量组件

- `SonarQube`：代码质量扫描。
- `Checkstyle`：代码规范检查。
- `Spotless`：代码格式化。
- `PMD`：静态代码分析。
- `SpotBugs`：Bug 检查。
- `JaCoCo`：测试覆盖率。
- `ArchUnit`：架构规则测试。

常见质量要求：

```
代码格式统一
禁止明显 Bug
测试覆盖率统计
重复代码检查
安全漏洞扫描
复杂度检查
```

企业项目推荐：

```
SonarQube + JaCoCo + Checkstyle / Spotless
```

## 开发辅助插件

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
