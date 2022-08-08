# Spring Cloud Eureka 组件:服务的注册与发现

## 为什么需要服务注册？

假如A服务调用B服务，在正常情况下，我们会在java代码中写一个Get或者Post请求，但这个时候我们请求的url固定写死的，假如URL为`http:127.0.0.1:8888/api/user`

那么如果B服务做了负载均衡或者动了端口，我们就需要更改代码中写死的URL，后续还要做重复打包上线这些无用功

现在我们使用Eureka后，把所有的服务放在一个池子里面，当B服务注册在池子里面，并且给定一个服务名称B-Service，那么无论B服务是更改端口，或是做负载均衡，A服务是根据B服务的名字B-Service进行请求的

因此我们需要服务注册，同时A能拉取服务列表，也就说明在服务注册后，其他服务可以发现此服务，就是服务发现。



注册服务的一方是**服务提供者**，而调用其他服务的接口的则是**服务消费者**，两者是相对的。



同时，一个服务可以是服务提供者，又可以是服务消费者，关键是以谁为参照物。例如A服务调用B服务，B服务又去调用了C服务接口，那么B服务相对于A来说就是服务提供者，相对于C服务来说就是服务消费者。



## 新建一个 Eureka Server 服务端

### 创建一个 Spring Boot 项目

![image-20220128124531953](http://images.zabbix.store/images/image-20220128124531953.png)

点击下一步，搜索依赖`eureka` 然后选择 eureka-server  

![image-20220128124650926](http://images.zabbix.store/images/image-20220128124650926.png)

点击 Finish  

使用全文搜索 **SpringBootApplication**，然后在其上增加一行注解 **@EnableEurekaServer**

代码如下：  

```java
/**
 * @EnableEurekaServer 激活注册中心，激活相关配置
 */
@EnableEurekaServer
@SpringBootApplication
public class GenshinEurekaApplication {
```

配置文件 **application.properties**   

```properties
# 项目端口
server.port=9001
# 设置该服务注册中心的hostname
eureka.instance.hostname=localhost
# 由于我们目前创建的应用是一个服务注册中心，而不是普通的应用，默认情况下
# 这个应用会向注册中心(也是它自己)注册它自己，设置为false表示禁止这种自己向自己注册的默认行为
eureka.client.register-with-eureka=false
# 表示不去从服务端检索其他服务信息，因为自己就是服务端
# 服务注册中心本身的职责就是维护服务实例，它不需要去检索其他服务
eureka.client.fetch-registry=false
# 指定服务注册中心的位置
eureka.client.service-url.defaultZone=http://localhost:9001/eureka
```

启动此应用，然后在浏览器访问[http://localhost:9001](http://localhost:9001)即可看到项目的web窗口显示  

![image-20220128234732497](http://images.zabbix.store/images/image-20220128234732497.png)

## eureka实现高可用

修改电脑的**hosts**文件

```bash
sudo vim /etc/hosts
```

增加

```bash
127.0.0.1 shanghai
127.0.0.1 beijing
```

然后**application.properties**配置文件的内容如下：  

```properties
spring.application.name=eureka-server
# 项目端口
server.port=9001
# 设置该服务注册中心的hostname
eureka.instance.hostname=beijing
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
# 指定服务注册中心的位置
eureka.client.service-url.defaultZone=http://shanghai:9002/eureka/
```

**application-sh.properties**配置文件如下

```properties
spring.application.name=eureka-server
# 项目端口
server.port=9002
# 设置该服务注册中心的hostname
eureka.instance.hostname=shanghai
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
# 指定服务注册中心的位置
eureka.client.service-url.defaultZone=http://beijing:9001/eureka/
```

启动完成默认的eureka之后，修改启动配置项如下

![image-20220129160324618](http://images.zabbix.store/images/image-20220129160324618.png)

启动完成以后，可以在eureka控制面板看到如下内容

![image-20220129160437402](http://images.zabbix.store/images/image-20220129160437402.png)

源代码在下面地址：

[]()
