# https 配置

---

## 在开发服务器中使用

`nowa server` 支持通过增加 `--https` 参数来启动一个 https 服务器

![](screenshot-server-https.png)

`https` 参数也可以指定证书文件：

`abc.json`
```json
{
  "options": {
    "https": {
      "key": "/path/to/key/file.key",
      "cert": "/path/to/cert/file.cert"
    }
  }
}
```

使用时需要手动让浏览器信任一下。

## 在代理服务器中使用

`nowa proxy` 在初次执行时会在 `~/.anyproxy_certs` 目录下生成根证书 `rootCA.crt`，需要在浏览器或者手机中导入信任该证书才可使用 https 明文解析功能。更详细的操作指引请参考 [anyproxy 的官方文档](https://github.com/alibaba/anyproxy/wiki/HTTPS%E7%9B%B8%E5%85%B3%E6%95%99%E7%A8%8B#step-2---%E7%94%9F%E6%88%90rootca%E6%89%93%E5%BC%80%E4%BF%A1%E4%BB%BB%E5%AE%83)。