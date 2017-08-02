# colamusic2.0

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 简介
自学了半年的前端知识，希望能做个小demo当作面试的作品。平常喜欢音乐所以就着手实现这个作品。虽然GitHub上已经有许多仿写的项目，但我希望写一个简易版的网易云音乐，主要播放的功能齐全和自己定制的ui风格。

## 技术栈
- Vue全家桶(vue-cli, vue-router, vuex)
- webpack
- MuseUI & MintUI
- ES6
- Sass
- axios
- vue2-touch
- 初尝yarn包管理

## 运行截图：
<div align="space-between">
  <img src="https://github.com/lianghx-319/musicWebApp/blob/master/static/gif/music.gif" width="375" height="667">
</div>

## 项目组件
- [x] 首页 -- 完成
- [x] 歌曲搜索 -- 完成
- [x] 歌曲播放 -- 半成品，因为在移动端有些小问题暂时不知道原因
- [x] 热门推荐 -- 完成
- [x] 排行榜 -- 完成
- [x] 私人FM -- 完成
- [ ] 每日推荐 -- 未完成
- [ ] 个人收藏 -- 完成部分页面布局
- [ ] 动态 -- 未完成
- [ ] 登录登出 -- 完成前端部分权限

## 项目结构 ##
```

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- api                          // api封装
	|       |-- index.js                 
	|   |-- components                   // 组件
	|       |-- account.vue              // 用户信息组件
	|       |-- audio.vue           	   // 播放组件
	|       |-- discovery.vue            // 首页界面
	|       |-- fm.vue                   // 私人FM播放界面
	|       |-- friend.vue               // 朋友动态界面
	|       |-- index.vue                // appbar组件
	|       |-- music.vue                // 个人收藏歌单
	|       |-- musicList.vue            // 歌单列表
	|       |-- playingIcom.vue          // 正在播放时右上角的动图
	|       |-- playList.vue             // 播放列表
	|       |-- searchBar.vue            // 搜索组件
	|       |-- slider.vue               // 滑动组件
	|       |-- topTen.vue               // 排行榜
	|   |-- router                       // Vue 路由
	|       |-- index.js
	|   |-- sass                         // css文件夹，采用Sass进行预编译
	|   |-- store                        // Vuex Store文件，APP核心所在
	|       |-- index.js       
	|   |-- util                         // 全局公用函数
	|       |-- index.js                 
	|   |-- App.vue                      // App入口文件
	|   |-- filter.js                    // 注册全局Vue filter
	|   |-- main.js                      // 程序入口文件，加载Vuex,Vue-router等插件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // git ingnore
	|-- .postcssrc.js                    // post css 配置文件
	|-- README.md                        // README
	|-- index.html                       // 入口html文件
	`-- package.json                     // 项目及工具的依赖配置文件

	```
