### 更新全局用户名以及邮箱

```shell
git config  --global user.name 你的目标用户名
git config  --global user.email 你的目标邮箱名
```

### Git 如何忽略已经提交的文件

```bash
# 查看 git 暂存文件状态
git status 
git rm -f [文件名]
git commit -a -m ":fire:删除不需要的文件"
git push
# 找到 IDE 工具恢复当前文件
# 停止追踪此文件或目录
git rm --cached [文件或目录名]
# 在.gitignore 中添加过滤
# 然后提交
```

### MacOS 禁用 osxkeychain

执行

```bash
git config --get-all --show-origin credential.helper
```

输出：  

```bash
file:/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig   osxkeychain
```

`sudo`编辑：  

```bash
sudo vim /Library/Developer/CommandLineTools/usr/share/git-core/gitconfig
```

并注释掉这一行 `credential.helper=osxkeychain`

