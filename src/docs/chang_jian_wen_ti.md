# 常见问题

---

## 1. 模块丢失 `Error: Cannot find module 'xxx'`

如图

![](screenshot-issue-1.png)

一般是由于上次 npm 安装异常中止导致，可通过卸载后重新安装 nowa 工具来解决。  

```shell
rm -rf `npm root -g`/nowa-* ~/.nowa
nowa install --registry=https://registry.npm.taobao.org
```

## 2. 在项目中使用 typescript 写 jsx 报错

[TS 和 JSX 兼容问题](https://github.com/techird/blog/issues/3)由来已久，默认是不支持的。

如果要支持，需要在 tsconfig.json 里面加个配置：

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```
更多配置可查看 [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)。
