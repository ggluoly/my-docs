---
title: '异常体系'
description: '基于 JDK 8 梳理 Java 异常体系，包括 Throwable、Error、Exception、受检异常、非受检异常和后端异常处理实践。'
outline: [2, 3]
---

# 异常体系

> 本页默认以 JDK 8 为技术基线。

异常用于表达程序运行中的非正常情况。后端服务中的异常处理不仅影响代码可读性，也直接影响接口返回、事务回滚和问题排查。

## 异常层级

```text
Throwable
├── Error
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   └── ClassCastException
    └── 其他 Exception
        ├── IOException
        └── SQLException
```

说明：

- `Error` 表示系统级严重错误，业务代码通常不应捕获。
- `RuntimeException` 及其子类是非受检异常。
- 除 `RuntimeException` 及其子类以外的 `Exception` 通常是受检异常。

## 受检异常与非受检异常

| 类型 | 编译期要求 | 典型异常 | 场景 |
| --- | --- | --- | --- |
| 受检异常 | 必须捕获或声明抛出 | `IOException`、`SQLException` | 外部资源、IO、数据库等可预期失败 |
| 非受检异常 | 编译期不强制处理 | `NullPointerException`、`IllegalArgumentException` | 编程错误、参数错误、业务失败 |

后端业务中，自定义业务异常通常继承 `RuntimeException`，这样可以配合 Spring 事务默认回滚规则和全局异常处理器。

## try-catch-finally

基本写法：

```java
try {
    service.execute();
} catch (BusinessException e) {
    log.warn("business failed", e);
    throw e;
} catch (Exception e) {
    log.error("system failed", e);
    throw new SystemException("系统异常", e);
} finally {
    cleanup();
}
```

注意：

- 不要吞异常，至少要记录日志并保留堆栈。
- `finally` 中不要 `return`，否则可能覆盖正常返回值并吞掉异常。
- 捕获异常时不要只打印 `e.getMessage()`，应保留完整堆栈。

## try-with-resources

JDK 7 起支持 try-with-resources，JDK 8 项目中可以正常使用。实现 `AutoCloseable` 的资源会自动关闭：

```java
try (InputStream input = new FileInputStream(file)) {
    // read input
} catch (IOException e) {
    log.error("read file failed", e);
}
```

这比手写 `finally` 关闭资源更安全，也更简洁。

## 业务异常设计

常见业务异常：

```java
public class BusinessException extends RuntimeException {
    private final String code;

    public BusinessException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
```

配合全局异常处理器统一响应：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusiness(BusinessException e) {
        return Result.fail(e.getCode(), e.getMessage());
    }
}
```

## 实践建议

- 参数错误使用 `IllegalArgumentException` 或业务异常表达。
- 可恢复的外部资源异常要补充重试、降级或清晰错误码。
- 不要用异常控制正常业务流程，例如循环中频繁靠异常分支判断。
- 日志要记录关键上下文，但不能输出密码、Token、身份证号等敏感信息。
- Spring 事务默认对 `RuntimeException` 和 `Error` 回滚，对受检异常不默认回滚，必要时配置 `rollbackFor`。
