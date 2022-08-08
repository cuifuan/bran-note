### Redis 后台启动

编辑**redis.conf**文件，搜索**daemonize**更改为**yes**

### Redis下线

```shell
# 有密码
redis-cli -a 你的密码 shutdown
# 无密码
redis-cli shutdown
```

### docker-compose启动redis

挂载的配置文件放在 ./redis/conf

```yaml
version: '3'
services:
  redis:
    container_name: redis
    image: redis
    ports:
      - '8089:6379'
    volumes:
      - ./redis/data/:/data
      - ./redis/conf:/usr/local/redis/conf/
    command: redis-server /usr/local/redis/conf/redis.conf
    restart: always
```

redis.conf 的下载地址：[https://redis.io/topics/config](https://redis.io/topics/config)