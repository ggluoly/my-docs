---
title: 'WebLogic'
description: 'WebLogic 技术文档，介绍企业级 Java EE 应用服务器、数据源、JNDI、JMS、事务、集群和传统企业项目部署运维。'
outline: [2, 3]
---

# WebLogic

## 是什么

WebLogic 是 Oracle 提供的企业级 Java EE / Jakarta EE 应用服务器，常用于传统大型企业系统的部署和运行。它不只是 Servlet 容器，还提供数据源、JNDI、JMS、事务、集群、管理控制台、安全域等完整企业级能力。

WebLogic 常见于银行、保险、政企和传统大型 Java 项目，尤其是需要厂商支持、集中式运维管理和完整 Java EE 能力的系统。

## 解决什么问题

WebLogic 主要解决这些问题：

```text
企业级 Java 应用部署
数据源统一管理
JNDI 资源查找
JMS 消息服务
JTA 分布式事务
集群和高可用
集中式管理控制台
安全域和权限管理
```

它适合传统企业应用服务器模式，而不是轻量级微服务模式。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| 应用部署 | 支持 war、ear 等传统 Java EE 应用部署 |
| 数据源 | 在控制台统一配置数据库连接池 |
| JNDI | 通过 JNDI 名称查找数据源、JMS 等资源 |
| JMS | 提供企业级消息服务能力 |
| JTA | 支持跨资源事务协调 |
| 集群 | 支持多节点部署、会话复制和负载均衡 |
| 管理控制台 | 提供图形化配置、部署、监控和运维能力 |
| 安全域 | 管理用户、角色、认证和授权策略 |

## 和 Tomcat 的区别

| 对比项 | Tomcat | WebLogic |
| --- | --- | --- |
| 定位 | Servlet / JSP 容器 | 企业级 Java EE 应用服务器 |
| 体量 | 轻量 | 重量级 |
| 能力 | Web 容器能力为主 | 数据源、JMS、JTA、集群、安全域等完整能力 |
| 部署方式 | jar 内嵌、war 外部部署 | 传统 war / ear 应用部署 |
| 适用场景 | Spring Boot、Spring MVC、Java Web | 银行、政企、传统大型 Java EE 项目 |
| 运维复杂度 | 较低 | 较高 |

简单理解：Tomcat 更像轻量 Web 容器，WebLogic 更像完整企业级应用运行平台。

## 典型部署场景

WebLogic 常见于：

- 传统 Java EE 项目。
- 需要部署 ear 包的企业系统。
- 依赖 JNDI 数据源、JMS、JTA 的老项目。
- 银行、保险、政企等对厂商支持要求较高的系统。
- 集中式应用服务器集群运维模式。

对于现代 Spring Boot 微服务，如果没有强 Java EE 依赖，通常不优先选择 WebLogic，而是使用内嵌容器、Docker 和 Kubernetes。

## WebLogic 安装部署详解

### Windows 安装部署

#### WebLogic 下载安装

