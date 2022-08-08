## 1. MacOS 禁用 osxkeychain

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

