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

同样的，对于其他的非 `/api` 开头的请求（匹配 `"*"`），则转发到 `http://127.0.0.1:9077`。

## 代理服务器的规则配置

`nowa proxy` 是一个功能强大的代理服务器，基于 [AnyProxy](http://anyproxy.io/) 做了封装，提供更为灵活的规则逻辑配置。

> 如果提示找不到 proxy 命令，请通过 `nowa install proxy` 来安装

```shell
nowa proxy
```

### 参数列表

`nowa proxy` 接受以下候选参数：

- `    --mappings` 代理映射配置
- `-r, --rule <path>` 规则定义文件路径，规则定义文件将会覆盖代理映射配置
- `-t, --throttle <throttle>` 模拟网络限速（kb/s）
- `-s  --silent` 不输出日志到终端

`mappings` 中每条规则定义如下：

```
"<METHOD> //<HOSTNAME>[:<PORT>]/[PATH]": "//<HOSTNAME1>[:<PORT1>]/[PATH1]"
```

其中左边为筛选表达式，右边为目标表达式
- `METHOD` 请求方法，仅可用于筛选，可选值 `GET | POST | *`
- `HOSTNAME` 请求域名，用于筛选和目标，两边必须都给出
- `PORT` 请求端口，用于筛选和目标，若在目标表达式中未给出则仍维持筛选表达式中的值，若在筛选表达式中未给出则不对端口做限定
- `PATH` 请求路径，用于筛选和目标，其中小括号括起的部分映射后将拼接到 `PATH1` 之后

例如有以下配置：

`abc.json`
```json
{
  "options": {
    "port": 3000,
    "mappings": {
      "GET //localhost:3000/(admin/meeting/mobile/*.json)": "//a-work.alibaba-inc.com:443"
    }
  }
}
```

则对于 `https://localhost:3000/admin/meeting/mobile/apply/GetList.json` 的请求将被转发到 `https://a-work.alibaba-inc.com/admin/meeting/mobile/apply/GetList.json`

### 代理配置

由于是使用请求代理来做转发，所以需要在操作系统或浏览器中进行代理设置将相应的请求转发到代理服务器

#### PC 浏览器

强烈建议使用 [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) 来做代理设置

- 使用 PAC 脚本

典型的 PAC 脚本如下：
```js
function FindProxyForURL(url, host) {
  if (host === "test.com") {
    return "PROXY 127.0.0.1:8001; DIRECT";
  }
  return "DIRECT";
}
```

- 使用 HTTP 代理：

![](https://gw.alicdn.com/tfscom/TB1lZLqKpXXXXcQXpXXXXXXXXXX)

#### 移动设备

[Android 或 iOS 的代理设置](https://www.google.com/search?q=Android+iOS+%E4%BB%A3%E7%90%86%E8%AE%BE%E7%BD%AE&gws_rd=cr,ssl)

### https 请求转发

如需转发 https 请求，需要在设备中安装 https 根证书（证书只需安装一次）。

- 服务端开启 `nowa proxy`
- 用调试设备访问代理服务地址，形如：`http://<代理服务器 IP>:8002/fetchCrtFile`
- 下载并安装证书
