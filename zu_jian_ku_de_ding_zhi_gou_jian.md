# 组件库的定制构建

---

## 使用

可以通过 `nowa lib` 命令来完成组件库的定制构建。

> 如果提示找不到 lib 命令，请通过 `nowa install lib` 来安装

```shell
nowa lib
```

该命令必须使用在通过 `nowa init` 创建的项目中，请在项目根目录下执行。

![](screenshot-lib-use.png)

## 配置

`nowa lib` 会读取 `abc.json` 中的 `libraries` 参数，按配置构建出所有的依赖库。

一个典型的配置如下：

`abc.json`
```json
{
  "options": {
    "libraries": {
      "Uxcore": {
        "output": "uxcore.js",
        "mappings": {
          "Button": "uxcore-button@~0.4.0"
        }
      }
    }
  }
}
```

其中
- `Uxcore` 是构建出的库对外暴露的全局变量
- `output` 定义输出的文件名，输出文件会放在 `--dist` 配置的目录下，另外也会拷贝一份到 `src/lib` 目录
- `mappings` 定义了全局变量下各个属性和组件的对应关系，其中组件可带上语义化版本号（如果不带的话默认取最新版）

对于以上的配置，`nowa lib` 的执行过程
- 首先安装组件依赖

```shell
npm install uxcore-button@~0.4.0 -d
```

- 然后生成临时文件

```js
window['Uxcore'] = {
  Button: require('uxcore-button')
};
```

- 以这份临时文件为构建入口（entry）进行 webpack 构建，输出 `uxcore.js`
- 对输出文件进行压缩，生成 `uxcore.min.js`
- 拷贝 `uxcore.js` 和 `uxcore.min.js` 到 `src/lib` 目录（为避免 `dist` 目录冲突，一般会把 `dist` 目录移出版本管理，所以把 `src/lib` 目录拿来用于存储依赖库文件）