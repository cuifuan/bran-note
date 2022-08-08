# 记一次物理备份恢复到生产数据库

## 1. 前戏

> 一个基于 hibernate 编写的软件，我把线上的配置文件拷贝下来，忘了改，直接使用 docker-compose 编排启动完成后，生产库就完了，抽一支烟思考一下或许还有救

打开阿里云发现有备份

<div align="center"> <img src="http://images.zabbix.store/202105281720152021-05-28.png" /></div>

点击下载到本地后，这什么玩意，\*\*20210528080912_qp.xb 结尾的文件，没见过，再说，我也不是一个老鸟，懵逼了

## 2. 开始疯狂百度

第一下找到这个老哥的，[https://blog.csdn.net/weixin_42917630/article/details/94985802](https://blog.csdn.net/weixin_42917630/article/details/94985802)，按照他的操作第一步都没走下去，要安装 `XtraBackup` ，我没说他写的菜

## 3. 注意事项（踩的坑）

首先要找一个服务器，线上本地的都行  
我的环境

- 阿里云服务器 1 核 2G 卡死我了...
- MySQL 8.0.16

其次一定要注意 **版本** ！！！！！！  
MySQL 8.0 不要找装有 MySQL 5.7 的服务器来恢复  
MySQL 8.0 也要安装最新版，它不向前兼容  
光装数据库装了好多遍  
大致步骤就是，提取 xb ，得出 .qb 结尾的继续解压，然后恢复  
这里后续登陆的用户也都是之前的被备份的账号密码

## 4. 安装开源软件 XtraBackup

也要看好版本，2.4 版本支持 MySQL 5.7 但是不支持 MySQL 8.0 .

因为这里是 MySQL 8.0 版本，所以下载 [Percona XtraBackup 8.0](https://www.percona.com/doc/percona-xtrabackup/8.0/index.html)

[安装 Percona XtraBackup 8.0](https://www.percona.com/doc/percona-xtrabackup/8.0/installation.html)

![202105281751512021-05-28](http://images.zabbix.store/202105281751512021-05-28.png)

- 1. 使用 `root` 权限安装 `Percona` 库

```bash
sudo yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm
```

- 2.开启存储库

```bash
percona-release enable-only tools release
```

输出：

```bash
[root@aliyun ~]# percona-release enable-only tools release
* Disabling all Percona Repositories
* Enabling the Percona Tools repository
<*> All done!
```

- 3. 使用 `yum` 安装 `Percona XtraBackup`

```bash
yum install percona-xtrabackup-80
```

- 4. 测试输出版本号

```bash
[root@aliyun ~]# xtrabackup -version
xtrabackup: recognized server arguments: --datadir=/data
xtrabackup version 8.0.23-16 based on MySQL server 8.0.23 Linux (x86_64) (revision id: 934bc8f)
```

## 安装 qpress

- 直接使用 `yum` 安装  
```bash
yum -y install qpress 
```

- 使用 `tar` 安装  
```bash
$ wget http://www.quicklz.com/qpress-11-linux-x64.tar
$ tar -xf qpress-11-linux-x64.tar -C /usr/local/bin
$ source /etc/profile
```

## 解压 `xb` 文件  

先选择一个目录为数据最终存储目录，这里用的是 `/home/mysql/data`

```bash
xbstream -x -C /home/mysql/data < ~/xxxx_data_20210528080912_qp.xb
```

然后解压出 `qpress` 二进制文件  

> --remove-original 在解压缩时删除原始的压缩文件 
```bash
xtrabackup --decompress --remove-original --target-dir=/home/mysql/data
```

备份解压出来之后，执行如下命令进行 apply log 操作。  

```bash
xtrabackup --prepare  --target-dir=/home/mysql/data
```

出现 `completed OK!` 就是可以了，出现异常多百度百度，我这边第一次也遇到了很多奇奇怪怪的错误  

## 启动MySQL  

这里使用的是绿色解压版本 MySQL ，因为这个版本有 `bin/mysqld_safe`  

配置文件 `/etc/my.cnf` ，网上相关博客的配置对我来说都不能用，我放上自己能成功运行的配置文件  

```profile
[mysqld]
datadir=/home/mysql/data
lower_case_table_names=1
```

给权限  

```bash
chown -R mysql:mysql /home/mysql/data
```

运行  

```bash
./mysqld_safe --defaults-file=/etc/my.cnf --user=mysql --datadir=/home/mysql/data &
```

启动成功后，根据原来的账户密码进行登陆即可