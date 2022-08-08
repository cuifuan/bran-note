# Elasticsearch入门

## 1.安装  （windows）
- [官网下载地址](https://www.elastic.co/cn/start)

![image.png](http://images.zabbix.store/images/1575990095497-871d39ab-1a49-4d7a-8040-dc45be039bd7.png)

![image.png](http://images.zabbix.store/images/1575990140715-e4a72b69-416c-4693-afec-fbb7f9dedb4a.png)

![image.png](http://images.zabbix.store/images/1575990178196-dd362c60-d954-46af-b8ac-d4e342b98141.png)

同理，双击打开即可  

## 2.postman测试

> 这里的** {{es}}** 是设置的环境变量，像宏一样  

![image.png](http://images.zabbix.store/images/1575990364956-1e630750-d3fa-41f0-87b8-7c5647aeabe7.png)

```bash
# 获取所有索引
{{es}}/_all
```

### 2.2 可导入postman的collection

- [collection----url](https://www.getpostman.com/collections/92765cf35671e9698193)

```
https://www.getpostman.com/collections/92765cf35671e9698193
```

![image.png](http://images.zabbix.store/images/1575990548527-df6b1da0-e544-4c71-8073-3505edd6ae1f.png)

## 3. Kibana基本使用
打开 [Kibana页面](http://localhost:5601/app/kibana#/dev_tools/console?_g=())

假如我不想要高雅的坤坤，就想要🐔你太美，可以把 `should` 换成 `must`

![image.png](http://images.zabbix.store/images/1575990843947-2dfaadfb-f832-443f-a461-8d7149022432.png)

## Mac版本后台启动

```bash
bin/elasticsearch -d
```

查询是否启动.....    

```bash
ps -ef|grep elasticsearch
```