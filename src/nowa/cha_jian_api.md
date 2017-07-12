## UI插件API (1.8.*)

---

### Example

https://github.com/Jirapo/nowa-gui-plugin-demo

### 插件结构

```
|- index.js   主文件
|- .nowa      属性配置文件
|- package.json
|- readme.md
```

#### 初始化

```
const Plugin = require('nowa-gui-plugin');

const name = {
  zh: '插件',
  en: 'Plugin'
};

const plugin = new Plugin(name);
```

#### 使用

plugin 有个 `use` 方法，里面需要传入一个 generator function，表示插件执行的逻辑。

函数有一个参数 `ctx`，该参数包含如下字段：

*  logger  打印函数，用于将文本显示到工具的控制台中， 换行需要手动加上`\n`
*  cwd     当前项目路径
*  renderPromts  渲染工具的提问模板表单
*  config    插件设置, .nowa文件内容


```
// 这个插件将会打印一条语句，并且弹出一个提问框

plugin.use(function* ({
  logger,
  cwd,
  renderPromts,
  config,
}) {
  logger('in demo plugin\n');
  const res = yield renderPromts([{
    key: 'name',  // 用来标识问题
    label: {
      zh: '名字',
      en: 'Name',
    },
    default: anwsers.name, // 可选，默认值
    validator: {  // 可选，校验
      func: (value) => /\w+$/.test(value), // 校验函数
      msg: 'Invalid Name'  // 校验出错信息
    },
    type: 'input',
  }]);

  console.log('res', res);
});

```


### 提问模板

支持 input，select，switch，checkbox, text 5种类型

可以参考 antd 的表单 https://ant.design/components/form-cn/

#### example

```
[
  {
    key: 'name',  // 用来标识问题
    label: {
      zh: '名字',
      en: 'Name',
    },
    default: anwsers.name, // 可选，默认值
    validator: {  // 可选，校验
      func: (value) => /\w+$/.test(value), // 校验函数
      msg: 'Invalid Name'  // 校验出错信息
    },
    type: 'input',
  },
  {
    key: 'lang',
    label: {
      zh: '语言',
      en: 'Language',
    },
    values: ['en', 'zh'],
    default: 'en',
    type: 'select',
  },
  {
    key: 'task',
    label: {
      zh: '任务',
      en: 'Tasks',
    },
    type: 'checkbox',
    values: ['eslint', 'test']
  },
  {
    key: 'fix',
    label: {
      zh: '自动修复',
      en: 'Fix',
    },
    default: true,
    type: 'switch'
  },
  {
    key: 'date',
    label: {
      zh: '时间',
      en: 'Time',
    },
    value: new Date(),
    type: 'text'
  }
]
```

### .nowa 配置文件

在插件运行时外的一份配置文件，用来表示插件的特征，这不应该是通过提问模板得到的答案。

后期会在nowa中可视化显示。



### 提交
写好插件之后请使用 tnpm || npm 提交。

### 如何测试

可以联系我测试，提issue 或者手动测试，比较麻烦。

以下是手动测试的步骤。

1、 提交一个 nowa-gui 的测试列表到 npm

这个包可以命名为 `my-nowa-gui-plugins`。

在 `package.json` 中增加`plugins`字段：

```
{
  ...,
  "plugins": [
    {
      "name": "@ali/plugin-name", // 内网使用的名字
      "type": "ui",
      "origin": "ali"
    },
    {
      "name": "plugin-name", // 外网使用的名字
      "type": "ui",
      "origin": "common"
    }]
  }
```

2、 fork 或者 clone nowa－gui 的源码

https://github.com/nowa-webpack/nowa-gui

找到 `src/renderer/constants.js` 中的 `GUI_PLUGIN_NPM` 字段 `nowa-gui-plugins-test` 更换为 `my-nowa-gui-plugins`

那么启动 gui 的时候，可以在设置页面中的插件设置里面看到 `my-nowa-gui-plugins`里面列出来的组件。

项目详情页面基础操作区域会出现 *...* 的更多按钮，用户可以开始测试了。
