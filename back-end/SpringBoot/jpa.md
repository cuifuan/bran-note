# 前言

`JPA` 一种规范，并非ORM框架，也就是ORM上统一的规范。

今天学习的是 `spring-data-jpa`，与 `Mybatis` 类似。根本上都是用来在 `Java` 中用来操作数据库的，不是比 `Mybatis` 强，也不比 `Mybatis` 弱，各有各的好处。

那就有人要说了，那我为啥要再去学 JPA，而不直接接着用 Mybatis。其实 JPA 技术的核心在于便捷开发，可以直接通过**实体字段映射表字段**，在启动项目的时候，根据**配置策略来进行表结构的生成或者增量变动**。

下面我们通过一些简单的案例来初步学习下。  



# 总结
> 用这项技术可能会出现什么问题，官方有没有提供方案解决，如果没有，可能的解决方案有哪些。
# 

## 




- spring-boot-starter-data-jpa 是Spring Boot的项目，包含了spring-data-jpa和一些其他依赖用于Spring Boot项目
- spring-data-jpa 是Spring Data的项目，就是本体，用于任何项目
## 解决

- 为了执行简单查询分页，编写太多重复代码
- 基于JPA的数据访问层的增强支持
> 用了之后可以做什么，为什么要用？如下代码解释


实体类


```java
package com.example.springredis.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@Data
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String account;
    private String pwd;

}
```


dao层


```java
@Repository
public interface UserDao extends JpaRepository<User, Long> {

}
```


测试类


```java
@Autowired
	private UserDao userDao;

    public void findAllTest() {
        System.out.println(userDao.findAll().toString());
    }
```


上面的操作已经完成了一个查询全部，相信不用在做多余的解释了

JPA优点：主要就是简单易用，集成方便,可以不用写SQL语句


## 准备工作


