# windows 配置Node环境  

## 1. 下载 node 管理工具

[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1578840679363-0810c852-d772-4f7a-8fd9-f82eb8cff8e6.png#align=left&display=inline&height=238&margin=%5Bobject%20Object%5D&originHeight=238&originWidth=800&size=0&status=done&style=none&width=800)

## 2. 安装完成，验证

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1578840679403-949e0b45-8682-44f2-a9e2-659432396749.png#align=left&display=inline&height=299&margin=%5Bobject%20Object%5D&originHeight=299&originWidth=800&size=0&status=done&style=none&width=800)

## 3. 安装 node 最新版本，此时是 13.6.0

```bash
nvm install latest
```

## 4. 使用该版本 `nvm use 13.6.0`

![](https://cdn.nlark.com/yuque/0/2020/png/631242/1578840679388-60a6c6ac-81b1-43a4-8299-77f0206e010d.png#align=left&display=inline&height=207&margin=%5Bobject%20Object%5D&originHeight=207&originWidth=521&size=0&status=done&style=none&width=521)

## 5. 配置 npm 淘宝镜像源

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

查看相关配置

```bash
npm config ls -l
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/631242/1590513685215-3cfc9261-2a2c-4105-9ffa-7def3840ee62.png#align=left&display=inline&height=739&margin=%5Bobject%20Object%5D&name=image.png&originHeight=739&originWidth=873&size=43540&status=done&style=none&width=873)

## 6. 出现问题

### 6.1 windows上安装nvm后选择node版本出现exit status 1...

问题：nvm install x.x.x 可以成功，但无法切换和使用

```bash
nvm ls
8.9.1
==============================
nvm use 8.9.1
exit status 1: 'D:\Program' ▒▒▒▒▒ڲ▒▒▒▒ⲿ▒▒▒Ҳ▒▒▒ǿ▒▒▒▒еĳ▒▒▒
▒▒▒▒▒▒▒▒▒ļ▒▒▒
```

原因：我把 nvm 安装到了有空格的路径上（D:\Program Files），导致切换失败

解决：把 nvm 卸载重装到没有空格的路径上（例如：D:\nvm），即可解决问题

```bash
nvm ls
8.9.1
==============================
nvm use 8.9.1
Now using node v8.9.1 (64-bit)
==============================
nvm ls
* 8.9.1 (Currently using 64-bit executable)
==============================
node -v
v8.9.1
==============================
npm -v
5.5.1
```

[原文](https://segmentfault.com/a/1190000021549182)

[错误参考](https://www.jianshu.com/p/a230bd5f6fe9)
