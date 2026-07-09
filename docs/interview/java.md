---
title: 'Java 高频题'
description: 'Java 高频面试题整理，覆盖面向对象、字符串、异常、反射、集合、泛型、序列化和设计模式，适合后端面试复习。'
outline: [2, 3]
---

# Java 高频题

本页整理 Java 基础面试中的高频问题，重点覆盖语言基础、面向对象、集合、异常、泛型、注解反射、序列化和常见设计模式。回答时建议先给结论，再补关键机制，最后结合业务场景说明取舍。

## 面向对象与语言特性

### 什么是面向对象？和面向过程有什么区别？

面向对象把系统拆成对象，通过对象的属性和行为表达业务；面向过程更关注步骤和函数调用。面向对象更强调封装、继承、多态和职责划分，适合复杂业务的扩展和维护；面向过程实现直接，适合流程简单、性能敏感或脚本化的场景。

#### 常见追问

- 面向对象一定比面向过程好吗？
- 封装解决了什么问题？
- 什么时候会出现过度设计？

### 面向对象的三大特性是什么？

面向对象三大特性是封装、继承和多态。封装隐藏对象内部细节，只暴露必要接口；继承复用父类能力并表达父子关系；多态让同一个接口在不同实现类上表现出不同行为。工程中要避免为了继承而继承，优先用清晰职责和组合降低耦合。

#### 常见追问

- 多态的前提是什么？
- 继承和组合怎么选？
- 封装是不是只靠 private 实现？

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

### Java 为什么不支持运算符重载？

Java 不支持自定义运算符重载，主要是为了保持语言简单、表达明确和代码可读。运算符如果可以被任意重载，不同类中同一个符号可能代表完全不同语义，容易增加维护成本。Java 更推荐通过清晰的方法名表达行为，例如 `plus()`、`compareTo()` 或业务语义方法。

#### 常见追问

- `String` 的 `+` 是不是运算符重载？
- Java 为什么保留方法重载？
- 运算符重载有什么风险？

### Java 中类为什么不支持多重继承？

Java 类不支持多重继承，是为了避免菱形继承、同名方法冲突和状态继承冲突。接口可以多继承，因为接口主要定义能力契约，默认方法冲突时实现类必须显式处理。Java 更推荐通过接口表达能力，通过组合复用实现。

#### 常见追问

- 接口多继承会不会产生冲突？
- 默认方法冲突怎么解决？
- 组合为什么通常比继承更灵活？

### Java 中有哪些访问修饰符？

Java 访问控制包括 `private`、默认访问、`protected` 和 `public`。`private` 只允许本类访问；默认访问只允许同包访问；`protected` 允许同包和子类访问；`public` 对所有包可见。访问范围应该尽量收窄，优先隐藏实现细节。

#### 常见追问

- 默认访问和 `protected` 有什么区别？
- 顶级类可以用哪些访问修饰符？
- 为什么字段通常不直接设置为 public？

### Java 中常见非访问修饰符有哪些？

常见非访问修饰符包括 `static`、`final`、`abstract`、`synchronized`、`volatile` 和 `transient`。`static` 表示类级成员；`final` 表示不可变引用、不可重写方法或不可继承类；`abstract` 用于抽象类和抽象方法；`synchronized` 用于同步；`volatile` 保证可见性和有序性；`transient` 表示序列化时忽略字段。

#### 常见追问

- `final` 修饰引用类型表示对象不可变吗？
- `volatile` 和 `synchronized` 有什么区别？
- `transient` 常用于什么场景？

### import 和 static import 有什么区别？

普通 `import` 引入类或包下的类，使用时可以省略完整包名；`static import` 引入类的静态成员，使用时可以省略类名。静态导入适合少量常量、工具方法或测试断言，但滥用会降低可读性，让调用来源不清晰。

#### 常见追问

- `import java.util.*` 会不会影响运行性能？
- 静态导入适合哪些场景？
- 为什么不建议大量使用通配符导入？

## 字符串与对象基础

### String 为什么不可变？

`String` 在java 8 底层由主要是 char[]，Java 9+ 主要是 byte[] + coder，final修饰。不可变可以保证字符串常量池安全、Hash 值稳定、线程安全以及作为 Map key 时行为可靠。每次看似修改字符串，实际都会创建新对象或由编译器优化为 `StringBuilder` 拼接。

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

### 为什么 char 数组比 String 更适合存储密码？

`String` 不可变，一旦创建就无法主动清理内容，密码可能在内存中停留到 GC 才被回收；`char[]` 可变，使用后可以通过填充字符主动擦除，减少敏感信息残留时间。因此处理密码这类敏感数据时，`char[]` 通常比 `String` 更合适。

#### 常见追问

- `char[]` 一定安全吗？
- 为什么日志里不能打印密码？
- 配置文件中的密码应该怎么保护？

### 什么是 NullPointerException？

`NullPointerException` 是访问空引用时抛出的运行时异常，例如调用空对象方法、访问空对象字段、获取空数组长度或对空引用拆箱。排查时应先看异常堆栈定位具体行，再确认变量来源、参数校验和返回值约定。

#### 常见追问

- 如何减少空指针异常？
- `Optional` 适合用在字段里吗？
- 自动拆箱为什么可能触发空指针？

### 方法重载和方法重写有什么区别？

重载发生在同一个类中，方法名相同但参数列表不同，属于编译期绑定；重写发生在子类和父类之间，子类重新实现父类可继承方法，属于运行期多态。重载不能只靠返回值区分，重写要求方法签名兼容，并且访问权限不能更严格。

#### 常见追问

- 重载能不能只改返回值？
- 重写时异常声明有什么限制？
- `@Override` 有什么作用？

### private 或 static 方法可以被重写吗？

