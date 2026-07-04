# 面试问题库

> 本文件仅用于新增面试题前核对是否重复，不作为 VitePress 页面展示。
> 来源为 `docs/interview/*.md` 中已有正式面试题和“常见追问”问题。
> 每增加一批新的面试题，都需要同步更新本文件。

## 统计

- 正式题：223
- 常见追问：595
- 总问题数：818
- 标准化唯一问题数：807
- 当前重复问题组：11

## 使用规则

1. 新增正式面试题前，先在本文件中搜索问题关键词。
2. 新增“常见追问”前，也需要在本文件中搜索问题关键词。
3. 每增加一批新的面试题，都必须同步更新本文件。
4. 如果发现语义重复，优先复用已有问题，或调整新增问题角度。
5. 如果问题表述相近但考察点不同，需要在正文中体现差异。
6. 新增、删除、改名面试问题后，需要同步更新问题、来源路径和行号。

## 问题清单

### docs/interview/concurrency.md

#### 线程基础

- [正式题] 创建线程有哪几种方式？
  来源：`docs/interview/concurrency.md:13`
- [常见追问] `Runnable` 和 `Callable` 有什么区别？
  来源：`docs/interview/concurrency.md:19`
- [常见追问] 为什么生产环境不推荐直接 `new Thread()`？
  来源：`docs/interview/concurrency.md:20`
- [常见追问] 线程池如何复用线程？
  来源：`docs/interview/concurrency.md:21`
- [正式题] Runnable 和 Callable 有什么区别？
  来源：`docs/interview/concurrency.md:27`
- [常见追问] `Future` 如何获取执行结果？
  来源：`docs/interview/concurrency.md:33`
- [常见追问] `FutureTask` 的作用是什么？
  来源：`docs/interview/concurrency.md:34`
- [常见追问] 异步任务异常怎么处理？
  来源：`docs/interview/concurrency.md:35`
- [正式题] run 和 start 有什么区别？
  来源：`docs/interview/concurrency.md:37`
- [常见追问] 为什么线程启动只能调用一次？
  来源：`docs/interview/concurrency.md:43`
- [常见追问] 线程启动后什么时候执行由谁决定？
  来源：`docs/interview/concurrency.md:44`
- [常见追问] 线程执行完还能再次启动吗？
  来源：`docs/interview/concurrency.md:45`
- [正式题] Java 线程有哪些状态？
  来源：`docs/interview/concurrency.md:47`
- [常见追问] `BLOCKED` 和 `WAITING` 有什么区别？
  来源：`docs/interview/concurrency.md:53`
- [常见追问] `sleep()` 后线程进入什么状态？
  来源：`docs/interview/concurrency.md:54`
- [常见追问] 如何查看线程状态？
  来源：`docs/interview/concurrency.md:55`
- [正式题] 守护线程是什么？
  来源：`docs/interview/concurrency.md:57`
- [常见追问] 如何设置守护线程？
  来源：`docs/interview/concurrency.md:63`
- [常见追问] 守护线程适合做什么？
  来源：`docs/interview/concurrency.md:64`
- [常见追问] 为什么不能把业务落库任务放到守护线程？
  来源：`docs/interview/concurrency.md:65`

#### 线程通信

- [正式题] sleep 和 wait 有什么区别？
  来源：`docs/interview/concurrency.md:69`
- [常见追问] 为什么 `wait()` 必须在同步代码块里调用？
  来源：`docs/interview/concurrency.md:75`
- [常见追问] `wait()` 被唤醒后会立刻执行吗？
  来源：`docs/interview/concurrency.md:76`
- [常见追问] `sleep()` 会释放锁吗？
  来源：`docs/interview/concurrency.md:77`
- [正式题] notify 和 notifyAll 有什么区别？
  来源：`docs/interview/concurrency.md:83`
- [常见追问] 为什么推荐用 while 判断等待条件？
  来源：`docs/interview/concurrency.md:89`
- [常见追问] 什么是虚假唤醒？
  来源：`docs/interview/concurrency.md:90`
- [常见追问] `Condition` 和 `wait/notify` 有什么区别？
  来源：`docs/interview/concurrency.md:91`

#### 线程池

- [正式题] 线程池核心参数有哪些？
  来源：`docs/interview/concurrency.md:95`
- [常见追问] CPU 密集型和 IO 密集型线程池怎么设置？
  来源：`docs/interview/concurrency.md:101`
- [常见追问] 拒绝策略有哪些？
  来源：`docs/interview/concurrency.md:102`
- [常见追问] 不同业务为什么要隔离线程池？
  来源：`docs/interview/concurrency.md:103`
- [正式题] 为什么不推荐 Executors？
  来源：`docs/interview/concurrency.md:109`
- [常见追问] `newFixedThreadPool` 的风险是什么？
  来源：`docs/interview/concurrency.md:115`
- [常见追问] `newCachedThreadPool` 的风险是什么？
  来源：`docs/interview/concurrency.md:116`
- [常见追问] 线程池队列为什么要有界？
  来源：`docs/interview/concurrency.md:117`
- [正式题] 线程池有哪些创建方式？
  来源：`docs/interview/concurrency.md:123`
- [常见追问] 定时任务线程池底层怎么实现？
  来源：`docs/interview/concurrency.md:129`
- [常见追问] `ForkJoinPool` 适合什么场景？
  来源：`docs/interview/concurrency.md:130`
- [常见追问] 为什么阿里 Java 规范不推荐 `Executors`？
  来源：`docs/interview/concurrency.md:131`
- [正式题] 线程池有哪些状态？
  来源：`docs/interview/concurrency.md:133`
- [常见追问] `shutdown()` 和 `shutdownNow()` 有什么区别？
  来源：`docs/interview/concurrency.md:139`
- [常见追问] 线程池如何优雅关闭？
  来源：`docs/interview/concurrency.md:140`
- [常见追问] 线程池状态存在哪里？
  来源：`docs/interview/concurrency.md:141`
- [正式题] submit 和 execute 有什么区别？
  来源：`docs/interview/concurrency.md:143`
- [常见追问] 为什么 `submit()` 后异常看起来被吞了？
  来源：`docs/interview/concurrency.md:149`
- [常见追问] `Future.get()` 会阻塞吗？
  来源：`docs/interview/concurrency.md:150`
- [常见追问] 如何设计异步任务超时？
  来源：`docs/interview/concurrency.md:151`

#### 锁与同步

- [正式题] volatile 能保证原子性吗？
  来源：`docs/interview/concurrency.md:155`
- [常见追问] `volatile` 适合什么场景？
  来源：`docs/interview/concurrency.md:161`
- [常见追问] `synchronized` 和 `volatile` 有什么区别？
  来源：`docs/interview/concurrency.md:162`
- [常见追问] 什么是 happens-before？
  来源：`docs/interview/concurrency.md:163`
- [正式题] synchronized 底层怎么实现？
  来源：`docs/interview/concurrency.md:169`
- [常见追问] 对象头里存了哪些锁信息？
  来源：`docs/interview/concurrency.md:175`
- [常见追问] 同步方法和同步代码块字节码有什么区别？
  来源：`docs/interview/concurrency.md:176`
- [常见追问] 为什么异常退出也能释放锁？
  来源：`docs/interview/concurrency.md:177`
- [正式题] synchronized 锁升级过程是什么？
  来源：`docs/interview/concurrency.md:183`
- [常见追问] 锁能降级吗？
  来源：`docs/interview/concurrency.md:189`
- [常见追问] 自旋锁解决什么问题？
  来源：`docs/interview/concurrency.md:190`
- [常见追问] 重量级锁为什么开销大？
  来源：`docs/interview/concurrency.md:191`
- [正式题] synchronized 和 ReentrantLock 有什么区别？
  来源：`docs/interview/concurrency.md:193`
- [常见追问] `ReentrantLock` 为什么要放在 finally 中释放？
  来源：`docs/interview/concurrency.md:199`
- [常见追问] 公平锁和非公平锁有什么区别？
  来源：`docs/interview/concurrency.md:200`
- [常见追问] `Condition` 解决什么问题？
  来源：`docs/interview/concurrency.md:201`
- [正式题] synchronized 和 Lock 有什么区别？
  来源：`docs/interview/concurrency.md:207`
- [常见追问] `tryLock()` 适合什么场景？
  来源：`docs/interview/concurrency.md:213`
- [常见追问] `Lock` 使用不当有什么风险？
  来源：`docs/interview/concurrency.md:214`
- [常见追问] 为什么 `synchronized` 越来越常用？
  来源：`docs/interview/concurrency.md:215`
- [正式题] synchronized 和 volatile 有什么区别？
  来源：`docs/interview/concurrency.md:217`
- [常见追问] `volatile` 为什么禁止指令重排？
  来源：`docs/interview/concurrency.md:223`
- [常见追问] 单例双重检查为什么需要 `volatile`？
  来源：`docs/interview/concurrency.md:224`
- [常见追问] `AtomicInteger` 和 `volatile int` 有什么区别？
  来源：`docs/interview/concurrency.md:225`
- [正式题] 什么是死锁？怎么预防？
  来源：`docs/interview/concurrency.md:227`
- [常见追问] 死锁的四个必要条件是什么？
  来源：`docs/interview/concurrency.md:233`
- [常见追问] 线上如何排查死锁？
  来源：`docs/interview/concurrency.md:234`
- [常见追问] 数据库死锁和 Java 死锁有什么区别？
  来源：`docs/interview/concurrency.md:235`

#### ThreadLocal 与原子类

- [正式题] ThreadLocal 是什么？适合什么场景？
  来源：`docs/interview/concurrency.md:239`
- [常见追问] `ThreadLocalMap` 的 key 为什么是弱引用？
  来源：`docs/interview/concurrency.md:245`
- [常见追问] 为什么线程池中使用后要 `remove()`？
  来源：`docs/interview/concurrency.md:246`
- [常见追问] `InheritableThreadLocal` 解决什么问题？
  来源：`docs/interview/concurrency.md:247`
- [正式题] atomic 原理是什么？
  来源：`docs/interview/concurrency.md:249`
- [常见追问] CAS 有什么缺点？
  来源：`docs/interview/concurrency.md:255`
- [常见追问] ABA 问题怎么解决？
  来源：`docs/interview/concurrency.md:256`
- [常见追问] `AtomicInteger` 和 `LongAdder` 有什么区别？
  来源：`docs/interview/concurrency.md:257`
- [正式题] AQS 是什么？
  来源：`docs/interview/concurrency.md:263`
- [常见追问] AQS 独占模式和共享模式有什么区别？
  来源：`docs/interview/concurrency.md:269`
- [常见追问] `state` 在不同同步器里表示什么？
  来源：`docs/interview/concurrency.md:270`
- [常见追问] AQS 为什么使用队列？
  来源：`docs/interview/concurrency.md:271`

### docs/interview/devops.md

#### 未分组

- [正式题] Docker 解决什么问题？
  来源：`docs/interview/devops.md:8`
- [正式题] Kubernetes 的核心能力是什么？
  来源：`docs/interview/devops.md:16`
- [正式题] CI/CD 流程通常包括什么？
  来源：`docs/interview/devops.md:24`
- [正式题] 线上问题如何定位？
  来源：`docs/interview/devops.md:32`

### docs/interview/hibernate.md

#### ORM 基础

- [正式题] ORM 框架是什么？
  来源：`docs/interview/hibernate.md:13`
- [常见追问] ORM 有什么优缺点？
  来源：`docs/interview/hibernate.md:19`
- [常见追问] JPA 和 Hibernate 有什么关系？
  来源：`docs/interview/hibernate.md:20`
- [常见追问] MyBatis 算不算 ORM？
  来源：`docs/interview/hibernate.md:21`
- [正式题] Hibernate 如何打印 SQL？
  来源：`docs/interview/hibernate.md:28`
