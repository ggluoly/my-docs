---
title: 'Spring 面试题'
description: 'Spring 面试题整理，覆盖 IoC、AOP、事务、Bean 作用域、Spring MVC 流程和常见框架原理问题。'
outline: [2, 3]
---

# Spring 面试题

本页整理 Spring Framework 和 Spring MVC 高频面试题，覆盖 IoC、Bean、AOP、事务、自动装配和 Web MVC 流程。传统 XML、Struts 对比等内容完整保留，面试时可说明其主要出现在老项目中。

## IoC 与 Bean

### IoC 是什么？

IoC 是控制反转，对象的创建、依赖管理和生命周期交给 Spring 容器处理。开发者不再主动 new 依赖对象，而是声明依赖关系，由容器负责装配。

#### 常见追问

- BeanFactory 和 ApplicationContext 有什么区别？
  - `BeanFactory` 是 Spring 最基础的 IoC 容器接口，核心职责是管理 Bean 的创建、获取、依赖注入和生命周期。
  - `ApplicationContext` 继承了 `BeanFactory`，可以理解为功能更完整、面向企业应用的 IoC 容器。
  - `BeanFactory` 默认偏懒加载，通常在调用 `getBean()` 时才创建单例 Bean；`ApplicationContext` 默认会在容器启动时预实例化非懒加载的单例 Bean，因此能更早发现配置和依赖错误。
   - `ApplicationContext` 在 BeanFactory 基础上额外提供了国际化 `MessageSource`、资源加载 `ResourceLoader`、应用事件发布监听、环境与配置管理 `Environment` 以及 Web 场景集成等能力。AOP 自动代理还需要注册相应的自动代理创建器，例如启用 `@EnableAspectJAutoProxy` 或 Spring Boot 的 AOP 自动配置；并不是只要使用 `ApplicationContext` 就会自动创建代理。
  - `BeanFactory` 更适合资源特别受限、只需要基础 IoC 能力的场景；实际 Spring Boot 和企业项目中基本都使用 `ApplicationContext`。
  - 常见实现上，`DefaultListableBeanFactory` 是底层 BeanFactory 实现；`ClassPathXmlApplicationContext`、`AnnotationConfigApplicationContext`、WebApplicationContext` 等属于 ApplicationContext 实现。
- Spring 如何完成依赖注入？
  Spring 完成依赖注入的核心是在 Bean 创建阶段，通过 `BeanFactory` 根据 BeanDefinition 解析依赖关系，再把依赖对象注入目标 Bean。
  - 容器启动时，Spring 会扫描 XML、`@Component`、`@Bean` 等配置，解析并注册为 `BeanDefinition`。
  - 创建 Bean 时，先实例化目标对象。构造器注入会先解析构造器参数，再调用对应构造器；字段注入和 Setter 注入则发生在对象实例化之后。
   - Spring 会通过 `@Autowired` 按类型查找候选 Bean；存在多个候选时，可先用 `@Qualifier` 限定候选，再通过 `@Primary`、`@Priority` 等规则选择。没有其他限定条件时，还可能使用注入点名称匹配 Bean 名称；字段名天然可用，构造器或方法参数名则依赖编译时保留的参数名元数据，Spring Framework 6.1+ 应使用 `-parameters` 编译。多实现注入时，工程中优先显式使用 `@Qualifier`。
  - `@Resource` 默认优先按名称注入，找不到再按类型匹配；它属于 JSR-250 规范。
  - 注入过程主要在 `populateBean` 阶段完成，`AutowiredAnnotationBeanPostProcessor` 负责处理 `@Autowired`、`@Value` 等注解，`CommonAnnotationBeanPostProcessor` 负责处理 `@Resource`。
  - 依赖注入完成后，Spring 再执行 `Aware` 回调、`BeanPostProcessor`、`@PostConstruct`、`InitializingBean` 和自定义 `init-method` 等初始化逻辑。
   - 在 Spring Framework 允许循环引用时，单例 Bean 的字段或 Setter 循环依赖，例如 A 属性依赖 B、B 属性依赖 A，可以通过三级缓存提前暴露 A 的早期引用处理；但构造器循环依赖通常无法解决，原型 Bean 循环依赖也不适用。Spring Boot 2.6+（包括 3.x）默认禁止循环依赖，即使是字段或 Setter 注入通常也会启动失败；生产代码应优先重构依赖关系，而不是依赖三级缓存兜底。
  - 实际项目中优先使用构造器注入，因为依赖明确、对象更容易保持不可变，也能在启动阶段更早暴露循环依赖问题。

#### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

### Spring 主要模块有哪些？

Spring 常见模块包括 Core Container、Context、AOP、Beans、Expression、JDBC / DAO、ORM、Transaction、Web 和 Spring MVC。
面试重点说明 Spring 用容器管理对象，用 AOP 处理横切逻辑，用事务和 Web 模块支撑企业应用。

#### 常见追问

- Spring Core 解决什么问题？
  - Spring Core 主要解决企业 Java 开发中**对象创建、对象依赖和对象生命周期管理复杂**的问题。
  - 传统开发中，业务对象通过 `new` 主动创建依赖，导致类之间强耦合，替换实现、单元测试和配置调整成本较高。
  - Spring 通过 IoC 将对象的创建权和装配权交给容器管理，通过 DI 自动注入对象依赖，使业务类只关注自身职责。
  - Spring 统一管理 Bean 的实例化、属性注入、初始化、销毁和作用域，减少重复的基础设施代码。
  - Spring Core 还通过 AOP 解决日志、事务、权限、异常处理、监控等横切关注点，避免这些代码分散到每个业务方法中。
  - 最终效果是降低模块耦合度，提高代码可测试性、可维护性和扩展性。
- Spring AOP 用在哪些场景？
  - **日志记录**：统一记录接口入参、返回值、操作人、执行结果和异常信息。
  - **事务管理**：`@Transactional` 本质上就是通过 AOP 在方法执行前后开启、提交或回滚事务。
  - **权限与安全控制**：在调用业务方法前校验登录状态、角色、权限或数据访问范围。
  - **异常处理**：统一捕获和转换业务异常，避免每个业务方法重复编写异常处理逻辑。
  - **性能监控**：统计方法耗时，对慢接口、慢 SQL 调用链进行告警或分析。
  - **缓存处理**：`@Cacheable`、`@CachePut`、`@CacheEvict` 通过 AOP 在方法调用前后执行缓存读写和失效。
  - **接口幂等、限流、防重复提交**：在进入核心业务前完成 Token 校验、分布式锁或限流判断。
  - **审计与操作日志**：例如对新增、修改、删除操作统一记录审计信息。
  - 需要注意 Spring AOP 基于代理实现，通常只能拦截 Spring 容器管理的 Bean 的方法调用；同一个类内部自调用不会经过代理，切面通常不会生效。
- Spring MVC 属于哪个层面的能力？
  Spring MVC 属于 **Web 层、表现层** 的能力，本质上是 Spring Framework 提供的 Web MVC 框架模块。
  - 主要负责处理 HTTP 请求与响应、路由分发、参数绑定、数据校验、文件上传、视图渲染和统一异常处理等。
  - `DispatcherServlet` 是其前端控制器，负责将请求分发给对应的 `Controller`。
  - 在分层架构中，Controller 位于表现层；业务逻辑应放在 Service 层，数据访问放在 DAO/Repository 层。
  - 对于前后端分离项目，Spring MVC 通常负责返回 JSON，而不是渲染 JSP、Thymeleaf 等页面。

### Spring 常用注入方式有哪些？

常见依赖注入方式包括**构造器注入**、**Setter 注入**和**字段注入**。
现在更推荐构造器注入，因为依赖不可变、便于测试，也能更早暴露循环依赖问题；字段注入写法简单，但不利于单元测试和依赖显式表达。

#### 常见追问

- 为什么不推荐字段注入？
  - 字段注入指在成员变量上使用 `@Autowired`、`@Resource` 等注解，由 Spring 通过反射直接赋值。
  - 不推荐的核心原因是依赖不显式。查看构造方法无法知道一个类依赖哪些组件，类的职责和耦合度不容易判断。
  - 不利于单元测试。脱离 Spring 容器创建对象后，字段依赖为 `null`，通常需要反射赋值或启动容器；构造器注入可以直接传入 Mock 对象。
  - 无法保证对象创建时依赖已完整准备好。字段注入发生在对象实例化之后，而构造器注入能保证对象一创建就是有效、完整的状态。
  - 字段通常无法使用 `final` 修饰，依赖可被后续修改；构造器注入可以使用 `final`，增强不可变性和线程安全性。
  - 容易隐藏循环依赖。构造器注入遇到循环依赖会尽早失败，促使拆分不合理的职责；字段注入可能掩盖设计问题。
  - 推荐优先使用构造器注入。JDK 8 下，如果类只有一个构造器，Spring 4.3+ 可以省略构造器上的 `@Autowired`。
- 构造器注入如何解决必需依赖？
  构造器注入天然表达“必需依赖”：对象创建时必须传入依赖，否则无法完成实例化。
  - Spring 创建 Bean 时会先解析构造器参数；如果容器中不存在对应类型的 Bean，或存在多个候选但无法确定注入对象，会在启动阶段直接抛出异常，避免应用运行后出现 `NullPointerException`。
  - 依赖可以声明为 `final`，构造完成后不允许被修改，保证对象始终处于完整、可用状态。
  - 只有一个构造器时，Spring 4.3+ 可以省略 `@Autowired`：
  ```java
  @Service
  public class OrderService {
      private final UserService userService;
      public OrderService(UserService userService) {
          this.userService = userService;
      }
  }
  ```
  - 如果依赖确实是可选的，不应按必需依赖直接注入，可以使用 `Optional<T>`、`ObjectProvider<T>`，或通过 `@Autowired(required = false)` 明确表达可选性。
  - 多个同类型实现时，需要用 `@Primary` 或 `@Qualifier` 明确指定注入哪个 Bean。
- `@Resource` 和 `@Autowired` 有什么区别？
  - `@Autowired` 是 Spring 提供的注解，默认按**类型**注入；同一类型有多个 Bean 时，可结合 `@Qualifier` 指定名称，或通过 `@Primary` 指定默认实现。
  - `@Resource` 是 JSR-250 标准注解，JDK 8 常用包名是 `javax.annotation.Resource`；默认按**名称**注入，名称默认取字段名或 Setter 属性名，找不到名称时再按类型匹配。
  - `@Autowired` 可标注在构造器、字段、Setter 方法和普通方法上；推荐用于构造器注入。`@Resource` 通常用于字段或 Setter 方法，不能标注构造器。
  - `@Autowired` 默认要求依赖必须存在，可通过 `@Autowired(required = false)` 设置为非必需；`@Resource` 本身没有 `required` 属性，注入失败通常会在容器启动时抛异常。
  - 单一实现类时两者效果接近；多实现类且希望按名称精确注入时可使用 `@Resource(name = "xxxService")`，但项目中建议统一采用构造器注入配合 `@Qualifier`，依赖关系更明确。
  - Spring 6 / Jakarta EE 9 以后，`@Resource` 的包名改为 `jakarta.annotation.Resource`。

### @Autowired 有什么作用？

`@Autowired` 用于按类型自动注入 Spring 容器中的 Bean，可以标注在构造器、字段、Setter 或普通方法上。如果同类型 Bean 有多个，需要结合 `@Qualifier` 或 `@Primary` 指定候选 Bean。

#### 常见追问

- `@Autowired` 默认按什么规则注入？
  默认按**类型**注入。
    具体规则可以概括为：
    - 先按类型查找候选 Bean。
    - 如果只有一个匹配 Bean，直接注入。
    - 如果有多个同类型 Bean，可先通过 `@Qualifier` 限定候选；没有限定时，优先选择标了 `@Primary` 的 Bean。
    - 如果仍有多个候选，还可能根据 `@Priority` 等候选规则选择；没有其他限定条件时，才可能使用注入点名称匹配 Bean 名称。
    - 字段名可以直接参与名称匹配；构造器或方法参数名需要编译时保留参数名元数据，Spring Framework 6.1+ 应使用 `-parameters` 编译。多实现注入时推荐显式使用 `@Qualifier`。
    - 如果仍然无法确定，会抛出 `NoUniqueBeanDefinitionException`。
    - 如果没有找到任何 Bean，默认会抛出 `NoSuchBeanDefinitionException`，除非设置 `@Autowired(required = false)`。
    - 如果配合 `@Qualifier("beanName")`，会按限定名称进一步筛选候选 Bean。
    所以总结就是：**`@Autowired` 核心是按类型注入；多候选时优先用 `@Qualifier` 明确限定，再结合 `@Primary`、`@Priority` 等规则决定，名称匹配只应作为无其他限定时的辅助规则。**
- 多个同类型 Bean 怎么处理？
  多个同类型 Bean 注入时，Spring 会因为无法确定具体注入哪个 Bean 而报 NoUniqueBeanDefinitionException，常见处理方式有几种：
    1. 使用 `@Primary` 指定默认 Bean。
    2. 使用 `@Qualifier` 精确指定 Bean 名称。
    3. 使用 `@Resource(name = "wechatPayService")` 按名称注入，不过它不能用于构造器注入。
    4. 如果需要全部实现，可以注入 `List<PayService>` 或 `Map<String, PayService>`，Map 的 key 是 Bean 名称。
    5. 也可以通过字段名或参数名匹配 Bean 名称，但这种方式依赖命名，不如 `@Qualifier` 明确。
   总结就是：默认实现用 `@Primary`，指定实现用 `@Qualifier`，需要多个实现一起处理就注入集合或 Map。

### Bean 生命周期是什么？

Bean 生命周期大致包括实例化、属性填充、Aware 回调、BeanPostProcessor 前置处理、初始化方法、BeanPostProcessor 后置处理、使用、销毁。理解生命周期有助于排查注入、代理和初始化问题。

#### 常见追问

- BeanPostProcessor 有什么作用？
  `BeanPostProcessor` 是 Spring 提供的 Bean 后置处理器，作用是在 Bean 初始化前后做扩展处理。
    它有两个核心方法：
    ```java
    postProcessBeforeInitialization(Object bean, String beanName)
    postProcessAfterInitialization(Object bean, String beanName)
    ```
    执行时机是：Bean 实例化、属性注入完成之后，在初始化方法前后执行，比如 `@PostConstruct`、`InitializingBean#afterPropertiesSet`、自定义 `init-method` 这些初始化逻辑前后。
    常见作用有：
    - 对 Bean 做统一增强，比如包装成代理对象。
    - 处理特定注解，比如 `@Autowired`、`@PostConstruct`、`@Async`、`@Transactional` 等很多底层能力都和后置处理器有关。
    - 修改 Bean 属性或做校验。
    - 接入框架扩展逻辑。
    需要注意的是，它处理的是容器中的 Bean，不是 BeanDefinition；如果要改 Bean 的定义信息，一般用 `BeanFactoryPostProcessor`。
