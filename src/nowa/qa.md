# 常见问题

---

## 1. 无法使用命令行 `nowa`

有以下几种情形：

1. 在终端里面执行 `nowa init page xxx` 的时候，报错找不到 `nowa` 命令

2. nowa 项目使用 * 启动 * 和 * 编译 * 功能, 控制台报错找不到 `nowa` 模块

请用户先移除 npm 安装的全局 nowa，然后在用户目录删除工具默认安装的 nowa 目录, 然后打开工具重试。

* windows:

``` sh
npm uninstall nowa -g
rd /q /s c:/User/YOUR_PC_NAME/.nowa-gui/installation
```

在 windows 系统中，还可能是因为环境变量没有写入的原因。

1. 请用户去重用户环境变量中的 PATH, 可能有多个重复路径使路径字数太长，导致 nowa 路径无法写入
2. 请用户查看用户环境变量是否含有 NOWA_PATH, 如果没有请重新下载工具

* mac & linux

```sh
npm uninstall nowa -g
$rm -rf ~/.nowa-gui./installation
```
这个方式是很简单粗暴地解决 nowa 大多数底层问题。





## 2. 打开工具的时候弹出 'Invalid type of Version' 错误

请用户删除工具安装的脚手架，然后打开工具重试
* windows:

``` sh
rd /q /s c:/User/YOUR_PC_NAME/.nowa-gui/template
```

* mac & linux

```sh
$rm -rf ~/.nowa-gui./template
```

## 3. 导入项目安装失败

1. 请用户先根据日志窗口出现的信息进行排查
2. 删除项目后重新导入


