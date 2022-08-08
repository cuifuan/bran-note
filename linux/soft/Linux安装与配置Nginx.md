# Linux 安装与配置 Nginx

## 安装依赖包

```shell
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

## 下载并解压安装包

```shell
cd /usr/local
mkdir nginx
cd nginx
wget http://nginx.org/download/nginx-1.19.7.tar.gz
tar -zxvf nginx-1.19.7.tar.gz
```

## 安装 Nginx

```bash
[root@aliyun nginx]# cd nginx-1.19.7/
[root@aliyun nginx-1.19.7]# ./configure
[root@aliyun nginx-1.19.7]# make && make install
```

## 启动等命令

```bash
$  cd /usr/local/nginx/sbin
$ ./nginx # 启动
$ ./nginx -s stop # 关闭
$ ./nginx -s reload # 重启
```

## Nginx 命令参数

Nginx 的参数包括：可以这样使用 `/usr/local/nginx/sbin/nginx`  -参数

| **-c <path_to_config>** | 使用指定的配置文件而不是 conf 目录下的 nginx.conf                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| **-t**                  | 测试配置文件是否正确，在运行时需要重新加载配置的时候，此命令非常重要，用来检测所修改的配置文件是否有语法错误 |
| **-v**                  | 显示 nginx 版本号                                                                                            |
| **-V**                  | 显示 nginx 的版本号以及编译环境信息以及编译时的参数                                                          |

例如，校验 nginx 文件的命令，如下：

```bash
/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
```

返回下述代表正确，否则会显示多少行出错，更改即可：

```bash
[root@izbp10n2a7lzpams04dafvz nginx]# /usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

## 配置 SSL

```bash
        listen 80;
        server_name api.zabbix.store; #需要将yourdomain.com替换成证书绑定的域名。
        rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
        location / {
            index index.html index.htm;
        }
```

```bash
    #以下属性中，以ssl开头的属性表示与证书配置有关。
    server {
        listen 443 ssl;
        #配置HTTPS的默认访问端口为443。
        #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
        #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
        server_name api.zabbix.store; #需要将yourdomain.com替换成证书绑定的域名。
        root html;
        index index.html index.htm;
        ssl_certificate ../api.zabbix.store.pem; #需要将cert-file-name.pem替换成已上传的证书文件的名称。
        ssl_certificate_key ../api.zabbix.store.key; #需要将cert-file-name.key替换成已上传的证书密钥文件的名称。
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        #表示使用的加密套件的类型。
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。
        ssl_prefer_server_ciphers on;
        location / {
            root html; #站点目录。
            index index.html index.htm;
        }
    }
```

## 异常记录

### 1. the "ssl" parameter requires ngx_http_ssl_module

异常详细信息：

```bash
nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf
```

解决：

```bash
$ cd /usr/local/nginx/nginx-1.19.7/
$ ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
$ cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
$ make
$ cp ./objs/nginx /usr/local/nginx/sbin/
```

然后把 `nginx.bak` 恢复后重启就好

### 2.c compiler cc is not found

缺少 `gcc-c++` 的包

```bash
yum -y install gcc-c++
```
## http 重定向到 https

```bash
server {
  listen	  80;
  server_name    domain.com;
  return	  301 https://$server_name$request_uri;
}

server {
  listen	  443 ssl;
  server_name    domain.com;

  [....]
}
```