- [常见追问] 如何打印 SQL 参数？
  来源：`docs/interview/hibernate.md:34`
- [常见追问] 生产环境如何排查慢 SQL？
  来源：`docs/interview/hibernate.md:35`
- [常见追问] Hibernate 生成的 SQL 为什么可能很复杂？
  来源：`docs/interview/hibernate.md:36`
- [正式题] Hibernate 查询方式有哪些？
  来源：`docs/interview/hibernate.md:38`
- [常见追问] HQL 和 SQL 有什么区别？
  来源：`docs/interview/hibernate.md:44`
- [常见追问] Criteria 为什么类型安全？
  来源：`docs/interview/hibernate.md:45`
- [常见追问] 什么时候需要原生 SQL？
  来源：`docs/interview/hibernate.md:46`

#### 实体与映射

- [正式题] Hibernate 实体类可以定义为 final 吗？
  来源：`docs/interview/hibernate.md:50`
- [常见追问] Hibernate 为什么需要代理？
  来源：`docs/interview/hibernate.md:56`
- [常见追问] final 方法会影响懒加载吗？
  来源：`docs/interview/hibernate.md:57`
- [常见追问] 实体类设计有哪些注意点？
  来源：`docs/interview/hibernate.md:58`
- [正式题] Hibernate 中 Integer 和 int 映射有什么区别？
  来源：`docs/interview/hibernate.md:60`
- [常见追问] 为什么实体类字段推荐使用包装类型？
  来源：`docs/interview/hibernate.md:66`
- [常见追问] Boolean 和 boolean 映射有什么区别？
  来源：`docs/interview/hibernate.md:67`
- [常见追问] 数据库 null 如何映射到 Java？
  来源：`docs/interview/hibernate.md:68`
- [正式题] Hibernate 实体类为什么需要无参构造？
  来源：`docs/interview/hibernate.md:70`
- [常见追问] 反射创建对象有什么要求？
  来源：`docs/interview/hibernate.md:76`
- [常见追问] protected 无参构造可以吗？
  来源：`docs/interview/hibernate.md:77`
- [常见追问] Lombok 会不会影响实体类？
  来源：`docs/interview/hibernate.md:78`

#### Session 与查询

- [正式题] Hibernate 工作流程是什么？
  来源：`docs/interview/hibernate.md:82`
- [常见追问] SessionFactory 为什么要复用？
  来源：`docs/interview/hibernate.md:88`
- [常见追问] Session 是线程安全的吗？
  来源：`docs/interview/hibernate.md:89`
- [常见追问] Hibernate 事务如何和 Spring 集成？
  来源：`docs/interview/hibernate.md:90`
- [正式题] get 和 load 有什么区别？
  来源：`docs/interview/hibernate.md:92`
- [常见追问] `load()` 为什么能懒加载？
  来源：`docs/interview/hibernate.md:98`
- [常见追问] 代理对象什么时候初始化？
  来源：`docs/interview/hibernate.md:99`
- [常见追问] 查不到数据时分别会怎样？
  来源：`docs/interview/hibernate.md:100`
- [正式题] getCurrentSession 和 openSession 有什么区别？
  来源：`docs/interview/hibernate.md:102`
- [常见追问] Session 不关闭有什么问题？
  来源：`docs/interview/hibernate.md:108`
- [常见追问] Session 和数据库连接是什么关系？
  来源：`docs/interview/hibernate.md:109`
- [常见追问] Spring 如何管理 Hibernate Session？
  来源：`docs/interview/hibernate.md:110`

#### 缓存与对象状态

- [正式题] Hibernate 缓存机制是什么？
  来源：`docs/interview/hibernate.md:114`
- [常见追问] 一级缓存什么时候失效？
  来源：`docs/interview/hibernate.md:120`
- [常见追问] 二级缓存适合缓存什么数据？
  来源：`docs/interview/hibernate.md:121`
- [常见追问] 查询缓存和二级缓存有什么区别？
  来源：`docs/interview/hibernate.md:122`
- [正式题] Hibernate 对象状态有哪些？
  来源：`docs/interview/hibernate.md:124`
- [常见追问] 持久态对象为什么修改后不用显式 update？
  来源：`docs/interview/hibernate.md:130`
- [常见追问] 游离态对象如何重新持久化？
  来源：`docs/interview/hibernate.md:131`
- [常见追问] 脏检查机制是什么？
  来源：`docs/interview/hibernate.md:132`

### docs/interview/java-web.md

#### Servlet 与 JSP

- [正式题] JSP 和 Servlet 有什么区别？
  来源：`docs/interview/java-web.md:13`
- [常见追问] JSP 为什么会被编译成 Servlet？
  来源：`docs/interview/java-web.md:19`
- [常见追问] MVC 中 Servlet 和 JSP 分别承担什么角色？
  来源：`docs/interview/java-web.md:20`
- [常见追问] 为什么现在项目很少直接使用 JSP？
  来源：`docs/interview/java-web.md:21`
- [正式题] JSP 有哪些内置对象？
  来源：`docs/interview/java-web.md:23`
- [常见追问] `request` 和 `session` 有什么区别？
  来源：`docs/interview/java-web.md:29`
- [常见追问] `application` 对应什么作用域？
  来源：`docs/interview/java-web.md:30`
- [常见追问] `exception` 对象什么时候可用？
  来源：`docs/interview/java-web.md:31`
- [正式题] JSP 四种作用域是什么？
  来源：`docs/interview/java-web.md:33`
- [常见追问] request 转发和重定向对作用域有什么影响？
  来源：`docs/interview/java-web.md:39`
- [常见追问] session 什么时候失效？
  来源：`docs/interview/java-web.md:40`
- [常见追问] application 作用域为什么要谨慎使用？
  来源：`docs/interview/java-web.md:41`

#### Session 与 Cookie

- [正式题] Session 和 Cookie 有什么区别？
  来源：`docs/interview/java-web.md:45`
- [常见追问] Cookie 安全属性有哪些？
  来源：`docs/interview/java-web.md:51`
- [常见追问] Session 为什么会有分布式共享问题？
  来源：`docs/interview/java-web.md:52`
- [常见追问] JWT 和 Session 有什么区别？
  来源：`docs/interview/java-web.md:53`
- [正式题] Session 工作原理是什么？
  来源：`docs/interview/java-web.md:60`
- [常见追问] sessionId 泄漏有什么风险？
  来源：`docs/interview/java-web.md:66`
- [常见追问] Session 过期时间在哪里配置？
  来源：`docs/interview/java-web.md:67`
- [常见追问] 分布式 Session 如何实现？
  来源：`docs/interview/java-web.md:68`
- [正式题] 禁用 Cookie 后 Session 还能用吗？
  来源：`docs/interview/java-web.md:70`
- [常见追问] URL 重写有什么安全风险？
  来源：`docs/interview/java-web.md:76`
- [常见追问] 移动端通常怎么维持登录态？
  来源：`docs/interview/java-web.md:77`
- [常见追问] Token 方案如何替代 Session？
  来源：`docs/interview/java-web.md:78`

#### 传统 MVC 与安全基础

- [正式题] Spring MVC 和 Struts 有什么区别？
  来源：`docs/interview/java-web.md:82`
- [常见追问] Struts2 的 Action 是线程安全的吗？
  来源：`docs/interview/java-web.md:88`
- [常见追问] Spring MVC 为什么更适合现代项目？
  来源：`docs/interview/java-web.md:89`
- [常见追问] 过滤器、拦截器和 AOP 有什么区别？
  来源：`docs/interview/java-web.md:90`
- [正式题] 如何避免 SQL 注入？
  来源：`docs/interview/java-web.md:96`
- [常见追问] `PreparedStatement` 为什么能防 SQL 注入？
  来源：`docs/interview/java-web.md:102`
- [常见追问] MyBatis 的 `#{}` 和 `${}` 有什么区别？
  来源：`docs/interview/java-web.md:103`
- [常见追问] 排序字段必须动态拼接时怎么处理？
  来源：`docs/interview/java-web.md:104`

#### Tomcat 与 WebLogic

- [正式题] Tomcat 是什么？
  来源：`docs/interview/java-web.md:113`
- [常见追问] Tomcat 是 Web 服务器还是应用服务器？
  来源：`docs/interview/java-web.md:119`
- [常见追问] Tomcat 和 Nginx 有什么区别？
  来源：`docs/interview/java-web.md:120`
- [常见追问] Spring Boot 为什么能直接启动 Web 服务？
  来源：`docs/interview/java-web.md:121`
- [正式题] Tomcat 的核心组件有哪些？
  来源：`docs/interview/java-web.md:127`
- [常见追问] Connector 和 Container 有什么区别？
  来源：`docs/interview/java-web.md:137`
- [常见追问] `Context` 对应什么？
  来源：`docs/interview/java-web.md:138`
- [常见追问] JSP 为什么最终会变成 Servlet？
  来源：`docs/interview/java-web.md:139`
- [正式题] Tomcat 的请求处理流程是什么？
  来源：`docs/interview/java-web.md:145`
- [常见追问] Filter 在请求流程中什么时候执行？
  来源：`docs/interview/java-web.md:151`
- [常见追问] DispatcherServlet 在 Tomcat 中是什么角色？
  来源：`docs/interview/java-web.md:152`
- [常见追问] Tomcat 线程池满了会怎样？
  来源：`docs/interview/java-web.md:153`
- [正式题] Tomcat 为什么要自定义类加载器？
  来源：`docs/interview/java-web.md:160`
- [常见追问] 双亲委派是什么？
  来源：`docs/interview/java-web.md:170`
- [常见追问] Tomcat 类加载器和普通 JVM 类加载器有什么区别？
  来源：`docs/interview/java-web.md:171`
- [常见追问] 为什么热部署容易导致类加载器泄漏？
  来源：`docs/interview/java-web.md:172`
- [正式题] Spring Boot 内嵌 Tomcat 和外部 Tomcat 有什么区别？
  来源：`docs/interview/java-web.md:179`
- [常见追问] Spring Boot jar 和 war 部署有什么区别？
  来源：`docs/interview/java-web.md:185`
- [常见追问] 内嵌 Tomcat 如何配置端口和线程池？
  来源：`docs/interview/java-web.md:186`
- [常见追问] 为什么微服务更常用内嵌容器？
  来源：`docs/interview/java-web.md:187`
- [正式题] WebLogic 是什么？
  来源：`docs/interview/java-web.md:194`
- [常见追问] WebLogic 为什么叫企业级应用服务器？
  来源：`docs/interview/java-web.md:200`
- [常见追问] WebLogic 常见于哪些项目？
  来源：`docs/interview/java-web.md:201`
- [常见追问] WebLogic 和 Spring Boot 是同一类东西吗？
  来源：`docs/interview/java-web.md:202`
- [正式题] Tomcat 和 WebLogic 有什么区别？
  来源：`docs/interview/java-web.md:208`
- [常见追问] 为什么 WebLogic 运维复杂度更高？
  来源：`docs/interview/java-web.md:214`
- [常见追问] 什么场景还会使用 WebLogic？
  来源：`docs/interview/java-web.md:215`
- [常见追问] 从 WebLogic 迁移到 Spring Boot 要注意什么？
  来源：`docs/interview/java-web.md:216`
- [正式题] 传统项目为什么会使用 WebLogic？
  来源：`docs/interview/java-web.md:223`
- [常见追问] 新项目为什么不一定选 WebLogic？
  来源：`docs/interview/java-web.md:229`
- [常见追问] WebLogic 迁移到 Kubernetes 有哪些难点？
  来源：`docs/interview/java-web.md:230`
- [常见追问] JNDI 数据源迁移到 Spring Boot 怎么处理？
  来源：`docs/interview/java-web.md:231`

