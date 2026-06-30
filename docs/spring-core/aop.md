# Spring AOP

AOP（面向切面编程）把日志、事务、权限、缓存这类**横切关注点**从业务代码里抽离出来，用统一的方式织入到方法调用前后。Spring 的事务、缓存、异步、方法级权限，底层都靠 AOP 实现。

> 本页内容为补充的 Java 后端通用知识，不属于原 Spring Cloud 技术栈文档。

## 解决什么问题

如果没有 AOP，日志、事务、权限校验这些代码会散落在每个方法里，重复且难维护：

```java
public void createOrder(Order order) {
    log.info("开始创建订单");          // 日志
    long start = System.currentTimeMillis();
    TransactionStatus tx = txManager.getTransaction(...); // 事务
    try {
        checkPermission();             // 权限
        orderMapper.insert(order);
        txManager.commit(tx);
    } catch (Exception e) {
        txManager.rollback(tx);
        throw e;
    }
    log.info("创建订单耗时 {}", System.currentTimeMillis() - start);
}
```

AOP 把这些通用逻辑集中到切面里，业务方法只保留核心逻辑。

## 核心概念

| 概念 | 含义 |
| --- | --- |
| 切面 Aspect | 横切关注点的模块，例如「日志切面」「事务切面」 |
| 连接点 Joinpoint | 程序执行中可以织入的点，Spring 中就是方法调用 |
| 切点 Pointcut | 一组连接点的匹配规则，决定切面作用在哪些方法上 |
| 通知 Advice | 切面在连接点上执行的动作（前置、后置、环绕等） |
| 织入 Weaving | 把切面应用到目标对象、生成代理对象的过程 |

## 五种通知类型

| 注解 | 执行时机 |
| --- | --- |
| `@Before` | 目标方法执行前 |
| `@AfterReturning` | 目标方法正常返回后 |
| `@AfterThrowing` | 目标方法抛异常后 |
| `@After` | 目标方法执行后（无论成功失败，类似 finally） |
| `@Around` | 包裹目标方法，可控制是否执行、修改入参和返回值，最强大 |

## 示例：方法执行耗时统计

```java
@Aspect
@Component
public class TimingAspect {

    // 切点：service 包下所有方法
    @Pointcut("execution(* com.example.*.service..*(..))")
    public void serviceMethods() {}

    @Around("serviceMethods()")
    public Object timing(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return pjp.proceed(); // 执行目标方法
        } finally {
            long cost = System.currentTimeMillis() - start;
            log.info("{} 耗时 {}ms", pjp.getSignature(), cost);
        }
    }
}
```

## 实现原理：动态代理

Spring AOP 是**运行时**通过动态代理实现的，不修改原始字节码：

- **JDK 动态代理**：目标类实现了接口时使用，基于接口生成代理。
- **CGLIB 代理**：目标类没有实现接口时使用，通过生成子类来代理。

```
调用方 -> 代理对象 -> 前置通知 -> 目标方法 -> 后置通知 -> 返回
```

Spring Boot 默认对所有 Bean 优先使用 CGLIB（`spring.aop.proxy-target-class=true`）。

## 常见坑：自调用导致 AOP 失效

AOP 依赖代理对象生效。如果在同一个类内部直接调用另一个被切的方法，走的是 `this` 而非代理对象，切面**不会触发**：

```java
@Service
public class OrderService {

    public void a() {
        b(); // ❌ this.b()，AOP 不生效（事务、日志切面都失效）
    }

    @Transactional
    public void b() { ... }
}
```

解决办法：

- 注入自身代理：`((OrderService) AopContext.currentProxy()).b()`（需开启 `exposeProxy = true`）。
- 把 `b()` 拆到另一个 Bean 里调用。
- 这也是 [`@Transactional` 事务失效](./transaction)最常见的原因之一。

## 选型建议

- 绝大多数场景用 **Spring AOP**（动态代理）就够了，开箱即用。
- 需要切**非 Spring 管理的对象**、构造方法、字段访问，或追求极致性能时，才考虑 **AspectJ** 编译期/加载期织入。
- 自定义切面常配合自定义注解使用（如 `@Log`、`@RateLimit`、`@RequirePermission`），让切点更精确、可读性更好。