- AOP 代理对象在哪个阶段生成？
  AOP 代理对象通常是在 Bean 初始化之后，由 `BeanPostProcessor` 生成的。
    具体来说，Spring AOP 主要通过 `AbstractAutoProxyCreator` 这类后置处理器，在 `postProcessAfterInitialization` 阶段判断当前 Bean 是否需要被增强，如果需要，就用 JDK 动态代理或 CGLIB 创建代理对象，并把代理对象作为最终 Bean 放入容器。
    所以常见流程是：
    `实例化 Bean -> 属性注入 -> 初始化方法 -> postProcessAfterInitialization -> 创建 AOP 代理对象`
    需要注意：
    - 如果是普通单例 Bean，大多数 AOP 代理是在初始化完成后的后置处理器阶段生成。
    - 为了解决循环依赖，Spring 可能会提前暴露代理对象，这时代理可能在早期引用阶段生成，但本质上仍然是 `AutoProxyCreator` 这类 `BeanPostProcessor` 参与完成的。
    - `@Transactional`、`@Async` 等基于代理的能力，最终也是通过类似机制生成代理对象。
- 初始化方法有哪些配置方式？
  常见有三种配置方式：
  使用 @PostConstruct 注解，方法无参、非静态，Bean 属性注入完成后执行。
  实现 InitializingBean 接口，重写 afterPropertiesSet()。
  指定 init-method，XML 中配置 init-method，或者 Java 配置里用 @Bean(initMethod = "init")。
  执行顺序一般是：
    @PostConstruct -> InitializingBean#afterPropertiesSet -> init-method
    补充一点，BeanPostProcessor#postProcessBeforeInitialization 会在这些初始化方法之前执行，postProcessAfterInitialization 会在这些初始化方法之后执行。

#### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

### Spring Bean 是否线程安全？

Spring 默认单例 Bean 本身不保证线程安全。无状态 Bean 通常是线程安全的；如果 Bean 内部保存可变成员变量，多线程访问就可能出问题。解决方式包括避免共享可变状态、使用局部变量、加锁、改为 prototype 或把状态放到请求上下文中。

#### 常见追问

- Controller 单例为什么通常没问题？
  Controller 单例没问题的前提是无状态，不保存请求级别的数据；如果确实需要请求级数据，应该放在方法参数、局部变量、request/session，或者使用合适的作用域 Bean。
- 有状态 Bean 怎么处理？
  有状态 Bean 要看这个“状态”的生命周期和共享范围来处理。
  如果是请求级状态，比如当前用户、请求参数、临时计算结果，不能放在单例 Bean 成员变量里，应该放在方法参数、局部变量、`HttpServletRequest`，或者定义成 `request` 作用域 Bean。
  如果是会话级状态，比如用户会话信息，可以放在 `session` 作用域 Bean，或者放到 Redis、Session 这类外部存储里。
  如果每次使用都需要独立对象，可以把 Bean 配成 `prototype`，每次获取一个新实例，但要注意单例 Bean 注入 prototype 时只会注入一次，通常需要配合 `ObjectFactory`、`ObjectProvider` 或 `@Lookup` 动态获取。
  如果状态必须在单例 Bean 里共享，就要保证线程安全，比如使用不可变对象、加锁、`Atomic` 类、并发集合，或者控制临界区，但这种方式会增加复杂度和性能开销。
  `ThreadLocal` 也可以保存线程级状态，比如当前登录人上下文，但在线程池环境下必须及时 `remove()`，否则可能出现内存泄漏或数据串扰。
  实际开发里优先选择无状态设计，有状态数据尽量下沉到方法局部变量、数据库、缓存、Session，只有明确生命周期和并发模型后才考虑特殊作用域或同步控制。
- prototype Bean 一定线程安全吗？
  不一定，prototype 只能降低共享概率，不能保证线程安全；线程安全最终还是看对象是否被多个线程共享，以及内部状态是否安全。

### Spring Bean 作用域有哪些？

常见作用域包括 `singleton`、`prototype`、`request`、`session` 和早期 Portlet 环境中的 `globalSession`。
`singleton` 是默认作用域，一个容器一个实例；`prototype` 每次获取创建新实例；`request` 和 `session` 主要用于 Web 环境。

#### 常见追问

- singleton 和 prototype 生命周期有什么区别？
  `singleton` 和 `prototype` 的核心区别是：Spring 容器对 Bean 的管理程度不同。
    `singleton` 是容器启动时或第一次使用时创建，整个容器中通常只有一个实例，后续每次获取都是同一个对象。
    `singleton` 的完整生命周期由 Spring 管理，包括实例化、属性注入、初始化回调，比如 `@PostConstruct`、`InitializingBean`、`init-method`，以及容器关闭时的销毁回调，比如 `@PreDestroy`、`DisposableBean`、`destroy-method`。
    `prototype` 是每次从容器获取时创建一个新实例，每次 `getBean()` 都是不同对象。
    `prototype` 的生命周期 Spring 只负责到初始化完成，也就是实例化、属性注入、初始化方法会执行，但销毁阶段 Spring 不负责管理。
    所以 `prototype` 的 `@PreDestroy`、`destroy-method` 一般不会被容器自动调用，如果有资源释放需求，需要业务代码自己处理。
    还有一个常见点：如果 `singleton` Bean 直接注入 `prototype` Bean，`prototype` 只会在 `singleton` 初始化时创建并注入一次，不会每次使用都创建新对象。
    如果要每次都拿新的 `prototype`，可以用 `ObjectProvider`、`ObjectFactory` 或 `@Lookup`。
