

## 1.基础知识
Redis 是用 C 语言开发的一个开源的高性能键值对（key-value）数据库。
它通过提供多种键值数据类型来适应不同场景下的存储需求，目前为止 Redis 支持的键值数据类型如下：

- 字符串(String)
- 列表（lists）
- 集合（sets）
- 有序集合（sorts sets）
- 哈希表（hashs）
## 2.Redis 的应用场景
缓存（数据查询、短连接、新闻内容、商品内容等。

- 分布式集群架构中的 session 分离。
- 聊天室的在线好友列表。
- 任务队列。（秒杀、抢购、12306 等等）
- 应用排行榜。
- 网站访问统计。
- 数据过期处理（可以精确到毫秒）
## 3.安装 Redis
下面介绍在 Linux 环境下，Redis 的安装与部署 使用 Redis-3.0 稳定版,因为 Redis 从 3.0 开始增加了集群功能。
可以通过官网下载 [http://download.Redis.io/releases/](http://download.Redis.io/releases/Redis-4.0.11.tar.gz)
或者使用 linux wget 命令
```bash
wget http://download.redis.io/releases/redis-6.2.6.tar.gz
```
将 redis-6.2.6.tar.gz 移动到/usr/local 下
```bash
mv redis-6.2.6.tar.gz /usr/local
```
解压二进制包
```bash
tar -zxvf redis-6.2.6.tar.gz
```
进入解压后的目录进行编译，注意：PREFIX需要指定的文件夹需要是空的
```bash
cd redis-6.2.6
make PREFIX=/usr/local/redis install
```
进入安装目录 bin 下
```
cd /usr/local/redis/bin
```
目录结构是这样的
![](https://cdn.nlark.com/yuque/0/2020/jpeg/631242/1590513937376-555f9c71-ca3d-4905-9643-4ff56403d89d.jpeg#height=181&id=Lyw3I&originHeight=181&originWidth=780&originalType=binary&ratio=1&size=0&status=done&style=none&width=780)

| redis-benchmark | redis 性能测试工具 |
| --- | --- |
| redis-check-aof | AOF 文件修复工具 |
| redis-check-rdb | RDB 文件修复工具 |
| redis.conf | redis 配置文件 |
| redis-sentinal | redis 集群管理工具 |
| redis-server | redis 服务进程 |

## 4.配置文件
```bash
mkdir /usr/local/redis/conf
cp /usr/local/redis-6.2.6/redis.conf  /usr/local/redis/conf
cd /usr/local/redis/conf
vim redis.conf
```
给redis加请求密码,(输入 `/requirepass` 搜索)
```bash
# 去掉开头#号 
requirepass 你的密码
```
设置有几个储存库，搜索  `/databases`
```bash
databases 3
```
设置可远程访问，搜索  `/bind`
```bash
bind 0.0.0.0
```
设置后台启动，搜索 `/daemonize`
```bash
daemonize yes
```
## 4.启动与停止 Redis
```bash
/usr/local/redis/bin/redis-server /usr/local/redis/conf/redis.conf
```
### 4.1 连接 Redis
```bash
./redis-cli -p 6379 -a 密码
```

### 4.2 停止 Redis
```bash
/usr/local/redis/bin/redis-cli -a 密码 shutdown
```
### 4.3 让 Redis 开机自启
```bash
vim /etc/rc.local
```
把如下内容添加进去  
```bash
/usr/local/redis/bin/redis-server /usr/local/redis/conf/redis.conf
```
## 5.异常处理
### 5.1 redis-cli shutdown 出现 (error) NOAUTH Authentication required
Redis 设置密码登录后，想关闭 Redis 服务器，需要
```
Redis-cli -a 密码 shutdown
```
### 5.2 Redis 编译报致命错误：jemalloc/jemalloc.h：没有那个文件或目录
分配器 allocator， 如果有 MALLOC 这个 环境变量， 会有用这个环境变量的 去建立 Redis。
而且 libc 并不是默认的 分配器， 默认的是 jemalloc, 因为 jemalloc 被证明 有更少的 fragmentation problems 比 libc。
但是如果你又没有 jemalloc 而只有 libc 当然 make 出错。 所以加这么一个参数,运行如下命令：
```
make MALLOC=libc
```
#### 5.3 如果此时出现 gcc …Not found
需要安装 gcc
```
Ubuntu
      sudo apt-get install gcc
Centos
      yum install update
      yum install gcc
```
