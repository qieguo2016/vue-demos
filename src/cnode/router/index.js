import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import {createListView} from '../views/CreateListView'
import DetailView from '../views/DetailView.vue'
import UserView from '../views/UserView.vue'
import config from '../../../config'

const publicPath = config.publicPath   // '/cnode/', 部署在根目录下直接使用'/'


export default new Router({
  mode: 'history',
  base: publicPath,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }

    let position = {
      x: 0,
      y: 0
    }
    if (to.path === '/') {
      position.y = +sessionStorage.getItem('scrollTop') || 0
    }
    return position
  },
  routes: [
    {path: '/all', component: createListView('all')},
    {path: '/good', component: createListView('good')},
    {path: '/share', component: createListView('share')},
    {path: '/ask', component: createListView('ask')},
    {path: '/job', component: createListView('job')},
    { path: '/detail/:id', component: DetailView },
    { path: '/user/:loginname', component: UserView },
    {path: '/', redirect: '/all'},
  ]
})
