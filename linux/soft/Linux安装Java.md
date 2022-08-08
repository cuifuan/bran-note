# Linux安装Java  

## 1. 安装 wget  

已安装 `wget` 可以跳过  

* Ubuntu 使用

```shell
apt-get update
apt-get install wget
```

* Centos 使用

```shell
yum update
yum install wget
```  

## 2.下载 java 安装包

下载地址为华为云源  

[https://repo.huaweicloud.com/java/jdk/](https://repo.huaweicloud.com/java/jdk/)

```bash
wget https://repo.huaweicloud.com/java/jdk/8u172-b11/jdk-8u172-linux-x64.tar.gz
```  

解压  

```bash
tar -zxvf jdk-8u172-linux-x64.tar.gz
```  

移动文件位置  

```bash
mv jdk1.8.0_172 /usr/local/java
```  

## 3.配置坏境变量  

```bash
vi /etc/profile
```  

在尾部追加  

```bash
export JAVA_HOME=/usr/local/java
export JRE_HOME=/usr/local/java/jre
export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
```

让环境变量生效  

```bash
source /etc/profile
```  

使用 `java -version` 检测安装是否完成  

```bash
root@ekko:/usr/local/java# java -version
java version "1.8.0_172"
Java(TM) SE Runtime Environment (build 1.8.0_172-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.172-b11, mixed mode)
```
