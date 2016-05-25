# 远程调试

---

## 开发服务器的转发配置

`nowa server` 标配了远程调试的功能，该功能所做的事情是：将开发服务器中（指定路由下）找不到的资源请求转发到指定的服务器。

### 单规则配置

`nowa server` 提供 `proxy` 参数用于配置转发规则，例如有以下配置：

`abc.json`
```json
{
  "options": {
    "port": 3000,
    "proxy": "http://127.0.0.1:9077"
  }
}
```

那么对于 `http://127.0.0.1:3000/index.htm` 的访问，
- 如果开发服务器存在静态资源 `/index.htm`，则返回 `/index.htm`
- 如果开发服务器不存在静态资源 `/index.htm`，则转发到 `http://127.0.0.1:9077/index.htm`

### 多规则配置

`proxy` 参数也可传递一个对象，形如：

`abc.json`
```json
{
  "options": {
    "port": 3000,
    "proxy": {
      "/api": "http://10.125.55.239:9077",
      "*": "http://127.0.0.1:9077"
    }
  }
}
```

那么对于 `http://127.0.0.1:3000/api/getSomeInfo.json` 的访问，
- 如果开发服务器存在静态资源 `/api/getSomeInfo.json`，则返回 `/api/getSomeInfo.json`
- 如果开发服务器不存在静态资源 `/api/getSomeInfo.json`，则转发到 `http://10.125.55.239:9077/api/getSomeInfo.json`

同样的，对于其他的非 `/api` 开头的请求，则转发到 `http://127.0.0.1:9077`。

## 代理服务器的规则配置

`nowa proxy` 是一个功能强大的代理服务器，基于 [AnyProxy](http://anyproxy.io/) 做了封装，提供更为灵活的规则逻辑配置。

> 如果提示找不到 proxy 命令，请通过 `nowa install proxy` 来安装

```shell
nowa proxy
```

### 参数列表

