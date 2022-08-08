# Linux 安装 MySQL  

## 1. 服务器环境

* CentOS 7.2

## **2. 移除 mariadb**

操作之如果有默认数据库马瑞 DB 前先移除 mariadb

```bash
yum -y remove mari*
rm -rf /var/lib/mysql/*
```

## 3. 下载tar包

mysql5.7 的 tar 包：
下载地址：
[https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz](https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz)

## 4. 使用 ftp 工具把 tar 包传输到 usr/local/目录下

![](https://cdn.nlark.com/yuque/0/2020/jpeg/631242/1590513047406-77fb0fb8-abec-4c09-a8ee-cb1a5136e4c4.jpeg#align=left&display=inline&height=388&margin=%5Bobject%20Object%5D&originHeight=388&originWidth=1188&size=0&status=done&style=none&width=1188)
推荐工具 Xftp [下载地址](http://www.xshellcn.com/xiazai.html)

### 4.1解压 tar 包

```bash
tar -zxvf mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz
```

### 4.2更改文件名称

```bash
mv mysql-5.7.28-linux-glibc2.12-x86_64 mysql
```

## 5. 创建用户和用户组并赋予权限

```bash
groupadd mysql
useradd -r -g mysql mysql
chown -R mysql:mysql mysql/
```

## 6. 安装和初始化数据库

```bash
cd mysql
./bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --lc_messages_dir=/usr/local/mysql/share --lc_messages=en_US
```

如果无错误继续, 出现如下错误的
![](https://cdn.nlark.com/yuque/0/2020/jpeg/631242/1590513047385-9417effb-0870-42ca-b10b-0ddc5e18f2bf.jpeg#align=left&display=inline&height=103&margin=%5Bobject%20Object%5D&originHeight=103&originWidth=1133&size=0&status=done&style=none&width=1133)
报错信息：bin/mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory
解决办法:

```bash
yum update
yum install -y libaio
```

**

## 7. 获取初始登录密码

执行上一步操作后会在命令行输出 root@localhost: gFamcspKm2+u localhost: 后面的这一串便是你首次登陆 mysql 需要的初始密码
如下图：
![](https://cdn.nlark.com/yuque/0/2020/jpeg/631242/1590513047460-18fe30eb-3520-4457-9830-5fddcbeb1d6c.jpeg#align=left&display=inline&height=299&margin=%5Bobject%20Object%5D&originHeight=299&originWidth=1143&size=0&status=done&style=none&width=1143)

8. **配置 my.cnf**

```bash
vim /etc/my.cnf
```

下面的粘贴进去

```
[mysqld]
character_set_server=utf8
init_connect='SET NAMES utf8'
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data
socket=/tmp/mysql.sock
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

## 8. 启动服务

```bash
cd /usr/local/mysql/bin/
```

```bash
./mysqld_safe --user=mysql &
```

## 9. 设置开机启动

进入 /usr/local/mysql 文件夹

```bash
cd /usr/local/mysql/support-files
cp mysql.server /etc/init.d/mysql
```

## 10. 使用 service mysqld 命令启动/停止服务

```bash
service mysql start/stop/restart
```

实在不行，用这个：

```bash
sudo ./support-files/mysql.server start
```

> 注意，5.7 版本往上修改密码：

```sql
mysql -uroot -p你的密码
use mysql
update mysql.user set authentication_string=password('123456') where user='root'
```

全局使用 mysql

```bash
ln -s /usr/local/mysql-5.7.22/bin/mysql /usr/bin
```

新建用户远程连接 mysql 数据库

```bash
grant all on *.* to admin@'%' identified by '123456' with grant option;
flush privileges;
允许任何ip地址(%表示允许任何ip地址)的电脑用admin帐户和密码(123456)来访问这个mysql server。
注意admin账户不一定要存在。
```

支持 root 用户允许远程连接 mysql 数据库

```bash
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
flush privileges;
```

## 11. 异常

### 11.1解决“ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (111)”

```bash
rm -rf /tmp/mysql.sock
cd /usr/local/mysql
sudo ./support-files/mysql.server start
mkdir /var/run/mysqld/
chown -R mysql.mysql /var/run/mysqld/
```

* [x] mysql> use mysql
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.

```sql
SET PASSWORD = PASSWORD('123456');
```

Query OK, 0 rows affected, 1 warning (0.00 sec)

* [x]  启动异常["ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)"]

> 解决办法：mysql 服务未启动, 启动就好了.

* [x]  ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.

```sql
alter user user() identified by "123456";
```

-[x]服务器重启后连接 mysql 出现 ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/data/mydata/mysql.sock' (111)类似

```bash
[mysqld]
character_set_server=utf8
init_connect='SET NAMES utf8'
basedir=/usr/local/mysql-5.7.22
datadir=/usr/local/mysql-5.7.22/data
socket=/tmp/mysql.sock
log-error=/var/log/mysqld.log
pid-file=/data/mydata/mysqld.pid
bind-address=0.0.0.0
socket = /data/mydata/mysql.sock
[client]
socket = /data/mydata/mysql.sock
```

把 mysqld.pid 的文件换个其他文件夹就行了
