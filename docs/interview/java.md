---
title: 'Java 高频题'
description: 'Java 高频面试题整理，覆盖面向对象、字符串、异常、反射、集合、泛型、序列化和设计模式，适合后端面试复习。'
outline: [2, 3]
---

# Java 高频题

本页整理 Java 基础面试中的高频问题，重点覆盖语言基础、面向对象、集合、异常、泛型、注解反射、序列化和常见设计模式。回答时建议先给结论，再补关键机制，最后结合业务场景说明取舍。

## 面向对象与语言特性

### 普通类和抽象类有哪些区别？

普通类可以直接实例化，抽象类不能直接实例化。<br>抽象类可以包含抽象方法，用来约束子类必须实现某些行为；普通类不能包含抽象方法。<br>抽象类更适合抽取一组类的公共状态和公共行为。

#### 常见追问

- 抽象类一定要有抽象方法吗？
    Java 中抽象类可以没有抽象方法。
- 抽象类可以有构造方法吗？
    抽象类可以有构造方法，但这个构造方法不是用来直接创建抽象类对象的，而是给子类实例化时初始化父类部分使用的。
- 抽象类和接口怎么选？
    抽象类适合表示“是什么”，用于同类对象的公共代码复用；接口适合表示“能做什么”，用于定义能力规范。需要公共属性、构造方法、模板逻辑时选抽象类；需要多实现、解耦和扩展时选接口。

#### 关联文档