- request scope 在非 Web 环境可用吗？
  默认不可用。
    `request scope` 依赖 Web 环境里的 HTTP request，本质上是通过 `RequestContextHolder` 把当前请求绑定到线程上。
    如果是普通非 Web 环境，比如 `main` 方法、定时任务、消息消费线程，默认没有当前 HTTP 请求上下文，使用 `@RequestScope` 或 `scope="request"` 的 Bean 通常会报错，比如 `Scope 'request' is not active` 或 `No thread-bound request found`。
    即使在 Web 应用里，如果切到异步线程、线程池、定时任务中，也不一定能拿到 request scope，因为请求上下文通常只绑定在处理请求的当前线程。
    如果确实要在非 Web 环境使用类似能力，可以手动注册自定义 Scope，或者手动绑定 `RequestAttributes`，但这一般不推荐，容易引入上下文混乱和线程泄漏问题。
    实际开发里，`request scope` 主要用于 Web 请求链路内，比如当前请求级别的数据；非 Web 场景更适合用方法参数传递、`ThreadLocal`、自定义上下文对象，或者重新设计成无状态 Bean。
- 单例 Bean 引用 prototype Bean 有什么问题？
  单例 Bean 直接引用 prototype Bean 的主要问题是：prototype Bean 不会每次使用都重新创建，而是在单例 Bean 初始化注入时只创建一次。

### Spring 如何解决循环依赖？

在 Spring Framework 允许循环引用的前提下，Spring 可通过三级缓存处理单例 Bean 的部分字段或 Setter 循环依赖，本质是在 Bean 完成属性填充前提前暴露对象引用。但构造器循环依赖无法解决，原型 Bean 循环依赖也不适用。
Spring Boot 2.6+（包括 3.x）默认禁止循环依赖，因此这类依赖通常会在启动时失败；生产代码应通过拆分职责、调整依赖方向或引入更合理的抽象消除循环依赖，而不是依赖三级缓存。

#### 常见追问

- 为什么构造器循环依赖无法解决？
  核心原因是：构造器注入要求依赖对象在当前对象实例化之前就准备好。
  如果一定要处理，可以调整设计，改成 setter 注入、拆分职责，或者在某个依赖上使用 @Lazy 注入代理来打破直接依赖。
- 三级缓存分别存什么？
  在允许循环引用时，Spring 解决单例 Bean 循环依赖用到的三级缓存主要在 `DefaultSingletonBeanRegistry` 里：
  1. 一级缓存 `singletonObjects`：存放已经完全初始化好的单例 Bean，也就是成品 Bean。
  2. 二级缓存 `earlySingletonObjects`：存放提前暴露的单例 Bean，也就是还没完成属性填充和初始化的半成品 Bean。
  3. 三级缓存 `singletonFactories`：存放的是 `ObjectFactory`，不是 Bean 本身，用来在需要时生成提前暴露的 Bean 引用。
  大致流程是：创建 Bean 时，实例化完成后会先把一个 `ObjectFactory` 放到三级缓存；如果发生循环依赖，其他 Bean 需要引用它，就会通过三级缓存的 `ObjectFactory` 拿到早期引用，然后放入二级缓存；等 Bean 初始化完成后，再放入一级缓存，并清理二级、三级缓存。
  三级缓存的关键作用是支持 AOP 代理场景。因为提前暴露的对象可能不是原始对象，而是代理对象，所以需要通过 `ObjectFactory` 延迟决定暴露原始对象还是代理对象。
- AOP 代理和循环依赖有什么关系？
  主要体现在：循环依赖时，Spring 不能简单提前暴露原始对象，否则如果这个 Bean 最终需要被 AOP 代理，其他 Bean 拿到的就是原始对象，AOP 就会失效。

#### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

## XML 与自动装配

### Spring XML 装载 Bean 的过程是什么？

传统 XML 配置中，Spring 会读取配置文件，解析 BeanDefinition，注册到 BeanFactory，然后在需要时或容器启动时实例化 Bean，完成属性注入、初始化回调和后置处理。现代 Spring Boot 项目更多使用注解和自动配置，但理解 XML 有助于理解 Spring 容器底层。

#### 常见追问

- BeanDefinition 是什么？
  `BeanDefinition` 是 Spring 对 Bean 的定义信息，也可以理解为 Bean 的“配方”或“元数据”，它本身不是 Bean 实例。Spring 容器启动时会把 XML、注解、配置类等信息解析成 `BeanDefinition`，然后根据它去创建 Bean。它里面主要保存这些信息：Bean 的 class 类型、作用域 `scope`、是否懒加载、构造方法参数、属性注入值、初始化方法、销毁方法、依赖关系、是否 primary、是否 abstract 等。比如一个类加了 `@Component`，Spring 扫描到之后不会立刻只保存一个对象，而是先生成对应的 `BeanDefinition`，后面 BeanFactory 再根据这个定义完成实例化、属性填充、初始化以及放入单例池。常见实现有 `GenericBeanDefinition`、`RootBeanDefinition`、`ScannedGenericBeanDefinition`。简单说，`BeanDefinition` 描述了“怎么创建和管理一个 Bean”。
- XML 配置和注解配置最终都会变成什么？
  XML 配置和注解配置最终都会被 Spring 解析成 `BeanDefinition`，注册到 `BeanDefinitionRegistry` 里。后续容器不会关心这个 Bean 最初来自 XML、`@Component` 还是 `@Bean`，而是统一根据 `BeanDefinition` 去完成实例化、依赖注入、初始化、AOP 代理等流程。简单说，不同配置方式只是来源不同，最终都会变成 Spring 内部统一的 Bean 定义模型。
- BeanFactoryPostProcessor 在哪个阶段执行？
  `BeanFactoryPostProcessor` 执行在 Spring 容器启动过程中，`BeanDefinition` 已经加载并注册完成之后，普通 Bean 实例化之前。它的作用是对 `BeanFactory` 里的 `BeanDefinition` 做修改，比如修改属性值、占位符解析等。对应到 `refresh()` 流程里，主要是在 `invokeBeanFactoryPostProcessors(beanFactory)` 这一步执行，早于 `BeanPostProcessor` 的注册，也早于普通单例 Bean 的创建。需要注意，`BeanDefinitionRegistryPostProcessor` 是它的子接口，执行时机更早，可以在这个阶段新增、修改、删除 `BeanDefinition`。

### Spring 自动装配方式有哪些？

传统 XML 自动装配方式包括 `no`、`byName`、`byType`、`constructor` 和早期的 `autodetect`。现在实际项目更多使用 `@Autowired`、`@Resource`、构造器注入和 Spring Boot 自动配置。面试时可说明这些 XML 方式主要用于老项目。

#### 常见追问

