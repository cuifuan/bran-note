## 什么是 Lombok

Java 语言的排名一直名列前茅，但是有时候我们的代码与业务无关，并且过于冗长，并例如在实体类中，经常写很多 `getter` 或者 `setter` 方法。  
这时候我们使用 `Lombok` 来使用一些功能，使其代替我们把 Java 字节码自动编译到 `class` 文件中。  

## Lombok 配置
目前作者在用的 `idea` 版本为 `2022.1.1` ，已经默认集成了 `Lombok` 插件，低版本的 idea 可以自行去插件库安装 Lombok 插件。  

> `Maven` 引入 `Lombok` 依赖  

[这里是](https://projectlombok.org/changelog)Lombok更新日志与可用版本

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version>
    <scope>provided</scope>
</dependency>
```
在 `pom.xml` 中引入的上述依赖，可以看到 `scope` 是 `provided` 状态，此状态表示此依赖只在编译与测试时有效，当我们项目打包成 `*.jar` 的时候并不会打入进去。

## 为什么要使用 Lombok
很多技术我们会有疑问，就是为什么要用这项技术？下面来揭晓  
引入 Lombok 前 , 我们的实体类  
```java
package com.test;

public class TestModel {
    private String name;
    private Integer age;
    private String sex;

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
```
可以看到上面的实体代码中，已经多了很多 get 与 set 方法，这还是处于实体属性字段少的情况下。平时项目开发过程中，属性字段存在 30+ 的时候，大约会有 180+ 行 `get` 与 `set` 方法冗余代码。整个实体很臃肿。这个时候我们引入 Lombok 看下  
```java
package com.test;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TestModel {
    private String name;
    private Integer age;
    private String sex;

    public static void main(String[] args) {
        TestModel model = new TestModel();
        model.setName("张三");
    }
}
```

我们加入了`@Setter`与`@Getter`注解后，这时 `Lombok` 会代替我们在编译的时候，去 `class` 文件增加 `get` 与 `set` 方法。  
经常使用的时候，还会使用一个 `@ToString` 的注解，这时候发现类上已经追加了三个注解，再算上我们 swagger 和 jpa 等注解。   

> 注解太多？  没事，有[聚合注解 @Data ](https://projectlombok.org/features/Data)    

![@Data.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46875dd1419b493ba702abdf8c413f72~tplv-k3u1fbpfcp-watermark.image?)

通常，我们最常用的 `Lombok` 中的注解就是 `@Data`  .  

## 简化 set 与 get 方法

日常使用下的 set 方法是这样操作的  

```java
TestModel model = new TestModel();
model.setName("张三");
model.setAge(18);
```

get 方法是如下这样的  

```java
System.out.println(model.getName() + "-" + model.getAge());
```

get*() 与 set*() 写多了也会降低开发效率，并且看起来并不是很直观，因为这些大多是与逻辑无关的操作。  

> 使用 @Accessors(chain = true) 注解

```java
@Data
@Accessors(chain = true)
public class TestModel {
    private String name;
    private Integer age;
    private String sex;

    public static void main(String[] args) {
        TestModel model = new TestModel().setName("张三").setAge(18);
    }
}
```

当字段繁多的时候，我们使用这种链式的 set 方式使代码更加直观与整洁。  

**Ps: 细节注意**

`@Accessors(fluent = true)`不要与 `fastjson` 一起使用，`反序列化`会有 bug。

## 实体建造者模式

以下代码为设置一个 api 请求的实体

```java
public class ApiSettings {
    private String host;
    private int port;
    private String username;
    private String password;
    // 其他字段
    // 空构造方法
}
```

像上述这种情况，我们希望当创建完成一个 `api` 请求的设置后不会被 set 方法更改，这时需要设计一个`建造者模式`的实体。使用 `Lombok` 的优点又体现出来，我们参考如下代码，使用 `@Builder` 注解。  

```java
@Builder
public class ApiSettings {
    // ... 类中代码保持不变
}
```

下面我们使用此模式来构建一个 `api` 请求类，如下：  

```java
ApiSettings.builder()
        .host("127.0.0.1")
        .port(8080)
        .username("admin")
        .password("admin")
        .build();
```

## 空构造方法

当只使用 `@Data` 注解的时候，会存在默认的空构造方法，也就是相当于存在 `@NoArgsConstructor` 。

当增加注解`@AllArgsConstructor`后，反编译 `class` 如下：  

```java
ApiSettings(final String host, final int port, final String username, final String password) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
}
```

会增加一个全属性构造，这个时候再去 new 实体的空构造就会报错，就需要创建空构造或者引入`@NoArgsConstructor` 了。
