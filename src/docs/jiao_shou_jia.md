# 脚手架

---

## 扩展说明

`nowa init <url>` 允许用户自定义脚手架模板。其中 `<url>` 必须是一个 zip 文件的 http 协议的访问地址（建议使用 github 的 archive zip 下载地址）。

这个 zip 文件解压后可包括以下文件或文件夹：

- `README.md` 模板介绍文件
- `proj` 供项目生成（`nowa init <url>`）使用
- `<mod>` 供模块生成（`nowa init <mod>`）使用
- `<type>.js` 定制的提问模板（`<type>` 对应到 <mod>）

例如：
```
.
├── mod  ------------------------ 模块生成模板
│   └── ...
├── page  ----------------------- 页面生成模板
│   └── ...
├── proj  ----------------------- 项目生成模板
│   └── ...
├── mod.js  --------------------- 模块提问模板
├── page.js  -------------------- 页面提问模板
├── proj.js  -------------------- 项目提问模板
└── README.md  ------------------ 模板介绍文件
```

在执行对应的命令时，
- 首先会给用户提问一些基础问题和模板定制问题
- 然后会根据用户的回答将答案嵌入模板
- 同时把相应文件夹下包含的目录结构拷贝到项目根目录（或当前目录）下
- 如果有覆盖，将会逐个提示用户。

## 约定

### 提问模板

提问模板模块可对外暴露以下属性：

- prompts | `Array<Object>`
  以数组形式定义了所有的问题，格式详见 [inquirer](https://www.npmjs.org/package/inquirer)
- answers | `Function`
  数据后处理函数，入参是 用户的回答 和 项目配置
- filter | `Function`
  生成文件的过滤函数，入参是 文件名 和 answers 返回的数据

以下是一份典型的提问模板：

`proj.js`
```js
// inquirer prompts config
// see https://www.npmjs.org/package/inquirer for detail
exports.prompts = [
  {
    name: 'library',
    message: 'Generate a custom library?'
  },
  {
    name: 'store',
    type: 'confirm',
    message: 'Generate store & actions?'
  }
];
// post-process of answer
exports.answers = function(answers, abc) {
  answers.name = answers.name.toLowerCase();
  return answers;
};
// filter out files
exports.filter = function(source, data) {
  if (!data.store) {
    return !/(actions|store)\.js$/.test(source);
  }
};

```

将在基础问题之外增加 2 个问题，询问用户要不要生成自定义库构建的配置（用户的回答将以 bool 变量存储到 library 变量）和是否要生成 actions 和 store（用户的回答将以 bool 变量存储到 store 变量），并可在后续的模板渲染时使用。

> 如果没有提问模板，则直接使用默认问题的答案作为模板渲染的上下文。

### 文件名中嵌入变量

文件和文件夹的名称也可以通过变量生成，约定如下：

- 有 `__name__.js`，那么将使用 `name` 变量的值作为文件名，若 `name = "test"` 则生成文件 `test.js`

### 文件中支持使用 ejs 模板

模板支持 ejs 语法逻辑，例如有以下文件

```html
<title><%= name %><title>
```

则输出

```html
<title>test<title>
```

### 更详细的使用，可参考 [Salt 项目模板](https://github.com/nowa-webpack/template-salt)

### 控制文件是否生成

可通过 filter 函数来控制哪些文件不需要生成。每个文件在生成之前都会够一遍 filter 函数，将文件路径当作第一个参数传入，渲染上下文作为第二个参数，如果 filter 返回 false，则跳过该文件的生成，否则正常生成文件。
