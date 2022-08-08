> 获取当日的数据

```sql
select * from tableName where to_days(create_time)= to_days(now())
```

