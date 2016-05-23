# 新模块

---

## 使用

可以通过 `nowa init mod` 命令来做模块初始化的操作。

> 如果提示找不到 init 命令，请通过 `nowa install init` 来安装

```shell
nowa init mod
```

该命令必须使用在通过 `nowa init` 创建的项目中，可在项目中的任意目录下执行。

当回答完一些必要的问题之后，脚手架会开始自动生成新模块相关文件（包括 js 和 css）。

![](screenshot-init-mod.png)

等待初始化完毕后，便可在其他页面或模块中引用新建的模块了。

```js
var TestMod = require('../components/test-mod');
```

## 参数

`nowa init page` 在初始化新页面时，接受以下候选参数：

- `-t, --template` 用户指定所使用的项目模板，一般定义在 `abc.json` 的 `options` 属性中，**必须给出**