# 项目构建

---

## 使用

可以通过 `nowa build` 命令来完成本地项目代码的构建工作。

> 如果提示找不到 build 命令，请通过 `nowa install build` 来安装

```shell
nowa build
```

该命令必须使用在通过 `nowa init` 创建的项目中，请在项目根目录下执行。

也可通过快捷命令 `npm run build` 来完成同样的工作。

![](screenshot-build-use.png)

`nowa build` 主要做了以下几个事情：
- 拷贝 html 文件和第三方依赖库到输出目录
- 对源代码做 webpack 构建（针对所有环境变量组合分别输出，详见[环境变量篇](huan_jing_bian_liang.md)）
- 对所有输出文件做压缩和代码优化

## 参数

`nowa build` 接受以下候选参数：

- `-s, --src <dir>` 源代码目录，默认指向 `src`
- `-d, --dist <dir>` 输出代码目录，默认指向 `dist`
- `-e  --entry <file>` 应用入口文件，默认指向 `app/app.js`
- `    --pages [pages]` 开启多页面入口规则，可传入需要构建的页面，例如 `home,demo`
- `    --vars` 运行时环境变量（详见[环境变量篇](huan_jing_bian_liang.md)）
- `    --buildvars` 构建时环境变量（详见[环境变量篇](huan_jing_bian_liang.md)）
- `    --externals` webpack 外部变量定义
- `-o, --loose` 使用 babel es2015 的宽松模式来做代码转换
- `-c, --keepconsole` 保留源代码中的 `console.log`，默认会删除
- `    --skipminify` 跳过压缩任务，默认会进行代码压缩
- `-p, --progress` 在等待时显示 webpack 的构建进度
- `    --exportcss` 是否导出 css 文件，默认为 `true`
- `    --multiCompilers` 是否使用多个编译配置，默认为 `false`
- `    --minifyExtension <extension>` 压缩文件的后缀，默认无
- `    --includes` 需要过 loader 的资源目录，默认同 src
- `    --polyfill` 引入 babel 的 polyfill，可直接使用 Object.assign 等类方法和 Map、Set、Promise 等类，默认为 `false`
- `    --mangle` 在压缩 js 代码时是否对变量名做混淆，默认为 `false`
- `    --alias` 路径别名配置，此处配置为相对路径，相对于源代码目录 `src`，默认为 `{ "i18n": "i18n" }`
- `    --analyse [port]` 分析 webpack bundle 体积，在 port 端口开一个服务，自动打开浏览器查看
