import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import List from '../views/List.vue'
import Detail from '../views/Detail.vue'
import config from '../../../config'

const publicPath = config.publicPath   // 部署在根目录下直接使用 '/',多目录则用路径

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
		{
			path: '/',
			component: List
		},
		{
			path: '/detail/:id',
			component: Detail
		}
	]
})
