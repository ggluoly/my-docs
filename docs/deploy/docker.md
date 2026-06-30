# Docker 容器化

Docker 把应用和它的运行环境（JDK、依赖、配置）一起打包成标准镜像，做到"一次构建，到处运行"，是微服务部署的基础。

## 解决什么问题

- 消除"在我机器上能跑"的环境差异。
- 把 Spring Boot 应用打包成可移植的镜像。
- 为 Kubernetes 编排提供标准化的部署单元。

## 常见组件

- `Docker`：容器化运行时。
- `Docker Compose`：本地或小规模多容器编排。

## 典型 Dockerfile

Spring Boot 应用的标准镜像构建：

```dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 用 Jib 免 Dockerfile 构建

企业项目常用 `Jib` 直接通过 Maven 构建镜像，不需要本地 Docker 守护进程：

```xml
google-cloud-tools-jib-maven-plugin
```

## Docker Compose 本地编排

本地把微服务和依赖（MySQL、Redis、Nacos）一起拉起：

```
docker compose up -d
```

适合本地开发联调和小规模部署，生产环境再切换到 Kubernetes。
