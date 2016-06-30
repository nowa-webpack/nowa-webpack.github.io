# 安装

---

## 准备

在安装 nowa 之前请先确保已经安装有 [nodejs](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)。

必须使用 **nodejs>=4.0** 版本，强烈建议使用 **npm>=3.0** 版本。  
> 可以通过 `node -v` 和 `npm -v` 来查看 nodejs 和 npm 的版本。  
> 可以通过 [n](http://web.npm.alibaba-inc.com/package/n) 来切换 nodejs 版本。

## 安装

通过以下命令来安装 nowa 和常用插件：

```shell
npm i nowa -g && nowa install
```

> `nowa install` 会安装一批常用的插件。

因为众所周知的原因，中国大陆用户请使用以下命令：

```shell
npm i nowa -g --registry=https://registry.npm.taobao.org && nowa install --registry=https://registry.npm.taobao.org
```

> 如果报错无权限，请尝试加 `sudo`。  
> 如果报错 `common.gypi not found`，请尝试 `rm -rf ~/.node_gyp` 后重新安装。

## 卸载

通过以下命令来卸载 nowa 和全部 nowa 插件：

```shell
npm uninstall nowa -g
```

### 关于权限

关于权限的问题这里特别说明一下：

- Windows

  请 **不要** 加 sudo，如果提示没权限，请使用管理员权限打开命令行，再执行命令。

- Linux 和 Mac OSX

  - `npm i nowa -g` 会向 `npm bin -g` 和 `npm root -g` 这两个目录下写入文件，所以请确保执行安装命令时，你对这两个目录拥有写权限。  
  - `nowa install` 会向 `$HOME` 和 `npm root -g` 这两个目录下写入文件，所以请确保执行安装命令时，你对这两个目录拥有写权限。  
  - 获得写权限可以使用以下命令：
  ```shell
  sudo chmod 777 `npm root -g`
  ```
  - 所有 nowa 开头的命令请不要加 sudo，否则可能会给你造成一些麻烦