### docs/interview/java.md

#### 面向对象与语言特性

- [正式题] 普通类和抽象类有哪些区别？
  来源：`docs/interview/java.md:13`
- [常见追问] 抽象类一定要有抽象方法吗？
  来源：`docs/interview/java.md:19`
- [常见追问] 抽象类可以有构造方法吗？
  来源：`docs/interview/java.md:21`
- [常见追问] 抽象类和接口怎么选？
  来源：`docs/interview/java.md:23`
- [正式题] 接口和抽象类有什么区别？
  来源：`docs/interview/java.md:30`
- [常见追问] Java 8 之后接口可以有哪些方法？
  来源：`docs/interview/java.md:40`
- [常见追问] 为什么 Java 类只能单继承？
  来源：`docs/interview/java.md:45`
- [常见追问] 什么时候用接口，什么时候用抽象类？
  来源：`docs/interview/java.md:48`
- [正式题] Java 变量命名规则有哪些？
  来源：`docs/interview/java.md:55`
- [常见追问] Java 标识符和关键字有什么区别？
  来源：`docs/interview/java.md:61`
- [常见追问] 类名、方法名、常量名分别推荐怎么命名？
  来源：`docs/interview/java.md:63`
- [常见追问] 为什么代码规范不推荐随意使用缩写？
  来源：`docs/interview/java.md:67`
- [正式题] Java 8 有哪些主要新特性？
  来源：`docs/interview/java.md:74`
- [常见追问] Stream 和普通循环有什么区别？
  来源：`docs/interview/java.md:80`
- [常见追问] `Optional` 能完全避免空指针吗？
  来源：`docs/interview/java.md:83`
- [常见追问] 接口默认方法解决了什么问题？
  来源：`docs/interview/java.md:85`

#### 字符串与对象基础

- [正式题] String 为什么不可变？
  来源：`docs/interview/java.md:94`
- [常见追问] `StringBuilder` 和 `StringBuffer` 有什么区别？
  来源：`docs/interview/java.md:100`
- [常见追问] 循环中字符串拼接为什么不推荐用 `+`？
  来源：`docs/interview/java.md:103`
- [常见追问] 字符串比较为什么要用 `equals()`？
  来源：`docs/interview/java.md:105`
- [正式题] equals 和 hashCode 有什么关系？
  来源：`docs/interview/java.md:112`
- [常见追问] `==` 和 `equals()` 有什么区别？
  来源：`docs/interview/java.md:118`
- [常见追问] 为什么哈希冲突不可避免？
  来源：`docs/interview/java.md:121`
- [常见追问] 对象作为 Map key 要注意什么？
  来源：`docs/interview/java.md:123`
- [正式题] Java 只有值传递是什么意思？
  来源：`docs/interview/java.md:134`

#### 异常处理

- [正式题] throw 和 throws 有什么区别？
  来源：`docs/interview/java.md:144`
- [常见追问] 受检异常和非受检异常有什么区别？
  来源：`docs/interview/java.md:150`
- [常见追问] `RuntimeException` 需要 `throws` 声明吗？
  来源：`docs/interview/java.md:155`
- [常见追问] 异常应该捕获还是继续抛出？
  来源：`docs/interview/java.md:157`
- [正式题] try-catch-finally 哪些部分可以省略？
  来源：`docs/interview/java.md:164`
- [常见追问] try-with-resources 解决了什么问题？
  来源：`docs/interview/java.md:170`
- [常见追问] 多个 `catch` 的顺序有什么要求？
  来源：`docs/interview/java.md:175`
- [正式题] finally 一定会执行吗？
  来源：`docs/interview/java.md:182`
- [常见追问] `finally` 中 `return` 会发生什么？
  来源：`docs/interview/java.md:192`
- [常见追问] try-with-resources 和 `finally` 有什么关系？
  来源：`docs/interview/java.md:194`
- [常见追问] `System.exit()` 后 `finally` 会执行吗？
  来源：`docs/interview/java.md:196`
- [正式题] 常见异常有哪些？
  来源：`docs/interview/java.md:203`
- [常见追问] `Error` 和 `Exception` 有什么区别？
  来源：`docs/interview/java.md:209`
- [常见追问] Checked Exception 和 Unchecked Exception 有什么区别？
  来源：`docs/interview/java.md:213`
- [常见追问] 空指针异常如何排查和避免？
  来源：`docs/interview/java.md:217`

#### 注解、反射与动态代理

- [正式题] 注解的本质是什么？
  来源：`docs/interview/java.md:226`
- [常见追问] `RetentionPolicy` 有哪些类型？
  来源：`docs/interview/java.md:232`
- [常见追问] `@Target` 元注解有什么作用？
  来源：`docs/interview/java.md:235`
- [常见追问] Spring 是如何解析注解的？
  来源：`docs/interview/java.md:237`
- [正式题] 什么是反射？
  来源：`docs/interview/java.md:245`
- [常见追问] 反射为什么会影响性能？
  来源：`docs/interview/java.md:251`
- [常见追问] 反射能访问 private 成员吗？
  来源：`docs/interview/java.md:257`
- [常见追问] Spring IoC 为什么大量使用反射？
  来源：`docs/interview/java.md:260`
- [正式题] 什么是动态代理？
  来源：`docs/interview/java.md:267`
- [常见追问] JDK 动态代理和 CGLIB 有什么区别？
  来源：`docs/interview/java.md:273`
- [常见追问] Spring AOP 默认使用哪种代理？
  来源：`docs/interview/java.md:278`
- [常见追问] final 类能被 CGLIB 代理吗？
  来源：`docs/interview/java.md:281`

#### 集合与容器

- [正式题] HashMap 为什么线程不安全？
  来源：`docs/interview/java.md:291`
- [常见追问] JDK 8 的 `HashMap` 为什么引入红黑树？
  来源：`docs/interview/java.md:301`
- [常见追问] `ConcurrentHashMap` 如何保证线程安全？
  来源：`docs/interview/java.md:302`
- [常见追问] 为什么重写 `equals()` 必须重写 `hashCode()`？
  来源：`docs/interview/java.md:303`
- [正式题] HashMap 的实现原理是什么？
  来源：`docs/interview/java.md:310`
- [常见追问] `HashMap` 为什么容量通常是 2 的幂？
  来源：`docs/interview/java.md:316`
- [常见追问] 链表什么时候树化？
  来源：`docs/interview/java.md:317`
- [常见追问] `HashMap` 扩容为什么可能影响性能？
  来源：`docs/interview/java.md:318`
- [正式题] HashMap 和 Hashtable 有什么区别？
  来源：`docs/interview/java.md:324`
- [常见追问] `ConcurrentHashMap` 如何保证线程安全？
  来源：`docs/interview/java.md:330`
- [常见追问] 为什么 `Hashtable` 不推荐使用？
  来源：`docs/interview/java.md:331`
- [常见追问] `HashMap` 为什么不是线程安全的？
  来源：`docs/interview/java.md:332`
- [正式题] HashMap 和 TreeMap 怎么选？
  来源：`docs/interview/java.md:338`
- [常见追问] `TreeMap` 的时间复杂度是多少？
  来源：`docs/interview/java.md:344`
- [常见追问] `HashMap` 是否有序？
  来源：`docs/interview/java.md:345`
- [常见追问] `LinkedHashMap` 和 `TreeMap` 有什么区别？
  来源：`docs/interview/java.md:346`
- [正式题] HashSet 的实现原理是什么？
  来源：`docs/interview/java.md:352`
- [常见追问] `HashSet` 如何判断元素重复？
  来源：`docs/interview/java.md:358`
- [常见追问] 为什么重写 `equals()` 必须重写 `hashCode()`？
  来源：`docs/interview/java.md:359`
- [常见追问] `HashSet` 是有序的吗？
  来源：`docs/interview/java.md:360`
- [正式题] List、Set、Map 有什么区别？
  来源：`docs/interview/java.md:366`
- [常见追问] `ArrayList`、`LinkedList`、`HashSet`、`TreeSet` 分别适合什么场景？
  来源：`docs/interview/java.md:376`
- [常见追问] `HashMap` 的 key 为什么要重写 `equals()` 和 `hashCode()`？
  来源：`docs/interview/java.md:377`
- [常见追问] `LinkedHashMap` 有什么特点？
  来源：`docs/interview/java.md:378`
- [正式题] ArrayList 和 LinkedList 怎么选？
  来源：`docs/interview/java.md:384`
- [常见追问] `ArrayList` 扩容机制是什么？
  来源：`docs/interview/java.md:394`
- [常见追问] `LinkedList` 为什么随机访问慢？
  来源：`docs/interview/java.md:395`
- [常见追问] 多线程场景能不能直接用 `ArrayList`？
  来源：`docs/interview/java.md:396`
- [正式题] 数组和 List 如何互相转换？
  来源：`docs/interview/java.md:402`
- [常见追问] `Arrays.asList()` 返回的是 `java.util.ArrayList` 吗？
  来源：`docs/interview/java.md:408`
- [常见追问] 基本类型数组使用 `Arrays.asList()` 有什么坑？
  来源：`docs/interview/java.md:409`
- [常见追问] 为什么推荐 `toArray(new T[0])`？
  来源：`docs/interview/java.md:410`
- [正式题] ArrayList 和 Vector 有什么区别？
  来源：`docs/interview/java.md:416`
- [常见追问] 多线程场景能直接使用 `Vector` 吗？
  来源：`docs/interview/java.md:422`
- [常见追问] `Collections.synchronizedList()` 和 `Vector` 有什么区别？
  来源：`docs/interview/java.md:423`
- [常见追问] `CopyOnWriteArrayList` 适合什么场景？
  来源：`docs/interview/java.md:424`
- [正式题] Queue 的 poll 和 remove 有什么区别？
  来源：`docs/interview/java.md:431`
- [常见追问] `peek()` 和 `element()` 有什么区别？
  来源：`docs/interview/java.md:437`
- [常见追问] `Queue` 和 `Deque` 有什么区别？
  来源：`docs/interview/java.md:438`
- [常见追问] 阻塞队列有哪些常见实现？
  来源：`docs/interview/java.md:439`
- [正式题] Iterator 是什么？怎么使用？
  来源：`docs/interview/java.md:445`
- [常见追问] fail-fast 和 fail-safe 有什么区别？
  来源：`docs/interview/java.md:451`
- [常见追问] foreach 底层是不是 `Iterator`？
  来源：`docs/interview/java.md:452`
- [常见追问] `Iterator` 和 `ListIterator` 有什么区别？
  来源：`docs/interview/java.md:453`

#### 泛型与对象生命周期

- [正式题] 泛型类是什么？
  来源：`docs/interview/java.md:461`
- [常见追问] Java 泛型为什么有类型擦除？
  来源：`docs/interview/java.md:467`
- [常见追问] `List<?>` 和 `List<Object>` 有什么区别？
  来源：`docs/interview/java.md:468`
- [常见追问] 泛型方法和泛型类有什么区别？
  来源：`docs/interview/java.md:469`
- [正式题] Java 中创建对象有哪些方式？
  来源：`docs/interview/java.md:475`
- [常见追问] `Class.newInstance()` 为什么不推荐？
  来源：`docs/interview/java.md:481`
- [常见追问] `clone()` 是深拷贝还是浅拷贝？
  来源：`docs/interview/java.md:482`
- [常见追问] 工厂模式创建对象有什么好处？
  来源：`docs/interview/java.md:483`
- [正式题] Java 对象什么时候会被回收？
  来源：`docs/interview/java.md:489`
- [常见追问] 哪些对象可以作为 GC Roots？
  来源：`docs/interview/java.md:495`
- [常见追问] `finalize()` 为什么不推荐使用？
  来源：`docs/interview/java.md:496`
