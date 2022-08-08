# windows 安装解压版 mysql-5.7.28-winx64  

## 1. 解压

解压到 D:\Mysql-5.7 路径下，并重命名文件为 mysql。

## 2. 创建 data 文件夹

打开 mysql 文件夹创建 data 文件夹

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513327930-c1d9475f-2169-461c-8f51-7be79e8f650b.png#align=left&display=inline&height=984&margin=%5Bobject%20Object%5D&originHeight=984&originWidth=2028&size=0&status=done&style=none&width=2028)

## 3. 给 mysql 添加环境变量

### 3.1 打开控制面板，点击‘系统和安全’

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513329194-7f778646-9038-4f2e-8506-a9ba54bf6d4e.png#align=left&display=inline&height=1448&margin=%5Bobject%20Object%5D&originHeight=1448&originWidth=3262&size=0&status=done&style=none&width=3262)

### 3.2点击‘系统’之后，点击‘高级系统设置’

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513327807-a8cf76aa-aa0c-451f-8d1b-ab4fff544bc7.png#align=left&display=inline&height=1471&margin=%5Bobject%20Object%5D&originHeight=1471&originWidth=3067&size=0&status=done&style=none&width=3067)
![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513327861-8005ab64-5e9b-4361-9f2a-cc9a78373127.png#align=left&display=inline&height=1517&margin=%5Bobject%20Object%5D&originHeight=1517&originWidth=3254&size=0&status=done&style=none&width=3254)

### 3.3点击环境变量，进入环境变量设置菜单

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513329168-7c7da87b-c115-4331-bd88-505937b5de6f.png#align=left&display=inline&height=1393&margin=%5Bobject%20Object%5D&originHeight=1393&originWidth=1225&size=0&status=done&style=none&width=1225)

##### 选中系统变量中的 “path”，在 path 值里面输入：

##### D:\Mysql-5.7\mysql\bin

##### 保存退出

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513327888-b52a9c7c-6b0f-4271-960c-aeb103a0875f.png#align=left&display=inline&height=1281&margin=%5Bobject%20Object%5D&originHeight=1281&originWidth=1338&size=0&status=done&style=none&width=1338)

## 4. 到 mysql 文件夹中创建 my.ini 文件并把以下内容粘贴进去

```
[mysql]
#设置mysql客户端默认字符集
default-character-set=utf8 
[mysqld]
#设置3306端口
port = 3306
 #设置mysql的安装目录
basedir=D:\\Mysql-5.7\mysql
#设置mysql数据库的数据的存放目录
datadir=D:\\Mysql-5.7\mysql\data
#允许最大连接数	
max_connections=200
#服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
#创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
#开启查询缓存
explicit_defaults_for_timestamp=true
skip-grant-tables
```

## 5. 打开命令提示符（cmd）（以管理员身份运行）

```bash
mysqld --initialize
mysqld install  
net start mysql
```

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513327860-3bb45b5e-534b-46c6-9529-8e46e5455f11.png#align=left&display=inline&height=801&margin=%5Bobject%20Object%5D&originHeight=801&originWidth=1216&size=0&status=done&style=none&width=1216)

##### 执行 `mysql -uroot -p` 命令，因为我们在 my.ini 文件里面添加了 skip-grant-tables。所以，密码可以输入任意值。

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513328089-a41ef339-30f8-4ce9-938e-78fc2eba89e7.png#align=left&display=inline&height=823&margin=%5Bobject%20Object%5D&originHeight=823&originWidth=1708&size=0&status=done&style=none&width=1708)

##### 修改密码，刷新权限。

```bash
mysql> use mysql; #将数据库切换至mysql库
Database changed
mysql> update user set authentication_string=PASSWORD('123456') where user='root'; #修改密码
Query OK, 1 row affected, 1 warning (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 1

mysql> flush privileges;  #刷新权限
Query OK, 0 rows affected (0.00 sec)

mysql> quit; # 退出 mysql 命令行
```

## 6. 删除跳过密码验证设置

![image.png](https://cdn.nlark.com/yuque/0/2019/png/631242/1575559002110-544c8485-373b-47ff-9a62-c91b16fc5763.png#align=left&display=inline&height=349&margin=%5Bobject%20Object%5D&name=image.png&originHeight=698&originWidth=1392&size=160755&status=done&style=none&width=696)

开启非严格模式，不然不兼容5.6版本的部分语句，例如部分字段 `group by` 却在查询中查询全部字段，就会sql语句报错

```
# 非严格模式
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

## 7. 错误问题收集

### 7.1 mysqld --initialize无反应
我使用的powersehll安装的，没反应，然后使用cmd窗口管理员模式，提示找不到msvcp120.dll，msvcr120.dll缺失

解决办法：  
在微软官网上下载的 [Visual C++ Redistributable Packages for Visual Studio 2013](https://www.microsoft.com/en-us/download/details.aspx?id=40784)

   ![](https://cdn.nlark.com/yuque/0/2019/png/631242/1575559295963-a5a0e1c1-cae8-4e39-9b05-d86b76b45edf.png#align=left&display=inline&height=181&margin=%5Bobject%20Object%5D&originHeight=181&originWidth=478&size=0&status=done&style=none&width=478)

参考：[https://www.okcode.net/article/74194](https://www.okcode.net/article/74194)
