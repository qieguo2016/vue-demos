import TopicList from '../components/TopicList.vue'

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.

export function createListView(type) {

	return {
		name: `${type}-view`,

		render (h) {
			return h(TopicList, {props: {type}})
		},

		activated () {
			this.$children[0].addListener();
		},

		deactivated () {
			this.$children[0].removeListener();
		},

		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			sessionStorage.setItem('scrollTop', document.body.scrollTop)
			next()
		}
	}
}
