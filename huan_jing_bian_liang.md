# 环境变量

---

## 简介

`nowa server` 和 `nowa build` 共用一套环境变量注入解决方案。

环境变量指的是在代码中使用到的与运行环境相关的变量，这些变量可以是当前的部署环境（本地、日常、预发、线上）、当前的语言环境（汉语、英语…）或是当前的客户端环境（安卓、iOS…）等，工具会根据环境变量取值组合来做定制化的构建。

环境变量的合理使用可以让代码变得更加精简，使得与当前环境不相关的代码都不被构建。而在运行时，只用引入符合当前环境变量组合构建出来的代码就行了。

每个环境变量都可以有多个候选值，当候选值有超过一个时，输出文件会根据环境变量当前的取值而使用不同的文件名后缀，对每一种不同的取值组合都输出独立的打包文件。

## 使用

## `--vars`

`vars` 用于定义当前环境变量取值。

例如，在 `abc.json` 中定义了 `locale` 和 `__LOCAL__` 的取值：
```json
{
  "options": {
    "vars": {
      "locale": "en",
      "__LOCAL__": false
    }
  }
}
```

则以下代码：

```js
var lang = require('./' + locale);
if (__LOCAL__) {
  console.log('debug info');
}
```

将等价于

```js
var lang = require('./en');
```

从而精简代码和减少构建时间。

## `--buildvars`

`buildvars` 用于定义每个环境变量的全部候选值。

例如，在 `abc.json` 中定义了 `locale` 和 `__LOCAL__` 的取值和候选值：
```json
{
  "options": {
    "vars": {
      "locale": "en",
      "__LOCAL__": true
    },
    "buildvars": {
      "locale": ["en", "zh-cn"],
      "__LOCAL__": [false]
    }
  }
}
```

则在 `nowa server` 时，将使用 `{ locale: 'en', __LOCAL__: true }` 的环境变量组合构建输出 `app-en.js` 文件。

而在 `nowa build` 时，将分别使用 `{ locale: 'en', __LOCAL__: false }` 和 `{ locale: 'zh-cn', __LOCAL__: false }` 的环境变量组合构建输出 `app-en.js` 和  `app-zh-cn.js` 文件。
