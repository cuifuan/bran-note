# MacOS 安装 Consul  

## 安装 brew(已安装可忽略)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## 安装 consul

先执行 search

```bash
➜  ~ brew search consul
==> Formulae
consul                                consul-backinator                     consul-template                       envconsul

If you meant "consul" specifically:
It was migrated from phinze/cask to homebrew/core.
```

看见存在 consul, 那就用这个安装吧, 好卸载

```bash
➜  ~ brew install consul
```

国内的速度会很慢, 介意的使用代理

## 运行

```bash
➜  ~ consul agent -dev
```

## 访问

访问 web 管理页面:

[http://127.0.0.1:8500/ui/dc1/services](http://127.0.0.1:8500/ui/dc1/services)

如下

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1591116053898-4065c41b-59af-46d9-8253-b19734a53c6f.png#align=left&display=inline&height=1748&margin=%5Bobject%20Object%5D&originHeight=1748&originWidth=3352&size=0&status=done&style=none&width=3352)

到此就安装完成了
