---
title: 'Spring Boot 面试题'
description: 'Spring Boot 面试题整理，覆盖自动配置、Starter、配置加载、热部署、JPA 和工程实践常见问题。'
outline: [2, 3]
---

# Spring Boot 面试题

本页整理 Spring Boot 高频面试题，覆盖自动配置、Starter、配置文件、热部署和 JPA / Hibernate 对比。涉及 `bootstrap.yml` 等旧机制时，会结合当前 Spring Boot / Spring Cloud 版本说明。

## 自动配置与 Starter

### Spring Boot 自动配置原理是什么？

Spring Boot 通过自动配置类、条件注解和配置属性，在满足条件时自动创建 Bean。开发者引入 starter 后，Boot 根据 classpath、配置项和条件注解决定哪些配置生效。

#### 常见追问

- 条件注解有哪些？
  Spring 里的条件注解主要用于按条件决定某个 Bean 是否注册到容器中。Spring 提供了 `@Conditional` 作为底层条件注解，Spring Boot 基于它封装了大量 `@ConditionalOn...` 注解，主要用于自动配置和按需装配 Bean。
    核心注解是 `@Conditional`，它需要配合 `Condition` 接口使用，根据 `matches()` 方法返回值决定是否生效。
    Spring 本身常见的还有 `@Profile`，可以根据不同环境，比如 `dev`、`test`、`prod`，决定 Bean 是否加载。
    Spring Boot 在 `@Conditional` 基础上扩展了很多常用条件注解，比如：
    `@ConditionalOnClass`：classpath 下存在某个类时生效。
    `@ConditionalOnMissingClass`：classpath 下不存在某个类时生效。
    `@ConditionalOnBean`：容器中存在某个 Bean 时生效。
    `@ConditionalOnMissingBean`：容器中不存在某个 Bean 时生效，自动配置里很常用。
    `@ConditionalOnProperty`：配置文件中某个属性满足条件时生效。
    `@ConditionalOnResource`：存在某个资源文件时生效。
    `@ConditionalOnWebApplication`：当前是 Web 应用时生效。
    `@ConditionalOnNotWebApplication`：当前不是 Web 应用时生效。
    `@ConditionalOnExpression`：根据 SpEL 表达式判断是否生效。
    `@ConditionalOnJava`：根据 Java 版本判断是否生效。
- 自动配置为什么有时不生效？
  自动配置不生效，核心原因通常是自动配置类没加载、条件注解不满足、被排除、已有自定义 Bean、扫描范围或配置项有问题。

#### 关联文档

- [Spring Boot](/framework/spring-boot)

### @SpringBootApplication 包含哪些注解？

`@SpringBootApplication` 是组合注解，核心包括 `@SpringBootConfiguration`、`@EnableAutoConfiguration` 和 `@ComponentScan`。它表示当前类是配置类，启用自动配置，并扫描当前包及子包下的组件。

#### 常见追问

- 为什么启动类建议放在根包？
  启动类建议放在根包，主要是因为 @SpringBootApplication 里包含了 @ComponentScan，默认扫描启动类所在包及其子包。
- `@EnableAutoConfiguration` 做了什么？
  开启 Spring Boot 自动配置。通过 @Import(AutoConfigurationImportSelector.class) 导入自动配置类。
  本质上就是：根据 classpath、已有 Bean、配置属性等条件，按需把 Spring Boot 提供的默认配置加载到容器中。
- 如何排除某个自动配置？
  可以通过三种常见方式排除自动配置：
  1. 在启动类上使用 `@SpringBootApplication(exclude = XxxAutoConfiguration.class)`，因为它里面包含了 `@EnableAutoConfiguration`。
  2. 直接使用 `@EnableAutoConfiguration(exclude = XxxAutoConfiguration.class)`。
  3. 在配置文件中配置：`spring.autoconfigure.exclude=xxx.XxxAutoConfiguration`。
  如果只是排除一个或少量自动配置，面试里通常说第一种最常用；如果不方便改代码，或者要根据环境配置，使用配置文件方式更灵活。

