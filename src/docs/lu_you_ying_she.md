# 路由映射

---

## 简介

`nowa server` 提供简单的路由映射功能，主要供 historyApiFallback 使用，满足多个页面指向同一个静态文件的需求。

## 配置

例如，需要将所有的 `/user/*` 指向 `/user.html`，则可用以下配置：

`abc.json`
```json
{
  "options": {
    "historyApiFallback": {
      "/user/*": "/user.html"
    }
  }
}
```

路由映射支持变量替换。例如，需要将所有的 `/category/:cat` 指向对应的 category 页面，则可用以下配置：

`abc.json`
```json
{
  "options": {
    "historyApiFallback": {
      "/category/:cat": "/{{cat}}.html"
    }
  }
}
```

> 可用的路由规则详见 [express 文档](http://expressjs.com/)。

## 注意

需要注意的是，`historyApiFallback` 优先级高于静态资源，如果访问的路径匹配了某个路由规则，则将访问路由规则指向的文件，而非原静态文件。
