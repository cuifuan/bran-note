### 前言

MySQL 优化用到的最关键的就是 `EXPLAIN ` 命令, 在你需要优化的 `SQL` 前加上 `EXPLAIN` ，就可以看到这条 `SQL` 语句的执行计划.  

测试一下:  

```sql
mysql> EXPLAIN SELECT * FROM user_info WHERE id not in (1350,1351) LIMIT 1;
+----+-------------+-----------+------------+-------+---------------+---------+---------+------+---------+----------+-------------+
| id | select_type | table     | partitions | type  | possible_keys | key     | key_len | ref  | rows    | filtered | Extra       |
+----+-------------+-----------+------------+-------+---------------+---------+---------+------+---------+----------+-------------+
|  1 | SIMPLE      | user_info | NULL       | range | PRIMARY       | PRIMARY | 8       | NULL | 4415090 |   100.00 | Using where |
+----+-------------+-----------+------------+-------+---------------+---------+---------+------+---------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

可以看到上面输出的有很多分类，但是都是什么意思呢？一起来学习记录下。  

我的 MySQL 版本如下：  

```sql
mysql> select version();
+-----------+
| version() |
+-----------+
| 8.0.29    |
+-----------+
1 row in set (0.00 sec)
```

### id 详解

MySQL 查询的序列号，用来标识 MySQL 操作表或者子查询的顺序。  

![image-20220819170632118](http://images.zabbix.store/markdown/image-20220819170632118.png?markdown)
