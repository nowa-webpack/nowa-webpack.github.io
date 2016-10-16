# 云构建

---

要在项目中使用云构建，需要进行以下操作：

## Gitlab 配置

在 gitlab 项目设置里打开云构建配置，详见截图：

![](screenshot-cloud-build.png)

## 项目中配置

修改 package.json，修改 scripts 和 devDependencies 属性：

```
{
  "name": "test",
  "scripts": {
    "start": "nowa server",
    "build": "nowa build",
    "cloud": "nowa build -d .package"
  },
  "devDependencies": {
    "nowa": "^1",
    "nowa-build": "^1"
  },
  ...
}
```

增加或修改 abc.json，增加 assets 属性：

```
{
  "name": "test",
  "options": {
    ...
  },
  "assets": {
    "type": "command",
    "command": {
      "cmd": [
        "tnpm ii",
        "tnpm run cloud"
      ]
    }
  }
}
```

## 代码提交

代码 push 之后会自动触发构建，每一次构建的进度和日志可在[这里](http://builder.alibaba-inc.com/task)查看。
