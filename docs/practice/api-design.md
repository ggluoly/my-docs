---
title: 'API 设计规范'
description: 'API 设计规范文档，介绍 RESTful 接口、统一响应、异常处理、参数校验和 Java 后端接口幂等实践。'
---

# API 设计规范

> 本页内容为新增的工程实践部分，不来自原《Spring 技术套件》文档。

## 是什么

企业项目中，统一的 API 规范决定了前后端协作效率和系统可维护性。本页讲 RESTful 规范、统一返回、全局异常、参数校验和接口幂等这些"业务脚手架"。

## RESTful 规范

用 HTTP 方法表达操作语义，用 URL 表达资源：

```
GET    /users        查询用户列表
GET    /users/{id}   查询单个用户
POST   /users        创建用户
PUT    /users/{id}   全量更新
PATCH  /users/{id}   部分更新
DELETE /users/{id}   删除用户
```

约定：

```
URL 用名词复数，不用动词
层级表达从属：/users/{id}/orders
过滤 / 分页 / 排序用查询参数：?page=1&size=20&sort=createTime,desc
版本放在路径或请求头：/api/v1/users
```

## 统一返回结构

所有接口返回统一包装，前端处理更一致：

```java
public class Result<T> {
    private final int code;
    private final String message;
    private final T data;

    private Result(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(0, "ok", data);
    }

    public static <T> Result<T> error(int code, String message) {
        return new Result<>(code, message, null);
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
```

配合 `@RestControllerAdvice` 可以自动包装返回值，避免每个接口手写。

## 全局异常处理

用 `@RestControllerAdvice` 集中处理异常，避免 try-catch 散落各处：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BizException.class)
    public Result<Void> handleBiz(BizException e) {
        return Result.error(e.getCode(), e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValid(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldError().getDefaultMessage();
        return Result.error(400, msg);
    }
}
```

## 参数校验

用 `Spring Validation`（Bean Validation）做声明式校验：

```java
public class CreateUserRequest {
    @NotBlank(message = "用户名不能为空")
    private String username;

    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 18, message = "年龄不能小于 18")
    private int age;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

@PostMapping("/users")
public Result<Long> create(@Valid @RequestBody CreateUserRequest req) {
    // 校验不通过会抛 MethodArgumentNotValidException，由全局异常处理
    return Result.success(1L); // 示例 ID；实际项目返回业务服务创建后的用户 ID
}
```

以上 DTO 和统一返回示例使用普通 Java 类，可在 JDK 8 项目中编译；现代 Java 项目可以按团队规范改用 `record`，但不应把它写进 JDK 8 基线示例。

## 接口幂等

防止重复提交、消息重复消费导致的数据错误：

```
唯一索引：数据库层面拦截重复数据
Token 机制：提交前先拿 token，提交时校验并删除
分布式锁：Redisson 锁住业务键，详见缓存层
状态机：只允许特定状态流转，重复请求无副作用
```

## 选型建议

- 统一返回 + 全局异常 + 参数校验是每个 Spring Boot 项目都该有的三件套，建议抽成公共 starter。
- 对外开放 API 要考虑版本管理和向后兼容，不要随意改返回结构。
- 写操作接口默认都要考虑幂等，尤其是支付、下单这类。
- 接口文档用 [Knife4j / Springdoc](/engineering/api-doc) 自动生成，和代码保持同步。