- [常见追问] 强引用、软引用、弱引用、虚引用有什么区别？
  来源：`docs/interview/java.md:497`

#### 序列化与对象拷贝

- [正式题] 什么是 Java 序列化？什么时候需要序列化？
  来源：`docs/interview/java.md:505`
- [常见追问] `serialVersionUID` 有什么作用？
  来源：`docs/interview/java.md:511`
- [常见追问] `transient` 关键字有什么作用？
  来源：`docs/interview/java.md:512`
- [常见追问] Java 原生序列化有什么缺点？
  来源：`docs/interview/java.md:513`
- [正式题] 怎么把一个对象从一个 JVM 转移到另一个 JVM？
  来源：`docs/interview/java.md:519`
- [常见追问] RPC 框架为什么需要序列化协议？
  来源：`docs/interview/java.md:525`
- [常见追问] JSON、Protobuf、Java 原生序列化有什么区别？
  来源：`docs/interview/java.md:526`
- [常见追问] 分布式系统中传对象和传 ID 有什么取舍？
  来源：`docs/interview/java.md:527`
- [正式题] 深拷贝和浅拷贝怎么实现？
  来源：`docs/interview/java.md:534`
- [常见追问] `clone()` 方法默认是深拷贝还是浅拷贝？
  来源：`docs/interview/java.md:540`
- [常见追问] `transient` 字段会被序列化吗？
  来源：`docs/interview/java.md:541`
- [常见追问] 为什么不推荐滥用 `clone()`？
  来源：`docs/interview/java.md:542`

#### 设计模式

- [正式题] 常见设计模式有哪些？
  来源：`docs/interview/java.md:550`
- [常见追问] 简单工厂、工厂方法、抽象工厂有什么区别？
  来源：`docs/interview/java.md:556`
- [常见追问] 静态代理和动态代理有什么区别？
  来源：`docs/interview/java.md:557`
- [常见追问] 策略模式和模板方法模式有什么区别？
  来源：`docs/interview/java.md:558`

### docs/interview/jvm.md

#### JVM 组成

- [正式题] JVM 主要由哪些部分组成？
  来源：`docs/interview/jvm.md:13`
- [常见追问] 类加载器有哪些？
  来源：`docs/interview/jvm.md:19`
- [常见追问] 执行引擎为什么需要 JIT？
  来源：`docs/interview/jvm.md:20`
- [常见追问] 本地方法栈存什么？
  来源：`docs/interview/jvm.md:21`
- [正式题] JVM 内存结构是什么？
  来源：`docs/interview/jvm.md:27`
- [常见追问] 哪些区域线程共享？哪些线程私有？
  来源：`docs/interview/jvm.md:37`
- [常见追问] OOM 可能发生在哪些区域？
  来源：`docs/interview/jvm.md:38`
- [常见追问] 栈溢出和堆溢出有什么区别？
  来源：`docs/interview/jvm.md:39`
- [正式题] 堆和栈有什么区别？
  来源：`docs/interview/jvm.md:45`
- [常见追问] 局部变量一定在栈上吗？
  来源：`docs/interview/jvm.md:51`
- [常见追问] 对象一定在堆上吗？
  来源：`docs/interview/jvm.md:52`
- [常见追问] 什么是逃逸分析？
  来源：`docs/interview/jvm.md:53`
- [正式题] 队列和栈有什么区别？
  来源：`docs/interview/jvm.md:55`
- [常见追问] 递归为什么容易栈溢出？
  来源：`docs/interview/jvm.md:61`
- [常见追问] 阻塞队列适合什么场景？
  来源：`docs/interview/jvm.md:62`
- [常见追问] 栈和堆是数据结构还是内存区域？
  来源：`docs/interview/jvm.md:63`

#### 类加载

- [正式题] 双亲委派模型是什么？
  来源：`docs/interview/jvm.md:67`
- [常见追问] 双亲委派如何保证核心类安全？
  来源：`docs/interview/jvm.md:73`
- [常见追问] 什么场景会打破双亲委派？
  来源：`docs/interview/jvm.md:74`
- [常见追问] Tomcat 为什么要自定义类加载器？
  来源：`docs/interview/jvm.md:75`
- [正式题] 类加载过程是什么？
  来源：`docs/interview/jvm.md:81`
- [常见追问] 准备阶段和初始化阶段有什么区别？
  来源：`docs/interview/jvm.md:87`
- [常见追问] 静态代码块什么时候执行？
  来源：`docs/interview/jvm.md:88`
- [常见追问] 类什么时候会被初始化？
  来源：`docs/interview/jvm.md:89`

#### 对象回收与引用

- [正式题] 如何判断对象是否可回收？
  来源：`docs/interview/jvm.md:97`
- [常见追问] 哪些对象可以作为 GC Roots？
  来源：`docs/interview/jvm.md:103`
- [常见追问] 循环引用为什么不是问题？
  来源：`docs/interview/jvm.md:104`
- [常见追问] `finalize()` 为什么不推荐？
  来源：`docs/interview/jvm.md:105`
- [正式题] Java 引用类型有哪些？
  来源：`docs/interview/jvm.md:111`
- [常见追问] `WeakHashMap` 使用什么引用？
  来源：`docs/interview/jvm.md:117`
- [常见追问] 软引用适合做缓存吗？
  来源：`docs/interview/jvm.md:118`
- [常见追问] 虚引用和 `ReferenceQueue` 有什么关系？
  来源：`docs/interview/jvm.md:119`
- [正式题] 对象什么时候进入老年代？
  来源：`docs/interview/jvm.md:121`
- [常见追问] Minor GC 和 Full GC 有什么区别？
  来源：`docs/interview/jvm.md:127`
- [常见追问] 老年代满了会发生什么？
  来源：`docs/interview/jvm.md:128`
- [常见追问] 为什么频繁 Full GC 很危险？
  来源：`docs/interview/jvm.md:129`

#### 垃圾回收算法与收集器

- [正式题] JVM 垃圾回收算法有哪些？
  来源：`docs/interview/jvm.md:137`
- [常见追问] 新生代为什么适合复制算法？
  来源：`docs/interview/jvm.md:143`
- [常见追问] 老年代为什么不适合单纯复制算法？
  来源：`docs/interview/jvm.md:144`
- [常见追问] 什么是内存碎片？
  来源：`docs/interview/jvm.md:145`
- [正式题] 常见垃圾回收器有哪些？
  来源：`docs/interview/jvm.md:147`
- [常见追问] 吞吐量优先和低延迟优先怎么选？
  来源：`docs/interview/jvm.md:153`
- [常见追问] CMS 为什么被废弃？
  来源：`docs/interview/jvm.md:154`
- [常见追问] G1 为什么适合大堆？
  来源：`docs/interview/jvm.md:155`
- [正式题] CMS 垃圾回收器有什么特点？
  来源：`docs/interview/jvm.md:161`
- [常见追问] CMS 哪些阶段会 STW？
  来源：`docs/interview/jvm.md:167`
- [常见追问] CMS 为什么会产生碎片？
  来源：`docs/interview/jvm.md:168`
- [常见追问] Concurrent Mode Failure 是什么？
  来源：`docs/interview/jvm.md:169`
- [正式题] G1 和 CMS 有什么区别？
  来源：`docs/interview/jvm.md:171`
- [常见追问] G1 的 Region 有什么好处？
  来源：`docs/interview/jvm.md:177`
- [常见追问] Humongous Object 是什么？
  来源：`docs/interview/jvm.md:178`
- [常见追问] G1 适合所有场景吗？
  来源：`docs/interview/jvm.md:179`
- [正式题] 分代垃圾回收怎么工作？
  来源：`docs/interview/jvm.md:185`
- [常见追问] Survivor 区为什么要有两个？
  来源：`docs/interview/jvm.md:191`
- [常见追问] 对象年龄默认阈值是多少？
  来源：`docs/interview/jvm.md:192`
- [常见追问] 大对象为什么可能直接进入老年代？
  来源：`docs/interview/jvm.md:193`

#### JVM 调优与排查

- [正式题] Full GC 频繁怎么排查？
  来源：`docs/interview/jvm.md:197`
- [常见追问] CPU 飙高怎么定位？
  来源：`docs/interview/jvm.md:203`
- [常见追问] OOM 后现场如何保留？
  来源：`docs/interview/jvm.md:204`
- [常见追问] 为什么生产要开启 HeapDumpOnOutOfMemoryError？
  来源：`docs/interview/jvm.md:205`
- [正式题] JVM 调优工具有哪些？
  来源：`docs/interview/jvm.md:211`
- [常见追问] 如何排查线程死锁？
  来源：`docs/interview/jvm.md:217`
- [常见追问] 如何分析堆 dump？
  来源：`docs/interview/jvm.md:218`
- [常见追问] Arthas 常用命令有哪些？
  来源：`docs/interview/jvm.md:219`
- [正式题] 常见 JVM 参数有哪些？
  来源：`docs/interview/jvm.md:225`
- [常见追问] `-Xms` 和 `-Xmx` 为什么建议设置一致？
  来源：`docs/interview/jvm.md:231`
- [常见追问] JDK 9 之后 GC 日志参数有什么变化？
  来源：`docs/interview/jvm.md:232`
- [常见追问] 如何选择垃圾回收器？
  来源：`docs/interview/jvm.md:233`

### docs/interview/mq.md

#### MQ 通用问题

- [正式题] MQ 解决什么问题？
  来源：`docs/interview/mq.md:13`
- [常见追问] 哪些场景不适合引入 MQ？
  来源：`docs/interview/mq.md:19`
- [常见追问] MQ 如何削峰？
  来源：`docs/interview/mq.md:20`
- [常见追问] 引入 MQ 后系统复杂度体现在哪？
  来源：`docs/interview/mq.md:21`
- [正式题] 消息重复消费怎么办？
  来源：`docs/interview/mq.md:28`
- [常见追问] 为什么 MQ 会重复投递？
  来源：`docs/interview/mq.md:34`
- [常见追问] 消费端幂等放在哪里做？
  来源：`docs/interview/mq.md:35`
- [常见追问] 去重表如何设计？
  来源：`docs/interview/mq.md:36`
- [正式题] 如何保证消息不丢失？
  来源：`docs/interview/mq.md:42`
- [常见追问] 生产者发送失败怎么处理？
  来源：`docs/interview/mq.md:48`
- [常见追问] Broker 宕机如何保证消息不丢？
  来源：`docs/interview/mq.md:49`
- [常见追问] 消费者先提交 offset 再处理会怎样？
  来源：`docs/interview/mq.md:50`
- [正式题] 顺序消息怎么实现？
  来源：`docs/interview/mq.md:57`
- [常见追问] 全局顺序为什么代价高？
  来源：`docs/interview/mq.md:63`
- [常见追问] Kafka 如何保证分区内有序？
  来源：`docs/interview/mq.md:64`
- [常见追问] 消费失败会不会阻塞后续消息？
  来源：`docs/interview/mq.md:65`
- [正式题] 最终一致性怎么做？
  来源：`docs/interview/mq.md:72`
- [常见追问] 本地消息表怎么设计？
  来源：`docs/interview/mq.md:78`
- [常见追问] 事务消息解决什么问题？
  来源：`docs/interview/mq.md:79`
- [常见追问] 补偿任务如何避免重复执行？
  来源：`docs/interview/mq.md:80`

#### RabbitMQ

- [正式题] RabbitMQ 中有哪些重要角色？
  来源：`docs/interview/mq.md:88`
- [常见追问] Broker 和 Queue 有什么区别？
  来源：`docs/interview/mq.md:94`
- [常见追问] 生产者是否直接把消息发到队列？
  来源：`docs/interview/mq.md:95`
- [常见追问] 消费者如何确认消息？
  来源：`docs/interview/mq.md:96`
