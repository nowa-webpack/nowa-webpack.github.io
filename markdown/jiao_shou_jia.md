# 脚手架

---

## 扩展说明

`nowa init <url>` 允许用户自定义脚手架模板。其中 `<url>` 必须是一个 zip 文件的 http 协议的访问地址（建议使用 github 的 archive zip 下载地址）。

这个 zip 文件解压后可包括以下文件或文件夹：

- `README.md` 模板介绍文件
- `mod` 供模块生成（`nowa init mod`）使用
- `page` 供页面生成（`nowa init page`）使用
- `proj` 供项目生成（`nowa init <url>`）使用
- `<type>.js` 定制的提问模板（`<type>` 取值 `mod`、`page` 或 `proj`，返回一份 [inquirer](https://www.npmjs.org/package/inquirer) 配置和回答的后处理函数）

在执行对应的命令时，
- 首先会给用户提问一些基础问题和模板定制问题
- 然后会根据用户的回答将答案嵌入模板
- 同时把相应文件夹下包含的目录结构拷贝到项目根目录（或当前目录）下
- 如果有覆盖，将会逐个提示用户。

## 约定

### 提问模板

  以下是一份典型的提问模板：

  `proj.js`
  ```js
  // inquirer prompts config
  // see https://www.npmjs.org/package/inquirer for detail
  exports.prompts = [
    {
      name: 'name',
      message: 'What\'s your name?'
    }
  ];
  // post-process of answer
  exports.answers = function(answers, abc) {
    return answers;
  };
  ```
  
  将在基础问题之外增加一个问题，询问用户要不要生成自定义库构建的配置，用户的回答将以 bool 变量存储到 library 变量，并可在后续的模板渲染时使用。

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