# 本地开发

---

## 使用

可以通过 `nowa server` 命令来开启一个本地开发调试服务器。

> 如果提示找不到 server 命令，请通过 `nowa install server` 来安装

```shell
nowa server
```

该命令必须使用在通过 `nowa init` 创建的项目中，可在项目中的任意目录下执行。

当回答完一些必要的问题之后，脚手架会开始自动生成新页面相关文件（包括 html、js 和 css）。


等待初始化完毕后，便可直接通过 `nowa server` 或 `npm start` 来启动开发服务器，访问到新建的页面。

## 参数

`nowa init page` 在初始化新页面时，接受以下候选参数：

- `-t, --template` 用户指定所使用的项目模板，一般定义在 `abc.json` 的 `options` 属性中，**必须给出**

