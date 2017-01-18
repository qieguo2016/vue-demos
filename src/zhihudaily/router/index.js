import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import List from '../views/List.vue'
import Detail from '../views/Detail.vue'
import config from '../../../config'

// const publicPath = '/'   // 部署在根目录下直接使用/
const publicPath = config.publicPath   // '/daily/'

export default new Router({
	mode: 'history',
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) {
			return savedPosition
		}

		let position = {
			x: 0,
			y: 0
		}
		if (to.path === publicPath) {
			position.y = +sessionStorage.getItem('scrollTop') || 0
		}
		return position
	},
	routes: [
		{
			path: publicPath,
			component: List
		},
		{
			path: publicPath + 'detail/:id',
			component: Detail
		}
	]
})