- `byName` 和 `byType` 有什么区别？
  `byName` 和 `byType` 都是 Spring XML 时代常见的自动装配方式。`byName` 是按属性名去容器中找同名 Bean，比如属性叫 `userService`，就找 id 或 name 为 `userService` 的 Bean，找到后注入；`byType` 是按属性类型去容器中找匹配的 Bean，比如属性类型是 `UserService`，容器里有这个类型的 Bean 就注入。区别主要是匹配依据不同：`byName` 看 Bean 名称，要求名称一致；`byType` 看类型，要求类型唯一。如果 `byName` 找不到同名 Bean，一般就不注入；如果 `byType` 找到多个同类型 Bean，会报错，因为 Spring 不知道该注入哪一个。实际开发中，注解方式里类似的逻辑是 `@Resource` 默认先按名称，再按类型；`@Autowired` 默认按类型，再结合 `@Qualifier` 或 `@Primary` 解决多个 Bean 的问题。
- 多个同类型 Bean 时 byType 会怎样？
  `byType` 要求容器里同类型的 Bean 只能有一个。如果有多个同类型 Bean，Spring 无法判断该注入哪一个，就会抛异常，通常是依赖注入失败，底层类似 `NoUniqueBeanDefinitionException`。所以 `byType` 适合类型唯一的场景；如果有多个实现，一般要改成 `byName`，或者通过指定 bean 名称、`@Qualifier`、`@Primary` 这类方式明确注入目标。
- 注解注入和 XML 自动装配有什么关系？
  注解注入和 XML 自动装配本质上都是 Spring 的依赖注入方式，只是配置入口不同。XML 自动装配主要通过 `autowire="byName"`、`byType` 这类属性让 Spring 按名称或类型给 Bean 属性赋值；注解注入则通过 `@Autowired`、`@Resource`、`@Inject` 等注解声明依赖关系。它们最终都会由 Spring 容器在 Bean 创建、属性填充阶段完成依赖解析和注入。区别是注解方式更常用、更细粒度，`@Autowired` 默认按类型，多个 Bean 时再结合 `@Qualifier`、`@Primary` 或属性名；`@Resource` 默认按名称，找不到时再按类型。XML 的自动装配属于比较早期的配置方式，现在项目中一般更多使用注解方式。

## AOP 与事务

### AOP 是什么？

AOP 是面向切面编程，用于把日志、事务、权限、监控、异常处理等横切逻辑从业务代码中抽离出来。Spring AOP 主要基于动态代理，在方法调用前后织入增强逻辑。

#### 常见追问

- 切点、通知、切面分别是什么？
  切点、通知、切面是 Spring AOP 里的三个核心概念。
  **切点** `Pointcut` 用来定义“在哪里增强”，也就是匹配哪些类、哪些方法，比如匹配 service 包下所有方法。
  **通知** `Advice` 用来定义“增强什么逻辑”和“什么时候执行”，比如方法执行前、执行后、异常时、环绕执行，常见有前置通知、后置通知、异常通知、最终通知、环绕通知。
  **切面** `Aspect` 是切点和通知的组合，表示“在哪些地方执行哪些增强逻辑”。比如日志切面里，切点定义拦截哪些业务方法，通知定义打印日志的逻辑，整个类就是一个切面。
- Spring AOP 和 AspectJ 有什么区别？
  Spring AOP 和 AspectJ 都是 AOP 的实现，但实现方式和能力不一样。
  **Spring AOP** 是基于代理实现的，JDK8 下如果目标类有接口，默认可以用 JDK 动态代理；没有接口通常用 CGLIB。它只能增强 Spring 容器管理的 Bean，主要拦截方法执行，不能直接拦截字段访问、构造方法等场景。
  **AspectJ** 是更完整的 AOP 框架，基于字节码织入，可以在编译期、类加载期或编译后织入，支持的连接点更多，比如方法调用、构造方法、字段访问等。
  实际项目里，如果只是做事务、日志、权限这类 Spring Bean 方法增强，Spring AOP 就够用，配置简单、和 Spring 集成好；如果需要更细粒度、更强的织入能力，才会考虑 AspectJ。
- AOP 为什么会有自调用失效问题？
  AOP 自调用失效的原因是 Spring AOP 基于代理实现，增强逻辑是在调用代理对象方法时触发的。如果一个类中的方法通过 `this.xxx()` 调用同类里的另一个被增强方法，这个调用没有经过 Spring 生成的代理对象，而是直接调用目标对象本身，所以事务、缓存、日志等切面都不会生效。比如 `a()` 方法内部调用 `b()`，即使 `b()` 上有 `@Transactional`，只要是同类内部调用，也不会走代理增强。常见解决方式是把被调用方法拆到另一个 Spring Bean 中，通过容器注入调用；或者通过 `AopContext.currentProxy()` 获取代理对象再调用，但需要开启 `exposeProxy=true`，一般更推荐拆分 Bean，结构更清晰。

#### 关联文档

- [AOP 面向切面](/spring-core/aop)

### AOP 底层怎么实现？

Spring AOP 底层主要基于动态代理。接口代理通常使用 JDK 动态代理，类代理通常使用 CGLIB。方法调用进入代理对象后，代理对象按切面链执行前置、后置、异常等增强逻辑。

#### 常见追问

- JDK 动态代理和 CGLIB 有什么区别？
  JDK 动态代理和 CGLIB 都是 Spring AOP 常用的代理方式。
  **JDK 动态代理**基于接口实现，要求目标类至少实现一个接口，生成的是接口的代理对象，调用时通过 `InvocationHandler` 处理。
  **CGLIB** 基于继承实现，会生成目标类的子类代理，所以不要求目标类实现接口，但目标类不能是 `final`，被增强的方法也不能是 `final`，否则无法重写增强。
  性能上在 JDK8 里通常不需要特别纠结，更多看适用场景。一般有接口时优先用 JDK 动态代理，没有接口时用 CGLIB。Spring Boot 2.x 开始默认倾向使用 CGLIB 代理，如果需要可以通过配置切换。
- final 方法能被代理增强吗？
  要分代理方式看。
  Spring AOP 如果用 **JDK 动态代理**，代理的是接口方法，调用经过代理对象时，哪怕目标类里的实现方法是 `final`，也可以被增强，因为它不是靠重写目标类方法实现的。但这个方法必须通过接口暴露并通过代理对象调用。
  如果用 **CGLIB**，代理是通过生成目标类子类并重写方法实现的，所以 `final` 方法不能被重写，也就不能被增强；`final` 类也不能被 CGLIB 代理。
  所以简单说：JDK 动态代理下，接口上的 `final` 实现方法可以增强；CGLIB 下，`final` 方法不能增强。
  Spring AOP 本质是代理，是否生效还要看调用是否经过代理对象，自调用同样不会生效。