- [正式题] RabbitMQ 有哪些重要组件？
  来源：`docs/interview/mq.md:98`
- [常见追问] 为什么需要 Channel？
  来源：`docs/interview/mq.md:104`
- [常见追问] Exchange 和 Queue 是什么关系？
  来源：`docs/interview/mq.md:105`
- [常见追问] RoutingKey 和 BindingKey 有什么区别？
  来源：`docs/interview/mq.md:106`
- [正式题] RabbitMQ vhost 有什么作用？
  来源：`docs/interview/mq.md:108`
- [常见追问] vhost 和数据库 schema 类似吗？
  来源：`docs/interview/mq.md:114`
- [常见追问] 用户权限如何绑定 vhost？
  来源：`docs/interview/mq.md:115`
- [常见追问] 多租户场景如何隔离？
  来源：`docs/interview/mq.md:116`
- [正式题] RabbitMQ 消息是怎么发送的？
  来源：`docs/interview/mq.md:118`
- [常见追问] 为什么不每次发送都新建连接？
  来源：`docs/interview/mq.md:124`
- [常见追问] Channel 是线程安全的吗？
  来源：`docs/interview/mq.md:125`
- [常见追问] 消息没有路由到队列会怎样？
  来源：`docs/interview/mq.md:126`
- [正式题] RabbitMQ 如何保证发送稳定性？
  来源：`docs/interview/mq.md:128`
- [常见追问] confirm 和 return callback 有什么区别？
  来源：`docs/interview/mq.md:134`
- [常见追问] 事务模式为什么性能差？
  来源：`docs/interview/mq.md:135`
- [常见追问] 生产者重试如何避免重复消息？
  来源：`docs/interview/mq.md:136`
- [正式题] RabbitMQ 如何避免消息丢失？
  来源：`docs/interview/mq.md:138`
- [常见追问] durable 队列是否能保证消息不丢？
  来源：`docs/interview/mq.md:144`
- [常见追问] 消费者自动 ack 有什么风险？
  来源：`docs/interview/mq.md:145`
- [常见追问] RabbitMQ 镜像队列或 quorum queue 解决什么问题？
  来源：`docs/interview/mq.md:146`
- [正式题] RabbitMQ 持久化有什么缺点？
  来源：`docs/interview/mq.md:148`
- [常见追问] 所有消息都需要持久化吗？
  来源：`docs/interview/mq.md:154`
- [常见追问] 持久化和高可用是一回事吗？
  来源：`docs/interview/mq.md:155`
- [常见追问] 磁盘满了会发生什么？
  来源：`docs/interview/mq.md:156`
- [正式题] RabbitMQ 交换器类型有哪些？
  来源：`docs/interview/mq.md:158`
- [常见追问] 日志广播适合哪种交换器？
  来源：`docs/interview/mq.md:164`
- [常见追问] topic 中 `*` 和 `#` 有什么区别？
  来源：`docs/interview/mq.md:165`
- [常见追问] direct 和 topic 如何选择？
  来源：`docs/interview/mq.md:166`
- [正式题] RabbitMQ 延迟队列怎么实现？
  来源：`docs/interview/mq.md:168`
- [常见追问] TTL 设置在队列和消息上有什么区别？
  来源：`docs/interview/mq.md:174`
- [常见追问] 死信队列还能处理哪些场景？
  来源：`docs/interview/mq.md:175`
- [常见追问] 延迟消息适合订单超时关闭吗？
  来源：`docs/interview/mq.md:176`
- [正式题] RabbitMQ 集群有什么作用？
  来源：`docs/interview/mq.md:178`
- [常见追问] RabbitMQ 集群节点会完整复制所有消息吗？
  来源：`docs/interview/mq.md:184`
- [常见追问] 镜像队列有什么问题？
  来源：`docs/interview/mq.md:185`
- [常见追问] quorum queue 解决什么问题？
  来源：`docs/interview/mq.md:186`
- [正式题] RabbitMQ 节点类型有哪些？
  来源：`docs/interview/mq.md:188`
- [常见追问] 唯一磁盘节点宕机会怎样？
  来源：`docs/interview/mq.md:194`
- [常见追问] 为什么生产不建议只有一个磁盘节点？
  来源：`docs/interview/mq.md:195`
- [常见追问] 节点类型和消息持久化是什么关系？
  来源：`docs/interview/mq.md:196`
- [正式题] RabbitMQ 集群搭建要注意什么？
  来源：`docs/interview/mq.md:198`
- [常见追问] Erlang cookie 不一致会怎样？
  来源：`docs/interview/mq.md:204`
- [常见追问] 为什么节点名解析很重要？
  来源：`docs/interview/mq.md:205`
- [常见追问] 集群扩容如何迁移队列？
  来源：`docs/interview/mq.md:206`

#### Kafka

- [正式题] Kafka 是什么？
  来源：`docs/interview/mq.md:210`
- [常见追问] Kafka 为什么吞吐高？
  来源：`docs/interview/mq.md:216`
- [常见追问] Topic 和 Partition 有什么关系？
  来源：`docs/interview/mq.md:217`
- [常见追问] Consumer Group 解决什么问题？
  来源：`docs/interview/mq.md:218`
- [正式题] Kafka 可以脱离 ZooKeeper 吗？
  来源：`docs/interview/mq.md:224`
- [常见追问] KRaft 解决什么问题？
  来源：`docs/interview/mq.md:230`
- [常见追问] ZooKeeper 在旧 Kafka 中负责什么？
  来源：`docs/interview/mq.md:231`
- [常见追问] Kafka 为什么要去 ZooKeeper？
  来源：`docs/interview/mq.md:232`
- [正式题] Kafka 数据保留策略有哪些？
  来源：`docs/interview/mq.md:238`
- [常见追问] 同时设置 7 天和 10G 怎么清理？
  来源：`docs/interview/mq.md:244`
- [常见追问] Kafka 删除消息是立刻删除吗？
  来源：`docs/interview/mq.md:245`
- [常见追问] compaction 和 delete 有什么区别？
  来源：`docs/interview/mq.md:246`
- [正式题] Kafka 变慢可能是什么原因？
  来源：`docs/interview/mq.md:248`
- [常见追问] Consumer Lag 变大怎么排查？
  来源：`docs/interview/mq.md:254`
- [常见追问] 分区越多越好吗？
  来源：`docs/interview/mq.md:255`
- [常见追问] Kafka 为什么依赖顺序写磁盘？
  来源：`docs/interview/mq.md:256`
- [正式题] Kafka 集群节点数量怎么考虑？
  来源：`docs/interview/mq.md:258`
- [常见追问] 副本因子通常设置多少？
  来源：`docs/interview/mq.md:264`
- [常见追问] 分区数如何规划？
  来源：`docs/interview/mq.md:265`
- [常见追问] Broker 扩容后数据会自动均衡吗？
  来源：`docs/interview/mq.md:266`

#### Apache Pulsar

- [正式题] Pulsar 是什么？
  来源：`docs/interview/mq.md:270`
- [常见追问] Pulsar 适合什么场景？
  来源：`docs/interview/mq.md:276`
- [常见追问] Pulsar 和传统 MQ 有什么区别？
  来源：`docs/interview/mq.md:277`
- [常见追问] Pulsar 的 Topic 格式是什么？
  来源：`docs/interview/mq.md:278`
- [正式题] Pulsar 和 Kafka 有什么区别？
  来源：`docs/interview/mq.md:284`
- [常见追问] Kafka 的优势是什么？
  来源：`docs/interview/mq.md:290`
- [常见追问] Pulsar 的存储分离有什么好处？
  来源：`docs/interview/mq.md:291`
- [常见追问] 什么场景优先选 Pulsar？
  来源：`docs/interview/mq.md:292`
- [正式题] Pulsar 的订阅模式有哪些？
  来源：`docs/interview/mq.md:299`
- [常见追问] `Shared` 为什么不保证全局顺序？
  来源：`docs/interview/mq.md:305`
- [常见追问] `Failover` 和 `Exclusive` 有什么区别？
  来源：`docs/interview/mq.md:306`
- [常见追问] `Key_Shared` 适合哪些业务？
  来源：`docs/interview/mq.md:307`
- [正式题] Pulsar 为什么适合多租户？
  来源：`docs/interview/mq.md:309`
- [常见追问] Tenant 和 Namespace 分别解决什么问题？
  来源：`docs/interview/mq.md:315`
- [常见追问] 多租户和普通 Topic 命名规范有什么区别？
  来源：`docs/interview/mq.md:316`
- [常见追问] 多业务共用集群要注意什么？
  来源：`docs/interview/mq.md:317`
- [正式题] Pulsar 的 Broker 和存储分离有什么好处？
  来源：`docs/interview/mq.md:319`
- [常见追问] BookKeeper 在 Pulsar 中负责什么？
  来源：`docs/interview/mq.md:325`
- [常见追问] 存储分离会带来哪些复杂度？
  来源：`docs/interview/mq.md:326`
- [常见追问] Kafka 和 Pulsar 的架构差异体现在哪里？
  来源：`docs/interview/mq.md:327`
- [正式题] Pulsar 的 Key_Shared 订阅解决什么问题？
  来源：`docs/interview/mq.md:329`
- [常见追问] 局部有序和全局有序有什么区别？
  来源：`docs/interview/mq.md:335`
- [常见追问] key 设计不合理会有什么问题？
  来源：`docs/interview/mq.md:336`
- [常见追问] `Key_Shared` 和 Kafka 分区有序有什么区别？
  来源：`docs/interview/mq.md:337`

### docs/interview/mybatis.md

#### 参数绑定

- [正式题] MyBatis 中 #{} 和 ${} 有什么区别？
  来源：`docs/interview/mybatis.md:13`
- [常见追问] 为什么表名不能用 `#{}` 参数化？
  来源：`docs/interview/mybatis.md:19`
- [常见追问] 排序字段动态传入怎么防注入？
  来源：`docs/interview/mybatis.md:20`
- [常见追问] MyBatis 如何处理参数类型？
  来源：`docs/interview/mybatis.md:21`

#### 分页

- [正式题] MyBatis 逻辑分页和物理分页有什么区别？
  来源：`docs/interview/mybatis.md:30`
- [常见追问] 深分页为什么慢？
  来源：`docs/interview/mybatis.md:36`
- [常见追问] 如何优化 `limit offset` 深分页？
  来源：`docs/interview/mybatis.md:37`
- [常见追问] 分页插件如何识别数据库方言？
  来源：`docs/interview/mybatis.md:38`
- [正式题] RowBounds 会一次性查询全部结果吗？
  来源：`docs/interview/mybatis.md:40`
- [常见追问] RowBounds 适合什么场景？
  来源：`docs/interview/mybatis.md:46`
- [常见追问] 为什么逻辑分页不适合大数据量？
  来源：`docs/interview/mybatis.md:47`
- [常见追问] MyBatis-Plus 分页属于哪种？
  来源：`docs/interview/mybatis.md:48`
- [正式题] MyBatis 分页插件原理是什么？
  来源：`docs/interview/mybatis.md:50`
- [常见追问] 为什么分页插件要识别数据库方言？
  来源：`docs/interview/mybatis.md:56`
- [常见追问] count 查询如何优化？
  来源：`docs/interview/mybatis.md:57`
- [常见追问] 分页插件和手写 limit 有什么区别？
  来源：`docs/interview/mybatis.md:58`

#### 延迟加载与缓存

- [正式题] MyBatis 是否支持延迟加载？
  来源：`docs/interview/mybatis.md:62`
- [常见追问] 什么是 N+1 查询？
  来源：`docs/interview/mybatis.md:68`
- [常见追问] 延迟加载底层怎么触发？
  来源：`docs/interview/mybatis.md:69`
- [常见追问] MyBatis 和 Hibernate 的延迟加载有什么区别？
  来源：`docs/interview/mybatis.md:70`
