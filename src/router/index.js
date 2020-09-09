/*
* @Author: dxx
* @Email: dingxixi@techbloom.net
* @Date:   2020-08-25 09:46:41
* @Last Modified by:   dxx
* @Last Modified time: 2020-09-09 14:24:18
*/

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:addr',
      name: 'firstScreen',
      component:() =>import('@/views/firstScreen')
    },
    {
      path: '/second/:addr',
      name: 'secondScreen',
      component:() =>import('@/views/secondScreen'),
    },
    {
      path: '/thrid/:addr',
      name: 'thridScreen',
      component:() =>import('@/views/thridScreen'),
    },
    // {
    //   path: '/map',
    //   name: 'map',
    //   component:() =>import('@/components/3dMap/3dmap')
    // },
    // {
    //   path: '/mapAll',
    //   name: 'mapAll',
    //   component:() =>import('@/components/3dMap/3dmapAll')
    // }
  ]
})
