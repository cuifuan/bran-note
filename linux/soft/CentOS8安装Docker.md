# CentOS8安装Docker  

## 1. 操作系统

查看版本

```bash
lsb_release -a
```

这里是

```bash
[root@aliyun ~]# lsb_release -a
LSB Version:	:core-4.1-amd64:core-4.1-noarch
Distributor ID:	CentOS
Description:	CentOS Linux release 8.1.1911 (Core) 
Release:	8.1.1911
Codename:	Core
```

## 2. 卸载旧版本

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

## 3. 使用存储库安装

### 3.1 安装 `yum-utils` 软件包

```bash
$ sudo yum install -y yum-utils

$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

### 3.2 安装DOCKER引擎

```bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

报错，error

```bash
Error: 
 Problem: package docker-ce-3:19.03.9-3.el7.x86_64 requires containerd.io >= 1.2.2-3, but none of the providers can be installed
  - cannot install the best candidate for the job
  - package containerd.io-1.2.10-3.2.el7.x86_64 is excluded
  - package containerd.io-1.2.13-3.1.el7.x86_64 is excluded
  - package containerd.io-1.2.13-3.2.el7.x86_64 is excluded
  - package containerd.io-1.2.2-3.3.el7.x86_64 is excluded
  - package containerd.io-1.2.2-3.el7.x86_64 is excluded
  - package containerd.io-1.2.4-3.1.el7.x86_64 is excluded
  - package containerd.io-1.2.5-3.1.el7.x86_64 is excluded
  - package containerd.io-1.2.6-3.3.el7.x86_64 is excluded
(try to add '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

手动安装最新的可用containerd.io软件包

```bash
$ sudo dnf install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm
```

ps: 因为containerd.io软件包未作为docker-ce的依赖项安装，因此从系统卸载docker-ce时，不会自动将其删除
解决了报错后继续执行上面的安装语句
然后会出现提示您接受GPG密钥, 选 y

```bash
Importing GPG key 0x621E9F35:
 Userid     : "Docker Release (CE rpm) <docker@docker.com>"
 Fingerprint: 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35
 From       : https://download.docker.com/linux/centos/gpg
Is this ok [y/N]: y
```

输出如下，安装完毕

```bash
Running transaction
  Preparing        :                                                                                                                                                                   1/1 
  Installing       : docker-ce-cli-1:19.03.9-3.el7.x86_64                                                                                                                              1/3 
  Running scriptlet: docker-ce-cli-1:19.03.9-3.el7.x86_64                                                                                                                              1/3 
  Running scriptlet: libcgroup-0.41-19.el8.x86_64                                                                                                                                      2/3 
  Installing       : libcgroup-0.41-19.el8.x86_64                                                                                                                                      2/3 
  Running scriptlet: libcgroup-0.41-19.el8.x86_64                                                                                                                                      2/3 
  Installing       : docker-ce-3:19.03.9-3.el7.x86_64                                                                                                                                  3/3 
  Running scriptlet: docker-ce-3:19.03.9-3.el7.x86_64                                                                                                                                  3/3 
  Verifying        : libcgroup-0.41-19.el8.x86_64                                                                                                                                      1/3 
  Verifying        : docker-ce-3:19.03.9-3.el7.x86_64                                                                                                                                  2/3 
  Verifying        : docker-ce-cli-1:19.03.9-3.el7.x86_64                                                                                                                              3/3 

Installed:
  docker-ce-3:19.03.9-3.el7.x86_64                              docker-ce-cli-1:19.03.9-3.el7.x86_64                              libcgroup-0.41-19.el8.x86_64                             

Complete!
```

## 4. 启动Docker

```bash
$ sudo systemctl start docker
```

## 5. 运行hello world 测试

```bash
# 通过运行hello-world 映像来验证是否正确安装了Docker Engine
$ sudo docker run hello-world
```

输出

```bash
[root@aliyun ~]# sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete 
Digest: sha256:6a65f928fb91fcfbc963f7aa6d57c8eeb426ad9a20c7ee045538ef34847f44f1
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

OK，到此安装完毕哦