### Starter 机制解决什么问题？

Starter 把某类功能所需的依赖和自动配置打包成统一入口，减少手动引入依赖和配置的成本。比如 Web、Validation、Actuator 都有对应 starter。

#### 常见追问

- 自定义 starter 怎么做？
  自定义 starter 一般分两部分：一个是 `starter` 依赖包，一个是 `autoconfigure` 自动配置包。
  核心步骤是：先定义配置属性类，用 `@ConfigurationProperties` 绑定配置文件参数；再定义自动配置类，使用条件注解按条件创建默认 Bean，并通过 `@EnableConfigurationProperties(XxxProperties.class)` 注册属性类。Starter 内部的属性类不能依赖业务项目的组件扫描发现。
  Spring Boot 2.7+ 的自动配置类通常使用 `@AutoConfiguration`，并在 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 中逐行注册自动配置类全限定名；Spring Boot 3 必须使用这种方式。Spring Boot 2.6 及以前才使用 `META-INF/spring.factories` 中的 `EnableAutoConfiguration` 键注册。
  最后 starter 模块只负责引入 autoconfigure 和相关第三方依赖，业务项目引入 starter 后，Spring Boot 启动时就会自动加载配置。
- starter 和自动配置是什么关系？
  starter 本质上是一个依赖聚合包，主要负责把需要的 jar 包和 autoconfigure 模块引进来，本身一般不写核心逻辑。
  自动配置是 starter 生效的核心，它里面定义了配置类、条件注解和默认 Bean 创建逻辑。
  业务项目引入 starter 后，Spring Boot 会通过自动配置机制加载对应的 AutoConfiguration，再根据 classpath、配置项、已有 Bean 等条件决定是否生效。
  所以关系就是：starter 负责“引入依赖”，自动配置负责“按条件装配 Bean”，两者配合实现开箱即用。
- 为什么 starter 通常不写业务代码？
  因为它的定位是依赖管理和自动装配入口，不应该承载具体业务逻辑。

#### 关联文档

- [Spring Boot](/framework/spring-boot)

## 配置文件

### 配置文件加载顺序为什么重要？

不同环境、命令行参数、环境变量和配置文件有优先级。理解加载顺序可以排查配置不生效、线上环境覆盖错误、多环境 profile 混乱等问题。

#### 常见追问

- 命令行参数和配置文件谁优先？
  命令行参数优先级更高。
  除非手动关闭命令行参数解析，比如设置 SpringApplication.setAddCommandLineProperties(false)，否则默认就是命令行参数优先。
- profile 怎么激活？
  Profile 常见激活方式有几种：
  1. 配置文件中指定：`spring.profiles.active=dev`，或者 yml 写 `spring.profiles.active: dev`。
  2. 命令行参数指定：`java -jar app.jar --spring.profiles.active=prod`。
  3. JVM 参数指定：`-Dspring.profiles.active=test`。
  4. 环境变量指定：`SPRING_PROFILES_ACTIVE=prod`。
  5. 代码中指定：先创建 `SpringApplication` 实例，再调用 `setAdditionalProfiles("dev")`，例如：
  ```java
  SpringApplication application = new SpringApplication(App.class);
  application.setAdditionalProfiles("dev");
  application.run(args);
  ```
  启动后，Spring Boot 会加载对应的 `application-{profile}.properties` 或 `application-{profile}.yml` 配置，比如激活 `dev` 就会加载 `application-dev.yml`。
- 为什么线上配置不要打死在 jar 包里？
  主要是为了把代码和环境配置解耦。
  同一份 jar 可能要部署到 dev、test、prod，不同环境的数据库、Redis、MQ、开关参数都不一样，如果写死在包里，每次改配置都要重新打包发版，风险和成本都很高。
  线上配置里可能有账号、密码、密钥这类敏感信息，放进 jar 容易泄露，也不方便权限管控。
  更合理的做法是通过外部配置文件、环境变量、启动参数，或者配置中心来管理，这样配置变更、回滚和多环境部署都会更灵活。

