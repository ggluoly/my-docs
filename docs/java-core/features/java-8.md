---
title: 'Java 8 特性'
description: '完整梳理 Java 8 新特性，包括 Lambda、函数式接口、方法引用、构造器与数组引用、Stream、Optional、接口默认方法、java.time、CompletableFuture、Base64、重复注解和反射增强。'
outline: [2, 3]
---

# Java 8 特性


Java 8 是现代 Java 的分水岭。它引入 Lambda 表达式、函数式接口、方法引用、Stream API、Optional、新日期时间 API、接口默认方法和 CompletableFuture 等能力，使 Java 在集合处理、函数式编程、异步编排和 API 演进方面发生了明显变化。


## Java 8 改进概览

<img class="java-8-overview-image" src="/images/java-core/java-8/java-8-feature-overview.png" alt="Java 8 新特性总览" />

Java 8 对后端开发影响较大的变化包括：

- 使用 [Lambda 表达式](#lambda-表达式)减少匿名内部类样板代码。
- 使用[函数式接口](#函数式接口)把行为作为参数传递。
- 使用[方法引用](#方法引用)、[构造器和数组引用](#构造器和数组引用)进一步简化 Lambda。
- 使用 [Stream API](#stream-api) 对集合和数组进行过滤、映射、排序、归约和收集。
- 使用 [Optional](#optional-类) 更明确地表达“值可能不存在”。
- 使用 [`java.time`](#新日期时间-api) 取代线程不安全、语义混乱的旧日期时间 API。
- 使用[接口默认方法](#接口默认方法和静态方法)支持接口平滑演进。
- 使用 [CompletableFuture](/java-core/juc#completablefuture) 编排异步任务。
- 使用 [Base64 API](#base64-api) 完成基础编码和解码。
- 支持[重复注解与类型注解](#重复注解与类型注解)、[参数名反射](#对反射的支持增强)等语言与反射增强。
- 引入 [Nashorn JavaScript 引擎](#nashorn-javascript-引擎)，但该能力在后续 JDK 中已被移除。

## Lambda 表达式

### 是什么

Lambda 表达式可以理解为一段能够传递的代码。它没有独立的方法名，必须依附于一个目标类型，而这个目标类型通常是函数式接口。

Lambda 的基本结构是：

```text
(参数列表) -> Lambda 体
```

- `->` 左侧是函数式接口中抽象方法的参数列表。
- `->` 右侧是该抽象方法的实现逻辑。
- Lambda 表达式的本质是函数式接口的实例，不是独立存在的函数。

### 匿名内部类与 Lambda 对比

以 `Runnable` 为例：

```java
Runnable before = new Runnable() {
    @Override
    public void run() {
        System.out.println("hello before Lambda");
    }
};

Runnable after = () -> System.out.println("hello Lambda");

before.run();
after.run();
```

以 `Comparator` 为例：

```java
Comparator<Integer> before = new Comparator<Integer>() {
    @Override
    public int compare(Integer left, Integer right) {
        return Integer.compare(left, right);
    }
};

Comparator<Integer> lambda = (left, right) -> Integer.compare(left, right);
list.sort(lambda);
Comparator<Integer> methodReference = Integer::compare;
list.sort(methodReference);
```

Lambda 适合替代只为实现一个函数式接口而创建的匿名内部类。如果匿名类还需要额外字段、多个方法或复杂生命周期，普通类通常更清晰。

### 六种常见语法

#### 无参数、无返回值

```java
Runnable task = () -> System.out.println("执行任务");
```

`Runnable.run()` 没有参数，也没有返回值。

#### 一个参数、无返回值

```java
Consumer<String> printer = (String text) -> {
    System.out.println(text);
};
```

#### 参数类型可以推断

编译器能从目标函数式接口推断参数类型：

```java
Consumer<String> printer = (text) -> {
    System.out.println(text);
};
```

#### 单个参数可以省略小括号

```java
Consumer<String> printer = text -> {
    System.out.println(text);
};
```

#### 多个参数、多条语句并返回结果

```java
Comparator<Integer> comparator = (left, right) -> {
    System.out.println("left=" + left);
    System.out.println("right=" + right);
    return Integer.compare(left, right);
};
```

#### Lambda 体只有一条语句时可以简写

```java
Comparator<Integer> comparator = (left, right) -> Integer.compare(left, right);
Consumer<String> printer = text -> System.out.println(text);
```

如果唯一语句是返回表达式，可以同时省略花括号和 `return`；如果唯一语句没有返回值，也可以省略花括号。

### 变量捕获

Lambda 可以访问外部局部变量，但该变量必须是 `final` 或事实上的 final：

```java
String prefix = "user:";
Function<Long, String> keyBuilder = id -> prefix + id;
```

下面的写法无法编译，因为 `prefix` 在 Lambda 创建后又被修改：

```java
String prefix = "user:";
Function<Long, String> keyBuilder = id -> prefix + id;
// prefix = "member:";
```

Lambda 访问成员变量时没有这个限制，但并发场景必须自行保证共享状态的线程安全。

### 使用建议

- Lambda 较短、语义明确时使用。
- 复杂分支和异常处理应提取为具名方法。
- 不要在 Lambda 中修改外部共享集合或可变状态。
- 需要受检异常时，应在函数式接口方法上声明，或在 Lambda 内部转换异常。
- Lambda 不是“越短越好”，可读性优先于链式写法长度。

## 函数式接口

### 定义

只包含一个抽象方法的接口称为函数式接口。可以使用 `@FunctionalInterface` 让编译器检查接口是否满足要求：

```java
@FunctionalInterface
public interface StringProcessor {
    String process(String value);
}
```

函数式接口仍然可以包含：

- `default` 默认方法。
- `static` 静态方法。
- 与 `Object` 公共方法签名一致的方法。

关键约束是只能有一个需要实现类实现的抽象方法。

### 四大核心函数式接口

![Java 8 四大核心函数式接口](/images/java-core/java-8/functional-interfaces-core.png)

| 接口 | 抽象方法 | 含义 | 常见场景 |
| --- | --- | --- | --- |
| `Consumer<T>` | `void accept(T value)` | 消费一个值，不返回结果 | 日志、输出、保存 |
| `Supplier<T>` | `T get()` | 不接收参数，提供一个值 | 延迟创建、默认值 |
| `Function<T, R>` | `R apply(T value)` | 把 T 转换为 R | DTO 转换、字段提取 |
| `Predicate<T>` | `boolean test(T value)` | 判断条件 | 过滤、校验 |

```java
Consumer<String> consumer = value -> System.out.println(value);
Supplier<String> supplier = () -> "default value";
Function<String, Integer> length = value -> value.length();
Predicate<String> notEmpty = value -> value != null && !value.isEmpty();
```

### 其他常用函数式接口

![Java 8 其他常用函数式接口](/images/java-core/java-8/functional-interfaces-extended.png)

| 接口 | 抽象方法 | 说明 |
| --- | --- | --- |
| `BiConsumer<T, U>` | `void accept(T t, U u)` | 消费两个参数 |
| `BiFunction<T, U, R>` | `R apply(T t, U u)` | 两个输入转换为一个输出 |
| `BiPredicate<T, U>` | `boolean test(T t, U u)` | 判断两个参数是否满足条件 |
| `UnaryOperator<T>` | `T apply(T value)` | 输入和输出类型相同的 Function |
| `BinaryOperator<T>` | `T apply(T left, T right)` | 两个同类型输入归约为同类型结果 |
| `ToIntFunction<T>` | `int applyAsInt(T value)` | 避免返回 `Integer` 的装箱 |
| `IntConsumer` | `void accept(int value)` | 基本类型特化接口，避免装箱 |

```java
BiFunction<Integer, Integer, Integer> add = (left, right) -> left + right;
BiPredicate<String, String> same = (left, right) -> Objects.equals(left, right);
UnaryOperator<String> trim = value -> value.trim();
BinaryOperator<Integer> max = (left, right) -> Math.max(left, right);
```

### 什么时候自定义

优先检查 `java.util.function` 是否已有匹配接口。只有当方法语义、异常声明或参数结构无法由标准接口清晰表达时，才自定义函数式接口。

## 方法引用

方法引用是 Lambda 的进一步简化。当 Lambda 体只是调用一个已经存在的方法，并且参数和返回值能够匹配函数式接口时，可以使用方法引用。

基本格式：

```text
类名或对象名::方法名
```

### 对象引用实例方法

```java
PrintStream output = System.out;
Consumer<String> printer = output::println;
printer.accept("Java 8");
```

函数式接口的参数会原样传给目标对象的方法。

### 类引用静态方法

```java
Comparator<Integer> comparator = Integer::compare;
System.out.println(comparator.compare(10, 20));
```

### 类引用实例方法

当函数式接口的第一个参数是实例方法的调用者，其余参数是实例方法参数时，可以写成 `类名::实例方法`：

```java
Comparator<String> comparator = String::compareTo;
BiPredicate<String, String> equals = String::equals;

System.out.println(comparator.compare("abc", "abd"));
System.out.println(equals.test("java", "java"));
```

`String::compareTo` 对应 `(left, right) -> left.compareTo(right)`。

### 使用条件

- 函数式接口的参数数量必须能匹配目标方法。
- 返回值必须兼容。
- 对象实例、静态方法和类实例方法的调用关系必须正确。
- 如果方法引用让调用来源更难理解，保留 Lambda 反而更清晰。

## 构造器和数组引用

### 构造器引用

构造器引用使用 `类名::new`，具体调用哪个构造器由函数式接口的方法签名决定。

```java
public class User {
    private final Long id;
    private final String name;

    public User() {
        this(null, null);
    }

    public User(Long id) {
        this(id, null);
    }

    public User(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
```

```java
Supplier<User> emptyUser = User::new;
Function<Long, User> userById = User::new;
BiFunction<Long, String, User> fullUser = User::new;
```

### 数组引用

数组引用使用 `数组类型[]::new`：

```java
Function<Integer, String[]> arrayFactory = String[]::new;
String[] values = arrayFactory.apply(10);
```

它等价于：

```java
Function<Integer, String[]> arrayFactory = length -> new String[length];
```

## Stream API

### 是什么

Stream 是对数据进行声明式计算的 API。集合更关注数据存储，Stream 更关注对数据执行过滤、映射、排序、查找、归约和收集等操作。

Stream 的重要特点：

- Stream 自身不存储元素，数据来自集合、数组或生成函数。
- Stream 通常不会修改数据源，而是产生新的结果。
- 中间操作是惰性的，只有终止操作执行时才真正处理数据。
- 一个 Stream 只能消费一次，终止后不能重复使用。
- 操作应尽量无状态、无副作用，避免修改外部共享数据。

### 使用流程

![Stream API 使用流程](/images/java-core/java-8/stream-workflow.png)

```text
创建 Stream -> 一个或多个中间操作 -> 终止操作
```

示例：

```java
List<String> names = users.stream()
    .filter(user -> user.getAge() >= 18)
    .sorted(Comparator.comparing(User::getName))
    .map(User::getName)
    .collect(Collectors.toList());
```

### 创建 Stream

#### 从集合创建

```java
Stream<User> stream = users.stream();
Stream<User> parallelStream = users.parallelStream();
```

#### 从数组创建

```java
int[] values = {1, 2, 3, 4};
IntStream stream = Arrays.stream(values);
```

#### 使用 Stream.of

```java
Stream<String> stream = Stream.of("Java", "Spring", "MySQL");
```

#### 创建无限流

```java
Stream<Integer> evenNumbers = Stream.iterate(0, value -> value + 2);
Stream<Double> randomNumbers = Stream.generate(Math::random);
```

无限流必须通过 `limit()` 等方式限制数量，否则终止操作可能永远无法结束：

```java
List<Integer> firstTenEvenNumbers = Stream.iterate(0, value -> value + 2)
    .limit(10)
    .collect(Collectors.toList());
```

### 中间操作：过滤与切片

![Stream 过滤与切片操作](/images/java-core/java-8/stream-intermediate-filter-slice.png)

| 操作 | 作用 |
| --- | --- |
| `filter()` | 保留满足条件的元素 |
| `limit()` | 截取前 N 个元素 |
| `skip()` | 跳过前 N 个元素 |
| `distinct()` | 根据 `hashCode()` 和 `equals()` 去重 |

```java
List<User> result = users.stream()
    .filter(user -> user.getAge() >= 18)
    .distinct()
    .skip(5)
    .limit(10)
    .collect(Collectors.toList());
```

### 中间操作：映射

![Stream 映射操作](/images/java-core/java-8/stream-intermediate-map.png)

`map()` 把一个元素转换为另一个元素：

```java
List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.toList());
```

`flatMap()` 把每个元素转换为一个 Stream，再把多个 Stream 合并为一个：

```java
List<List<String>> groups = Arrays.asList(
    Arrays.asList("Java", "Spring"),
    Arrays.asList("MySQL", "Redis")
);

List<String> technologies = groups.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
```

### 中间操作：排序

![Stream 排序操作](/images/java-core/java-8/stream-intermediate-sort.png)

```java
List<Integer> naturalOrder = values.stream()
    .sorted()
    .collect(Collectors.toList());

List<User> byAgeThenName = users.stream()
    .sorted(Comparator.comparing(User::getAge)
        .thenComparing(User::getName))
    .collect(Collectors.toList());
```

自然排序要求元素实现 `Comparable`；定制排序通过 `Comparator` 指定。

### 终止操作：匹配与查找

![Stream 匹配与查找操作](/images/java-core/java-8/stream-terminal-match-find.png)

| 操作 | 作用 |
| --- | --- |
| `allMatch()` | 是否所有元素都满足条件 |
| `anyMatch()` | 是否至少一个元素满足条件 |
| `noneMatch()` | 是否没有元素满足条件 |
| `findFirst()` | 获取第一个元素 |
| `findAny()` | 获取任意元素，并行流中更容易发挥作用 |
| `count()` | 统计数量 |
| `max()` / `min()` | 获取最大值或最小值 |
| `forEach()` | 遍历消费元素 |

```java
boolean allAdults = users.stream().allMatch(user -> user.getAge() >= 18);
boolean hasAdmin = users.stream().anyMatch(User::isAdmin);
Optional<User> first = users.stream().findFirst();
long count = users.stream().filter(User::isEnabled).count();
Optional<User> oldest = users.stream().max(Comparator.comparing(User::getAge));
```

### 终止操作：归约

![Stream 归约操作](/images/java-core/java-8/stream-terminal-reduce.png)

`reduce()` 把多个元素结合为一个结果：

```java
int total = Stream.of(1, 2, 3, 4)
    .reduce(0, Integer::sum);

Optional<Integer> max = Stream.of(1, 2, 3, 4)
    .reduce(Integer::max);
```

第一个示例提供初始值，因此直接返回 `int`；第二个示例没有初始值，空流无法产生结果，所以返回 `Optional<Integer>`。

### 终止操作：收集

![Stream 收集操作](/images/java-core/java-8/stream-terminal-collect.png)

`collect()` 将 Stream 转换为集合、Map、字符串或统计结果。

```java
List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.toList());

Set<Long> ids = users.stream()
    .map(User::getId)
    .collect(Collectors.toSet());

Map<Long, User> userMap = users.stream()
    .collect(Collectors.toMap(User::getId, Function.identity()));

Map<String, List<User>> usersByDepartment = users.stream()
    .collect(Collectors.groupingBy(User::getDepartment));

Map<Boolean, List<User>> partition = users.stream()
    .collect(Collectors.partitioningBy(User::isEnabled));

String joinedNames = users.stream()
    .map(User::getName)
    .collect(Collectors.joining(","));
```

使用 `toMap()` 时必须考虑 key 重复。可以提供合并函数：

```java
Map<String, User> usersByName = users.stream()
    .collect(Collectors.toMap(
        User::getName,
        Function.identity(),
        (first, second) -> first
    ));
```

### 并行流

Java 8 可以通过 `parallelStream()` 或 `parallel()` 使用并行流：

```java
long count = users.parallelStream()
    .filter(User::isEnabled)
    .count();
```

也可以切回顺序流：

```java
Stream<User> stream = users.stream()
    .parallel()
    .sequential();
```

并行流不等于一定更快，需要考虑：

- 数据量是否足够大。
- 单个操作是否足够耗时。
- 数据源是否容易拆分，例如数组通常比链表更适合。
- 操作是否无状态、无共享可变数据。
- 是否依赖顺序。
- 公共 `ForkJoinPool` 是否会与其他业务任务相互影响。
- 阻塞 IO 通常不适合直接交给并行流。

业务服务中不要因为一行 `.parallel()` 就假设性能会提升，应通过真实压测决定。

## Optional 类

### 是什么

`Optional<T>` 是一个用于表达“值存在或不存在”的容器。它可以让返回值的空语义更明确，并降低部分空指针风险，但不能自动消除 NullPointerException，也不应替代正常的参数校验和领域建模。

### 常用方法

![Optional 常用方法](/images/java-core/java-8/optional-methods.png)

#### 创建 Optional

```java
Optional<User> required = Optional.of(user);          // user 不能为 null
Optional<User> nullable = Optional.ofNullable(user);  // user 可以为 null
Optional<User> empty = Optional.empty();
```

#### 判断与消费

```java
if (nullable.isPresent()) {
    System.out.println(nullable.get());
}

nullable.ifPresent(value -> System.out.println(value.getName()));
```

不建议把 `isPresent()` 与 `get()` 当作普通 null 判断的机械替换，优先使用映射、过滤和默认值方法。

#### 获取默认值

```java
User first = nullable.orElse(defaultUser());
User second = nullable.orElseGet(() -> defaultUser());
User third = nullable.orElseThrow(() -> new IllegalStateException("用户不存在"));
```

区别：

- `orElse()` 的参数会立即计算，即使 Optional 中有值。
- `orElseGet()` 只在没有值时调用 Supplier，适合创建成本较高的默认值。

#### map、flatMap 与 filter

```java
String name = nullable
    .filter(User::isEnabled)
    .map(User::getName)
    .orElse("unknown");
```

如果映射函数本身返回 Optional，应使用 `flatMap()` 避免产生嵌套：

```java
Optional<Address> address = nullable.flatMap(User::getAddress);
```

### 典型应用

传统多层判空：

```java
String city = null;
if (user != null && user.getAddress() != null) {
    city = user.getAddress().getCity();
}
```

Optional 写法：

```java
String city = Optional.ofNullable(user)
    .map(User::getAddress)
    .map(Address::getCity)
    .orElse("unknown");
```

### 使用边界

- 适合作为查询方法的返回值。
- 不建议作为实体字段，很多 ORM 和序列化框架处理不自然。
- 不建议作为方法参数，调用方直接传入普通值或 `null` 更清晰。
- 不要在 Optional 中保存 `null`。
- 不要无条件调用 `get()`。
- 集合通常直接返回空集合，不需要 `Optional<List<T>>`。

## 对反射的支持增强

Java 8 对反射和类型元数据提供了多项增强，例如：

- `java.lang.reflect.Parameter` 可以读取方法参数信息。
- 使用编译参数 `-parameters` 后，可以在运行期读取真实参数名。
- `Method.isDefault()` 可以判断接口方法是否为默认方法。
- `AnnotatedType` 等 API 可以读取类型注解信息。
- 重复注解可通过 `getAnnotationsByType()` 等方法读取。

读取参数名示例：

```java
Method method = UserService.class.getMethod("findUser", Long.class);
for (Parameter parameter : method.getParameters()) {
    System.out.println(parameter.getName());
}
```

编译时需要保留参数名：

```text
javac -parameters UserService.java
```

### 原文历史性能测试

原文还展示了 JDK 8 和 JDK 7 下直接创建对象、反射赋值和反射创建对象的运行时间对比：

![原文 JDK 8 反射性能测试结果](/images/java-core/java-8/reflection-jdk8-benchmark.png)

![原文 JDK 7 反射性能测试结果](/images/java-core/java-8/reflection-jdk7-benchmark.png)

这些图片可以作为历史测试记录，但不能据此直接得出“JDK 8 反射一定更快”的通用结论。手写循环容易受到 JIT 预热、逃逸分析、死代码消除、计时精度和测试顺序影响。严谨微基准应使用 JMH，并同时给出 JVM 参数、预热轮次、测量轮次和硬件环境。

## 接口默认方法和静态方法

Java 8 允许接口定义默认方法和静态方法：

```java
public interface Named {
    String getName();

    default boolean hasName() {
        return getName() != null && !getName().isEmpty();
    }

    static Named empty() {
        return () -> "";
    }
}
```

默认方法主要解决接口演进问题：接口增加新能力时，可以提供默认实现，避免所有已有实现类立即报错。

### 默认方法冲突规则

- 类中的方法优先于接口默认方法。
- 子接口的默认方法优先于父接口。
- 同时实现两个无继承关系、且默认方法签名相同的接口时，实现类必须显式重写。

```java
public interface Left {
    default String name() {
        return "left";
    }
}

public interface Right {
    default String name() {
        return "right";
    }
}

public class Both implements Left, Right {
    @Override
    public String name() {
        return Left.super.name();
    }
}
```

接口静态方法属于接口本身，不能通过实现类实例继承调用。

## 新日期时间 API

Java 8 在 `java.time` 包中引入线程安全、语义清晰的日期时间 API。

| 类型 | 说明 |
| --- | --- |
| `LocalDate` | 日期，不含时间和时区 |
| `LocalTime` | 时间，不含日期和时区 |
| `LocalDateTime` | 日期时间，不含时区 |
| `Instant` | UTC 时间线上的时间点，适合时间戳 |
| `ZonedDateTime` | 带时区的日期时间 |
| `ZoneId` | 时区标识 |
| `Duration` | 以秒、纳秒表示时间间隔 |
| `Period` | 以年、月、日表示日期间隔 |
| `DateTimeFormatter` | 线程安全的格式化器 |

```java
LocalDate today = LocalDate.now();
LocalDateTime current = LocalDateTime.now();
Instant instant = Instant.now();

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String text = current.format(formatter);
LocalDateTime parsed = LocalDateTime.parse(text, formatter);
```

### 时区转换

```java
ZoneId shanghai = ZoneId.of("Asia/Shanghai");
ZonedDateTime shanghaiTime = ZonedDateTime.now(shanghai);

Instant instant = shanghaiTime.toInstant();
ZonedDateTime londonTime = instant.atZone(ZoneId.of("Europe/London"));
```

### 与旧 Date 互转

```java
Date legacyDate = Date.from(instant);
Instant converted = legacyDate.toInstant();
```

业务中要区分“本地日期时间”和“绝对时间点”。订单创建时间、日志时间更适合使用时间戳或 `Instant`；生日等不依赖时区的业务日期适合 `LocalDate`。

## CompletableFuture

Java 8 引入 `CompletableFuture`，用于异步执行、结果转换、任务组合和异常处理。它属于 `java.util.concurrent` 并发工具体系；完整方法说明、组合示例和线程池注意事项见 [JUC 并发包：CompletableFuture](/java-core/juc#completablefuture)。

## Base64 API

Java 8 提供标准 Base64 编解码 API：

```java
String source = "Java 8";

String encoded = Base64.getEncoder()
    .encodeToString(source.getBytes(StandardCharsets.UTF_8));

String decoded = new String(
    Base64.getDecoder().decode(encoded),
    StandardCharsets.UTF_8
);
```

还提供 URL-safe 编码器：

```java
String encoded = Base64.getUrlEncoder()
    .withoutPadding()
    .encodeToString(source.getBytes(StandardCharsets.UTF_8));
```

Base64 只是编码，不是加密，不能用于保护密码、Token 或敏感数据。

## 重复注解与类型注解

### 重复注解

Java 8 允许同一个注解在同一位置重复出现，需要定义容器注解：

```java
@Repeatable(Roles.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Role {
    String value();
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Roles {
    Role[] value();
}
```

```java
@Role("admin")
@Role("auditor")
public class AdminService {
}
```

读取重复注解：

```java
Role[] roles = AdminService.class.getAnnotationsByType(Role.class);
```

### 类型注解

Java 8 扩展了注解可使用的位置，可以通过 `ElementType.TYPE_USE` 标注类型使用位置：

```java
@Target(ElementType.TYPE_USE)
public @interface NotNull {
}

List<@NotNull String> names = new ArrayList<>();
```

类型注解主要服务静态分析、空安全检查和框架元数据，本身不会自动执行校验逻辑。

## Nashorn JavaScript 引擎

Java 8 引入 Nashorn，可以通过 `ScriptEngine` 在 JVM 内执行 JavaScript：

```java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
Object result = engine.eval("1 + 2");
System.out.println(result);
```

Nashorn 是 Java 8 的历史特性：

- JDK 11 中被标记为 deprecated。
- JDK 15 中被移除。
- 新项目不应把它作为长期脚本执行方案。
- 执行外部脚本存在安全风险，不能直接运行用户提交的 JavaScript。

## 实践建议

- Lambda 和方法引用以可读性为前提，不要把复杂业务压缩为一条表达式。
- 优先复用 `java.util.function` 标准接口。
- Stream 适合过滤、映射、分组、统计；复杂控制流和需要索引的逻辑普通循环更直接。
- JDK 8 没有 `Stream.toList()`，应使用 `collect(Collectors.toList())`。
- 并行流不一定更快，生产服务应压测后使用。
- Optional 适合作为返回值，不建议作为实体字段和方法参数。
- 日期时间统一使用 `java.time`，避免继续使用线程不安全的 `SimpleDateFormat`。
- 异步编排必须关注线程池、超时、异常和下游容量。
- Base64 不是加密。
- Nashorn 已被后续 JDK 移除，不建议新增依赖。

## 参考资料

- [Java之Java 8新特性 - 掘金](https://juejin.cn/post/6962035387787116551)，作者：爱吃薯片的猫，发布于 2021-05-14。
- [Java Platform, Standard Edition 8 API Specification](https://docs.oracle.com/javase/8/docs/api/)
- [Package java.util.function](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html)
- [Package java.util.stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html)

> 页面中的原文配图仅用于个人学习整理。如需公开转载或商业使用，应先确认原作者和平台的授权要求。