- [正式题] MyBatis 一级缓存和二级缓存有什么区别？
  来源：`docs/interview/mybatis.md:72`
- [常见追问] 为什么一级缓存可能导致脏读误解？
  来源：`docs/interview/mybatis.md:78`
- [常见追问] 二级缓存为什么默认关闭？
  来源：`docs/interview/mybatis.md:79`
- [常见追问] 分布式环境下 MyBatis 二级缓存有什么风险？
  来源：`docs/interview/mybatis.md:80`

#### MyBatis 与 Hibernate

- [正式题] MyBatis 和 Hibernate 有什么区别？
  来源：`docs/interview/mybatis.md:84`
- [常见追问] MyBatis 算不算 ORM？
  来源：`docs/interview/mybatis.md:90`
- [常见追问] Hibernate 为什么调优难？
  来源：`docs/interview/mybatis.md:91`
- [常见追问] JPA、Hibernate、MyBatis 怎么选？
  来源：`docs/interview/mybatis.md:92`

#### 执行器与插件

- [正式题] MyBatis Executor 有哪些类型？
  来源：`docs/interview/mybatis.md:101`
- [常见追问] 批量插入为什么更快？
  来源：`docs/interview/mybatis.md:107`
- [常见追问] BatchExecutor 使用时要注意什么？
  来源：`docs/interview/mybatis.md:108`
- [常见追问] Statement 复用有什么收益？
  来源：`docs/interview/mybatis.md:109`
- [正式题] MyBatis 自定义插件怎么实现？
  来源：`docs/interview/mybatis.md:111`
- [常见追问] MyBatis 插件能拦截哪些对象？
  来源：`docs/interview/mybatis.md:117`
- [常见追问] 分页插件为什么常拦截 StatementHandler？
  来源：`docs/interview/mybatis.md:118`
- [常见追问] 插件链顺序会影响结果吗？
  来源：`docs/interview/mybatis.md:119`

### docs/interview/mysql.md

#### 数据库基础

- [正式题] 数据库三范式是什么？
  来源：`docs/interview/mysql.md:13`
- [常见追问] 为什么实际项目会反范式设计？
  来源：`docs/interview/mysql.md:19`
- [常见追问] 订单表为什么会冗余商品名称？
  来源：`docs/interview/mysql.md:20`
- [常见追问] 范式越高越好吗？
  来源：`docs/interview/mysql.md:21`
- [正式题] 如何获取 MySQL 版本？
  来源：`docs/interview/mysql.md:23`
- [常见追问] MySQL 5.7 和 8.0 有哪些差异？
  来源：`docs/interview/mysql.md:29`
- [常见追问] 为什么线上排查要先确认版本？
  来源：`docs/interview/mysql.md:30`
- [常见追问] 如何查看存储引擎？
  来源：`docs/interview/mysql.md:31`
- [正式题] char 和 varchar 有什么区别？
  来源：`docs/interview/mysql.md:33`
- [常见追问] 手机号应该用 char 还是 varchar？
  来源：`docs/interview/mysql.md:39`
- [常见追问] varchar 长度是不是越大越好？
  来源：`docs/interview/mysql.md:40`
- [常见追问] 字符集会影响存储空间吗？
  来源：`docs/interview/mysql.md:41`
- [正式题] 自增 ID 删除后重启再插入会怎样？
  来源：`docs/interview/mysql.md:43`
- [常见追问] 自增 ID 为什么可能不连续？
  来源：`docs/interview/mysql.md:49`
- [常见追问] 分布式系统为什么不一定用数据库自增 ID？
  来源：`docs/interview/mysql.md:50`
- [常见追问] InnoDB 自增锁是什么？
  来源：`docs/interview/mysql.md:51`

#### 事务与锁

- [正式题] ACID 是什么？
  来源：`docs/interview/mysql.md:59`
- [常见追问] 原子性靠什么实现？
  来源：`docs/interview/mysql.md:65`
- [常见追问] 持久性和 redo log 有什么关系？
  来源：`docs/interview/mysql.md:66`
- [常见追问] 隔离性和锁 / MVCC 有什么关系？
  来源：`docs/interview/mysql.md:67`
- [正式题] 事务隔离级别有哪些？
  来源：`docs/interview/mysql.md:69`
- [常见追问] 脏读、不可重复读、幻读分别是什么？
  来源：`docs/interview/mysql.md:75`
- [常见追问] MySQL 可重复读如何处理幻读？
  来源：`docs/interview/mysql.md:76`
- [常见追问] 隔离级别越高越好吗？
  来源：`docs/interview/mysql.md:77`
- [正式题] MVCC 是什么？
  来源：`docs/interview/mysql.md:84`
- [常见追问] Read View 包含哪些信息？
  来源：`docs/interview/mysql.md:90`
- [常见追问] 当前读和快照读有什么区别？
  来源：`docs/interview/mysql.md:91`
- [常见追问] MVCC 是否完全不需要锁？
  来源：`docs/interview/mysql.md:92`
- [正式题] 行锁和表锁有什么区别？
  来源：`docs/interview/mysql.md:98`
- [常见追问] 行锁一定只锁一行吗？
  来源：`docs/interview/mysql.md:104`
- [常见追问] 什么是间隙锁？
  来源：`docs/interview/mysql.md:105`
- [常见追问] 为什么索引失效可能导致锁范围变大？
  来源：`docs/interview/mysql.md:106`
- [正式题] 乐观锁和悲观锁有什么区别？
  来源：`docs/interview/mysql.md:108`
- [常见追问] 乐观锁更新失败怎么办？
  来源：`docs/interview/mysql.md:114`
- [常见追问] 悲观锁会带来什么问题？
  来源：`docs/interview/mysql.md:115`
- [常见追问] 数据库锁和 Java 锁有什么区别？
  来源：`docs/interview/mysql.md:116`

#### 索引与存储引擎

- [正式题] 为什么数据库索引常用 B+ 树？
  来源：`docs/interview/mysql.md:120`
- [常见追问] B 树和 B+ 树有什么区别？
  来源：`docs/interview/mysql.md:126`
- [常见追问] 为什么不用红黑树？
  来源：`docs/interview/mysql.md:127`
- [常见追问] 聚簇索引和非聚簇索引有什么区别？
  来源：`docs/interview/mysql.md:128`
- [正式题] 什么情况下索引会失效？
  来源：`docs/interview/mysql.md:135`
- [常见追问] `like '%abc'` 为什么难走索引？
  来源：`docs/interview/mysql.md:141`
- [常见追问] 联合索引最左前缀是什么？
  来源：`docs/interview/mysql.md:142`
- [常见追问] 隐式转换为什么危险？
  来源：`docs/interview/mysql.md:143`
- [正式题] 如何验证索引是否满足需求？
  来源：`docs/interview/mysql.md:149`
- [常见追问] `type` 中哪些值比较好？
  来源：`docs/interview/mysql.md:155`
- [常见追问] `Using filesort` 一定很差吗？
  来源：`docs/interview/mysql.md:156`
- [常见追问] `rows` 不准怎么办？
  来源：`docs/interview/mysql.md:157`
- [正式题] MySQL 常用存储引擎有哪些？
  来源：`docs/interview/mysql.md:159`
- [常见追问] InnoDB 为什么是默认选择？
  来源：`docs/interview/mysql.md:165`
- [常见追问] MyISAM 为什么不支持事务？
  来源：`docs/interview/mysql.md:166`
- [常见追问] 如何查看表的存储引擎？
  来源：`docs/interview/mysql.md:167`

#### 排查与优化

- [正式题] 慢 SQL 怎么排查？
  来源：`docs/interview/mysql.md:171`
- [常见追问] 慢查询阈值怎么设置？
  来源：`docs/interview/mysql.md:177`
- [常见追问] 如何排查偶发慢 SQL？
  来源：`docs/interview/mysql.md:178`
- [常见追问] SQL 优化一定是加索引吗？
  来源：`docs/interview/mysql.md:179`
- [正式题] MySQL 问题排查常用手段有哪些？
  来源：`docs/interview/mysql.md:185`
- [常见追问] `show processlist` 中 Sleep 很多怎么办？
  来源：`docs/interview/mysql.md:191`
- [常见追问] 如何排查锁等待？
  来源：`docs/interview/mysql.md:192`
- [常见追问] Buffer Pool 命中率低说明什么？
  来源：`docs/interview/mysql.md:193`
- [正式题] MySQL 性能优化有哪些方向？
  来源：`docs/interview/mysql.md:195`
- [常见追问] 为什么不推荐 `select *`？
  来源：`docs/interview/mysql.md:201`
- [常见追问] 大表分页怎么优化？
  来源：`docs/interview/mysql.md:202`
- [常见追问] 什么时候考虑分库分表？
  来源：`docs/interview/mysql.md:203`

### docs/interview/redis.md

#### 基础与场景

- [正式题] Redis 是什么？适合哪些场景？
  来源：`docs/interview/redis.md:13`
- [常见追问] Redis 为什么适合做缓存？
  来源：`docs/interview/redis.md:19`
- [常见追问] 哪些数据不适合放 Redis？
  来源：`docs/interview/redis.md:20`
- [常见追问] Redis 能不能替代数据库？
  来源：`docs/interview/redis.md:21`
- [正式题] Redis 为什么快？
  来源：`docs/interview/redis.md:27`
- [常见追问] Redis 单线程为什么还能高并发？
  来源：`docs/interview/redis.md:33`
- [常见追问] IO 多路复用是什么？
  来源：`docs/interview/redis.md:34`
- [常见追问] Redis 6 多线程解决什么问题？
  来源：`docs/interview/redis.md:35`
- [正式题] Redis 有哪些功能？
  来源：`docs/interview/redis.md:41`
- [常见追问] Redis 事务是否支持回滚？
  来源：`docs/interview/redis.md:47`
- [常见追问] Lua 脚本有什么作用？
  来源：`docs/interview/redis.md:48`
- [常见追问] Redis Stream 适合什么场景？
  来源：`docs/interview/redis.md:49`
- [正式题] Redis 和 Memcached 有什么区别？
  来源：`docs/interview/redis.md:51`
- [常见追问] Memcached 还有什么优势？
  来源：`docs/interview/redis.md:57`
- [常见追问] Redis value 最大可以多大？
  来源：`docs/interview/redis.md:58`
- [常见追问] 复杂数据结构会带来什么风险？
  来源：`docs/interview/redis.md:59`

#### 数据结构与客户端

- [正式题] Redis 常见数据类型有哪些？
  来源：`docs/interview/redis.md:63`
- [常见追问] 点赞数用什么类型？
  来源：`docs/interview/redis.md:69`
- [常见追问] 排行榜用什么类型？
  来源：`docs/interview/redis.md:70`
- [常见追问] 用户对象适合用 string 还是 hash？
  来源：`docs/interview/redis.md:71`
- [正式题] Redis Java 客户端有哪些？
  来源：`docs/interview/redis.md:73`
- [常见追问] Spring Boot 默认常用哪个客户端？
  来源：`docs/interview/redis.md:79`
- [常见追问] Redisson 分布式锁有什么优势？
  来源：`docs/interview/redis.md:80`
- [常见追问] Jedis 连接池为什么重要？
  来源：`docs/interview/redis.md:81`
- [正式题] Jedis 和 Redisson 有什么区别？
  来源：`docs/interview/redis.md:83`
- [常见追问] Redisson 锁如何续期？
  来源：`docs/interview/redis.md:89`
- [常见追问] Lettuce 和 Jedis 有什么区别？
  来源：`docs/interview/redis.md:90`
- [常见追问] 为什么不要自己随便实现 Redis 锁？
  来源：`docs/interview/redis.md:91`

#### 缓存问题

