### 下载地址

官网下不动地址：[https://dlcdn.apache.org/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip](https://dlcdn.apache.org/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip)

腾讯云高速下载: [https://mirrors.cloud.tencent.com/apache/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip](https://mirrors.cloud.tencent.com/apache/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip)

```bash
# 使用 wget 在服务器下载
wget https://mirrors.cloud.tencent.com/apache/rocketmq/4.9.4/rocketmq-all-4.9.4-bin-release.zip
```

### 解压

```bash
# 解压下载的文件
unzip rocketmq-all-4.9.4-bin-release.zip
# 更改名称
mv rocketmq-all-4.9.4-bin-release rocketmq-4.9.4
# 移动文件夹
mv rocketmq-4.9.4 /app/
```

### 修改启动配置项

后面我们会启动 `mqnamesrv` 与 `mqbroker` ,他们各自调用的 `sh` 命令如下图所示:  

![image-20220812161953183](http://images.zabbix.store/markdown/image-20220812161953183.png?markdown)

```bash
# 进入 bin 目录
cd /app/rocketmq-4.9.4/bin
# 编辑 runserver.sh  
vim runserver.sh
# 输入 /choose_gc_options 快速定位  
```

![image-20220812162314373](http://images.zabbix.store/markdown/image-20220812162314373.png?markdown)

上述内存默认为 `4g` 太大，我们服务器一般没那么高配置，改小一点。

```bash
# 修改 broker
vim runbroker.sh
# 使用 /JAVA_OPT 快速定位
```

![image-20220812162528589](http://images.zabbix.store/markdown/image-20220812162528589.png?markdown)

如上图更改所示，默认 `8g`，我们需要改小一点。  

**修改 Broker 配置默认生成一个测试 Topic**

```bash
# 编辑 broker 配置文件
vim /app/rocketmq-4.9.4/conf/broker.conf
# 追加如下两行配置
# 自动创建 topic 便于测试
autoCreateTopicEnable=true
```

### 配置环境变量

```bash
# 使用 vim 修改环境变量
vim ~/.bash_profile
# 在 export PATH 行前增加
export ROCKETMQ_HOME=/app/rocketmq-4.9.4
export NAMESRV_ADDR='localhost:9876'
PATH=$PATH:$ROCKETMQ_HOME/bin
# 生效
source ~/.bash_profile
```

### 启动 namesever

```bash
nohup /app/rocketmq-4.9.4/bin/mqnamesrv &
```

我们打印一下 `nohuo.out`  

```bash
cat nohup.out
```

输出:  

```bash
The Name Server boot success. serializeType=JSON
```

启动成功  

### 启动 broker

```bash
nohup /app/rocketmq-4.9.4/bin/mqbroker -c /app/rocketmq-4.9.4/conf/broker.conf &
```

打印一下 `nohuo.out`  

输出:  

```bash
The broker[broker-a, 10.0.16.2:10911] boot success. serializeType=JSON and name server is localhost:9876
```

### 测试

在 `rocketmq` 中，有一个脚本可以快速的验证服务。

```bash
/app/rocketmq-4.9.4/bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
```

输出信息:  

```bash
..............
ssageQueue [topic=TopicTest, brokerName=broker-a, queueId=3], queueOffset=499]
16:43:35.062 [NettyClientSelector_1] INFO RocketmqRemoting - closeChannel: close the connection to remote address[10.0.16.2:10911] result: true
16:43:35.067 [NettyClientSelector_1] INFO RocketmqRemoting - closeChannel: close the connection to remote address[127.0.0.1:9876] result: true
```

会快速启动生产者发送消息，应该是 1000 条。  

**这个是调用的那个地方呢？**

```bash
# 进入目录
cd /app/rocketmq-4.9.4/lib
# 管道查询 
ll | grep exam
```

输出: 

```bash
-rw-r--r-- 1 root root  146381 Jun 21 10:56 rocketmq-example-4.9.4.jar
```

调用的就是上述 jar 包。  

现在开始测试消费者:  

```bash
/app/rocketmq-4.9.4/bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```

大致输出如下:  

```bash
.........
ConsumeMessageThread_please_rename_unique_group_name_4_20 Receive New Messages: [MessageExt [brokerName=broker-a, queueId=0, storeSize=191, queueOffset=255, sysFlag=0, bornTimestamp=1660293813839, bornHost=/10.0.16.2:40886, storeTimestamp=1660293813840, storeHost=/10.0.16.2:10911, msgId=0A00100200002A9F000000000002FC74, commitLogOffset=195700, bodyCRC=548040149, reconsumeTimes=0, preparedTransactionOffset=0, toString()=Message{topic='TopicTest', flag=0, properties={MIN_OFFSET=0, MAX_OFFSET=500, CONSUME_START_TIME=1660309899471, UNIQ_KEY=7F00000171BB4B85612C3C3CBE4F0014, CLUSTER=DefaultCluster, TAGS=TagA}, body=[72, 101, 108, 108, 111, 32, 82, 111, 99, 107, 101, 116, 77, 81, 32, 50, 48], transactionId='null'}]] 
```

会看到很多类似的消费信息。  

至此，我们单机的 `rocketMQ` 的服务已经搭建完成了。  



### 停止 rocketMQ

```bash
# 先停 broker
/app/rocketmq-4.9.4/bin/mqshutdown broker
# 再停 namesrv
/app/rocketmq-4.9.4/bin/mqshutdown namesrv
```

