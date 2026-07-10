---
title: '泛型'
description: '基于 JDK 8 梳理 Java 泛型，包括类型擦除、泛型类、泛型方法、通配符、PECS 原则和常见限制。'
outline: [2, 3]
---

# 泛型

> 本页默认以 JDK 8 为技术基线。

泛型的核心价值是在编译期提供类型检查，减少强制类型转换和运行期类型错误。

## 是什么

泛型把类型作为参数传入类、接口或方法：

```java
List<String> names = new ArrayList<String>();
names.add("Java");
String name = names.get(0);
```

JDK 7 以后可以使用菱形语法，JDK 8 项目中也可以这样写：

```java
List<String> names = new ArrayList<>();
```

## 类型擦除

Java 泛型主要通过类型擦除实现。编译器在编译期检查类型，生成字节码后大部分泛型类型信息会被擦除为原始类型或上界类型。

```java
List<String> list = new ArrayList<>();
// 运行期对象仍然主要是 ArrayList，不会因为 String 生成一个新的 List 类型
```

影响：

- 不能直接 `new T()`。
- 不能直接 `new T[]`。
- 不能用 `list instanceof List<String>`。
- `List<String>` 和 `List<Integer>` 在运行期原始类型都是 `List`。

注意：泛型擦除不代表所有声明信息都完全消失，类文件的 `Signature` 等元数据中仍可能保留部分泛型声明，框架可以通过反射读取这些元数据。

## 泛型类与泛型接口

泛型类示例：

```java
public class Result<T> {
    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
```

泛型接口示例：

```java
public interface Repository<T, ID> {
    T findById(ID id);
    void save(T entity);
}
```

业务中常见于统一返回值、DAO、转换器、策略接口等场景。

## 泛型方法

泛型方法把类型参数声明在方法上：

```java
public static <T> T first(List<T> list) {
    if (list == null || list.isEmpty()) {
        return null;
    }
    return list.get(0);
}
```

泛型方法适合工具方法和通用转换逻辑。方法级泛型不要滥用，否则会让调用方难以理解真实类型约束。

## 通配符

通配符用于表达不确定类型：

```java
List<?> list
List<? extends Number> numbers
List<? super Integer> integers
```

常见形式：

| 写法 | 含义 | 读写特点 |
| --- | --- | --- |
| `?` | 未知类型 | 可读为 `Object`，一般不能写具体元素 |
| `? extends T` | T 或 T 的子类型 | 适合读取，写入受限 |
| `? super T` | T 或 T 的父类型 | 适合写入 T，读取时通常只能按 `Object` 处理 |

## PECS 原则

PECS 是 Producer Extends Consumer Super：

- 生产者用 `? extends T`。
- 消费者用 `? super T`。

示例：

```java
public void copy(List<? extends Number> source, List<? super Number> target) {
    for (Number number : source) {
        target.add(number);
    }
}
```

`source` 负责生产 `Number`，所以用 `extends`；`target` 负责消费 `Number`，所以用 `super`。

## 常见限制

泛型使用中常见限制：

- 不能创建泛型数组：`new List<String>[10]` 不合法。
- 不能用基本类型作为泛型参数：`List<int>` 不合法，应使用 `List<Integer>`。
- 静态成员不能直接使用类级泛型参数。
- 方法重载不能只依赖泛型参数差异，因为擦除后签名可能冲突。

## 实践建议

- 对外 API 尽量声明明确泛型，减少调用方强转。
- 不要滥用原始类型，例如 `List list`。
- 只读数据源优先考虑 `? extends T`，写入目标优先考虑 `? super T`。
- 泛型设计应服务类型安全，不要为了“通用”把业务语义抽得过空。
