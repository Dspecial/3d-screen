/*
* @Author: dxx
* @Email: dingxixi@techbloom.net
* @Date:   2020-08-25 09:15:36
* @Last Modified by:   dxx
* @Last Modified time: 2020-09-09 14:38:22
*/

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'element-ui/lib/theme-chalk/index.css'; //element-ui样式表
import './assets/css/icons/icomoon/styles.css'; // icomoon 图标库
import './assets/css/base.scss'; // 基础样式表,引入scss文件，参考 https://blog.csdn.net/ze1024/article/details/100516650
import 'swiper/css/swiper.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';//引入vuex
import VueCookie from 'vue-cookie'; // api: https://github.com/alfhen/vue-cookie
import ElementUI from 'element-ui';
import dataV from '@jiaminghi/data-view'; // 引入dataV可视化图表 api:http://datav.jiaminghi.com/guide/#安装
import echarts from 'echarts'; // 引入echarts
import statusTime from '@/assets/js/statusTime.js'; // 人员画像页面中，根据时间的状态分析表
import scroll from 'vue-seamless-scroll'; // 无缝滚动插件vue-seamless-scroll的安装与使用
import VueAwesomeSwiper from 'vue-awesome-swiper'

import global_ from './core/GlobalParamters'   //引用
Vue.prototype.GLOBAL = global_;  //定义全局变量名


Vue.use(VueCookie);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });// 声明使用ElementUI
Vue.use(dataV)

// 声明使用echarts
Vue.prototype.$echarts = echarts
Vue.use(echarts)
require('./components/Charts/customedTheme');// 使用echarts 自定义主题

Vue.use(scroll)
Vue.use(VueAwesomeSwiper)

Vue.prototype.statusTime = statusTime; // 声明全局使用状态分析

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
