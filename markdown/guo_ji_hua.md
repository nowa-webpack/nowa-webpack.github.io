# 国际化

---

## 简介

`nowa init` 中主要的项目模板都推荐使用 [环境变量注入](huan_jing_bian_liang.md) + [i18n-helper](https://www.npmjs.com/package/i18n-helper) 文案模板工具 来完成国际化的功能。

该方案会在 `src/i18n` 目录下存放各种语言资源文件（目录结构详见 [新项目篇](xin_xiang_mu.md)），例如 `zh-cn.js`、`en.js`… 然后由 `index.js` 来负责选择性加载某一种语言。

`index.js` 中主要代码如下：

```js
var lang = require('./' + locale);
module.exports = require('i18n-helper')(lang);
```

其中 `locale` 由环境变量注入，lang 即是当前运行环境的语言资源包，模块返回一个文案模板工具。

## 使用

在 `abc.json` 中的配置：

`abc.json`
```json
{
  "options": {
    "vars": {
      "locale": "en"
    },
    "buildvars": {
      "locale": [ "zh-cn", "en" ]
    }
  }
}
```
> 其中，`vars` 是运行时的注入变量，`buildvars` 是构建时的候选值，  
> 当某个变量有多个候选值时，将会把该候选值作为输出文件的后缀。

在业务代码中使用：

`html/index.html`
```html
<script src="app-en.js"></script>
```

`src/i18n/en.js`
```js
module.exports = {
  key1: 'hello {1}',
  key2: 'test demo'
};
```

`src/pages/PageXxx.js`
```js
const i18n = require('i18n'); // i18n 被定义为一个快捷路径，无论业务代码在何处都可通过此路径引用到 `src/i18n/index.js` 模块
...
i18n('key1', 'world'); // 'hello world'
i18n('key2'); // 'test demo'
```