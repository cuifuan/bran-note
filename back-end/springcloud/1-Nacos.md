### 1. 前言

什么是 Nacos ？  

之前有 Eureka，但是其 2.x 版本已经闭源，等于凉了。阿里开源了 Nacos 作为配置与注册中心，动态发现服务与动态配置。  

具体的解释与作用见官方文档: [https://nacos.io/zh-cn/docs/what-is-nacos.html](https://nacos.io/zh-cn/docs/what-is-nacos.html)  

![nacos_map](https://nacos.io/img/nacosMap.jpg)

### 2. 适配版本

搭建整个微服务体系的前奏，是要设置好 Spring Cloud 与 Spring Boot 以及 Spring Cloud ALibaba 的版本保持兼容。  

[https://github.com/alibaba/spring-cloud-alibaba/wiki/版本](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

![image-20220824090832474](http://images.zabbix.store/markdown/image-20220824090832474.png?markdown)

这里先取最新的版本，开始找Alibaba 版本支持的 Nacos 版本  

![image-20220824090946760](http://images.zabbix.store/markdown/image-20220824090946760.png?markdown)

根据我们的搜索，查询到需要安装 Nacos 的 1.4.2 版本。  

> tips: Nacos 的读音是钠科(噢)斯，别面试的时候不知道怎么读。  

### 3. 安装 Naocs

下载:  

```bash
wget https://github.com/alibaba/nacos/releases/download/1.4.2/nacos-server-1.4.2.zip
```

![image-20220824091828357](http://images.zabbix.store/markdown/image-20220824091828357.png?markdown)

解压:  

```bash
unzip nacos-server-1.4.2.zip
```

删除安装包:  

```bash
rm -rf nacos-server-1.4.2.zip
```

启动 Nacos:  

```bash
cd nacos/bin
./startup.sh -m standalone
```

输出如下，证明启动成功  

![image-20220824092241382](http://images.zabbix.store/markdown/image-20220824092241382.png?markdown)

使用浏览器打开网址:[http://127.0.0.1:8848/nacos/#/login](http://127.0.0.1:8848/nacos/#/login)  

![image-20220824092522486](http://images.zabbix.store/markdown/image-20220824092522486.png?markdown)

用户名与密码都是 `nacos` ，然后登录就能看到 Naocs 后台页面，如下。  

![image-20220824092639314](http://images.zabbix.store/markdown/image-20220824092639314.png?markdown)  

### 4. 配置持久化

为什么需要配置持久化？

使用 Nacos 内置数据库存储数据不方便观察，集成 MySQL 的，可以很方便的查阅数据，备份数据等。  

#### 4.1 初始化数据库

找到数据库的初始化文件  

![image-20220824095753069](http://images.zabbix.store/markdown/image-20220824095753069.png?markdown)

在 `Nacos` 解压过后的根目录的 `conf` 文件夹下有两个 sql 文件  

![image-20220824095954495](http://images.zabbix.store/markdown/image-20220824095954495.png?markdown)

使用 `Navicat` 或者其他工具新建一个 `MySQL` 数据库，数据库名字可以自定义，用你所想。  

然后使用 `Navicat` 工具运行 `sql` 文件，把 `nacos-mysql.sql` 导入库中，导入后的状态如下  

![image-20220824100351260](http://images.zabbix.store/markdown/image-20220824100351260.png?markdown)

#### 4.2 修改配置文件

进入解压后的 `nacos` 文件夹，根目录中的 `conf` 目录下有一个名字为 `application.properties` 的文件  

![image-20220824101937816](http://images.zabbix.store/markdown/image-20220824101937816.png?markdown)

启动的 `Nacos` 服务  

```bash
# 先停止之前我们
# 先进入 nacos/bin 目录下
./shutdown.sh
# 启动
./startup.sh -m standalone
```

![image-20220824102410002](http://images.zabbix.store/markdown/image-20220824102410002.png?markdown)

#### 4.3 测试 MySQL 持久化

打开 Nacos 管理界面，新建一个用户，查看数据库中是否存在  

![image-20220824102915940](http://images.zabbix.store/markdown/image-20220824102915940.png?markdown)

`Nacos` 服务的数据持久化已接入 `MySQL` 数据库。  