#### 关联文档

- [Spring Boot](/framework/spring-boot)

### bootstrap.yml 和 application.yml 有什么区别？

`application.yml` 是 Spring Boot 应用配置文件，用于配置端口、数据源、日志、业务参数等。
`bootstrap.yml` 常见于早期 Spring Cloud，用于更早阶段加载配置中心、注册中心等引导配置。新版本 Spring Cloud 中 bootstrap 机制不一定默认启用，很多项目改用 `spring.config.import` 引入配置中心。

#### 常见追问

- 为什么配置中心配置要更早加载？
  配置中心的连接信息必须在拉取远程 Config Data 前可用；远程配置如果决定数据源、Redis、MQ、日志级别等基础 Bean 的属性，就需要在应用上下文创建这些 Bean 前进入 `Environment`。
- 新版 Spring Cloud 如何导入 Nacos 配置？
  Spring Boot 2.4 引入了 `spring.config.import` Config Data 机制；Spring Cloud 2020.0 起，bootstrap 上下文默认不再启用。这是两个独立的版本边界。
  新版本 Spring Cloud Alibaba 的 Nacos Config starter 支持 `nacos:` 导入时，可优先在 `application.yml` 中使用 `spring.config.import`；较老的 starter 版本可能仍需使用 bootstrap 机制，因此需要先确认 Spring Boot、Spring Cloud 和 Spring Cloud Alibaba 的兼容版本。
  先引入依赖：`spring-cloud-starter-alibaba-nacos-config`。
  然后在 `application.yml` 里配置：
  ```yaml
  spring:
    application:
      name: order-service
    cloud:
      nacos:
        config:
          server-addr: 127.0.0.1:8848
          namespace: dev
          group: DEFAULT_GROUP
          file-extension: yaml
    config:
      import:
        - optional:nacos:order-service.yaml
  ```
  `optional:nacos:order-service.yaml` 表示从 Nacos 拉取这个配置，`optional` 表示配置不存在时不阻塞启动；如果希望配置不存在就启动失败，可以去掉 `optional`。
  老版本通常放在 `bootstrap.yml` 里，因为 bootstrap 阶段会更早加载配置；新版推荐使用 `spring.config.import`。如果当前 Spring Cloud 版本仍要使用老的 `bootstrap.yml` 方式，需要额外引入 bootstrap 支持。
- bootstrap 配置不生效怎么排查？
  可以按这几个方向排查：
  1. 分开确认版本边界：Spring Boot 2.4 引入 `spring.config.import`；Spring Cloud 2020.0 起默认不再启用 bootstrap 上下文。如果当前 Spring Cloud 版本仍要使用 `bootstrap.yml`，需要引入 `spring-cloud-starter-bootstrap`；若对应 Spring Cloud Alibaba Nacos starter 支持 Config Data，优先改用 `spring.config.import`。
  2. 确认文件名和位置是否正确，应该放在 `src/main/resources/bootstrap.yml` 或 `bootstrap.properties`。
  3. 确认依赖是否引入，比如 Nacos 要有 `spring-cloud-starter-alibaba-nacos-config`。
  4. 看配置项层级是否写对，比如 `spring.cloud.nacos.config.server-addr`、`namespace`、`group`、`file-extension`。
  5. 检查 `spring.application.name` 是否在 bootstrap 阶段能读到，因为默认 DataId 通常依赖应用名。
  6. 看启动日志里有没有加载 bootstrap 上下文、有没有连接 Nacos、有没有拉取到对应 DataId。
  7. 确认 Nacos 上的 DataId、Group、Namespace 和本地配置完全一致，特别是 namespace 要用 ID，不是名称。
  8. 如果本地 `application.yml` 和远程配置有同名项，还要确认配置优先级，避免以为 bootstrap 没生效，其实是被覆盖了。