- [正式题] 缓存穿透、击穿、雪崩是什么？
  来源：`docs/interview/redis.md:95`
- [正式题] 缓存和数据库一致性怎么保证？
  来源：`docs/interview/redis.md:109`
- [常见追问] 为什么通常是删除缓存而不是更新缓存？
  来源：`docs/interview/redis.md:115`
- [常见追问] 延迟双删解决什么问题？
  来源：`docs/interview/redis.md:116`
- [常见追问] Canal + MQ 如何做缓存一致性？
  来源：`docs/interview/redis.md:117`

#### 分布式锁

- [正式题] Redis 分布式锁怎么实现？
  来源：`docs/interview/redis.md:126`
- [常见追问] 为什么要设置唯一 value？
  来源：`docs/interview/redis.md:132`
- [常见追问] 为什么释放锁要用 Lua？
  来源：`docs/interview/redis.md:133`
- [常见追问] Redisson watchdog 是什么？
  来源：`docs/interview/redis.md:134`
- [正式题] Redis 分布式锁有什么缺陷？
  来源：`docs/interview/redis.md:141`
- [常见追问] RedLock 是否一定可靠？
  来源：`docs/interview/redis.md:147`
- [常见追问] 分布式锁超时怎么设置？
  来源：`docs/interview/redis.md:148`
- [常见追问] 数据库锁和 Redis 锁怎么选？
  来源：`docs/interview/redis.md:149`

#### 持久化、内存与淘汰

- [正式题] RDB 和 AOF 有什么区别？
  来源：`docs/interview/redis.md:153`
- [常见追问] RDB 什么时候触发？
  来源：`docs/interview/redis.md:159`
- [常见追问] AOF rewrite 是什么？
  来源：`docs/interview/redis.md:160`
- [常见追问] 两者同时开启时 Redis 如何恢复？
  来源：`docs/interview/redis.md:161`
- [正式题] Redis 内存如何优化？
  来源：`docs/interview/redis.md:167`
- [常见追问] 什么是 big key？
  来源：`docs/interview/redis.md:173`
- [常见追问] 如何扫描大 key？
  来源：`docs/interview/redis.md:174`
- [常见追问] hash 一定比 string 省内存吗？
  来源：`docs/interview/redis.md:175`
- [正式题] Redis 淘汰策略有哪些？
  来源：`docs/interview/redis.md:177`
- [常见追问] LRU 和 LFU 有什么区别？
  来源：`docs/interview/redis.md:183`
- [常见追问] noeviction 会发生什么？
  来源：`docs/interview/redis.md:184`
- [常见追问] 缓存场景通常选哪种策略？
  来源：`docs/interview/redis.md:185`
- [正式题] Redis 常见性能问题有哪些？
  来源：`docs/interview/redis.md:187`
- [常见追问] RDB 快照为什么可能影响性能？
  来源：`docs/interview/redis.md:193`
- [常见追问] 主从复制延迟怎么排查？
  来源：`docs/interview/redis.md:194`
- [常见追问] Redis 慢查询怎么查看？
  来源：`docs/interview/redis.md:195`

### docs/interview/scenario.md

#### 未分组

- [正式题] 如何设计接口幂等？
  来源：`docs/interview/scenario.md:8`
- [正式题] 如何防止重复提交？
  来源：`docs/interview/scenario.md:16`
- [正式题] 秒杀超卖怎么解决？
  来源：`docs/interview/scenario.md:25`
- [正式题] 缓存一致性怎么处理？
  来源：`docs/interview/scenario.md:35`
- [正式题] 热点 Key 怎么处理？
  来源：`docs/interview/scenario.md:43`

### docs/interview/security.md

#### 未分组

- [正式题] Session 和 JWT 有什么区别？
  来源：`docs/interview/security.md:8`
- [正式题] Spring Security 核心流程是什么？
  来源：`docs/interview/security.md:16`
- [正式题] OAuth2 解决什么问题？
  来源：`docs/interview/security.md:24`
- [正式题] 接口鉴权通常怎么做？
  来源：`docs/interview/security.md:32`

### docs/interview/spring-boot.md

#### 自动配置与 Starter

- [正式题] Spring Boot 自动配置原理是什么？
  来源：`docs/interview/spring-boot.md:13`
- [常见追问] 条件注解有哪些？
  来源：`docs/interview/spring-boot.md:19`
- [常见追问] 自动配置为什么有时不生效？
  来源：`docs/interview/spring-boot.md:20`
- [正式题] @SpringBootApplication 包含哪些注解？
  来源：`docs/interview/spring-boot.md:26`
- [常见追问] 为什么启动类建议放在根包？
  来源：`docs/interview/spring-boot.md:32`
- [常见追问] `@EnableAutoConfiguration` 做了什么？
  来源：`docs/interview/spring-boot.md:33`
- [常见追问] 如何排除某个自动配置？
  来源：`docs/interview/spring-boot.md:34`
- [正式题] Starter 机制解决什么问题？
  来源：`docs/interview/spring-boot.md:36`
- [常见追问] 自定义 starter 怎么做？
  来源：`docs/interview/spring-boot.md:42`
- [常见追问] starter 和自动配置是什么关系？
  来源：`docs/interview/spring-boot.md:43`
- [常见追问] 为什么 starter 通常不写业务代码？
  来源：`docs/interview/spring-boot.md:44`

#### 配置文件

- [正式题] 配置文件加载顺序为什么重要？
  来源：`docs/interview/spring-boot.md:52`
- [常见追问] 命令行参数和配置文件谁优先？
  来源：`docs/interview/spring-boot.md:58`
- [常见追问] profile 怎么激活？
  来源：`docs/interview/spring-boot.md:59`
- [常见追问] 为什么线上配置不要打死在 jar 包里？
  来源：`docs/interview/spring-boot.md:60`
- [正式题] bootstrap.yml 和 application.yml 有什么区别？
  来源：`docs/interview/spring-boot.md:66`
- [常见追问] 为什么配置中心配置要更早加载？
  来源：`docs/interview/spring-boot.md:72`
- [常见追问] 新版 Spring Cloud 如何导入 Nacos 配置？
  来源：`docs/interview/spring-boot.md:73`
- [常见追问] bootstrap 配置不生效怎么排查？
  来源：`docs/interview/spring-boot.md:74`
- [正式题] properties 和 yml 有什么区别？
  来源：`docs/interview/spring-boot.md:76`
- [常见追问] yml 缩进错误会导致什么问题？
  来源：`docs/interview/spring-boot.md:82`
- [常见追问] 多环境 profile 怎么写？
  来源：`docs/interview/spring-boot.md:83`
- [常见追问] 配置绑定到对象用什么注解？
  来源：`docs/interview/spring-boot.md:84`

#### 工程实践

- [正式题] Spring Boot 热部署方式有哪些？
  来源：`docs/interview/spring-boot.md:88`
- [常见追问] DevTools 是热替换还是重启？
  来源：`docs/interview/spring-boot.md:94`
- [常见追问] 为什么生产不能使用 DevTools？
  来源：`docs/interview/spring-boot.md:95`
- [常见追问] JRebel 和 DevTools 有什么区别？
  来源：`docs/interview/spring-boot.md:96`
- [正式题] JPA 和 Hibernate 有什么区别？
  来源：`docs/interview/spring-boot.md:98`
- [常见追问] JPA 和 MyBatis 怎么选？
  来源：`docs/interview/spring-boot.md:104`
- [常见追问] Hibernate 为什么需要无参构造？
  来源：`docs/interview/spring-boot.md:105`
- [常见追问] ORM 框架有什么优缺点？
  来源：`docs/interview/spring-boot.md:106`

### docs/interview/spring-cloud.md

#### 未分组

- [正式题] 微服务为什么需要注册中心？
  来源：`docs/interview/spring-cloud.md:8`
- [正式题] OpenFeign 的作用是什么？
  来源：`docs/interview/spring-cloud.md:17`
- [正式题] Gateway 在微服务中做什么？
  来源：`docs/interview/spring-cloud.md:25`
- [正式题] Sentinel 解决什么问题？
  来源：`docs/interview/spring-cloud.md:33`

### docs/interview/spring.md

#### IoC 与 Bean

- [正式题] IoC 是什么？
  来源：`docs/interview/spring.md:13`
- [常见追问] BeanFactory 和 ApplicationContext 有什么区别？
  来源：`docs/interview/spring.md:19`
- [常见追问] Spring 如何完成依赖注入？
  来源：`docs/interview/spring.md:20`
- [常见追问] 循环依赖怎么解决？
  来源：`docs/interview/spring.md:21`
- [正式题] Spring 主要模块有哪些？
  来源：`docs/interview/spring.md:27`
- [常见追问] Spring Core 解决什么问题？
  来源：`docs/interview/spring.md:33`
- [常见追问] Spring AOP 用在哪些场景？
  来源：`docs/interview/spring.md:34`
- [常见追问] Spring MVC 属于哪个层面的能力？
  来源：`docs/interview/spring.md:35`
- [正式题] Spring 常用注入方式有哪些？
  来源：`docs/interview/spring.md:37`
- [常见追问] 为什么不推荐字段注入？
  来源：`docs/interview/spring.md:43`
- [常见追问] 构造器注入如何解决必需依赖？
  来源：`docs/interview/spring.md:44`
- [常见追问] `@Resource` 和 `@Autowired` 有什么区别？
  来源：`docs/interview/spring.md:45`
- [正式题] @Autowired 有什么作用？
  来源：`docs/interview/spring.md:47`
- [常见追问] `@Autowired` 默认按什么规则注入？
  来源：`docs/interview/spring.md:53`
- [常见追问] 多个同类型 Bean 怎么处理？
  来源：`docs/interview/spring.md:54`
- [常见追问] `@Autowired` 和 `@Resource` 有什么区别？
  来源：`docs/interview/spring.md:55`
- [正式题] Bean 生命周期是什么？
  来源：`docs/interview/spring.md:57`
- [常见追问] BeanPostProcessor 有什么作用？
  来源：`docs/interview/spring.md:63`
- [常见追问] AOP 代理对象在哪个阶段生成？
  来源：`docs/interview/spring.md:64`
- [常见追问] 初始化方法有哪些配置方式？
  来源：`docs/interview/spring.md:65`
- [正式题] Spring Bean 是否线程安全？
  来源：`docs/interview/spring.md:71`
- [常见追问] Controller 单例为什么通常没问题？
  来源：`docs/interview/spring.md:77`
- [常见追问] 有状态 Bean 怎么处理？
  来源：`docs/interview/spring.md:78`
- [常见追问] prototype Bean 一定线程安全吗？
  来源：`docs/interview/spring.md:79`
- [正式题] Spring Bean 作用域有哪些？
  来源：`docs/interview/spring.md:81`
- [常见追问] singleton 和 prototype 生命周期有什么区别？
  来源：`docs/interview/spring.md:87`
- [常见追问] request scope 在非 Web 环境可用吗？
  来源：`docs/interview/spring.md:88`
- [常见追问] 单例 Bean 引用 prototype Bean 有什么问题？
  来源：`docs/interview/spring.md:89`
- [正式题] Spring 如何解决循环依赖？
  来源：`docs/interview/spring.md:91`
- [常见追问] 为什么构造器循环依赖无法解决？
  来源：`docs/interview/spring.md:97`
- [常见追问] 三级缓存分别存什么？
  来源：`docs/interview/spring.md:98`
- [常见追问] AOP 代理和循环依赖有什么关系？
  来源：`docs/interview/spring.md:99`

#### XML 与自动装配

- [正式题] Spring XML 装载 Bean 的过程是什么？
  来源：`docs/interview/spring.md:107`
- [常见追问] BeanDefinition 是什么？
  来源：`docs/interview/spring.md:113`
- [常见追问] XML 配置和注解配置最终都会变成什么？
  来源：`docs/interview/spring.md:114`