`private` 方法不能被子类访问，因此不存在重写；子类中定义同名方法只是新方法。`static` 方法属于类，子类可以定义同名静态方法，但这是隐藏，不是运行期多态意义上的重写。真正的重写依赖对象实际类型进行动态绑定。

#### 常见追问

- static 方法为什么没有多态？
- final 方法能被重写吗？
- private 方法能被重载吗？

### Java 只有值传递是什么意思？

Java 方法参数传递的是值。对于基本类型，传递的是变量值；对于对象，传递的是对象引用的副本。方法内部可以通过引用副本修改对象内部状态，但不能让外部引用指向一个新对象。

#### 关联文档

- [值传递](/java-core/language#basic-syntax)

## 异常处理

### throw 和 throws 有什么区别？

`throw` 用在方法体内，表示抛出一个异常对象；`throws` 用在方法声明上，表示方法可能抛出某些异常，由调用方处理或继续向上抛出。

#### 常见追问

- 受检异常和非受检异常有什么区别？
  区别在于编译器是否强制处理。受检异常是除 RuntimeException 及其子类之外的 Exception 子类，编译会检查，方法里如果可能抛出，要么 try-catch，要么在方法签名上 throws 声明，比如 IOException、SQLException。；
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
  **Checked Exception 一般表示调用方有机会恢复或者必须感知的异常，比如文件不存在、数据库访问失败；` Unchecked Exception` 更多表示编程错误、参数不合法、状态异常，通常应该通过代码逻辑提前避免。**
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
  Spring AOP 默认不是固定只用一种代理，它的默认策略是： Spring AOP 默认有接口用 JDK 动态代理、无接口用 CGLIB；Spring Boot 默认配置通常会启用 CGLIB 代理，可通过 spring.aop.proxy-target-class=false 改回 JDK 动态代理。
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
  解决哈希冲突严重时链表查询效率低的问题。
  当桶的链表长度达到 8，并且数组长度至少是 64 时，会把链表转换成红黑树，查询效率可以从 O(n) 优化到 O(log n)。
- `ConcurrentHashMap` 如何保证线程安全？
  通过 CAS + synchronized + volatile 来保证线程安全的。
   **put** 的时候，如果桶为空，就用 CAS 直接插入节点；如果桶不为空，就对当前桶的头节点加 synchronized 锁，只锁住这个桶，不影响其他桶的并发操作。
   **get** 操作基本是不加锁的，因为 Node 里的 key、val、next 等关键字段用了 volatile 或者 final，保证了线程之间的可见性。
   **扩容时**多个线程可以一起协助迁移数据，通过 CAS 控制迁移进度，减少扩容阻塞。
   **统计 size**用 baseCount + CounterCell 分散竞争，提高并发性能。
   **总结**一下，ConcurrentHashMap 靠 volatile 保证可见性，CAS 保证无锁并发更新，synchronized 保证桶级别互斥，再配合协助扩容和分段计数来保证线程安全和高性能。
- 为什么重写 `equals()` 必须重写 `hashCode()`？

#### 关联文档

- [集合框架](/java-core/language#collections)
- [并发容器](/java-core/concurrency#concurrent-containers)

### HashMap 的实现原理是什么？

JDK 8 中 `HashMap` 底层是数组 + 链表 + 红黑树。`put` 时先根据 key 的 hash 值定位桶位置，如果桶为空直接放入；如果发生哈希冲突，则在链表或红黑树中比较 key。链表长度达到8的阈值且数组容量达到64会树化。默认初始容量是 16，负载因子是 0.75，扩容通常变为原来的 2 倍。

#### 常见追问

- `HashMap` 为什么容量通常是 2 的幂？
  为了用位运算快速定位数组下标。下标计算更快、扩容迁移更高效、元素分布更均匀。
- 链表什么时候树化？
  链表长度达到 8 且数组容量大于等于 64 时，链表才会转成红黑树。
- `HashMap` 扩容为什么可能影响性能？
  触发扩容后，HashMap 会新建一个原来 2 倍大小的数组，然后把旧数组里的元素重新迁移到新数组里。

#### 关联文档

- [集合框架](/java-core/language#collections)

### HashMap 和 Hashtable 有什么区别？

`HashMap` 允许 null key 和 null value，默认非线程安全；
`Hashtable` 不允许 null，很多方法使用 `synchronized` 做方法级同步，是早期遗留类，性能较低。
现代并发场景通常使用 `ConcurrentHashMap`，而不是 `Hashtable`。

#### 常见追问

- 为什么 `Hashtable` 不推荐使用？
  它的方法基本都用 synchronized 修饰，所有操作都锁整张表，并发性能比较差。
  一般优先用 ConcurrentHashMap，它锁粒度更细，读操作基本无锁，并发性能更好。
- `HashMap` 为什么不是线程安全的？
  因为它内部没有做同步控制。
  比如多个线程同时 put 的时候，可能同时修改数组、链表或者红黑树结构，导致数据覆盖、丢失，甚至结构异常。

#### 关联文档

- [集合框架](/java-core/language#collections)

### HashMap 和 TreeMap 怎么选？

如果只需要快速插入、删除、查找，通常选择 `HashMap`；
如果需要按照 key 的自然顺序或自定义顺序遍历，选择 `TreeMap`。
`HashMap` 基于哈希表，平均时间复杂度更低；
`TreeMap` 基于红黑树，可以保持 key 有序。

#### 常见追问

- `TreeMap` 的时间复杂度是多少？
  核心操作时间复杂度一般是 O(log n)。比如 put、get、remove、containsKey 都是 O(log n)。
  如果是遍历整个 TreeMap，比如按 key 有序遍历，时间复杂度是 O(n)。
- `HashMap` 是否有序？
  是无序的，它不保证元素的存储顺序和遍历顺序。HashMap 的顺序可能会因为扩容、hash 冲突、JDK 版本变化而改变。
  按插入顺序遍历，用 LinkedHashMap。
  按 key 排序，用 TreeMap。
- `LinkedHashMap` 和 `TreeMap` 有什么区别？
  都是有序的。
  LinkedHashMap是基于HashMap加双向链表实现，默认按照插入顺序遍历，也可以设置成访问顺序，常用于实现 LRU 缓存。
  TreeMap底层是红黑树，按照key的自然顺序或者自定义 Comparator 排序。

#### 关联文档

- [集合框架](/java-core/language#collections)

### HashSet 的实现原理是什么？

`HashSet` 底层基于 `HashMap` 实现。添加元素时，元素会作为 `HashMap` 的 key，value 使用固定占位对象。因为 `HashMap` 的 key 不允许重复，所以 `HashSet` 可以保证元素不重复。

#### 常见追问

- `HashSet` 如何判断元素重复？
  依赖 HashMap 来实现的。判断重复主要靠两个方法：hashCode() 和 equals()。
  流程大概是：先根据元素的 hashCode() 计算存放位置，如果这个位置没有元素，就直接添加；如果这个位置已经有元素，说明发生了 hash 冲突，就会继续用 equals() 比较。
  如果 hashCode() 相同，并且 equals() 也返回 true，HashSet 就认为是重复元素，不会添加，add() 方法返回 false。
  如果 hashCode() 不同，或者 equals() 返回 false，就认为不是同一个元素，可以添加。
  自定义对象放到 HashSet 里时，一般要同时重写 hashCode() 和 equals()，否则可能达不到去重效果。
- `HashSet` 是有序的吗？
  是无序的，它不保证元素的插入顺序和遍历顺序。

#### 关联文档

- [集合框架](/java-core/language#collections)

### List、Set、Map 有什么区别？

`List` 存储有序元素，允许重复；
`Set` 不允许重复元素，是否有序取决于具体实现；
`Map` 存储 key-value 键值对，key 不允许重复，value 可以重复。
三者解决的问题不同：`List` 更像列表，`Set` 更像去重集合，`Map` 更像字典或索引表。

![Java 集合体系结构](/images/interview/java/java-collections-hierarchy.png)

上图用于快速区分 `Collection`、`List`、`Set`、`Queue`、`Map` 及其常见实现类。面试回答时重点说明 `List` 有序可重复，`Set` 用于去重，`Map` 用于 key-value 映射。

#### 常见追问

- `ArrayList`、`LinkedList`、`HashSet`、`TreeSet` 分别适合什么场景？
  `ArrayList` 适合读多写少、按下标随机访问比较多的场景。底层是数组，查询快，尾部追加也比较快，但中间插入删除会涉及元素移动。
  `LinkedList` 适合频繁在头尾插入删除。当队列、双端队列使用的场景。底层是双向链表，插入删除节点本身快，但按下标访问慢，需要遍历。
  `HashSet` 适合需要去重无需顺序。判断某个元素是否存在、过滤重复 ID。底层基于 HashMap，add、remove、contains 平均时间复杂度是 O(1)。
  `TreeSet` 适合需要去重并且还要排序的场景。底层是红黑树，add、remove、contains 是 O(log n)。
  **总结：要下标查询用 ArrayList，要头尾操作或队列用 LinkedList，要去重不排序用 HashSet，要去重加排序用 TreeSet。**
- `LinkedHashMap` 有什么特点？
  在 HashMap 的基础上维护了一条双向链表，可以保证遍历顺序。按照插入顺序遍历。它有一个构造参数 accessOrder，如果设置成 true，就会按访问顺序排序，最近访问的元素会移动到链表尾部，所以可以用它实现 LRU 缓存。
  【注：链表头是最老元素，链表尾是最新元素，这样和插入顺序、访问顺序的维护逻辑都比较统一。】
  **总结**：LinkedHashMap 既有 HashMap 的快速查找能力，又保证遍历顺序，常用于需要有序遍历或者实现简单 LRU 的场景。

#### 关联文档

- [集合框架](/java-core/language#collections)

### ArrayList 和 LinkedList 怎么选？

大多数业务场景默认用 `ArrayList`，因为随机访问快、内存连续、CPU 缓存友好。
`LinkedList` 适合频繁头尾插入删除的队列场景，但随机访问慢，节点对象也有额外内存开销。

#### 深入解释

`ArrayList` 底层是动态数组，查询指定下标元素时可以直接按索引定位，扩容时通常扩为原容量的 1.5 倍。
`LinkedList` 底层是双向链表，节点分散在堆内存中，虽然插入删除节点本身成本低，但定位节点需要遍历，且缓存局部性较差。

#### 常见追问

- `ArrayList` 扩容机制是什么？
  底层是 Object 数组，容量不够时会触发扩容。
  在 JDK 8 里，new ArrayList() 时底层数组默认是空数组，第一次 add 的时候才会扩容到默认容量 10。后续再扩容时，一般是扩到原容量的 1.5 倍。
  扩容本质上是创建一个更大的新数组，然后通过 Arrays.copyOf 把旧数组元素复制过去，所以扩容是有成本的。
  如果能预估数据量，一般会用 `new ArrayList<>(capacity)` 指定初始容量，减少扩容和数组拷贝的次数。
- `LinkedList` 为什么随机访问慢？
  主要是因为底层是双向链表，没有连续内存，也没有下标到节点地址的映射，所以要从头节点或者尾节点开始一个一个遍历。源码里会根据 index 在前半段还是后半段，决定从头往后找还是从尾往前找，虽然做了一点优化，但本质还是遍历。
- 多线程场景能不能直接用 `ArrayList`？
  不能，ArrayList 不是线程安全的。
  多线程读多写少，考虑 CopyOnWriteArrayList，读不加锁，写时复制，适合读多写少的场景。
  写比较频繁，可以用 `Collections.synchronizedList(new ArrayList<>())`，或者自己加锁控制同步。
  队列类场景，考虑 ConcurrentLinkedQueue、BlockingQueue 这类并发容器。

#### 关联文档

- [集合框架](/java-core/language#collections)

### 数组和 List 如何互相转换？

数组转 `List` 可以使用 `Arrays.asList(array)`，但返回的列表大小固定，不支持新增或删除。
`List` 转数组可以使用 `list.toArray(new T[0])`。

#### 常见追问

- `Arrays.asList()` 返回的是 `java.util.ArrayList` 吗？
  不是。返回的是 java.util.Arrays 的内部静态类 ArrayList，也就是 java.util.Arrays.ArrayList，这个 List 底层还是原来的数组，长度是固定的，所以不能 add、remove，否则会抛 UnsupportedOperationException。它支持 set，因为 set 只是修改数组对应位置的元素。
  想得到真正的 java.util.ArrayList，一般会这样写：
  `List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));`这样得到的就是可扩容、可增删的 ArrayList。
- 基本类型数组使用 `Arrays.asList()` 有什么坑？
  基本类型数组传给 Arrays.asList() 时，不会被拆成多个元素，而是会把整个数组当成一个元素。
  比如：
  ```
  int[] arr = {1, 2, 3};
  List<int[]> list = Arrays.asList(arr);
  ```
  这个 list 的 size 是 1，不是 3，里面唯一的元素是 int[] 本身。原因是 Arrays.asList(T... a) 接收的是泛型可变参数，泛型不能直接使用基本类型，所以 int[] 会被当成一个对象传进去。
  如果是包装类型数组就没这个问题：
  ```
  Integer[] arr = {1, 2, 3};
  List list = Arrays.asList(arr);
  ```
  这个 size 才是 3。
  Arrays.asList 返回的 List 长度固定，不能 add 和 remove。
  如果要把 int[] 转成 List，我一般会用流：
  ```
  List list = Arrays.stream(arr).boxed().collect(Collectors.toList());
  ```
- 为什么推荐 `toArray(new T[0])`？
  简洁、安全，而且在现代 JDK 里性能也不差。new String[0] 主要是告诉 JVM 返回数组的类型是 String[]，如果传入数组长度不够，集合内部会自己创建一个刚好大小的新数组。
  String[] arr = list.toArray(new String[list.size()]);
  看起来少了一次数组创建，但需要先调用 size()，代码更啰嗦，而且在现代 JVM/JDK 优化后，new T[0] 这种写法性能通常不比预分配差，有些场景还更好。
  Object[] arr = list.toArray();
  返回的是 Object[]，不能直接强转成 String[]，会有 ClassCastException。

#### 关联文档

- [集合框架](/java-core/language#collections)

### ArrayList 和 Vector 有什么区别？

`ArrayList` 是非线程安全的动态数组，性能较好；
`Vector` 的很多方法使用 `synchronized` 修饰，是线程安全的遗留容器，但同步粒度粗，性能较低。
扩容策略上，
    `ArrayList` 通常扩容为原容量的 1.5 倍，
    `Vector` 常见扩容为 2 倍。

#### 常见追问

- 多线程场景能直接使用 `Vector` 吗？
  支持多线程但一般不推荐直接用 Vector。Vector 的方法确实基本都加了 synchronized，单个方法调用是线程安全的，比如 add、get、remove 这些操作本身不会并发出问题。但它的线程安全是“方法级别”的，不代表组合操作安全。比如：
  ```
  if (!vector.contains(x)) {
  vector.add(x);
  }
  ```
  这两个方法单独安全，但组合起来不是原子的，多线程下还是可能重复添加。
  多线程读多写少场景，我更倾向用 CopyOnWriteArrayList。
  队列模型，用 ConcurrentLinkedQueue、BlockingQueue。
  只是需要外部同步包装，可以用 `Collections.synchronizedList(new ArrayList<>())`，但遍历时也要手动加锁。
  **总结**Vector 可以保证单个方法线程安全，但不建议作为现代并发容器直接使用，要根据场景选择 java.util.concurrent 下的集合。
- `Collections.synchronizedList()` 和 `Vector` 有什么区别？
  们都不是高并发场景的首选，区别在于 Vector 是老的同步集合类，synchronizedList 是对普通 List 的同步包装，更灵活；并发场景优先考虑 CopyOnWriteArrayList 或 java.util.concurrent 包下的集合。

#### 关联文档

- [集合框架](/java-core/language#collections)
- [并发容器](/java-core/concurrency#concurrent-containers)

### 字节流和字符流有什么区别？

字节流以字节为单位处理数据，核心抽象是 `InputStream` 和 `OutputStream`，适合图片、音频、压缩包等二进制数据；
字符流以字符为单位处理数据，核心抽象是 `Reader` 和 `Writer`，适合文本内容，会涉及字符编码和解码。
处理纯文本优先用字符流，处理二进制必须用字节流。

#### 常见追问

- 字符流底层是不是也依赖字节流？
  读写文件、网络这种外部介质，本质上传输和存储的都是字节，所以字符流最终通常会基于字节流，再通过字符编码做转换。比如 InputStreamReader 就是把 InputStream 按指定 charset 解码成字符，OutputStreamWriter 是把字符按 charset 编码成字节再写出去。
  FileReader 本质上也可以理解为基于文件字节输入，再按默认或指定字符集解码成字符。
  但是也有一些字符流不依赖字节流，比如 StringReader、CharArrayReader，它们直接操作内存里的字符数据。
  **总结**：字符流是对字符文本操作的抽象，读写外部资源时通常底层离不开字节流和编码转换，但不是所有字符流都依赖字节流。
- 乱码通常是什么原因？
  因为编码和解码使用的字符集不一致。
  一般会避免用默认编码，像 new String(bytes, StandardCharsets.UTF_8)、getBytes(StandardCharsets.UTF_8)，文件读写和 HTTP 响应也明确指定 UTF-8。
- 缓冲流解决什么问题？
  主要解决频繁进行底层 IO 操作导致性能低的问题。在普通流外面包一层缓冲区，用空间换时间，减少磁盘或网络访问次数，提升 IO 性能。

### BIO、NIO、AIO 有什么区别？

BIO 是同步阻塞模型，一个连接通常对应一个线程，模型简单但高并发下线程开销大；
NIO 是同步非阻塞模型，通过 Channel、Buffer 和 Selector 支持少量线程管理大量连接；
AIO 是异步 IO，操作完成后通过回调或 Future 获取结果。
Java 服务端高并发网络框架通常基于 NIO 思路构建。

#### 常见追问

- NIO 为什么适合高并发连接？
  它支持非阻塞 IO 和 IO 多路复用。NIO 是“一个线程监听很多连接，有事件再处理”，所以更适合高并发连接。
- Selector 的作用是什么？
  作用是做 IO 多路复用。用少量线程监听大量连接的 IO 就绪事件，提高高并发场景下的资源利用率。
- Netty 和 Java NIO 有什么关系？
  NIO 提供非阻塞 IO 的基础能力，Netty 在 NIO 之上封装了线程模型、事件模型和编解码能力，让我们更容易开发高性能、高并发的网络应用。

#### 关联文档

- [IO 与 NIO](/java-core/language#io-nio)

### Queue 的 poll 和 remove 有什么区别？

`poll()` 和 `remove()` 都会获取并删除队首元素。区别在于队列为空时，`poll()` 返回 `null`，而 `remove()` 会抛出 `NoSuchElementException`。

#### 常见追问

- `peek()` 和 `element()` 有什么区别？
  都是查看队头元素，但是不删除元素。
  peek() 在队列为空时返回 null。
  element() 在队列为空时会抛出 NoSuchElementException。
- `Queue` 和 `Deque` 有什么区别？
  Queue 是单端队列，先进先出 FIFO 的队列结构，从队尾插入元素，队头取出元素。
  Deque 是双端队列，可以在队头和队尾两端插入、删除、获取元素。
  Deque 继承自 Queue，所以它本身也可以当普通队列来用。
- 阻塞队列有哪些常见实现？
  **ArrayBlockingQueue**：基于数组的有界阻塞队列，FIFO，需要指定容量。
  **LinkedBlockingQueue**：基于链表的阻塞队列，默认容量很大，也可以指定容量，吞吐量通常比较高。
  **PriorityBlockingQueue**：支持优先级的无界阻塞队列，元素需要可比较，不保证 FIFO。
  **DelayQueue**：延迟队列，元素到期后才能被取出，常用于定时任务、超时处理。
  **SynchronousQueue**：不存储元素的阻塞队列，每个 put 必须等待一个 take，常用于线程池直接移交任务。
  LinkedTransferQueue：基于链表的无界阻塞队列，支持 transfer 机制，可以直接把元素交给消费者。
  LinkedBlockingDeque：双端阻塞队列，可以从队头和队尾插入、取出。

#### 关联文档

- [集合框架](/java-core/language#collections)

### Iterator 是什么？怎么使用？

`Iterator` 是集合遍历接口，常用 `hasNext()` 判断是否还有元素，用 `next()` 获取下一个元素。遍历过程中如果需要删除当前元素，应使用 `iterator.remove()`，避免直接修改集合导致并发修改异常。

#### 常见追问

- fail-fast 和 fail-safe 有什么区别？
  fail-fast 是快速失败机制，遍历集合时如果检测到集合被其他线程或者自身非迭代器方式修改了结构，就会抛 ConcurrentModificationException。比如 ArrayList、HashMap 这类集合的迭代器通常就是 fail-fast，底层通过 modCount 和 expectedModCount 判断是否被修改。
  fail-safe 一般指遍历时不直接在原集合上操作，或者迭代器支持弱一致性，所以遍历过程中修改集合不会抛 ConcurrentModificationException。比如 CopyOnWriteArrayList 遍历的是数组快照，ConcurrentHashMap 的迭代器是弱一致性的。
  **两者区别就是**：fail-fast 更强调发现并发修改后尽快报错，适合普通集合；fail-safe 更适合并发场景，遍历时允许修改，但可能读到的不是最新数据。
- foreach 底层是不是 `Iterator`？
  foreach 遍历集合底层是 Iterator，遍历数组底层是索引循环。
- `Iterator` 和 `ListIterator` 有什么区别？
  Iterator 是所有集合通用的迭代器，ListIterator 是 List 集合专用的迭代器。
  Iterator 只能单向向后遍历，ListIterator 可以双向遍历，既可以 next()，也可以 previous()。Iterator 只能删除元素，也就是 remove()，ListIterator 除了 remove()，还支持 add() 和 set()，可以在遍历过程中新增或修改元素。ListIterator 可以获取当前遍历位置的索引，比如 nextIndex() 和 previousIndex()，Iterator 不支持。Iterator 可以用于 List、Set 等集合，ListIterator 只能用于 List，比如 ArrayList、LinkedList。

#### 关联文档

- [集合框架](/java-core/language#collections)

## 泛型与对象生命周期

### 泛型类是什么？

泛型类是在类名后声明类型参数的类，例如 `class Box<T>`。泛型可以把类型检查提前到编译期，减少强制类型转换，提高代码复用性。常见类型参数包括 `T`、`E`、`K`、`V`。

#### 常见追问

- Java 泛型为什么有类型擦除？
  主要是为了兼容 Java 5 之前没有泛型的老版本代码。
  泛型只在编译期起作用，编译器会做类型检查，编译后泛型信息基本会被擦除，比如 `List< String>` 和 `List< Integer>` 运行时其实都是 List。
- `List<?>` 和 `List<Object>` 有什么区别？
  `List<?>`不关心里面具体是什么类型，只读为主；`List< Object>`
 是集合里放 Object 类型元素，可以写入。
- 泛型方法和泛型类有什么区别？
  泛型类是把泛型参数定义在类上，整个类的成员方法、成员变量都可以使用这个泛型类型，比如 `class Box< T>`，T 是对象级别的类型参数，通常在创建对象时确定，比如 `new Box< String>()`。
  泛型方法是把泛型参数定义在方法上，只在这个方法内部有效，比如 `public <T> T get(T value)`，它和类是不是泛型类没有必然关系，普通类里也可以定义泛型方法。
  主要区别是作用范围和确定时机不同：泛型类的类型参数作用于整个类，通常实例化对象时确定；泛型方法的类型参数只作用于当前方法，通常调用方法时由编译器根据参数自动推断。
  还有一点，泛型方法可以使用自己的类型参数，即使名字和泛型类一样，也是方法自己的泛型，会覆盖类上的同名泛型，一般不建议这么写。
  简单说，泛型类解决的是“这个对象整体处理什么类型”，泛型方法解决的是“这个方法本次调用处理什么类型”。

#### 关联文档

- [泛型](/java-core/language#generics)

### Java 中创建对象有哪些方式？

使用 `new` 调用构造器；
使用反射调用 `Constructor.newInstance()`；
实现 `Cloneable` 后调用 `clone()`；
通过反序列化重建对象；
通过工厂方法或工厂模式返回对象实例。

#### 常见追问

- `Class.newInstance()` 为什么不推荐？
  能力太弱，异常处理不清晰。只能调用 public 的无参构造方法，如果类没有 public 无参构造，或者构造方法是 private 的，就会失败。对构造方法里抛出的异常处理不太好，可能直接把构造方法里的异常抛出来，绕过编译期异常检查，异常语义不够明确。
  更推荐用 clazz.getDeclaredConstructor().newInstance()。可以明确获取哪个构造方法，也可以配合 setAccessible(true) 调用非 public 构造方法，而且异常更清晰，比如构造方法内部异常会被包装成 InvocationTargetException。
- `clone()` 是深拷贝还是浅拷贝？
  默认情况下，Object 的 clone() 是浅拷贝。
  它会创建一个新的对象，并把原对象里的字段值复制过去；如果字段是基本类型，会复制值本身；如果字段是引用类型，只复制引用地址，所以新旧对象里的引用字段还是指向同一个对象。
  想实现深拷贝，需要自己在 clone() 方法里对引用类型字段也单独 clone 或重新创建对象。
- 工厂模式创建对象有什么好处？
  好处主要是把对象的创建逻辑和使用逻辑解耦。
  它还有几个优点：
  ```
  第一，隐藏创建细节，调用方不需要关心对象怎么创建、初始化了哪些依赖。
  第二，方便扩展，比如根据不同类型创建不同实现类，新增实现时尽量少改业务代码。
  第三，便于统一管理对象创建，比如加缓存、单例、参数校验、默认配置、日志等。
  第四，降低代码耦合，通常配合接口和多态使用，调用方依赖抽象而不是具体实现。
  ```

#### 关联文档

- [注解与反射](/java-core/language#annotations-reflection)

### Java 对象什么时候会被回收？

对象是否可回收主要通过可达性分析判断。JVM 从 GC Roots 出发，如果某个对象无法通过引用链到达，就说明该对象不可达，可以被垃圾回收。Java 主流 JVM 不依赖引用计数法，因为引用计数无法解决循环引用问题。

#### 常见追问

- 哪些对象可以作为 GC Roots？
  在 JVM 的可达性分析算法中，GC Roots 是一组作为起点的对象引用。只要某个对象能从 GC Roots 直接或间接到达，就认为它是“存活”的，不会被回收。常见可以作为 GC Roots 的对象有：
  1、虚拟机栈中引用的对象(每个线程当前调用方法里的：局部变量、方法参数、临时变量)
  2、本地方法栈中 JNI 引用的对象（如果 Java 对象被 Native 方法引用，比如 C/C++ 代码通过 JNI 持有 Java 对象引用，那么这些对象也可以作为 GC Roots 关联的存活对象。）
  3、方法区中类静态属性引用的对象（也就是 static 字段引用的对象。）
  4、方法区中常量引用的对象（字符串常量池、运行时常量池中引用的对象。不同 JDK 版本中，字符串常量池的位置和回收机制有差异。）
  5、被同步锁持有的对象（也就是被 synchronized 加锁的对象。当某个对象正在作为锁使用时，它不能被 GC 回收。）
  6、JVM 内部引用的对象（JVM 自身运行需要的一些对象也可以作为 GC Roots）
  7、活跃线程对象（正在运行的线程对象也可以作为 GC Roots。）
  **总结**：线程栈中的引用、静态变量引用、常量引用、JNI 引用、被锁持有的对象、JVM 内部引用和活跃线程对象。
- `finalize()` 为什么不推荐使用？
  执行依赖 GC，调用时机不确定，甚至可能永远不执行，因此不能可靠地释放资源。带有 finalize() 的对象回收成本更高，会延长对象生命周期，影响 GC 性能。同时它还可能导致对象复活、异常被吞掉、执行顺序不可控以及安全风险。
  现在推荐使用 try-with-resources、AutoCloseable 或 Cleaner 来替代 finalize()。
  （Java 9 之后，Object.finalize() 已经被标记为废弃）
- 强引用、软引用、弱引用、虚引用有什么区别？
  强引用 > 软引用 > 弱引用 > 虚引用
  | 引用类型 | 类 | GC 回收时机 | 能否通过 `get()` 获取对象 | 典型用途 |
  |---|---|---|---|---|
  | 强引用 | 普通引用 | 只要强引用存在，就不回收 | 可以 | 普通对象 |
  | 软引用 | `SoftReference` | 内存不足时回收 | 可以，回收后为 null | 缓存 |
  | 弱引用 | `WeakReference` | 发生 GC 时通常回收 | 可以，回收后为 null | WeakHashMap、ThreadLocal |
  | 虚引用 | `PhantomReference` | 不影响对象回收 | 不可以，永远 null | 回收通知、堆外内存清理 |

  **强引用**是普通引用，只要强引用存在，GC 不会回收对象。
  **软引用**在内存不足时会被回收，常用于缓存。
  **弱引用**只要发生 GC，弱引用关联的对象就可能被回收，典型应用是 WeakHashMap 和 ThreadLocalMap。
  **虚引用**最弱，不能通过 get() 获取对象，必须配合 ReferenceQueue 使用，主要用于跟踪对象回收和管理堆外资源。

#### 关联文档

- [垃圾回收](/java-core/jvm#garbage-collection)

## 序列化与对象拷贝

### Serializable 接口有什么作用？

`Serializable` 是 Java 原生序列化的标记接口，表示对象可以被转换成字节流并在之后反序列化恢复。它常用于对象持久化、网络传输、缓存和早期 RMI 场景。实际项目中更常见的是 JSON、Protobuf、Kryo 等序列化方案，因为 Java 原生序列化性能、兼容性和安全性都有局限。

#### 常见追问

- 为什么建议显式声明 `serialVersionUID`？
  因为 serialVersionUID 用来判断序列化和反序列化时类版本是否一致。如果没有显式声明，JVM 会根据类结构自动生成一个值，而这个值对类的字段、方法、访问修饰符等变化非常敏感，甚至一次普通改动都可能导致生成值变化，从而在反序列化旧数据时抛出 InvalidClassException。
  显式声明 serialVersionUID 可以让开发者主动控制版本兼容性。兼容性修改时保持不变，不兼容修改时主动修改它。
- `transient` 字段会不会被序列化？
  不会。被 transient 修饰的字段不会参与序列化，反序列化后会变成默认值。
- Java 原生序列化有什么安全风险？
  最大的安全风险在反序列化。如果服务端反序列化了不可信数据，攻击者可以构造恶意字节流，配合类路径里已有的 gadget 链，在 readObject 过程中触发恶意代码，严重的话会导致远程代码执行。
  另外还有几个风险：
  第一，数据可以被篡改，序列化内容本身不等于安全格式，如果没有签名校验，攻击者可以改字段值。
  第二，可能泄露敏感信息，因为对象里的字段会被写入字节流，像密码、token 这类字段如果没用 transient 处理就可能泄露。
  第三，反序列化可能造成 DoS，比如构造特别大的对象图、深层嵌套对象，导致内存或 CPU 被打满。

### 怎么把一个对象从一个 JVM 转移到另一个 JVM？

可以先把对象序列化成字节流，通过网络、消息队列或 RPC 传输到另一个 JVM，再反序列化恢复对象。工程中也可以通过共享数据库、Redis 等中间存储传递对象状态，而不是直接传递对象本身。

#### 常见追问

- RPC 框架为什么需要序列化协议？
  网络只能传输字节流，不能直接传 Java 对象。
- JSON、Protobuf、Java 原生序列化有什么区别？
  JSON 是文本格式，可读性好，调试方便，跨语言能力强，前后端交互、开放接口里用得比较多；缺点是体积相对大，解析性能不如二进制协议，而且类型表达没那么严格。
  Protobuf 是 Google 的二进制序列化协议，需要先定义 proto 文件，生成对应语言的代码；它体积小、性能好、跨语言能力强，也支持字段编号带来的版本兼容，常用于 RPC、微服务内部通信；缺点是可读性差，调试不如 JSON 直观。
  Java 原生序列化是 Java 自带的 ObjectOutputStream/ObjectInputStream，用起来简单，可以直接序列化实现 Serializable 的对象；但它性能一般，序列化后的数据体积较大，跨语言能力差，而且反序列化存在安全风险，所以现在生产里一般不推荐对外部数据使用。
  **对外接口一般用 JSON，内部高性能 RPC 或跨语言通信更倾向 Protobuf，Java 原生序列化只会在非常受控的 Java 内部场景里谨慎使用。**
- 分布式系统中传对象和传 ID 有什么取舍？
  看一致性、性能、耦合度和数据实时性。
  如果对方只需要标识或者需要最新状态，就传 ID；如果对方需要的是当时业务快照，比如订单里的收货地址、商品名称、价格，或者异步消息需要完整上下文，就传必要字段的 DTO，而不是直接传整个领域对象。
  实际项目里一般不会传完整对象，会传 ID 加少量必要冗余字段，在性能、解耦和一致性之间做平衡。

#### 关联文档

- [IO 与 NIO](/java-core/language#io-nio)
- [消息队列](/interview/mq)

### 深拷贝和浅拷贝怎么实现？

浅拷贝只复制对象本身和引用地址，引用字段指向的对象仍然共享；
深拷贝会递归复制引用对象，副本和原对象互不影响。
浅拷贝可以通过 `Cloneable + clone()` 实现，深拷贝可以通过手动递归复制、序列化 / 反序列化、JSON 转换等方式实现。

#### 常见追问

- `clone()` 方法默认是深拷贝还是浅拷贝？
  clone() 方法默认是浅拷贝。
- 为什么不推荐滥用 `clone()`？
  因为语义不够清晰，容易出问题。
  1、默认 clone() 是浅拷贝，如果对象里有引用类型字段，容易出现两个对象共享内部引用，后续修改互相影响。
  2、想做深拷贝要自己手动处理每个引用字段，对象层级一深就很复杂，也容易漏字段。
  3、clone() 依赖 Cloneable 接口，但 Cloneable 本身没有定义 clone() 方法，只是一个标记接口，这个设计不太直观。
  4、Object.clone() 是 protected 的，使用时通常还要重写成 public，并处理 CloneNotSupportedException，代码可读性和维护性都一般。
  5、clone() 创建对象时不会调用构造方法，如果对象初始化逻辑依赖构造器，可能会绕过一些校验或初始化流程。
  **实际开发里我一般更倾向用拷贝构造器、静态工厂方法，或者明确的 DTO 转换工具，比如 BeanUtils、MapStruct。这样拷贝逻辑更清晰，也更容易维护。**

#### 关联文档

- [IO 与 NIO](/java-core/language#io-nio)

## 设计模式

### 设计模式有哪些常见原则？

**开闭原则**：是对扩展开放、对修改关闭。新增功能尽量通过扩展类、实现接口、策略模式这类方式完成，而不是频繁改老代码，这样可以降低引入 bug 的风险。
**单一职责原则**：一个类只负责一类事情。
**里氏替换原则**：子类对象应该可以替换父类对象，并且程序行为不出问题。继承不能破坏父类原有约定，比如父类方法承诺能处理某种输入，子类不能随便缩小能力或者改变语义。
**依赖倒置原则**：高层模块不直接依赖低层实现，而是依赖抽象。
**接口隔离原则**：接口要小而专，不要让实现类被迫实现自己不需要的方法。
**迪米特法则**：也叫最少知道原则，就是一个对象尽量少了解其他对象的内部结构，只和直接朋友交互。
**组合复用原则**：就是优先使用组合，而不是继承来复用代码。

#### 常见追问

- 开闭原则怎么落地？
  一般会从“抽象 + 扩展点”入手。
  1、用接口加多实现，再配合策略模式、工厂模式或者 Map 注入
  2、把固定流程放在父类或抽象类里，把可变步骤留给子类扩展。
  3、通过事件机制来解耦，比如订单支付成功后要发消息、送积分、发优惠券，不要都写死在支付方法里，可以发布一个支付成功事件，后续新增动作只需要加监听器。
- 为什么优先组合而不是继承？
  因为组合的耦合更低、扩展更灵活。
- 设计原则是不是越多越好？
  不是越多越好，设计原则本质上是为了降低复杂度、提高可维护性，不是为了把代码设计得很“高级”。

### 常见设计模式有哪些？

**单例模式**：保证一个类在 JVM 中只有一个实例，并提供全局访问点。
**工厂模式**：把对象创建过程封装起来，调用方不直接 new 具体类，而是通过工厂根据条件返回对象。好处是解耦创建逻辑和使用逻辑。
**代理模式**：给目标对象外面包一层代理对象，在不修改目标对象代码的情况下增强功能。典型场景是日志、权限、事务、缓存。Spring AOP 就是代理模式的应用，接口一般用 JDK 动态代理，类代理一般用 CGLIB。
**策略模式**：把一组可替换的算法或业务规则封装成不同策略类，运行时根据条件选择不同策略，避免大量 if else。

#### 常见追问

- 简单工厂、工厂方法、抽象工厂有什么区别？
  简单工厂：由一个工厂类根据参数决定创建哪个具体产品。优点是简单，缺点是每新增一种产品都要改工厂里的 if else 或 switch，不太符合开闭原则。
  工厂方法：把“创建对象”这件事下放到不同的工厂子类中，每种产品对应一个工厂。新增产品时新增产品类和工厂类，不用改原来的工厂逻辑，更符合开闭原则，但类会变多。
  抽象工厂：用来创建一组有关联的产品族，不只是创建一个产品。它适合产品族扩展，但如果要给所有产品族新增一个产品类型，比如新增“监控组件”，就要改所有工厂接口和实现类。
- 静态代理和动态代理有什么区别？
  静态代理是在编译期就写好代理类，代理类和目标类通常实现同一个接口，然后在代理类里调用目标对象，并在前后加增强逻辑。优点是简单直观，缺点是如果接口很多、方法很多，就要写很多代理类，维护成本高。
  动态代理是在运行期动态生成代理对象，不需要手写代理类。常见有 JDK 动态代理和 CGLIB 动态代理。JDK 动态代理要求目标类实现接口，底层基于反射和 InvocationHandler；CGLIB 是通过生成目标类的子类来代理，所以目标类不能是 final，方法也不能是 final。
- 策略模式和模板方法模式有什么区别？
  策略模式是把不同算法或业务规则封装成不同的策略类，通过组合的方式在运行时选择具体策略，重点是“可替换”。
  模板方法模式是父类定义一套固定流程，把流程中的某些步骤延迟到子类实现，重点是“固定流程，局部可变”。
  最大的**区别**是：策略模式用组合，不同策略之间是平级关系；模板方法用继承，父类控制整体流程，子类重写部分步骤。

#### 关联文档

- [设计模式与架构](/practice/design-pattern)