- [面向对象基础](/java-core/language#basic-syntax)

### 接口和抽象类有什么区别？

接口强调能力规范，类通过 `implements` 实现接口，并且可以实现多个接口；<br>抽象类强调公共父类抽象，类通过 `extends` 继承抽象类，但 Java 只支持单继承。<br>抽象类可以有构造方法和成员变量，接口更适合定义行为契约。

#### 深入解释

Java 8 以后接口可以定义默认方法和静态方法，但接口仍然不适合保存对象状态。一般来说，多个无关类具备同一种能力时用接口；多个类有明显父子关系，并且需要复用公共字段和公共逻辑时用抽象类。

#### 常见追问

- Java 8 之后接口可以有哪些方法？
  Java 8 之后，接口除了可以定义抽象方法以外，还可以定义 default 默认方法和 static 静态方法。
  默认方法可以有方法体，主要是为了解决接口新增方法时，已有实现类不需要全部修改的问题。
  静态方法也是可以有方法体的，但是只能通过接口名调用，不能被实现类重写。
  Java 9 之后接口里还支持 private 私有方法，主要是给接口内部的默认方法做代码复用。
- 为什么 Java 类只能单继承？
  为了避免多继承带来的复杂性，比如经典的菱形继承问题。
如果一个类同时继承两个父类，而这两个父类里有同名方法或者同名属性，子类到底继承哪一个就会变得不明确。
- 什么时候用接口，什么时候用抽象类？
  定义规范，优先用接口；需要代码复用、维护公共状态，或者对子类提供统一骨架，再考虑抽象类。接口偏向“能做什么”，抽象类偏向“是什么”。

#### 关联文档

- [面向对象基础](/java-core/language#basic-syntax)

### Java 变量命名规则有哪些？

Java 变量名可以由字母、数字、下划线 `_` 和美元符号 `$` 组成，但首字符不能是数字，也不能使用 Java 关键字。工程中建议使用小驼峰命名，避免使用 `$`，让变量名表达业务含义。

#### 常见追问

- Java 标识符和关键字有什么区别？
  标识符是自己定义的名字，关键字是 Java 规定好的语法单词。
- 类名、方法名、常量名分别推荐怎么命名？
  类名：大驼峰命名法，每个单词首字母大写
  方法名：小驼峰命名法，首单词小写，后续单词首字母大写
  常量名：全大写，多个单词用下划线连接
- 为什么代码规范不推荐随意使用缩写？
  缩写会降低代码可读性，不同人对同一个缩写的理解可能不一样，后期维护成本会变高。

#### 关联文档

- [基础语法](/java-core/language#basic-syntax)

### Java 8 有哪些主要新特性？

Java 8 的核心新特性包括 Lambda 表达式、函数式接口、方法引用、Stream API、接口默认方法和静态方法、新日期时间 API `java.time`、`Optional` 以及 `CompletableFuture` 等。这些特性主要提升了集合处理、函数式编程和异步编程能力。

#### 常见追问

- Stream 和普通循环有什么区别？
  Stream 更偏函数式、声明式编程，普通循环更偏命令式编程。
  简单遍历或复杂控制逻辑用普通循环，集合的过滤、转换、分组、统计这类操作优先考虑 Stream。
- `Optional` 能完全避免空指针吗？
  不能完全避免空指针，Optional 只能降低空指针出现的概率，让空值语义更明确。
- 接口默认方法解决了什么问题？
  主要解决的是接口演进和兼容性问题。在不破坏已有实现类的前提下，给接口增加新能力，保证向后兼容。

#### 关联文档

- [Java 8+ 特性](/java-core/language#java-8-plus)

## 字符串与对象基础

### String 为什么不可变？

`String` 底层由字符数组封装，final修饰。不可变可以保证字符串常量池安全、Hash 值稳定、线程安全以及作为 Map key 时行为可靠。每次看似修改字符串，实际都会创建新对象或由编译器优化为 `StringBuilder` 拼接。

#### 常见追问

- `StringBuilder` 和 `StringBuffer` 有什么区别？
  StringBuilder 和 StringBuffer 都是可变字符串，StringBuffer 的方法大多加了 synchronized，是线程安全的，因为有同步开销，性能相对低一些。
  StringBuilder不保证线程安全，单线程场景性能更好。
- 循环中字符串拼接为什么不推荐用 `+`？
  String 是不可变的，每次用 + 拼接都会产生新的字符串对象。，导致频繁创建对象和 GC 压力。
- 字符串比较为什么要用 `equals()`？
  == 比较的是两个引用是否指向同一个对象，内存地址是否一样，equals才能比较内容是否相同。

#### 关联文档

- [字符串](/java-core/language#basic-syntax)

### equals 和 hashCode 有什么关系？

如果两个对象 `equals()` 返回 `true`，它们的 `hashCode()` 必须相同。否则放入 `HashMap`、`HashSet` 这类哈希集合时，会出现查找不到、重复元素等异常行为。

#### 常见追问

- `==` 和 `equals()` 有什么区别？
  == 对于基本数据类型，比较的是值，== 对于引用类型，比较的是引用地址，是否指向同一个对象。
  equals() 是 Object 里的方法，，默认实现也是比较地址，但是很多类会重写 equals()，重写后比较的是对象内容是否相等。
- 为什么哈希冲突不可避免？
  哈希空间是有限的，输入数据的可能性通常是无限或者远大于哈希空间的。
- 对象作为 Map key 要注意什么？
  要重写 equals() 和 hashCode()，像 HashMap 查找 key 时，会先通过 hashCode() 定位桶，再通过 equals() 判断是不是同一个 key。
  equals() 和 hashCode() 保持一致，两个对象 equals() 为 true， hashCode()也 必须相同。
  作为 key 的字段最好不要变，尤其是参与计算 hashCode() 和 equals() 的字段。如果 key 放进 HashMap 后这些字段被修改了，它的 hash 值可能变了，后续就可能查不到这个 key。
  尽量使用不可变对象作为 key，比如 String、包装类型，或者自己定义不可变类。
  **简单说就是：对象做 key，一定要保证相等规则稳定，hashCode 稳定。**

#### 关联文档

- [集合框架](/java-core/language#collections)

### Java 只有值传递是什么意思？

Java 方法参数传递的是值。对于基本类型，传递的是变量值；对于对象，传递的是对象引用的副本。方法内部可以通过引用副本修改对象内部状态，但不能让外部引用指向一个新对象。

#### 关联文档

- [值传递](/java-core/language#basic-syntax)

## 异常处理

### throw 和 throws 有什么区别？

`throw` 用在方法体内，表示抛出一个异常对象；`throws` 用在方法声明上，表示方法可能抛出某些异常，由调用方处理或继续向上抛出。

#### 常见追问

- 受检异常和非受检异常有什么区别？
  区别在于编译器是否强制处理。受检异常是继承自 Exception，编译会检查，方法里如果可能抛出，要么 try-catch，要么在方法签名上 throws 声明，比如 IOException、SQLException。；
  非受检异常一般指继承自 RuntimeException 的异常，编译器不强制处理，通常是程序逻辑问题导致的，比如 NullPointerException、IndexOutOfBoundsException、IllegalArgumentException。
  **受检异常一般表示调用方有机会恢复或必须感知的异常，比如文件不存在、数据库访问失败；非受检异常更多表示代码 bug 或参数不合法，通常应该通过修正代码或参数校验来避免。**
  Error 也属于非受检的，比如 OutOfMemoryError，但它一般表示 JVM 或系统级严重问题，应用程序通常不建议捕获。
- `RuntimeException` 需要 `throws` 声明吗？
  不需要，它属于非受检异常，编译器不会强制要求捕获或声明。
- 异常应该捕获还是继续抛出？
  如果当前层能处理，那就捕获处理。处理不了，就继续向上抛。

#### 关联文档

- [异常体系](/java-core/language#exceptions)

### try-catch-finally 哪些部分可以省略？

`try-catch-finally` 中，`catch` 和 `finally` 可以省略其中一个，但不能同时省略。也就是说，只要出现 `try`，后面至少要跟一个 `catch` 或 `finally`。

#### 常见追问

- try-with-resources 解决了什么问题？
  主要解决的是资源自动释放的问题。只要资源实现了 AutoCloseable 或 Closeable 接口，离开 try 代码块时 JVM 会自动调用 close 方法。比如：
  try (InputStream in = new FileInputStream(file)) { ... }
  执行完或者中间抛异常，in 都会被自动关闭。
  它还解决了一个细节问题：如果业务代码抛异常，close 时也抛异常，close 的异常不会直接覆盖原始异常，而是作为 suppressed exception 挂在原异常上，方便排查。
- 多个 `catch` 的顺序有什么要求？
  子类异常要写在前面，父类异常要写在后面。

#### 关联文档

- [异常体系](/java-core/language#exceptions)

### finally 一定会执行吗？

通常情况下，`finally` 会在方法真正返回前执行，即使 `catch` 中已经写了 `return`。但如果 JVM 退出、进程被强杀、机器断电等极端情况发生，`finally` 可能不会执行。不建议在 `finally` 中写 `return`，否则可能覆盖原返回值或异常。

![try-catch-finally 中 return 与 finally 执行顺序](/images/interview/java/try-catch-finally-return-flow.png)

上图展示了 `catch` 中出现 `return` 时的执行顺序：方法不会立刻返回，而是先执行 `finally`，再完成返回流程。因此不要在 `finally` 中再次 `return`，否则会覆盖前面的返回值或异常。

#### 常见追问

- `finally` 中 `return` 会发生什么？
  会覆盖 try 或 catch 中的 return 结果。如果 try 或 catch 里抛了异常，finally 里又 return，这个异常也会被吞掉，方法会正常返回 finally 的结果。
- try-with-resources 和 `finally` 有什么关系？
  try-with-resources 是更推荐的资源释放方式，底层还是类似 finally 保证资源关闭，但写法更简洁，异常信息也更完整。
- `System.exit()` 后 `finally` 会执行吗？
  System.exit() 之后 finally 不会执行。

#### 关联文档

- [异常体系](/java-core/language#exceptions)

### 常见异常有哪些？

常见异常包括：`NullPointerException` 空指针异常、`ClassNotFoundException` 类不存在、`NumberFormatException` 数字格式异常、`IndexOutOfBoundsException` 下标越界、`ClassCastException` 类型转换异常、`FileNotFoundException` 文件不存在、`NoSuchMethodException` 方法不存在、`IOException` IO 异常等。

#### 常见追问

- `Error` 和 `Exception` 有什么区别？
  Error 和 Exception 都是 Throwable 的子类，
  Exception 表示程序可以处理的异常，可以通过 try-catch 捕获处理。
  Error 表示比较严重的 JVM 或系统级错误，一般不是应用程序应该捕获和恢复的，通常发生后程序已经处于不可靠状态。
- Checked Exception 和 Unchecked Exception 有什么区别？
  Checked Exception 是受检异常，编译期会检查，方法里如果可能抛出，要么 try-catch 处理，要么在方法签名上用 throws 声明。典型的比如 IOException、SQLException、ClassNotFoundException。
  Unchecked Exception 是非受检异常，编译器不强制处理，主要包括 RuntimeException 及其子类，还有 Error。常见的比如 NullPointerException、IndexOutOfBoundsException。
  **Checked Exception 一般表示调用方有机会恢复或者必须感知的异常，比如文件不存在、数据库访问失败；Unchecked Exception` 更多表示编程错误、参数不合法、状态异常，通常应该通过代码逻辑提前避免。**
- 空指针异常如何排查和避免？
  排查靠堆栈定位和日志确认，避免靠参数校验、返回值约定、减少链式调用和良好的编码规范（返回集合时尽量返回空集合、字符串比较把常量放前面、对象要正确初始化、配合 @NotNull @Nullable IDE 静态检查 单元测试提前发现问题。）。

#### 关联文档

- [异常体系](/java-core/language#exceptions)

## 注解、反射与动态代理

### 注解的本质是什么？

注解本质上是继承 `java.lang.annotation.Annotation` 的特殊接口。运行时注解会被保留在 class 文件中，程序可以通过反射读取注解信息。JDK 在运行时通常会以动态代理对象的方式返回注解实例。

#### 常见追问

- `RetentionPolicy` 有哪些类型？
  **SOURCE**：注解只保留在源码阶段，编译后就没有了，比如 @Override、@SuppressWarnings，主要给编译器或开发工具使用。**CLASS**：注解会保留到 .class 字节码文件中，但运行时 JVM 不一定保留，反射一般拿不到。它也是默认策略。
  **RUNTIME**：注解不仅会保留到 .class 文件中，运行时也可以通过反射获取，像 Spring 里的很多注解就需要用这个策略。
- `@Target` 元注解有什么作用？
  用来指定一个注解可以标注在哪些位置上，比如可以限制注解只能用在类上、方法上、字段上、参数上等。它的值是 ElementType 枚举，多个用逗号间隔。
- Spring 是如何解析注解的？
  Spring 解析注解主要分两类：启动阶段解析和运行阶段使用。
  启动时通过字节码读取注解元数据，注册 BeanDefinition，再在 Bean 生命周期中通过各种后置处理器解析不同注解并完成依赖注入、初始化、AOP 等功能。

#### 关联文档

- [注解与反射](/java-core/language#annotations-reflection)

### 什么是反射？

反射是 Java 在运行时获取类信息并操作对象的能力。通过反射可以获取类名、字段、方法、构造器、注解等信息，也可以动态创建对象、调用方法、访问或修改字段。

#### 常见追问

- 反射为什么会影响性能？
  反射调用是动态解析的，JVM 很难像普通方法调用一样做内联优化、逃逸分析这些优化。
  反射调用需要做额外的检查，比如方法可见性检查、参数匹配、类型转换、装箱拆箱等，所以调用链更长。
  反射通常是通过 Method、Field 这些元数据对象间接访问，不是直接调用，少了一些编译期确定性。
  如果频繁使用反射，比如在循环里大量 invoke，性能损耗会比较明显。
  在 Spring 这类框架里，反射一般主要发生在启动阶段，运行时也会做缓存，所以正常业务里影响通常可控。
- 反射能访问 private 成员吗？
  可以，反射是可以访问 private 成员的。
  在 Java 9 之后有模块化限制，如果模块没有开放对应包，强行反射访问可能会报 InaccessibleObjectException，所以不是所有场景都一定能访问成功。
- Spring IoC 为什么大量使用反射？
  核心原因是 Spring 是一个通用容器，它在编译期并不知道我们会交给它哪些类，只能在运行时根据配置、注解和 BeanDefinition 去动态创建对象和装配依赖。反射的好处是灵活和解耦，会缓存 Constructor、Method、Field 这些元数据，避免每次重复解析。

#### 关联文档

- [注解与反射](/java-core/language#annotations-reflection)

### 什么是动态代理？

动态代理是在运行期动态生成代理对象，用代理对象增强目标对象的行为。JDK 动态代理基于接口实现，CGLIB 通过继承目标类生成子类实现。动态代理常见于 Spring AOP、RPC、Mock、权限控制和日志增强等场景。

#### 常见追问

- JDK 动态代理和 CGLIB 有什么区别？
  主要区别是代理方式不同。
  JDK 动态代理是基于接口的代理，要求目标类至少实现一个接口，代理对象实现同样的接口，然后通过 InvocationHandler 拦截方法调用。
  CGLIB 是基于继承的代理，它会生成目标类的子类，通过重写父类方法来增强，所以目标类不需要实现接口。
  JDK 动态代理适合面向接口编程，CGLIB 适合没有接口的类代理。
- Spring AOP 默认使用哪种代理？
  Spring AOP 默认不是固定只用一种代理，它的默认策略是：目标类实现了接口，就优先使用 JDK 动态代理；目标类没有实现接口，就使用 CGLIB 代理。
  配置了proxyTargetClass=true，比如 @EnableAspectJAutoProxy(proxyTargetClass = true)，就会强制使用 CGLIB。
- final 类能被 CGLIB 代理吗？
  不能。CGLIB 是通过生成目标类的子类来实现代理的，而 final 类不能被继承，final 方法也不能被 CGLIB 增强，因为子类无法重写它。

#### 关联文档

- [AOP 面向切面](/spring-core/aop)
- [注解与反射](/java-core/language#annotations-reflection)

## 集合与容器

### HashMap 为什么线程不安全？

`HashMap` 本身没有同步控制，多线程同时 `put`、扩容或修改链表 / 红黑树结构时，可能出现数据覆盖、结构异常或读取到不一致数据。并发读写场景应该使用 `ConcurrentHashMap`，或者在更高层用锁控制访问。

#### 深入解释

JDK 8 中 `HashMap` 底层是数组 + 链表 + 红黑树。写入时会先根据 key 的 hash 值定位桶位置，发生哈希冲突时挂到链表或红黑树上。并发写入时，多个线程可能同时计算桶位置、修改节点指针或触发扩容，导致结构状态不可预期。线程安全不仅是“不报错”，还包括可见性、原子性和结构一致性。

#### 常见追问

- JDK 8 的 `HashMap` 为什么引入红黑树？
- `ConcurrentHashMap` 如何保证线程安全？
- 为什么重写 `equals()` 必须重写 `hashCode()`？

#### 关联文档

- [集合框架](/java-core/language#collections)
- [并发容器](/java-core/concurrency#concurrent-containers)

### HashMap 的实现原理是什么？

JDK 8 中 `HashMap` 底层是数组 + 链表 + 红黑树。`put` 时先根据 key 的 hash 值定位桶位置，如果桶为空直接放入；如果发生哈希冲突，则在链表或红黑树中比较 key。链表长度达到阈值且数组容量足够时会树化。默认初始容量是 16，负载因子是 0.75，扩容通常变为原来的 2 倍。

#### 常见追问

- `HashMap` 为什么容量通常是 2 的幂？
- 链表什么时候树化？
- `HashMap` 扩容为什么可能影响性能？

#### 关联文档

- [集合框架](/java-core/language#collections)

### HashMap 和 Hashtable 有什么区别？

`HashMap` 允许 null key 和 null value，默认非线程安全；`Hashtable` 不允许 null，很多方法使用 `synchronized` 做方法级同步，是早期遗留类，性能较低。现代并发场景通常使用 `ConcurrentHashMap`，而不是 `Hashtable`。

#### 常见追问

- `ConcurrentHashMap` 如何保证线程安全？
- 为什么 `Hashtable` 不推荐使用？
- `HashMap` 为什么不是线程安全的？

#### 关联文档

- [集合框架](/java-core/language#collections)

### HashMap 和 TreeMap 怎么选？

如果只需要快速插入、删除、查找，通常选择 `HashMap`；如果需要按照 key 的自然顺序或自定义顺序遍历，选择 `TreeMap`。`HashMap` 基于哈希表，平均时间复杂度更低；`TreeMap` 基于红黑树，可以保持 key 有序。

#### 常见追问

- `TreeMap` 的时间复杂度是多少？
- `HashMap` 是否有序？
- `LinkedHashMap` 和 `TreeMap` 有什么区别？

#### 关联文档

- [集合框架](/java-core/language#collections)

### HashSet 的实现原理是什么？

`HashSet` 底层基于 `HashMap` 实现。添加元素时，元素会作为 `HashMap` 的 key，value 使用固定占位对象。因为 `HashMap` 的 key 不允许重复，所以 `HashSet` 可以保证元素不重复。

#### 常见追问

- `HashSet` 如何判断元素重复？
- 为什么重写 `equals()` 必须重写 `hashCode()`？
- `HashSet` 是有序的吗？

#### 关联文档

- [集合框架](/java-core/language#collections)

### List、Set、Map 有什么区别？

`List` 存储有序元素，允许重复；`Set` 不允许重复元素，是否有序取决于具体实现；`Map` 存储 key-value 键值对，key 不允许重复，value 可以重复。三者解决的问题不同：`List` 更像列表，`Set` 更像去重集合，`Map` 更像字典或索引表。

![Java 集合体系结构](/images/interview/java/java-collections-hierarchy.png)

上图用于快速区分 `Collection`、`List`、`Set`、`Queue`、`Map` 及其常见实现类。面试回答时重点说明 `List` 有序可重复，`Set` 用于去重，`Map` 用于 key-value 映射。

#### 常见追问

- `ArrayList`、`LinkedList`、`HashSet`、`TreeSet` 分别适合什么场景？
- `HashMap` 的 key 为什么要重写 `equals()` 和 `hashCode()`？
- `LinkedHashMap` 有什么特点？

#### 关联文档

- [集合框架](/java-core/language#collections)

### ArrayList 和 LinkedList 怎么选？

大多数业务场景默认用 `ArrayList`，因为随机访问快、内存连续、CPU 缓存友好。`LinkedList` 适合频繁头尾插入删除的队列场景，但随机访问慢，节点对象也有额外内存开销。

#### 深入解释

`ArrayList` 底层是动态数组，查询指定下标元素时可以直接按索引定位，扩容时通常扩为原容量的 1.5 倍。`LinkedList` 底层是双向链表，节点分散在堆内存中，虽然插入删除节点本身成本低，但定位节点需要遍历，且缓存局部性较差。

#### 常见追问

- `ArrayList` 扩容机制是什么？
- `LinkedList` 为什么随机访问慢？
- 多线程场景能不能直接用 `ArrayList`？

#### 关联文档

- [集合框架](/java-core/language#collections)

### 数组和 List 如何互相转换？

数组转 `List` 可以使用 `Arrays.asList(array)`，但返回的列表大小固定，不支持新增或删除。`List` 转数组可以使用 `list.toArray(new T[0])`。

#### 常见追问

- `Arrays.asList()` 返回的是 `java.util.ArrayList` 吗？
- 基本类型数组使用 `Arrays.asList()` 有什么坑？
- 为什么推荐 `toArray(new T[0])`？

#### 关联文档

- [集合框架](/java-core/language#collections)

### ArrayList 和 Vector 有什么区别？

`ArrayList` 是非线程安全的动态数组，性能较好；`Vector` 的很多方法使用 `synchronized` 修饰，是线程安全的遗留容器，但同步粒度粗，性能较低。扩容策略上，`ArrayList` 通常扩容为原容量的 1.5 倍，`Vector` 常见扩容为 2 倍。

#### 常见追问

- 多线程场景能直接使用 `Vector` 吗？
- `Collections.synchronizedList()` 和 `Vector` 有什么区别？
- `CopyOnWriteArrayList` 适合什么场景？

#### 关联文档

- [集合框架](/java-core/language#collections)
- [并发容器](/java-core/concurrency#concurrent-containers)

### Queue 的 poll 和 remove 有什么区别？

`poll()` 和 `remove()` 都会获取并删除队首元素。区别在于队列为空时，`poll()` 返回 `null`，而 `remove()` 会抛出 `NoSuchElementException`。

#### 常见追问

- `peek()` 和 `element()` 有什么区别？
- `Queue` 和 `Deque` 有什么区别？
- 阻塞队列有哪些常见实现？

#### 关联文档

- [集合框架](/java-core/language#collections)

### Iterator 是什么？怎么使用？

`Iterator` 是集合遍历接口，常用 `hasNext()` 判断是否还有元素，用 `next()` 获取下一个元素。遍历过程中如果需要删除当前元素，应使用 `iterator.remove()`，避免直接修改集合导致并发修改异常。

#### 常见追问

- fail-fast 和 fail-safe 有什么区别？
- foreach 底层是不是 `Iterator`？
- `Iterator` 和 `ListIterator` 有什么区别？

#### 关联文档

- [集合框架](/java-core/language#collections)

## 泛型与对象生命周期

### 泛型类是什么？

泛型类是在类名后声明类型参数的类，例如 `class Box<T>`。泛型可以把类型检查提前到编译期，减少强制类型转换，提高代码复用性。常见类型参数包括 `T`、`E`、`K`、`V`。

#### 常见追问

- Java 泛型为什么有类型擦除？
- `List<?>` 和 `List<Object>` 有什么区别？
- 泛型方法和泛型类有什么区别？

#### 关联文档

- [泛型](/java-core/language#generics)

### Java 中创建对象有哪些方式？

Java 创建对象常见方式包括：使用 `new` 调用构造器；使用反射调用 `Constructor.newInstance()`；实现 `Cloneable` 后调用 `clone()`；通过反序列化重建对象；通过工厂方法或工厂模式返回对象实例。

#### 常见追问

- `Class.newInstance()` 为什么不推荐？
- `clone()` 是深拷贝还是浅拷贝？
- 工厂模式创建对象有什么好处？

#### 关联文档

- [注解与反射](/java-core/language#annotations-reflection)

### Java 对象什么时候会被回收？

对象是否可回收主要通过可达性分析判断。JVM 从 GC Roots 出发，如果某个对象无法通过引用链到达，就说明该对象不可达，可以被垃圾回收。Java 主流 JVM 不依赖引用计数法，因为引用计数无法解决循环引用问题。

#### 常见追问

- 哪些对象可以作为 GC Roots？
- `finalize()` 为什么不推荐使用？
- 强引用、软引用、弱引用、虚引用有什么区别？

#### 关联文档

- [垃圾回收](/java-core/jvm#garbage-collection)

## 序列化与对象拷贝

### 什么是 Java 序列化？什么时候需要序列化？

Java 序列化是把对象状态转换成字节流的机制，反序列化则是从字节流恢复对象。常见场景包括对象落盘、网络传输、RPC / RMI 调用、缓存对象状态等。使用 Java 原生序列化时，对象通常需要实现 `Serializable` 接口。

#### 常见追问

- `serialVersionUID` 有什么作用？
- `transient` 关键字有什么作用？
- Java 原生序列化有什么缺点？

#### 关联文档

- [IO 与 NIO](/java-core/language#io-nio)

### 怎么把一个对象从一个 JVM 转移到另一个 JVM？

可以先把对象序列化成字节流，通过网络、消息队列或 RPC 传输到另一个 JVM，再反序列化恢复对象。工程中也可以通过共享数据库、Redis 等中间存储传递对象状态，而不是直接传递对象本身。

#### 常见追问

- RPC 框架为什么需要序列化协议？
- JSON、Protobuf、Java 原生序列化有什么区别？
- 分布式系统中传对象和传 ID 有什么取舍？

#### 关联文档

- [IO 与 NIO](/java-core/language#io-nio)
- [消息队列](/interview/mq)

### 深拷贝和浅拷贝怎么实现？

浅拷贝只复制对象本身和引用地址，引用字段指向的对象仍然共享；深拷贝会递归复制引用对象，副本和原对象互不影响。浅拷贝可以通过 `Cloneable + clone()` 实现，深拷贝可以通过手动递归复制、序列化 / 反序列化、JSON 转换等方式实现。

#### 常见追问

- `clone()` 方法默认是深拷贝还是浅拷贝？
- `transient` 字段会被序列化吗？
- 为什么不推荐滥用 `clone()`？

#### 关联文档

- [IO 与 NIO](/java-core/language#io-nio)

## 设计模式

### 常见设计模式有哪些？

常见设计模式包括单例模式、工厂模式、代理模式、策略模式等。单例模式保证对象全局唯一；工厂模式封装对象创建过程；代理模式在不修改目标对象的情况下增强访问；策略模式把不同算法封装起来，在运行时灵活切换。

#### 常见追问

- 简单工厂、工厂方法、抽象工厂有什么区别？
- 静态代理和动态代理有什么区别？
- 策略模式和模板方法模式有什么区别？

#### 关联文档

- [设计模式与架构](/practice/design-pattern)
