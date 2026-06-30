# Java 高频题

## HashMap 为什么线程不安全？

### 考察点

- 哈希表结构
- 扩容机制
- 并发修改
- `ConcurrentHashMap`

### 标准回答

`HashMap` 本身没有同步控制，多线程同时 `put`、扩容或修改链表 / 红黑树结构时，可能出现数据覆盖、结构异常或读取到不一致数据。并发读写场景应该使用 `ConcurrentHashMap`，或者在更高层用锁控制访问。

### 深入解释

JDK 8 中 `HashMap` 底层是数组 + 链表 + 红黑树。并发写入时，多个线程可能同时计算桶位置、修改节点指针或触发扩容，导致结构状态不可预期。线程安全不仅是“不报错”，还包括可见性、原子性和结构一致性。

### 常见追问

- JDK 8 的 `HashMap` 为什么引入红黑树？
- `ConcurrentHashMap` 如何保证线程安全？
- 为什么重写 `equals()` 必须重写 `hashCode()`？

### 关联文档

- [集合框架](/java-core/language#collections)
- [并发容器](/java-core/concurrency#concurrent-containers)

## String 为什么不可变？

### 标准回答

`String` 不可变可以保证字符串常量池安全、Hash 值稳定、线程安全以及作为 Map key 时行为可靠。每次看似修改字符串，实际都会创建新对象或由编译器优化为 `StringBuilder` 拼接。

### 常见追问

- `StringBuilder` 和 `StringBuffer` 有什么区别？
- 循环中字符串拼接为什么不推荐用 `+`？
- 字符串比较为什么要用 `equals()`？

### 关联文档

- [字符串](/java-core/language#basic-syntax)

## equals 和 hashCode 有什么关系？

### 标准回答

如果两个对象 `equals()` 返回 `true`，它们的 `hashCode()` 必须相同。否则放入 `HashMap`、`HashSet` 这类哈希集合时，会出现查找不到、重复元素等异常行为。

### 常见追问

- `==` 和 `equals()` 有什么区别？
- 为什么哈希冲突不可避免？
- 对象作为 Map key 要注意什么？

### 关联文档

- [集合框架](/java-core/language#collections)

## ArrayList 和 LinkedList 怎么选？

### 标准回答

大多数业务场景默认用 `ArrayList`，因为随机访问快、内存连续、CPU 缓存友好。`LinkedList` 适合频繁头尾插入删除的队列场景，但随机访问慢，节点对象也有额外内存开销。

### 常见追问

- `ArrayList` 扩容机制是什么？
- `LinkedList` 为什么随机访问慢？
- 多线程场景能不能直接用 `ArrayList`？

### 关联文档

- [集合框架](/java-core/language#collections)

## Java 只有值传递是什么意思？

### 标准回答

Java 方法参数传递的是值。对于基本类型，传递的是变量值；对于对象，传递的是对象引用的副本。方法内部可以通过引用副本修改对象内部状态，但不能让外部引用指向一个新对象。

### 关联文档

- [值传递](/java-core/language#basic-syntax)