- JDK 1.8 以上
- IDEA 2020.3
- Gradle 5+ 或者 Maven 3.5+
- 在 [https://start.spring.io/](https://start.spring.io) 初始化一个项目

![image.png](https://imgconvert.csdnimg.cn/aHR0cDovL2Nkbi5ubGFyay5jb20veXVxdWUvMC8yMDIwL3BuZy82MzEyNDIvMTU5MDA0ODU1MjQ2Mi04YmI3MTZkZC1jYmU0LTQ1ZTUtOThjMC1lZjc4ZmQ1OTM2NmIucG5n?x-oss-process=image/format,png#align=left&display=inline&height=873&margin=[objectObject]&name=image.png&originHeight=1746&originWidth=3354&size=419283&status=done&style=none&width=1677)
这里使用的是Maven,下载之后请在IDEA导入项目


## 项目结构图
![image.png](https://imgconvert.csdnimg.cn/aHR0cDovL2Nkbi5ubGFyay5jb20veXVxdWUvMC8yMDIwL3BuZy82MzEyNDIvMTU5MDA1NTgyNTE3My1hNDEwMTY0MS1hYWZlLTQ4NDUtODJhZC05MmY3MDhjZGNiODUucG5n?x-oss-process=image/format,png#align=left&display=inline&height=747&margin=[objectObject]&name=image.png&originHeight=1494&originWidth=838&size=216173&status=done&style=none&width=419)
## 先看pom.xml配置


> 国外依赖下载慢,更换阿里源

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.0.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>springboot-jpa</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>springboot-jpa</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <!--阿里云主仓库，代理了maven central和jcenter仓库-->
        <repository>
            <id>aliyun</id>
            <name>aliyun</name>
            <url>https://maven.aliyun.com/repository/public</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
        <!--阿里云代理Spring 官方仓库-->
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://maven.aliyun.com/repository/spring</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>

</project>
```

## 定义一个实体对象 SysUser.java


```java
package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "sys_user")
public class SysUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;

    private String username;

    private String password;

    public SysUser(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
```


- 这里有一个`**SysUser**` 类, `@NoArgsConstructor`  默认构造函数仅为JPA而存在。
- 另一个构造函数是您将用于创建要保存到数据库的user实例的构造函数。
- 在类上加 `@Entity`  注解，表示这个是一个 JPA 的实体，如果在类上没有加 `@Table` 注解，表明该实体将映射到名为 `sys_user`  的表,如果要加上,可以在其 name 属性里写入表名，如: `@Table(name = "t_user")` 
- `id` 属性使用 `@Id` 注释，以便JPA将其识别为对象的ID.
- @GeneratedValue(strategy  = GenerationType.AUTO) 自增长ID策略



## 创建一个 UserRepository.java 接口


> 这里很简单，直接继承核心接口**JpaRepository**



```java
package com.example.demo.repository;

import com.example.demo.model.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<SysUser, Long> {

}
```


![](https://imgconvert.csdnimg.cn/aHR0cDovL3d4NC5zaW5haW1nLmNuL2xhcmdlL2QxZGI5ZmQzZ3kxZnhsa3FtYTJiNWoyMXdxMWhtZHpoLmpwZw?x-oss-process=image/format,png#align=left&display=inline&height=1930&margin=[objectObject]&originHeight=1930&originWidth=2474&status=done&style=none&width=2474)


## 配置文件application.yml


修改application.properties 为 application.yml


**src/main/resources/application.yml**


```java
spring:
  datasource:
    driverClassName: org.h2.Driver
    password: root
    url: jdbc:h2:mem:demodb:file:data/demo
    username: root
  jpa:
    open-in-view: true
    database-platform: org.hibernate.dialect.H2Dialect
    # spring.jpa.show-sql=true 配置在日志中打印出执行的 SQL 语句信息。
    show-sql: true
    # 配置指明在程序启动的时候要删除并且创建实体类对应的表。
    # create 这个参数很危险，因为他会把对应的表删除掉然后重建。所以千万不要在生成环境中使用。只有在测试环境中，一开始初始化数据库结构的时候才能使用一次。
    # ddl-auto:create----每次运行该程序，没有表格会新建表格，表内有数据会清空
    # ddl-auto:create-drop----每次程序结束的时候会清空表
    # ddl-auto:update----每次运行程序，没有表格会新建表格，表内有数据不会清空，只会更新(推荐)
    # ddl-auto:validate----运行程序会校验数据与数据库的字段类型是否相同，不同会报错
    hibernate.ddl-auto: update
```


## h2数据库
> 在resources 文件夹下新建 data.sql



**data.sql** 
```sql
DROP TABLE IF EXISTS sys_user;

CREATE TABLE sys_user
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    email    VARCHAR(250) DEFAULT NULL,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);
```


## 测试类进行测试 SpringbootJpaApplicationTests.java


```java
package com.example.demo;

import com.example.demo.model.SysUser;
import com.example.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringbootJpaApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Before
    public void add() {
        userRepository.save(new SysUser("123@qq.com", "root", "root"));
    }

    @Test
    public void contextLoads() {
        System.out.println(userRepository.findAll().toString());
    }

    //修改操作
    @After
    public void update() {
        // ifPresent 如果存在值，则使用值调用指定的使用者，否则不执行任何操作。
        userRepository.findById(1L).ifPresent(user -> {
            user.setUsername("马华云腾");
            userRepository.save(user);
            System.out.println(user.toString());
        });
    }

    //删除
    @After
    public void del() {
        userRepository.findById(2L).ifPresent(user -> userRepository.delete(user));
    }

}
```


## 测试输出
![image.png](https://imgconvert.csdnimg.cn/aHR0cDovL2Nkbi5ubGFyay5jb20veXVxdWUvMC8yMDIwL3BuZy82MzEyNDIvMTU5MDA1Njg2MTIwNi1kMTBhMjcxYi04M2MzLTQyOTEtYjI1ZS1jMDIzZTYwZjI3N2QucG5n?x-oss-process=image/format,png#align=left&display=inline&height=379&margin=[objectObject]&name=image.png&originHeight=758&originWidth=3272&size=213930&status=done&style=none&width=1636)
## 常见异常


如果出现下列等错误：


```
Error:(41, 13) java: 找不到符号
  符号:   方法 setName(java.lang.String)
  位置: 类型为com.example.springbootjpademo.entity.User的变量 user
```


请注意下面的设置是否正确：


![](https://imgconvert.csdnimg.cn/aHR0cDovL3d4NC5zaW5haW1nLmNuL2xhcmdlL2QxZGI5ZmQzZ3kxZnhsbXZlb3EweWoyMXZ3MTl3YWpoLmpwZw?x-oss-process=image/format,png#align=left&display=inline&height=1652&margin=[objectObject]&originHeight=1652&originWidth=2444&status=done&style=none&width=2444)
## RestClient API 测试


![image.png](https://imgconvert.csdnimg.cn/aHR0cDovL2Nkbi5ubGFyay5jb20veXVxdWUvMC8yMDIwL3BuZy82MzEyNDIvMTU5MDA1NjkyNzc2Ni1kNmY2Njg0OC0xYjFhLTQ0YjUtYWEyMS1iYzJmZTNiZWM1NmIucG5n?x-oss-process=image/format,png#align=left&display=inline&height=879&margin=[objectObject]&name=image.png&originHeight=1758&originWidth=1340&size=593382&status=done&style=none&width=670)


```java
### 新增1

POST http://localhost:8080/user/add
Content-Type: application/json

{
  "email": "eyck@aws.com",
  "username": "root",
  "password": "root"
}

### 新增2

POST http://localhost:8080/user/add
Content-Type: application/json

{
"email": "ekko@aws.com",
"username": "ekko",
"password": "ekko"
}

### 修改

PUT http://localhost:8080/user/update
Content-Type: application/json

{
  "id": 1,
  "email": "eyck@aws.com",
  "username": "root",
  "password": "root"
}

### 获取所有
GET http://localhost:8080/user/all
Accept: */*
Cache-Control: no-cache

### 删除

PUT http://localhost:8080/user/del/2

### 获取所有
GET http://localhost:8080/user/all
Accept: */*
Cache-Control: no-cache
```


左上角 Run all ...
测试结果....
![image.png](https://imgconvert.csdnimg.cn/aHR0cDovL2Nkbi5ubGFyay5jb20veXVxdWUvMC8yMDIwL3BuZy82MzEyNDIvMTU5MDA1Njk5ODcwOC02NDViNmZlNy1jYmJhLTRmZWUtYTUyNi1mNDk3Y2JlODM3MmQucG5n?x-oss-process=image/format,png#align=left&display=inline&height=437&margin=[objectObject]&name=image.png&originHeight=874&originWidth=1850&size=192793&status=done&style=none&width=925) 
## 代码地址

[https://github.com/Gleans/spring-boot/tree/master/springboot-jpa](https://github.com/Gleans/spring-boot/tree/master/springboot-jpa)