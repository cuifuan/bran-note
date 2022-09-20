## 解决什么问题
- mac自带python2,md又不能删掉他
- linux也自带python2,这玩意都过时了,也不赶紧换掉
### 安装pyenv
```bash
brew install pyenv
echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
source ~/.zshrc
```

### 查看版本
```bash
pyenv install --list
pyenv install 3.10.7
```
### 查看已安装的版本

现在我们已经安装了 Python 3.10.7，让我们来看看我们系统上所有可用的已安装版本：  

```bash
pyenv versions
```

### 设置全局 Python

```bash
pyenv global 3.10.7
```

现在，无论何时调用 `python`，您都将使用 `Python 3.9.4`。使用 `python --version` 检查它。

```bash
➜  ~ python --version
Python 3.10.7
```

