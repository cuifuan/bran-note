### 新增用户

```sql
-- 创建用户
create user [用户名] identified by '[密码]';
-- 赋予数据库权限
grant all privileges on [数据库].* to [用户名]@'%' identified by '[密码]';
flush privileges;
```

### 开启远程登录权限

```sql
-- 使用%赋予访问权限
GRANT ALL PRIVILEGES ON *.* TO '[用户名]'@'%' IDENTIFIED BY '[密码]' WITH GRANT OPTION;
-- 重载授权表
FLUSH PRIVILEGES;
```

### 修改密码
可能会报异常  
> 1819 - Your password does not satisfy the current policy requirements  
```sql
-- 默认值为1, 密码强度等级 [LOW:0| MEDIUM:1 | STRONG:2]
set global validate_password_policy=0;
-- 默认为8，限制密码长度的最小字符数
set global validate_password_length=1;
SHOW VARIABLES LIKE 'validate_password%';
```
> 修改密码  
```sql
mysql> update mysql.user set authentication_string=password('root') where user='root';
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 1
```

>初始化设置密码
>
>You must reset your password using ALTER USER statement before executing this statement

```sql
set password = password('root');
```