### properties 和 yml 有什么区别？

`.properties` 使用 key-value 扁平写法，简单直接；`.yml` 使用缩进表示层级，结构更清晰，适合复杂配置。需要注意缩进和空格敏感问题。传统 `@PropertySource` 对 YAML 支持有限，通常更适合加载 properties 文件。

#### 常见追问

- yml 缩进错误会导致什么问题？
  **启动直接失败**：如果格式不合法，Spring Boot 解析配置时会报错，比如 ScannerException、ParserException。
  **配置不生效**：如果语法没报错，但层级缩错了，配置会被解析到错误的位置，Spring 就读不到对应属性，比如 Nacos、数据源、端口等配置都可能不生效。 所以排查配置不生效时，除了看 key 写没写对，也要重点看缩进层级，一般建议统一用空格，不要用 Tab。
- 多环境 profile 怎么写？
  多环境 profile 常见有两种写法。
  第一种是拆文件：
  ```yaml
  # application.yml
  spring:
    profiles:
      active: dev
  ```
  然后分别建：
  ```text
  application-dev.yml
  application-test.yml
  application-prod.yml
  ```
  启动时也可以通过参数指定：
  ```bash
  java -jar app.jar --spring.profiles.active=prod
  ```
  第二种是在一个 `application.yml` 里用多文档分隔：
  ```yaml
  spring:
    profiles:
      active: dev
  ---
  spring:
    config:
      activate:
        on-profile: dev
  server:
    port: 8081
  ---
  spring:
    config:
      activate:
        on-profile: prod
  server:
    port: 8082
  ```
  Spring Boot 2.4+ 的 Config Data 模型使用 `spring.config.activate.on-profile`。旧的 `spring.profiles: dev` 多文档激活写法应迁移；只有显式切回 legacy config processing 时才保留旧行为。实际项目里更推荐拆成 `application-dev.yml`、`application-prod.yml`，结构更清晰。
- 配置绑定到对象用什么注解？
  配置绑定到对象一般用 `@ConfigurationProperties`。
  比如把配置按前缀绑定到一个 Java Bean 上：
  ```java
  @Component
  @ConfigurationProperties(prefix = "app")
  public class AppProperties {
      private String name;
      private Integer timeout;
      // getter、setter
  }
  ```
  然后配置里写：
  ```yaml
  app:
    name: demo
    timeout: 3000
  ```
  如果不用 `@Component`，也可以在配置类上用 `@EnableConfigurationProperties(AppProperties.class)` 来启用。
  简单单个值也可以用 `@Value`，但如果是一组配置，更推荐 `@ConfigurationProperties`，类型安全，也更方便维护。

## 工程实践

### Spring Boot 热部署方式有哪些？

常见方式包括 Spring Boot DevTools、IDE 自动编译配合应用重启、JRebel 等。DevTools 会监听 classpath 变化并触发快速重启，适合开发环境；生产环境不应该启用热部署能力。

#### 常见追问

- DevTools 是热替换还是重启？
  DevTools 主要是自动重启，不是真正意义上的热替换。
  它监控 classpath 下的文件变化，代码改动后会触发应用上下文重启，底层通过两个 ClassLoader 加快重启速度：第三方依赖放在 base ClassLoader，业务代码放在 restart ClassLoader，重启时主要重新加载业务代码。
  如果只是页面、静态资源这类变化，可能不会完整重启，可以配合 LiveReload 刷新浏览器。
  所以面试里可以说：DevTools 不是 JVM 级别的热替换，核心能力是自动重启，只是比手动重启更快。