- Spring Boot 默认使用哪种代理？
  默认使用 **CGLIB 代理**，因为 `spring.aop.proxy-target-class` 默认是 `true`。也就是说，即使目标类实现了接口，Spring Boot 默认也会用基于类继承的 CGLIB 代理。如果想改成 JDK 动态代理，可以配置 `spring.aop.proxy-target-class=false`，这时有接口就用 JDK 动态代理，没有接口还是只能用 CGLIB。需要注意区分 Spring Framework 本身，单独使用 `@EnableAspectJAutoProxy` 时，`proxyTargetClass` 默认是 `false`，通常是有接口用 JDK 动态代理，没有接口用 CGLIB。

#### 关联文档

- [AOP 面向切面](/spring-core/aop)

### Spring 事务实现方式有哪些？

Spring 事务主要有编程式事务和声明式事务。
编程式事务通过 `TransactionTemplate` 或事务管理器手动控制；
声明式事务通常通过 `@Transactional` 和 Spring AOP 的默认代理模式实现，业务代码侵入更低，是项目中最常用的方式。
Spring 也支持 `AdviceMode.ASPECTJ` 加 AspectJ 编织的声明式事务模式，但配置和运维成本更高，普通项目通常使用代理模式。

#### 常见追问

- 声明式事务为什么依赖代理？
  在默认的代理模式 `AdviceMode.PROXY` 下，声明式事务通过 AOP 在方法调用前后织入事务逻辑：调用业务方法前开启事务，方法正常返回就提交事务，方法抛出符合规则的异常就回滚，这些增强逻辑由代理对象完成。
  因此外部调用必须先进入代理对象，再由代理对象调用目标方法，事务拦截器才有机会生效。如果是类内部方法自调用，例如 `this.xxx()`，不会经过代理对象，事务通常不会生效。JDK 8 下常见代理方式是 JDK 动态代理和 CGLIB；Spring Boot 默认使用 CGLIB，单独 Spring Framework 默认更倾向有接口用 JDK 动态代理。
  如果配置 `AdviceMode.ASPECTJ` 并完成 AspectJ 编织，事务增强不依赖代理调用边界，同类自调用也可以被拦截；但这不是 Spring Boot 的常规默认方案。
- 编程式事务适合什么场景？
  适合对事务边界控制要求更细的场景。比如一个大方法里只有一小段逻辑需要事务，或者希望把事务范围缩小，避免事务里包含远程调用、耗时计算、IO 操作。也适合需要手动控制提交、回滚、异常处理的场景，比如部分步骤失败只回滚某一段，后续逻辑继续执行。还有一些动态事务场景，比如根据条件决定是否开启事务、使用不同传播行为或隔离级别，用 `TransactionTemplate` 会更直观。实际项目里，普通业务优先用 `@Transactional`，只有声明式事务表达不方便、容易扩大事务范围，或者需要精细控制时，才考虑编程式事务。
- 多数据源事务怎么处理？
  多数据源事务要先看一致性要求。如果只是操作其中一个数据源，直接给 `@Transactional` 指定对应的 `transactionManager` 就可以，比如 `@Transactional(transactionManager = "orderTxManager")`。如果一个业务同时操作多个数据库，普通本地事务管理器只能保证单库事务，不能保证多个数据源一起提交或一起回滚。强一致场景一般用分布式事务，比如 XA/JTA，常见实现有 Atomikos、Narayana，也可以用 Seata 这类方案。最终一致场景更常见，可以用本地事务加消息表、可靠消息、TCC、Saga、补偿任务等方式处理。
  实际项目里不建议随便把多个库操作包进一个普通 `@Transactional`，那样通常只能管住一个数据源，另一个数据源可能已经提交，出现数据不一致。动态数据源场景还要注意，事务开启后连接基本已经绑定了，方法内部再切换数据源容易不生效或引发问题，所以数据源路由通常要在事务开启前确定。

#### 关联文档

- [事务原理](/spring-core/transaction)

### Spring 事务隔离级别有哪些？

Spring 事务隔离级别包括 `DEFAULT`、`READ_UNCOMMITTED`、`READ_COMMITTED`、`REPEATABLE_READ` 和 `SERIALIZABLE`。
`DEFAULT` 表示使用数据库默认隔离级别，MySQL InnoDB 默认通常是可重复读。

#### 常见追问

- 不同隔离级别解决什么问题？
  Spring 事务隔离级别主要通过 `@Transactional(isolation = Isolation.xxx)` 设置，本质上还是交给数据库实现。
  常见隔离级别有这几个：
    `DEFAULT` 表示使用数据库默认隔离级别，比如 MySQL InnoDB 默认是 `REPEATABLE_READ`，Oracle 默认是 `READ_COMMITTED`。
    `READ_UNCOMMITTED` 隔离级别最低，可能出现脏读、不可重复读、幻读，基本很少用。
    `READ_COMMITTED` 可以解决脏读，也就是一个事务不会读到另一个事务未提交的数据，但还可能出现不可重复读和幻读。
    `REPEATABLE_READ` 可以解决脏读和不可重复读，也就是同一个事务里多次读取同一行数据结果一致，但按标准来说还可能有幻读；不过 MySQL InnoDB 在这个级别下通过 MVCC 和 next-key lock 在很多场景可以避免幻读。
    `SERIALIZABLE` 隔离级别最高，可以解决脏读、不可重复读、幻读，相当于串行执行，但并发性能最差。
    实际项目里一般用数据库默认级别，MySQL 常见就是 `REPEATABLE_READ`，如果是为了减少锁冲突、提高并发，也可能用 `READ_COMMITTED`。
- Spring 隔离级别和数据库隔离级别是什么关系？
  Spring 的 `Isolation` 枚举会在新建事务时请求 `PlatformTransactionManager` 为底层事务资源设置隔离级别；例如 JDBC 场景通常会设置 Connection 的 transaction isolation。`DEFAULT` 表示使用数据库默认隔离级别。
  实际是否支持某个隔离级别、以及脏读、不可重复读、幻读的具体表现，取决于数据库、JDBC 驱动和事务管理器实现。若方法加入一个已经存在的事务，通常不会在事务中途改变该事务的隔离级别；需要不同隔离级别时，应通过新的事务边界设计。
- 可重复读如何避免幻读？
  可重复读能不能避免幻读要看数据库实现。
   按 SQL 标准来说，`REPEATABLE_READ` 主要解决脏读和不可重复读，幻读要到 `SERIALIZABLE` 才完全解决。但 MySQL InnoDB 的 `REPEATABLE_READ` 比较特殊，很多场景下可以避免幻读。普通 `select` 是一致性快照读，通过 MVCC 读取 ReadView；在 `REPEATABLE_READ` 下，ReadView 通常在本事务第一次一致性读时创建并在后续一致性读中复用，因此事务过程中即使别的事务插入了新数据，当前事务通常也看不到。使用 `START TRANSACTION WITH CONSISTENT SNAPSHOT` 时，可以在事务开始阶段建立一致性快照。对于 `select ... for update`、`update`、`delete` 这类当前读，InnoDB 会使用 next-key lock，也就是记录锁加间隙锁，锁住范围，防止其他事务在这个范围内插入新记录，从而避免幻读。不过如果是唯一索引等值查询命中唯一记录，可能退化成记录锁。
  总结就是：标准意义上可重复读不保证解决幻读，但 MySQL InnoDB 在可重复读下通过 MVCC 和 next-key lock 基本解决了幻读问题。