- [常见追问] BeanFactoryPostProcessor 在哪个阶段执行？
  来源：`docs/interview/spring.md:115`
- [正式题] Spring 自动装配方式有哪些？
  来源：`docs/interview/spring.md:117`
- [常见追问] `byName` 和 `byType` 有什么区别？
  来源：`docs/interview/spring.md:123`
- [常见追问] 多个同类型 Bean 时 byType 会怎样？
  来源：`docs/interview/spring.md:124`
- [常见追问] 注解注入和 XML 自动装配有什么关系？
  来源：`docs/interview/spring.md:125`

#### AOP 与事务

- [正式题] AOP 是什么？
  来源：`docs/interview/spring.md:129`
- [常见追问] 切点、通知、切面分别是什么？
  来源：`docs/interview/spring.md:135`
- [常见追问] Spring AOP 和 AspectJ 有什么区别？
  来源：`docs/interview/spring.md:136`
- [常见追问] AOP 为什么会有自调用失效问题？
  来源：`docs/interview/spring.md:137`
- [正式题] AOP 底层怎么实现？
  来源：`docs/interview/spring.md:143`
- [常见追问] JDK 动态代理和 CGLIB 有什么区别？
  来源：`docs/interview/spring.md:149`
- [常见追问] final 方法能被代理增强吗？
  来源：`docs/interview/spring.md:150`
- [常见追问] Spring Boot 默认使用哪种代理？
  来源：`docs/interview/spring.md:151`
- [正式题] Spring 事务实现方式有哪些？
  来源：`docs/interview/spring.md:157`
- [常见追问] 声明式事务为什么依赖代理？
  来源：`docs/interview/spring.md:163`
- [常见追问] 编程式事务适合什么场景？
  来源：`docs/interview/spring.md:164`
- [常见追问] 多数据源事务怎么处理？
  来源：`docs/interview/spring.md:165`
- [正式题] Spring 事务隔离级别有哪些？
  来源：`docs/interview/spring.md:171`
- [常见追问] 不同隔离级别解决什么问题？
  来源：`docs/interview/spring.md:177`
- [常见追问] Spring 隔离级别和数据库隔离级别是什么关系？
  来源：`docs/interview/spring.md:178`
- [常见追问] 可重复读如何避免幻读？
  来源：`docs/interview/spring.md:179`
- [正式题] @Transactional 为什么会失效？
  来源：`docs/interview/spring.md:181`
- [常见追问] Spring 事务传播行为有哪些？
  来源：`docs/interview/spring.md:187`
- [常见追问] 默认回滚哪些异常？
  来源：`docs/interview/spring.md:188`
- [常见追问] 本地事务和分布式事务有什么区别？
  来源：`docs/interview/spring.md:189`

#### Spring MVC

- [正式题] Spring MVC 运行流程是什么？
  来源：`docs/interview/spring.md:197`
- [常见追问] `DispatcherServlet` 的作用是什么？
  来源：`docs/interview/spring.md:203`
- [常见追问] HandlerMapping 和 HandlerAdapter 有什么区别？
  来源：`docs/interview/spring.md:204`
- [常见追问] `@ResponseBody` 是怎么返回 JSON 的？
  来源：`docs/interview/spring.md:205`
- [正式题] Spring MVC 核心组件有哪些？
  来源：`docs/interview/spring.md:207`
- [常见追问] 拦截器和过滤器有什么区别？
  来源：`docs/interview/spring.md:213`
- [常见追问] 参数绑定是谁做的？
  来源：`docs/interview/spring.md:214`
- [常见追问] JSON 序列化由哪个组件完成？
  来源：`docs/interview/spring.md:215`
- [正式题] @RequestMapping 有什么作用？
  来源：`docs/interview/spring.md:217`
- [常见追问] `@GetMapping` 和 `@RequestMapping` 有什么关系？
  来源：`docs/interview/spring.md:223`
- [常见追问] 路径变量和请求参数怎么接收？
  来源：`docs/interview/spring.md:224`
- [常见追问] Controller 方法参数是怎么解析的？
  来源：`docs/interview/spring.md:225`
- [正式题] Spring MVC 和 Struts 有什么区别？
  来源：`docs/interview/spring.md:227`
- [常见追问] 为什么现在更常用 Spring MVC？
  来源：`docs/interview/spring.md:233`
- [常见追问] Struts2 的 Action 是线程安全的吗？
  来源：`docs/interview/spring.md:234`
- [常见追问] Spring MVC 如何支持前后端分离？
  来源：`docs/interview/spring.md:235`

### docs/interview/system-design.md

#### 未分组

- [正式题] 秒杀系统怎么设计？
  来源：`docs/interview/system-design.md:8`
- [正式题] 订单系统怎么设计？
  来源：`docs/interview/system-design.md:28`
- [正式题] 权限系统怎么设计？
  来源：`docs/interview/system-design.md:48`
- [正式题] 日志系统怎么设计？
  来源：`docs/interview/system-design.md:66`
- [正式题] 文件服务怎么设计？
  来源：`docs/interview/system-design.md:77`

### docs/interview/zookeeper.md

#### 基础概念

- [正式题] ZooKeeper 是什么？
  来源：`docs/interview/zookeeper.md:13`
- [常见追问] znode 有哪些类型？
  来源：`docs/interview/zookeeper.md:19`
- [常见追问] ZooKeeper 适合存大数据吗？
  来源：`docs/interview/zookeeper.md:20`
- [常见追问] ZooKeeper 和 Redis 分布式锁有什么区别？
  来源：`docs/interview/zookeeper.md:21`
- [正式题] ZooKeeper 有哪些功能？
  来源：`docs/interview/zookeeper.md:23`
- [常见追问] 临时节点有什么特点？
  来源：`docs/interview/zookeeper.md:29`
- [常见追问] 顺序节点适合做什么？
  来源：`docs/interview/zookeeper.md:30`
- [常见追问] Watcher 是一次性的吗？
  来源：`docs/interview/zookeeper.md:31`

#### 部署与集群

- [正式题] ZooKeeper 有哪些部署模式？
  来源：`docs/interview/zookeeper.md:35`
- [常见追问] 为什么 ZooKeeper 集群建议奇数台？
  来源：`docs/interview/zookeeper.md:41`
- [常见追问] 3 台和 4 台容错能力有什么区别？
  来源：`docs/interview/zookeeper.md:42`
- [常见追问] ZooKeeper 节点越多越好吗？
  来源：`docs/interview/zookeeper.md:43`
- [正式题] 集群为什么要有主节点？
  来源：`docs/interview/zookeeper.md:45`
- [常见追问] Leader 宕机后怎么办？
  来源：`docs/interview/zookeeper.md:51`
- [常见追问] 读请求一定走 Leader 吗？
  来源：`docs/interview/zookeeper.md:52`
- [常见追问] ZooKeeper 如何保证顺序一致性？
  来源：`docs/interview/zookeeper.md:53`
- [正式题] 3 台 ZooKeeper 宕机 1 台还能用吗？
  来源：`docs/interview/zookeeper.md:55`
- [常见追问] 5 台最多能宕机几台？
  来源：`docs/interview/zookeeper.md:61`
- [常见追问] 为什么不是只要剩一台就能工作？
  来源：`docs/interview/zookeeper.md:62`
- [常见追问] 网络分区时如何避免脑裂？
  来源：`docs/interview/zookeeper.md:63`

#### ZAB 与 Watcher

- [正式题] ZooKeeper 如何保证主从同步？
  来源：`docs/interview/zookeeper.md:67`
- [常见追问] ZAB 和 Paxos 有什么关系？
  来源：`docs/interview/zookeeper.md:73`
- [常见追问] 什么是 zxid？
  来源：`docs/interview/zookeeper.md:74`
- [常见追问] Leader 选举时如何比较数据新旧？
  来源：`docs/interview/zookeeper.md:75`
- [正式题] Watcher 通知机制是什么？
  来源：`docs/interview/zookeeper.md:77`
- [常见追问] Watcher 是服务端主动推送吗？
  来源：`docs/interview/zookeeper.md:83`
- [常见追问] Watcher 会不会丢事件？
  来源：`docs/interview/zookeeper.md:84`
- [常见追问] Curator 如何封装 Watcher？
  来源：`docs/interview/zookeeper.md:85`

#### 生态关系

- [正式题] Kafka 是否可以脱离 ZooKeeper？
  来源：`docs/interview/zookeeper.md:89`
- [常见追问] KRaft 模式解决了什么问题？
  来源：`docs/interview/zookeeper.md:95`
- [常见追问] Kafka 为什么要去 ZooKeeper？
  来源：`docs/interview/zookeeper.md:96`
- [常见追问] 老 Kafka 中 ZooKeeper 存哪些信息？
  来源：`docs/interview/zookeeper.md:97`

## 当前重复项索引

> 以下是当前项目中已存在的标准化重复问题。新增问题时需要优先避开或合并。

### `Runnable` 和 `Callable` 有什么区别？

- [常见追问] `docs/interview/concurrency.md:19` `Runnable` 和 `Callable` 有什么区别？
- [正式题] `docs/interview/concurrency.md:27` Runnable 和 Callable 有什么区别？

### `synchronized` 和 `volatile` 有什么区别？

- [常见追问] `docs/interview/concurrency.md:162` `synchronized` 和 `volatile` 有什么区别？
- [正式题] `docs/interview/concurrency.md:217` synchronized 和 volatile 有什么区别？

### MyBatis 算不算 ORM？

- [常见追问] `docs/interview/hibernate.md:21` MyBatis 算不算 ORM？
- [常见追问] `docs/interview/mybatis.md:90` MyBatis 算不算 ORM？

### Spring MVC 和 Struts 有什么区别？

- [正式题] `docs/interview/java-web.md:82` Spring MVC 和 Struts 有什么区别？
- [正式题] `docs/interview/spring.md:227` Spring MVC 和 Struts 有什么区别？

### Struts2 的 Action 是线程安全的吗？

- [常见追问] `docs/interview/java-web.md:88` Struts2 的 Action 是线程安全的吗？
- [常见追问] `docs/interview/spring.md:234` Struts2 的 Action 是线程安全的吗？

### Tomcat 为什么要自定义类加载器？

- [正式题] `docs/interview/java-web.md:160` Tomcat 为什么要自定义类加载器？
- [常见追问] `docs/interview/jvm.md:75` Tomcat 为什么要自定义类加载器？

### JDK 动态代理和 CGLIB 有什么区别？

- [常见追问] `docs/interview/java.md:273` JDK 动态代理和 CGLIB 有什么区别？
- [常见追问] `docs/interview/spring.md:149` JDK 动态代理和 CGLIB 有什么区别？

### `ConcurrentHashMap` 如何保证线程安全？

- [常见追问] `docs/interview/java.md:302` `ConcurrentHashMap` 如何保证线程安全？
- [常见追问] `docs/interview/java.md:330` `ConcurrentHashMap` 如何保证线程安全？

### 为什么重写 `equals()` 必须重写 `hashCode()`？

- [常见追问] `docs/interview/java.md:303` 为什么重写 `equals()` 必须重写 `hashCode()`？
- [常见追问] `docs/interview/java.md:359` 为什么重写 `equals()` 必须重写 `hashCode()`？

### 哪些对象可以作为 GC Roots？

- [常见追问] `docs/interview/java.md:495` 哪些对象可以作为 GC Roots？
- [常见追问] `docs/interview/jvm.md:103` 哪些对象可以作为 GC Roots？

### Kafka 为什么要去 ZooKeeper？

- [常见追问] `docs/interview/mq.md:232` Kafka 为什么要去 ZooKeeper？
- [常见追问] `docs/interview/zookeeper.md:96` Kafka 为什么要去 ZooKeeper？
