# 模拟数据

---

## 简介

`nowa server` 可通过 `mockapi` 参数来配置模拟数据路由映射。模拟数据路由用于将满足配置规则的路径指向对应的逻辑处理中间件，允许用户通过简单的逻辑代码来定义自己所需的返回值。

## 配置

例如，对于以下配置：

`abc.json`
```json
{
  "options": {
    "mockapi": {
      "/api/fetchData": "mock/fetch.js"
    }
  }
}
```

则对于 `/api/fetchData` 的访问，将交由项目根目录下的 `mock/fetch.js` 模块处理。


`mock/fetch.js`
```js
module.exports = function(req, res) {
  res.end('sucess');
};
```

> 可用的路由规则和中间件说明详见 [express 文档](http://expressjs.com/)。
