# Spring 面试题

## IoC 是什么？

### 标准回答

IoC 是控制反转，对象的创建、依赖管理和生命周期交给 Spring 容器处理。开发者不再主动 new 依赖对象，而是声明依赖关系，由容器负责装配。

### 常见追问

- BeanFactory 和 ApplicationContext 有什么区别？
- Spring 如何完成依赖注入？
- 循环依赖怎么解决？

### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

## Bean 生命周期是什么？

### 标准回答

Bean 生命周期大致包括实例化、属性填充、Aware 回调、BeanPostProcessor 前置处理、初始化方法、BeanPostProcessor 后置处理、使用、销毁。理解生命周期有助于排查注入、代理和初始化问题。

### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)

## AOP 底层怎么实现？

### 标准回答

Spring AOP 底层主要基于动态代理。接口代理通常使用 JDK 动态代理，类代理通常使用 CGLIB。方法调用进入代理对象后，代理对象按切面链执行前置、后置、异常等增强逻辑。

### 关联文档

- [AOP 面向切面](/spring-core/aop)

## @Transactional 为什么会失效？

### 标准回答

常见原因包括方法不是 public、自调用绕过代理、异常被捕获没有抛出、抛出受检异常但未配置回滚、事务方法所在类没有被 Spring 管理、传播行为配置不符合预期。

### 常见追问

- Spring 事务传播行为有哪些？
- 默认回滚哪些异常？
- 本地事务和分布式事务有什么区别？

### 关联文档

- [事务原理](/spring-core/transaction)

## Spring 如何解决循环依赖？

### 标准回答

Spring 通过三级缓存解决单例 Bean 的部分循环依赖，本质是在 Bean 完成属性填充前提前暴露对象引用。但构造器循环依赖无法解决，原型 Bean 循环依赖也不适用。

### 关联文档

- [IoC 与依赖注入](/spring-core/ioc)