去 Oracle 官网下载 WebLogic 10.3.6，选择 Generic 版本。各版本选择下载地址：[http://www.oracle.com/technetwork/middleware/weblogic/downloads/wls-main-097127.html](http://www.oracle.com/technetwork/middleware/weblogic/downloads/wls-main-097127.html)。

WebLogic 10.3.6 下载地址：[http://download.oracle.com/otn/nt/middleware/11g/wls/1036/wls1036_generic.jar](http://download.oracle.com/otn/nt/middleware/11g/wls/1036/wls1036_generic.jar)。

下载完成后，打开命令提示符，在命令提示符下使用下面命令安装 64 位的 WebLogic：

```sh
java -D64 -jar wls1036_generic.jar
```

#### 启动安装，直接点击下一步

![WebLogic 安装向导启动](/images/deploy/weblogic/windows-weblogic-01.png)

#### 创建新的中间件主目录

选择“创建新的中间件主目录”，选择中间件主目录，建议除 C 盘外的盘符，避免占用系统盘空间，点击“下一步”。

![创建新的中间件主目录](/images/deploy/weblogic/windows-weblogic-02.png)

#### 注册安全更新

注册安全更新这一步，直接点击下一步。

![注册安全更新](/images/deploy/weblogic/windows-weblogic-03.png)

#### 连接失败时继续安装

如果弹出连接失败，选择我希望不接收，点击继续。

![连接失败时继续安装](/images/deploy/weblogic/windows-weblogic-04.png)

#### 选择典型安装

默认选择“典型”安装，点击下一步。

![选择典型安装](/images/deploy/weblogic/windows-weblogic-05.png)

#### 选择 JDK 与产品安装目录

选择 JDK 目录，默认产品安装目录，点击“下一步”。

![选择 JDK 与产品安装目录](/images/deploy/weblogic/windows-weblogic-06.png)

#### 选择安装用户

默认选择所有用户，下一步。

![选择安装用户](/images/deploy/weblogic/windows-weblogic-07.png)

#### 查看安装概要

安装概要，下一步。

![安装概要](/images/deploy/weblogic/windows-weblogic-08.png)

#### 开始安装

![开始安装 WebLogic](/images/deploy/weblogic/windows-weblogic-09.png)

#### 安装完成并运行 Quickstart

如果需要直接创建 WebLogic 域，选择“运行 Quickstart”，点击“完成”按钮，进入快速启动页面；如果想要稍后再进行创建，取消“运行 Quickstart”，点击“完成”按钮，安装完成。

![安装完成并运行 Quickstart](/images/deploy/weblogic/windows-weblogic-10.png)

#### 进入 Fusion Middleware 配置向导

点击“Ggetting started with WebLogic Server”，进入 Fusion Middleware 配置向导。

![进入 Fusion Middleware 配置向导](/images/deploy/weblogic/windows-weblogic-11.png)

#### 创建新的 WebLogic 域

选择创建新的 WebLogic 域。

![创建新的 WebLogic 域](/images/deploy/weblogic/windows-weblogic-12.png)

#### 配置向导下一步

直接进入下一步。

![配置向导下一步](/images/deploy/weblogic/windows-weblogic-13.png)

#### 输入域名称和位置

输入域的名称和位置，直接默认即可，点击“下一步”。

![输入域名称和位置](/images/deploy/weblogic/windows-weblogic-14.png)

#### 配置管理员用户名和密码

配置管理员用户名、密码，之后启动 WebLogic 和登录控制台需要用到，输入后点击“下一步”。用户名默认：`weblogic`。口令要求最少八位。

![配置管理员用户名和密码](/images/deploy/weblogic/windows-weblogic-15.png)

![配置管理员密码](/images/deploy/weblogic/windows-weblogic-16.png)

#### 选择生产模式和 JDK

选择“生产模式”，JDK 最好选择 WebLogic 自带 JDK，点击“下一步”。

![选择生产模式和 JDK](/images/deploy/weblogic/windows-weblogic-17.png)

#### 选择可选配置项

选择“管理服务器”、“受管服务器、集群和计算机”，点击“下一步”。

![选择可选配置项](/images/deploy/weblogic/windows-weblogic-18.png)

#### 配置管理服务器

名称默认即可，选择本地监听地址（本机 IP 地址），端口号默认 `7001`，点击“下一步”。

![配置管理服务器](/images/deploy/weblogic/windows-weblogic-19.png)

#### 跳过受管服务器配置

无需配置受管服务器，直接点击“下一步”。

![无需配置受管服务器](/images/deploy/weblogic/windows-weblogic-20.png)

#### 跳过集群配置

无需配置集群，直接点击下一步。

![无需配置集群](/images/deploy/weblogic/windows-weblogic-21.png)

#### 跳过计算机配置

无需配置计算机，直接点击下一步。

![无需配置计算机](/images/deploy/weblogic/windows-weblogic-22.png)

#### 开始创建域

![开始创建域](/images/deploy/weblogic/windows-weblogic-23.png)

#### 创建域完成

创建域完成，点击完成。

![创建域完成](/images/deploy/weblogic/windows-weblogic-24.png)

#### WebLogic 配置

#### 启动 WebLogic

进入 `C:\Oracle\Middleware\user_projects\domains\base_domain`，双击 `startWebLogic.cmd`，启动 WebLogic。

![启动 startWebLogic.cmd](/images/deploy/weblogic/windows-weblogic-25.png)

#### 输入用户名和密码

输入刚才设置的 WebLogic 用户名和密码。

![输入 WebLogic 用户名和密码](/images/deploy/weblogic/windows-weblogic-26.png)

#### 访问控制台

打开浏览器输入控制台 URL，进入控制台进行管理。

```text
http://192.168.204.143:7001/console/
```

![WebLogic 控制台](/images/deploy/weblogic/windows-weblogic-27.png)

#### 控制台部署 WAR 包

#### 锁定并编辑

点击锁定并编辑。

![锁定并编辑](/images/deploy/weblogic/windows-weblogic-28.png)

#### 进入部署安装

选择部署，进一步点击右边的安装。

![选择部署并点击安装](/images/deploy/weblogic/windows-weblogic-29.png)

#### 进入文件上传界面

点击上传文件，进入文件上传界面，选择要上传的 WAR 包。

![进入文件上传界面](/images/deploy/weblogic/windows-weblogic-30.png)

#### 选择 WAR 包

选择要上传的 WAR 包。

![选择 WAR 包](/images/deploy/weblogic/windows-weblogic-31.png)

#### 选择部署路径

选择路径，下一步。

![选择部署路径](/images/deploy/weblogic/windows-weblogic-32.png)

#### 安装为应用程序

选择将此部署安装为应用程序。

![选择安装为应用程序](/images/deploy/weblogic/windows-weblogic-33.png)

#### 完成部署

![完成部署](/images/deploy/weblogic/windows-weblogic-34.png)

#### 激活更改并启动服务

选择激活更改后，状态变更为准备就绪，启动该服务。

![激活更改并启动服务](/images/deploy/weblogic/windows-weblogic-35.png)

#### 访问 URL 验证部署结果

访问 URL，验证部署结果。

![访问应用 URL 验证部署结果](/images/deploy/weblogic/windows-weblogic-36.png)

### Linux 安装部署

#### WebLogic 安装指南

在进行 WebLogic 安装之前，必须确定服务器上已经安装了 Java JDK（Java SE 8 或以上版本）。WebLogic 支持在 Windows、Linux 和 UNIX 系统上运行，以下将以 Linux 环境为例，演示如何安装和配置 WebLogic。

#### 环境准备

| 环境要求 | 配置项 |
| --- | --- |
| 操作系统 | Linux（CentOS 7 或更高版本） |
| JDK 版本 | Java SE Development Kit 8 或以上 |
| 硬件要求 | 至少 4GB RAM，20GB 硬盘空间 |
| 数据库（可选） | Oracle Database 12c 或更高版本 |

#### 下载与安装

步骤一：下载 WebLogic 安装包。

1. 访问 Oracle 官网下载 WebLogic Server 的安装包。
2. 选择适合的版本并下载到服务器指定目录。

步骤二：解压并安装 WebLogic。

解压安装包后运行 `java -jar` 命令开始安装。以版本 12.2.1.4 为例，安装步骤如下：

```bash
# 解压安装包
unzip fmw_12.2.1.4.0_wls_quick_Disk1_1of1.zip

# 进入安装目录
cd fmw_12.2.1.4.0_wls_quick_Disk1_1of1

# 开始安装
java -jar fmw_12.2.1.4.0_wls_quick.jar
```

#### 创建 WebLogic 域

WebLogic 的核心管理单元是域（Domain）。域中包含管理服务器和若干受控服务器。以下是创建 WebLogic 域的步骤：

```bash
# 设置 JAVA_HOME 环境变量
export JAVA_HOME=/usr/java/jdk1.8.0_281
export PATH=$JAVA_HOME/bin:$PATH

# 使用配置向导创建新域
cd /opt/oracle/middleware/oracle_home/oracle_common/common/bin
./config.sh
```

在 WebLogic Configuration Wizard 中，选择“Create a new domain”并按照向导提示完成域的创建配置。

#### 启动与配置 WebLogic

步骤一：启动管理服务器。

在新域目录中，执行以下命令启动管理服务器：

```bash
cd /opt/oracle/middleware/user_projects/domains/base_domain/bin
./startWebLogic.sh
```

当管理服务器启动后，可以通过浏览器访问控制台，默认地址为：`http://localhost:7001/console`。通过该控制台，可以监控和管理 WebLogic 服务器的运行状态。

步骤二：配置受控服务器与集群。

在管理控制台中，可以通过“Environment -> Servers”选项添加新的受控服务器，并将它们添加到同一个集群中，实现负载均衡和高可用性配置。

#### WebLogic 实例部署：应用部署演示

在 WebLogic 中部署 Java 应用程序较为简便，以下将演示一个简单的 Java Web 应用的部署流程。

#### 编写一个简单的 Java Web 应用

创建一个名为 `SampleApp` 的 Java Web 应用项目，并在其中添加一个 Servlet：

```java
// SampleServlet.java
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/hello")
public class SampleServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.getWriter().println("Hello, WebLogic!");
    }
}
```

将此应用打包成 `SampleApp.war` 文件。

#### 在 WebLogic 中部署应用

| 步骤 | 操作说明 |
| --- | --- |
| 登录管理控制台 | 使用 `http://localhost:7001/console` 访问控制台，输入用户名和密码。 |
| 选择部署选项 | 在左侧导航栏中选择“Deployments”，点击“Install”按钮。 |
| 上传应用 | 选择上传 `SampleApp.war` 文件，选择“Install as application”选项。 |
| 启动应用 | 安装完成后，勾选应用并点击“Start”按钮。 |

成功启动应用后，可以通过浏览器访问 `http://localhost:7001/SampleApp/hello` 验证应用部署是否成功。

#### 配置与管理 WebLogic

WebLogic Server 提供了丰富的配置选项，以下介绍一些常用的配置管理方法。

#### 数据源配置

在 WebLogic 中可以通过数据源（Data Source）配置与数据库的连接：

| 步骤 | 操作说明 |
| --- | --- |
| 添加数据源 | 在管理控制台中选择“Services -> Data Sources”，点击“New”按钮。 |
| 配置数据库信息 | 输入数据库的 URL、驱动程序、用户名和密码等信息。 |
| 测试并保存连接 | 通过“Test Configuration”按钮测试连接，确认后保存。 |

#### 配置 JMS 服务

WebLogic 支持 Java Message Service（JMS），用于异步消息传递。以下是 JMS 服务配置的简单步骤：

1. 在控制台选择“Services -> Messaging -> JMS Servers”。
2. 新建一个 JMS Server 并关联至受控服务器。
3. 创建连接工厂、队列或主题以支持应用消息的发布与订阅。

## 数据源与 JNDI

传统 WebLogic 项目经常把数据库连接池配置在 WebLogic 控制台中，然后应用通过 JNDI 名称查找数据源。

典型流程：

```text
WebLogic 控制台配置 DataSource
  -> 绑定 JNDI 名称
  -> 应用通过 JNDI 查找 DataSource
  -> 获取数据库连接
```

这种方式便于运维统一管理数据库连接池，但应用对容器环境有依赖，迁移到 Spring Boot 独立运行时需要重新梳理配置。

## 集群与高可用

WebLogic 支持集群部署，可以实现应用多节点运行、请求负载均衡、会话复制和故障转移。

常见关注点包括：

- 管理服务器和受管服务器的关系。
- 应用部署到单节点还是集群。
- Session 是否需要复制或外部化。
- 数据源、JMS、事务资源如何配置高可用。
- 节点故障后流量如何切换。

## 传统项目迁移注意点

从 WebLogic 迁移到 Spring Boot 或云原生架构时，需要重点关注：

- JNDI 数据源改为应用配置或配置中心管理。
- JMS 是否替换为 RocketMQ、Kafka、Pulsar 等消息中间件。
- JTA 分布式事务是否改为本地事务 + 消息最终一致性。
- ear / war 部署模式是否改为 jar 和容器镜像。
- Session 是否改为 Redis 或 Token 方案。
- 依赖的 Java EE API 是否需要替换或适配。

## 选型建议

```text
新 Spring Boot 微服务：不优先选 WebLogic
传统 Java EE 项目维护：继续按 WebLogic 规范运维
需要厂商支持和集中式应用服务器治理：可评估 WebLogic
云原生新项目：优先 Docker / Kubernetes / 内嵌容器
```

如果系统没有明确的 Java EE 依赖，使用 [Tomcat](./tomcat) 或 Spring Boot 内嵌容器通常更轻量、部署更简单。

## 面试关注点

WebLogic 常见面试点包括：

- WebLogic 是什么，和 Tomcat 有什么区别。
- WebLogic 为什么叫企业级应用服务器。
- JNDI 数据源解决什么问题。
- WebLogic 集群如何做高可用。
- 传统 WebLogic 项目迁移到 Spring Boot 要注意什么。
- 为什么新项目一般不优先选择 WebLogic。

相关面试题可参考 [JavaWeb 面试题](/interview/java-web)。