- 为什么生产不能使用 DevTools？
  生产环境不建议使用 DevTools，主要有几个原因：
  1. 它会监控 classpath 变化并触发自动重启，生产环境这样不稳定，可能影响服务可用性。
  2. DevTools 会开启一些开发期特性，比如禁用模板缓存、静态资源缓存，影响性能。
  3. 它包含 LiveReload、远程调试/远程重启相关能力，如果配置不当有安全风险。
  4. 它本身就是开发辅助工具，不是为生产运行设计的。
  所以一般在 Maven 或 Gradle 里把它标记为可选依赖或 developmentOnly，打生产包时不要带进去。
- JRebel 和 DevTools 有什么区别？
  JRebel 和 DevTools 最大区别是：**JRebel 更接近真正的热加载，DevTools 主要是自动重启**。
  DevTools 检测到代码变化后，会重启 Spring 应用上下文，只是通过 ClassLoader 机制让重启更快，本质还是重启。
  JRebel 是在 JVM 运行过程中重新加载变更的类和资源，很多情况下不需要重启应用，比如方法体、类结构、Spring Bean 等变化都可以直接生效。
  另外，DevTools 是 Spring Boot 官方提供的开发工具，免费、简单；JRebel 是商业工具，功能更强，对大型项目的开发效率提升更明显。
  所以面试里可以说：DevTools 是轻量级开发辅助，靠快速重启提升效率；JRebel 是更强的热加载工具，尽量避免重启。

### JPA 和 Hibernate 有什么区别？

JPA 是 Java 持久化 API 规范，定义 ORM 操作接口和注解；
Hibernate 是 JPA 的一种实现，也提供了自身扩展能力。
简单说，JPA 是规范，Hibernate 是实现。项目中使用 Spring Data JPA 时，底层常见实现就是 Hibernate。

#### 常见追问

- JPA 和 MyBatis 怎么选？
  JPA 和 MyBatis 主要看业务复杂度和团队习惯来选。
  如果是领域模型比较清晰、表关系相对规范、CRUD 比较多的系统，JPA 更合适，它面向对象建模，能减少大量 SQL 和基础代码。
  如果是 SQL 比较复杂、报表多、性能调优要求高、需要精细控制 SQL 的系统，MyBatis 更合适，因为 SQL 完全可控，排查和优化也更直接。
  从学习和维护角度看，MyBatis 更贴近 SQL，团队上手快；JPA 抽象更高，但对实体关系、懒加载、事务、缓存这些机制理解不到位时，容易踩坑。
  所以实际项目里，一般简单业务、领域驱动倾向选 JPA；复杂查询和强 SQL 控制倾向选 MyBatis。
- Hibernate 为什么需要无参构造？
  Hibernate 要求实体类有无参构造，主要是因为它需要通过反射来创建实体对象。
  从数据库查询出数据后，Hibernate 会先调用无参构造创建对象，再把字段值填充进去；如果没有无参构造，它就不知道该传哪些参数来实例化。
  另外，Hibernate 的懒加载代理也依赖实体可以被正常构造出来。
  严格来说，JPA 规范要求实体类必须提供 public 或 protected 的无参构造；实际项目里一般写 protected 无参构造，既满足框架要求，又避免业务代码随意创建不完整对象。
- ORM 框架有什么优缺点？
  ORM 框架的优点主要是能减少重复的 JDBC 代码，比如连接处理、参数绑定、结果集映射这些都由框架完成，开发效率更高。
  它还能把表和对象做映射，让代码更面向对象，配合事务、缓存、懒加载等机制，常规 CRUD 开发会比较方便。
  缺点是抽象层变厚了，复杂 SQL、不规则查询、批量操作或者性能调优时可能不够直观，生成的 SQL 如果不了解，容易出现慢查询、N+1 查询这类问题。
  另外，ORM 有一定学习成本，实体关系、级联、懒加载、缓存用不好，反而会增加排查难度。
  所以 ORM 适合提高常规业务开发效率，但对复杂查询和高性能场景，还是要关注 SQL 本身，必要时手写 SQL。

#### 关联文档

- [Hibernate 面试题](./hibernate)
- [MyBatis 面试题](./mybatis)
