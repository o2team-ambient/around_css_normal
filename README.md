## 使用方法

```
jnpm i @o2team/ambient-around_css_normal --save
```

```javascript
import ATAmbient from '@o2team/ambient-around_css_normal'

ATAmbient({
  particleNumber: 15,
  minRadius: 2,
  maxRadius: 15,
  backgroundColors: {
    color1: '#10DE95',
    color2: '#00ABFF',
  }
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| particleNumber | `number` | - | - |
| minRadius | `number` | - | - |
| maxRadius | `number` | - | - |
| backgroundColors | `object` | `{color1: '', color2: ''}` | - |

## 预览地址

https://o2team-ambient.github.io/around_css_normal/dist/?controller=1

## 项目结构

```
├── config                  - 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json               - 组件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.ejs
    ├── index.js            - 主入口文件
    ├── rollup_index.js     - npm 包主入口文件
    ├── config.js           - 控制板参数配置文件（单独打包）
    ├── control.js          - 控制板入口文件（单独打包）
    └── js
        ├── ambient.js      - 动效初始化入口
        ├── controlinit.js  - 控制板自定义代码
        └── utils
            ├── const.js    - 字段常数
            ├── raf.js
            └── util.js
```

> 开发完毕之后，请新建 gh-pages 分支并 push --set-upstream，以获得线上 demo 页。每次更新后，测试完成即可合并至 gh-pages 发布。