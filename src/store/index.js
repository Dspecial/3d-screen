/*
* @Author: dxx
* @Email: dingxixi@techbloom.net
* @Date:   2020-08-25 09:22:38
* @Last Modified by:   dxx
* @Last Modified time: 2020-08-25 10:37:28
*/

import Vue from 'vue';
import Vuex from 'vuex'; // 对vue应用中多个组件的共享状态进行集中式的管理（读/写）
Vue.use(Vuex);

const state = { // 要设置的全局访问的state对象

};

const mutations = {

};

const actions = {


};

const getters = {   //实时监听state值的变化(最新状态)

};

// 向外暴露Vuex.store （写法，结构固定）
export default new Vuex.Store({
	state,// 状态对象
	mutations,// 包含多个更新state函数的对象
	actions,// 包含多个对应事件回调函数的对象
	getters,// 包含多个getter计算属性函数的对象
})