### @Transactional 为什么会失效？

在默认代理模式下，常见原因包括自调用绕过代理、异常被捕获没有抛出、抛出受检异常但未配置回滚、事务方法所在类没有被 Spring 管理、传播行为配置不符合预期。
方法可见性也需要注意：在 Spring Framework 5.x 的默认行为或 JDK 接口代理下，非 `public` 方法通常不会按预期启用事务；Spring Framework 6+ 的类代理可支持 `protected`、包可见方法，但 `private` 方法仍无法被代理增强。为兼容性和可读性，业务事务方法通常仍建议使用 `public`。

#### 常见追问

- Spring 事务传播行为有哪些？
  主要有 7 种，常用的是前三种。
  `REQUIRED` 是默认传播行为，如果当前有事务就加入当前事务，没有就新建事务。
  `REQUIRES_NEW` 是每次都新建一个事务，如果当前有事务就先挂起当前事务，适合内部操作需要独立提交或回滚的场景，比如日志记录。
   `NESTED` 是嵌套事务，如果当前有事务就在当前事务里创建保存点，内部回滚会先回滚到保存点；若外层捕获并处理异常且未标记为 rollback-only，外层事务可以继续并提交。如果异常继续传播到外层事务边界，或外层被标记为 rollback-only，外层事务仍会整体回滚。当前没有事务时，行为类似 `REQUIRED`，但它依赖事务管理器和数据库保存点支持。
  `SUPPORTS` 是当前有事务就加入，没有事务就以非事务方式执行。
  `NOT_SUPPORTED` 是以非事务方式执行，如果当前有事务就挂起。
  `MANDATORY` 是必须在已有事务中执行，如果当前没有事务就抛异常。
  `NEVER` 是必须在非事务环境执行，如果当前有事务就抛异常。
  实际项目里最常用的是 `REQUIRED`，需要独立事务时用 `REQUIRES_NEW`，需要部分回滚时可以考虑 `NESTED`。
- 默认回滚哪些异常？
  Spring 声明式事务默认只回滚 `RuntimeException` 和 `Error`，也就是运行时异常和错误。
  对受检异常，比如 `IOException`、`SQLException` 这种默认不回滚。
  如果希望受检异常也回滚，可以配置：`@Transactional(rollbackFor = Exception.class)`。
  另外，如果异常被方法内部 `try-catch` 吃掉，没有继续抛出去，Spring 感知不到异常，事务默认也不会回滚。
- 本地事务和分布式事务有什么区别？
  本地事务一般指只操作一个事务资源，比如单个数据库连接上的事务，提交和回滚都由数据库自己保证，典型就是 JDBC 事务或者 Spring 的 `@Transactional`。它的特点是实现简单、一致性强、性能相对好，但只能保证单库或同一个事务管理器内的操作原子性。
  分布式事务是一次业务操作跨多个事务资源，比如多个数据库、多个微服务、数据库加 MQ 等，需要保证这些参与方整体成功或整体失败。它不能只依赖单个数据库事务，通常需要 2PC/XA、TCC、Saga、本地消息表、事务消息等方案来协调。
  区别主要在于：本地事务是单资源内的 ACID，分布式事务是多资源之间的一致性协调；本地事务成本低、可靠性高，分布式事务要处理网络超时、部分成功、重试、幂等、补偿等问题，复杂度和性能开销都更高。
  实际项目里如果只是单库操作，用 Spring `@Transactional` 就够了；如果跨服务或跨库，就要考虑分布式事务或最终一致性方案。

#### 关联文档

- [事务原理](/spring-core/transaction)

## Spring MVC

### Spring MVC 运行流程是什么？

请求先进入 `DispatcherServlet`，
再由 `HandlerMapping` 找到处理器，
经过适配器调用 Controller 方法，
返回 ModelAndView 或响应体，
最后由 `ViewResolver` 解析视图或由消息转换器写出 JSON。
前后端分离项目中通常直接返回 JSON，不一定走传统视图解析。

#### 常见追问

- `DispatcherServlet` 的作用是什么？
  `DispatcherServlet` 是 Spring MVC 的前端控制器，也可以理解为整个请求处理流程的入口。
  客户端请求先到 `DispatcherServlet`，它负责统一接收请求，然后通过 `HandlerMapping` 找到对应的 Controller 方法，再通过 `HandlerAdapter` 调用具体方法，方法执行后返回 `ModelAndView` 或响应数据，最后再交给 `ViewResolver` 渲染视图，或者通过 `HttpMessageConverter` 返回 JSON 等数据。它本身不直接处理业务逻辑，**主要作用是请求分发、流程调度和统一整合 Spring MVC 的各个组件**。
- HandlerMapping 和 HandlerAdapter 有什么区别？
  `HandlerMapping` 负责“找谁处理请求”，根据请求路径、请求方法等信息，找到对应的 Handler，比如某个 Controller 方法。
  `HandlerAdapter` 负责“怎么调用这个 Handler”，因为 Handler 的形式可能不同，比如注解方法、传统 Controller 接口等，需要适配器统一调用。
  简单说，**`HandlerMapping` 是做请求和处理器的映射，返回 Handler；`HandlerAdapter` 是对找到的 Handler 进行适配和执行**。
在 Spring MVC 中，`DispatcherServlet` 先通过 `HandlerMapping` 找到 Handler，再通过匹配的 `HandlerAdapter` 去真正调用它。
- `@ResponseBody` 是怎么返回 JSON 的？
  `@ResponseBody` 的作用是告诉 Spring MVC：方法返回值不要走视图解析，而是直接写到 HTTP 响应体里。
  执行 Controller 方法后，`HandlerAdapter` 会处理返回值，发现方法或类上有 `@ResponseBody`，就会使用 `RequestResponseBodyMethodProcessor` 这类返回值处理器。
  然后它会根据请求的 `Accept`、响应的 `Content-Type` 以及返回值类型，选择合适的 `HttpMessageConverter`。
  如果返回的是对象，并且项目中有 Jackson 依赖，通常会选择 `MappingJackson2HttpMessageConverter`，把 Java 对象序列化成 JSON 字符串，再写入 `HttpServletResponse` 的输出流。
  所以它的核心流程就是：跳过视图解析，使用 `HttpMessageConverter`，通常由 Jackson 完成对象到 JSON 的转换。

### Spring MVC 核心组件有哪些？

