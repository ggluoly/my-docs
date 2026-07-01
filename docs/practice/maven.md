---
title: 'Maven 与依赖管理'
description: 'Maven 与依赖管理文档，介绍多模块项目、依赖版本治理、构建生命周期和 Java 后端工程组织实践。'
---

# Maven 与依赖管理

> 本页内容为新增的工程实践部分，不来自原《Spring 技术套件》文档。

## 是什么

Maven 是 Java 最主流的构建工具，负责依赖管理、编译、测试、打包和发布。Spring Boot 项目默认用 Maven 或 Gradle 组织，企业项目以 Maven 多模块居多。

## 解决什么问题

```
统一管理第三方依赖版本
处理依赖之间的传递与冲突
把项目拆成多个可复用模块
标准化编译、测试、打包流程
区分开发、测试、生产环境配置
```

## 核心概念

| 概念 | 作用 |
| --- | --- |
| `groupId / artifactId / version` | 唯一标识一个构件（GAV 坐标） |
| `dependencies` | 声明项目依赖 |
| `dependencyManagement` | 统一管理依赖版本，不实际引入 |
| `BOM` | 一组依赖的版本清单，用 `import` 引入 |
| `parent` | 父 POM，子模块继承其配置 |
| `profile` | 按环境激活不同配置 |
| `scope` | 依赖作用域（compile / test / provided 等） |

## 多模块结构

企业项目常见的分模块方式：

```
my-project
├── pom.xml              # 父 POM，聚合 + 版本管理
├── common              # 通用工具、常量、基础类
├── api                  # 对外接口定义（DTO、Feign 接口）
├── service              # 业务逻辑
└── web                  # 启动入口、Controller
```

父 POM 用 `<modules>` 聚合，用 `<dependencyManagement>` 统一版本，子模块只声明 GAV 不写版本号。

## 依赖仲裁

当多个依赖引入了同一个库的不同版本时，Maven 按两条规则选择：

```
1. 路径最短优先：离当前项目越近的版本胜出
2. 路径相同则先声明优先
```

排查冲突常用命令：

```sh
mvn dependency:tree
mvn dependency:tree -Dincludes=com.fasterxml.jackson.core:jackson-databind
```

## BOM 统一版本

Spring Boot 本身就是一个大 BOM。引入后大量依赖不用再写版本号：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
```

Spring Cloud / Spring Cloud Alibaba 用 `import` 方式引入 BOM：

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## 常用插件

| 插件 | 作用 |
| --- | --- |
| `spring-boot-maven-plugin` | 打可执行 fat jar、构建镜像 |
| `maven-compiler-plugin` | 指定 Java 版本、编译参数 |
| `maven-surefire-plugin` | 执行单元测试 |
| `maven-failsafe-plugin` | 执行集成测试 |
| `flatten-maven-plugin` | 发布时优化 POM |
| `git-commit-id-plugin` | 生成 Git 版本信息 |
| `jib-maven-plugin` | 不依赖 Docker 构建镜像 |

## 选型建议

- 大多数 Spring 项目用 Maven，生态最成熟、IDE 支持最好。
- 需要更灵活构建逻辑、增量编译快的大型项目可考虑 Gradle。
- 多团队协作时，务必用 BOM + `dependencyManagement` 统一版本，避免各模块各自为政。
- 依赖冲突先用 `dependency:tree` 定位，再用 `<exclusions>` 排除或在 `dependencyManagement` 中锁定版本。
