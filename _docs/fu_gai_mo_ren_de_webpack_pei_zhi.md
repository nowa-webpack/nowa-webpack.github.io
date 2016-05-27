# 覆盖默认的 webpack 配置

## 使用

`nowa server` 和 `nowa build` 会根据配置生成一份默认的 webpack 配置，但同时也提供了简便的方式以供用户做一些个性化的修改。**一般情况下请不要修改默认配置，除非你非常熟悉 [webpack 配置](https://webpack.github.io/docs)**

可通过在项目中增加 `webpack.config.js` 文件来覆盖默认的 webpack 配置，需要遵循以下约定：

`webpack.config.js`
```js
module.exports = function(config) { // 传入 config 为默认 webpack 配置
  // 此处可对配置做定制化修改
  config.plugins.push(new SomeWebpackPlugin());
};
```
