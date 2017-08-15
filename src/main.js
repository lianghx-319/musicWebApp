// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';//引入路由模块
import './sass/index.scss';//引入基础样式
import store from './vuex/store.js';//引入状态管理
import MuseUI from 'muse-ui';//引入主题UI
import 'muse-ui/dist/muse-ui.css';//UI样式
import 'muse-ui/dist/theme-carbon.css';//UI主题
import { Swipe, SwipeItem } from 'mint-ui';//引入滚动轮播插件
import 'mint-ui/lib/style.css';//UI样式
import Vue2Touch from 'vue2-touch';
import './filters';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(MuseUI);
Vue.use(Vue2Touch);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
