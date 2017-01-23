import Vue from 'vue'
import Vuex from 'vuex'
import {fetchTopics, fetchTopicDetail, fetchUser} from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		activeType: null,
		lists: {
			all: [/* string */],  // 每页数量为20条
			good: [],
			share: [],
			ask: [],
			job: [],
		},
		details: {},
		users: {},
	},

	actions: {
		// ensure data for rendering given list type
		FETCH_LASTEST: ({commit, state}, {type}) => {
			commit('SET_ACTIVE_TYPE', {type})
			return state.lists[type].length
				? state.lists[type]
				: fetchTopics(type)
				.then(({data}) => commit('SET_LIST', {type, data}))
		},

		FETCH_MORE: ({commit, state}, {type}) => {
			const page = Math.ceil(state.lists[type].length / 20) + 1;
			return fetchTopics(type, page)
				.then(({data}) => {
					data = state.lists[type].concat(data);
					commit('SET_LIST', {type, data})
				})
		},

		FETCH_DETAIL ({commit, state}, {id}) {
			return state.details[id]
				? state.details[id]
				: fetchTopicDetail(id)
				.then(({data}) => commit('SET_DETAIL', data))
		},

		FETCH_USER: ({commit, state}, {loginname}) => {
			return state.users[loginname]
				? state.users[loginname]
				: fetchUser(loginname)
				.then(({data}) => commit('SET_USER', {data}))
		}

	},

	mutations: {

		SET_ACTIVE_TYPE: (state, {type}) => {
			state.activeType = type
		},

		SET_LIST: (state, {type, data}) => {
			state.lists[type] = data
		},

		SET_DETAIL (state, data) {
			Vue.set(state.details, data.id, data)
		},

		SET_USER: (state, {data}) => {
			Vue.set(state.users, data.loginname, data)
		}

	},
})

export default store