核心组件包括 `DispatcherServlet`、`HandlerMapping`、`HandlerAdapter`、Controller、`ModelAndView`、`ViewResolver`、消息转换器和拦截器。现在 REST API 场景下，消息转换器和参数解析器也很重要。

#### 常见追问

- 拦截器和过滤器有什么区别？
  过滤器 `Filter` 是 Servlet 规范里的组件，作用在进入 Servlet 之前和响应返回之后，粒度更靠前，能拦截几乎所有 Web 请求，比如静态资源、Servlet、接口请求。
  拦截器 `Interceptor` 是 Spring MVC 提供的组件，作用在 `DispatcherServlet` 之后、Controller 方法调用前后，只能拦截被 Spring MVC 处理的请求。
  执行顺序上，一般是请求先经过 `Filter`，再进入 `DispatcherServlet`，然后经过 `HandlerInterceptor`，最后到 Controller。响应返回时顺序相反。
  使用场景也不太一样：`Filter` 常用于字符编码、跨域、日志、安全过滤等通用 Web 处理；`Interceptor` 常用于登录校验、权限判断、接口耗时统计、统一业务前置处理。
  还有一点，`Filter` 依赖 Servlet 容器，`Interceptor` 依赖 Spring MVC，所以拦截器里使用 Spring Bean 更方便。总体来说，过滤器更底层、更通用，拦截器更贴近 Spring MVC 业务处理流程。
- 参数绑定是谁做的？
  Spring MVC 的参数绑定主要是 `RequestMappingHandlerAdapter` 在调用 Controller 方法前做的。
  更具体一点，它内部会使用一组 `HandlerMethodArgumentResolver` 来解析方法参数，比如 `@RequestParam`、`@PathVariable`、`@RequestHeader`、`@RequestBody` 都有对应的参数解析器。
  如果是普通对象参数，比如表单提交绑定到一个 `User` 对象，会通过 `WebDataBinder` 做数据绑定，并结合 `ConversionService`、`PropertyEditor`、`Formatter` 做类型转换。
  如果是 `@RequestBody`，则不是普通表单绑定，而是通过 `HttpMessageConverter`，比如 Jackson，把 JSON 请求体反序列化成 Java 对象。
  所以面试里可以说：**参数解析入口在 `RequestMappingHandlerAdapter`，具体由 `HandlerMethodArgumentResolver` 负责，普通对象绑定会用到 `WebDataBinder` 和类型转换体系**。
- JSON 序列化由哪个组件完成？
  在 Spring MVC 里，JSON 序列化主要由 `HttpMessageConverter` 完成，常见实现是 `MappingJackson2HttpMessageConverter`。
  当 Controller 方法加了 `@ResponseBody`，或者使用 `@RestController` 时，返回值不会走视图解析，而是由 `RequestMappingHandlerAdapter` 调用返回值处理器处理，最终通过 `HttpMessageConverter` 把 Java 对象写成响应体。
  如果项目中使用 Jackson，那么真正把 Java 对象转换成 JSON 的是 Jackson 的 `ObjectMapper`，`MappingJackson2HttpMessageConverter` 是 Spring MVC 对它的封装和集成。
  所以面试可以回答：**Spring MVC 层面是 `HttpMessageConverter`，常用的是 `MappingJackson2HttpMessageConverter`；底层真正序列化的是 Jackson 的 `ObjectMapper`**。

### @RequestMapping 有什么作用？

`@RequestMapping` 用于把 HTTP 请求路径、方法、参数、请求头等条件映射到 Controller 类或方法上。实际项目中常用 `@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping` 这些组合注解。

#### 常见追问

- `@GetMapping` 和 `@RequestMapping` 有什么关系？
  `@GetMapping` 是 `@RequestMapping` 的组合注解，也可以理解成快捷写法。
  它等价于：`@RequestMapping(method = RequestMethod.GET)`。
  比如：`@GetMapping("/user")` 和 `@RequestMapping(value = "/user", method = RequestMethod.GET)` 效果基本一样。
  它们最终都会被 Spring MVC 解析成请求映射信息，由 `RequestMappingHandlerMapping` 注册和匹配。
  区别主要是语义上更清晰，`@GetMapping` 只能处理 GET 请求，而 `@RequestMapping` 更通用，可以指定 GET、POST、PUT、DELETE 等多种请求方法。
- 路径变量和请求参数怎么接收？
  路径变量用 @PathVariable 接收，请求参数用 @RequestParam 接收。

### Spring MVC 和 Struts 有什么区别？

Struts 是传统 MVC 框架，通常以 Action 为核心；
Spring MVC 是 Spring 生态中的 Web MVC 框架，和 IoC、AOP、事务等能力整合更自然。
Spring MVC 以方法为粒度处理请求，更适合 REST API 和现代 Web 应用。Struts 现在主要出现在老项目维护场景。

#### 常见追问

- 为什么现在更常用 Spring MVC？
  主要是因为它和 Spring 生态集成得非常好，开发效率高，也更适合现在的 Web 和 REST 接口开发。
  Spring MVC 提供了更清晰的分层模型，注解驱动更方便，还内置了参数绑定、数据校验、类型转换、异常处理、文件上传、JSON 序列化等能力，配合 Jackson、Hibernate Validator 等组件使用很方便。另外 Spring MVC 扩展性也比较强，比如可以扩展拦截器、参数解析器、返回值处理器、消息转换器等。
- Struts2 的 Action 是线程安全的吗？
  默认是线程安全的。
   Struts2 对每个请求都会创建一个新的 Action 实例，不是多个线程共享同一个 Action 对象，所以 Action 里面定义普通成员变量接收请求参数，一般不会有线程安全问题。
   不过 Struts2 也不是所有情况都绝对安全，如果在 Action 里使用了 static 变量、共享对象、单例 Service 中的可变状态，或者和 Spring 整合时把 Action 配成单例，就仍然可能出现线程安全问题。
   所以面试里可以说：**Struts2 的 Action 默认每次请求一个实例，本身是线程安全的，但共享资源仍然需要自己保证线程安全**。
- Spring MVC 如何支持前后端分离？
  通过提供 REST 风格接口，后端只返回数据，不再返回 JSP 这类页面。
  常用方式是用 @RestController，它相当于 @Controller + @ResponseBody，方法返回对象时会通过 HttpMessageConverter 转成 JSON，常见实现是 Jackson。
  前端通过 Ajax、Axios、Fetch 这类方式请求接口，后端返回 JSON 数据，页面路由和渲染由前端框架负责。
  另外前后端分离还会配合统一响应格式、全局异常处理、参数校验、跨域配置和接口鉴权。
  跨域可以通过 @CrossOrigin 或实现 WebMvcConfigurer 配置 CORS；统一异常一般用 @ControllerAdvice + @ExceptionHandler；参数校验可以用 @Valid。
  所以总结就是：**Spring MVC 通过 REST 接口、JSON 序列化、统一异常处理、参数绑定校验和跨域支持，来很好地支撑前后端分离开发**。
