# NOWA1 应用升级 NOWA2

---

通过将 nowa1 React 项目迁移到 nowa2 的 `@nowa/solution-react` 或者 `@nowa/solution-react-typescript`

可以使用最新的工程化构建方案

* Babel 7
> preset-env
> 更新的语法支持
* webpack 4
> tree shaking 
> import() 方式 code splitting， 同时更为彻底。
* 优化过的 uglify 配置
> 在实际使用的项目中，相比较nowa1升级之后项目产物约有 22% - 27% 的体积减小


## Nowa2 安装

安装 nowa2 命令：
`npm i @nowa/cli @nowa/core -g`

将 solution 加入到项目 package.json 的项目 devPendencies 依赖中：
`@nowa/solution-react` 或者 `@nowa/solution-react-typescript`

重新安装项目依赖：`npm install`，安装完成后 nowa2 的命令就可用了：`nowa2 start`, `nowa2 server`

## 升级步骤

后续 nowa 应该会提供更自动化的升级方案，目前升级需要进行一些手动的改造。

### 1. 源代码改造

由于 webpack 2 以上需要使用**标准**的 `ECMAScript 6 Module`语法，导致 `require` 和 `import` 并不能混合使用。
因此针对于之前项目里的导入导出，需要做调整。


#### 1.1 CommonJS 风格的导入导出修改

首先确保迁移的代码库有版本控制 （方便diff和撤销更改）

然后使用 `cjs-to-es6` 进行 `require => import` 和 `module.exports => export default` 的转换。

> 项目下执行命令 `npx cjs-to-es6 ./src/`

转换之后应该会解决95%以上的导出问题。

在实际操作过程中我们发现会有一些非标准情形不会被自动转换。转换完成之后`require（）`会残留，请全局搜索`require`之后手动进行修改。

```js
export default from './Some'; // 非标准 esm，但已进入提案

// 会被 cjs-to-es6 转换成
export default require('./Some');

// 需要手动改写成
import Some from './Some';
export default Some;

// 或者简化为
export { default } from './Some';
```

#### 1.2 非标准 ESM 导入导出修改

此部分可以通过 webpack 打包抛出的 warning 来看。简而言之，默认导出只能通过默认导入使用，两者不能混用。

```js
// 情形 1
import foo from './foo'；
// 在foo模块中只能写
export default xxxx；

// ！！！ 任何其他的写法都会导致导入出现问题
export { xxxx }；
```

```js
// 情形 2
// 在foo模块中写
export {
 a: 1,
 b: 2,
}；
// 等价于
export const a = 1;
export const b = 2
// 而在引入时只支持
import { a， b } from './foo'；
import * as foo from './foo';
a === foo.a; // true

// ！！！ 以下写法并不支持
import foo from './foo';
```

#### 1.3 入口改造

项目的入口地址为
`src/app/app.js` === 需变更为 ===> `src/index.jsx` 或者 `src/index.tsx`

最简单的修改方式为
新建 `src/index.jsx`
并编写内容为 
```js
import './app/app.js';
```

项目模板入口地址为
`html/index.html` === 需变更为 ===> `src/index.html`


#### 1.4 模板改造

之前的 `index.html` 会有类似于
`<script src="/app.js"></script>`
的代码。将打包输出的 js 主动引入项目中。

由于新的 solution 中集成了 html-webpack-plugin，会将产物自动的写入模板，此类代码需要移除以避免多次执行。


#### 1.5 注入变量改造

nowa1 创建的一些模板中使用 `__LOCAL__` 变量区分 `nowa server` 以及 `nowa build`。目前这种写法已不提供支持，请使用以下方式替代：

```js
process.env.NODE_ENV === 'production' 
// true 正常构建产物 
// false devServer 或者 devBuild 产物
```

注意此处的区分只和构建模式相关，不与任何环境相关联。

#### 1.6 HTML 容器改造

SPA 模式下任何项目的打包产物均为 index.js，在前端代码升级之后，后端 HTML 的引入的 js 路径会变化，请根据实际需要进行修改。

#### 2. 老 webpack.config.js 配置改造

如果项目中有一些配置通过在 webpack.config.js 中进行覆盖。由于 webpack 1 到 4 的配置方式存在巨大差异，请自己根据 Webpack 的升级文档进行修改。
