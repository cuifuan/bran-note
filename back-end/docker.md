### 查询最近日志

```bash
# 查询日志（最后 500 条）-f 跟踪日志输出

docker logs -f -t --tail=500 CONTAINER_ID

# 查看最近30分钟的日志
docker logs --since 30m CONTAINER_ID
```

