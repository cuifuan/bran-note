# Linux 安装 Maven  

## 1. Maven 压缩包下载与解压  

华为云下载源，自行选择版本  
下面的示例使用的是 3.8.1 版本

```bash
wget https://repo.huaweicloud.com/apache/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.tar.gz
```  

解压 `apache-maven-3.8.1-bin.tar.gz`

```bash
tar -zxvf apache-maven-3.8.1-bin.tar.gz
```  

移动到 `/usr/local` 目录  

```bash
mv apache-maven-3.8.1 /usr/local/
```

## 2. 配置环境变量  

```bash
vi /etc/profile
```  

在最后面追加  

```bash
export MAVEN_HOME=/usr/local/apache-maven-3.8.1/
export PATH=${PATH}:${MAVEN_HOME}/bin
```

使环境变量生效  

```bash
source /etc/profile
```

## 3. 安装完成  

使用 `mvn` 检查是否安装成功  

```bash
[root@luca168 luca]# mvn -verison
Apache Maven 3.8.1 (05c21c65bdfed0f71a2f2ada8b84da59348c4c5d)
Maven home: /usr/local/apache-maven-3.8.1
Java version: 1.8.0_201, vendor: Oracle Corporation, runtime: /usr/java/jdk1.8.0_201/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.10.0-1062.1.2.el7.x86_64", arch: "amd64", family: "unix"
```

安装完成  
