# Linux安装docker-compose  

## 1. 操作系统

CentOS 8

## 2. 介绍

“Docker compose是一个非常有用的软件包，它使我们可以管理多容器应用程序”
可以快速启动例如Mysql，MongoDB，Apache等隔离独立坏境

## 3. 安装

```bash
$ dnf install curl -y
```

输出

```bash
[root@aliyun ~]# curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   638  100   638    0     0    547      0  0:00:01  0:00:01 --:--:--   547
100 16.2M  100 16.2M    0     0   307k      0  0:00:54  0:00:54 --:--:--  955k
```

可执行权限设置为

```bash
$ chmod +x /usr/local/bin/docker-compose
```

运行命令来验证docker compose版本

```bash
$ docker-compose --version
docker-compose version 1.25.0, build 0a186604
```

安装完成了哦~
