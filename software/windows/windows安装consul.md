# windows 安装 consul  

## 下载安装包

> 官网下载速度慢，不推荐

* 官网下载地址：[https://www.consul.io/downloads.html](https://www.consul.io/downloads.html)
* 其他下载: [https://javapro.lanzous.com/id77xza](https://javapro.lanzous.com/id77xza)

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590940253419-28fe74de-74b2-4a49-92cf-0dcd97d462e8.png#align=left&display=inline&height=460&margin=%5Bobject%20Object%5D&originHeight=460&originWidth=1437&size=0&status=done&style=none&width=1437)

## 解压运行

打开 Windows PowerShell, 使用 .\consul.exe -h 查看命令帮助

```
PS C:\WINDOWS\system32> d:
PS D:\> cd .\consul_1.7.3_windows_amd64\
PS D:\consul_1.7.3_windows_amd64> .\consul.exe -h
Usage: consul [--version] [--help] <command> [<args>]

Available commands are:
    acl            Interact with Consul's ACLs
    agent          Runs a Consul agent
    catalog        Interact with the catalog
    config         Interact with Consul's Centralized Configurations
    connect        Interact with Consul Connect
    debug          Records a debugging archive for operators
    event          Fire a new event
    exec           Executes a command on Consul nodes
    force-leave    Forces a member of the cluster to enter the "left" state
    info           Provides debugging information for operators.
    intention      Interact with Connect service intentions
    join           Tell Consul agent to join cluster
    keygen         Generates a new encryption key
    keyring        Manages gossip layer encryption keys
    kv             Interact with the key-value store
    leave          Gracefully leaves the Consul cluster and shuts down
    lock           Execute a command holding a lock
    login          Login to Consul using an auth method
    logout         Destroy a Consul token created with login
    maint          Controls node or service maintenance mode
    members        Lists the members of a Consul cluster
    monitor        Stream logs from a Consul agent
    operator       Provides cluster-level tools for Consul operators
    reload         Triggers the agent to reload configuration files
    rtt            Estimates network round trip time between nodes
    services       Interact with services
    snapshot       Saves, restores and inspects snapshots of Consul server state
    tls            Builtin helpers for creating CAs and certificates
    validate       Validate config files/directories
    version        Prints the Consul version
    watch          Watch for changes in Consul
```

## 体验 consul

运行命令, 体验开发版

```
PS D:\consul_1.7.3_windows_amd64> .\consul.exe agent -dev
```

**notes**: 以开发版运行的时候 K/V 不保存哦~

看到控制台打印信息正常后，访问 [http://localhost:8500/ui/dc1/services](http://localhost:8500/ui/dc1/services)

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590940253422-e2333cab-f439-4662-9bb2-4e53aa075048.png#align=left&display=inline&height=947&margin=%5Bobject%20Object%5D&originHeight=947&originWidth=1920&size=0&status=done&style=none&width=1920)

## 持久化数据

新建 server 服务，指定 data-dir 保存数据

```
consul agent -server -bootstrap-expect 1 -data-dir "D://consul_1.7.3_windows_amd64/consul" -advertise 192.168.0.105 -ui -node=server1 -bind 192.168.0.105 -client 0.0.0.0 -rejoin -config-dir "D://consul_1.7.3_windows_amd64//config"
```

* -server: consul 服务端
* -bootstrap-expect: 在一个 datacenter 中期望提供的 server 节点数目，当该值提供的时候，consul 一直等到达到指定 server 数目的时候才会引导整个集群
* -data-dir: 持久化数据目录
* -advertise: ip 地址，广播地址
* -client: 可访问服务的 ip
* -config-dir：配置文件地址

**测试 consul 持久化**

新增一个 Key/Value
![](https://cdn.nlark.com/yuque/0/2020/png/631242/1590940253659-708600d7-df36-4075-b3d9-deee587c32b7.png#align=left&display=inline&height=735&margin=%5Bobject%20Object%5D&originHeight=735&originWidth=1357&size=0&status=done&style=none&width=1357)
关闭，重新打开还在，ok

windows - consul 的安装到此结束了哦~~~
