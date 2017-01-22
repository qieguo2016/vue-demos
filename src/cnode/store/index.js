import Vue from 'vue'
import Vuex from 'vuex'
import {fetchTopics, fetchTopicDetail} from './api'

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
		detail: {}
	},

	actions: {
		// ensure data for rendering given list type
		FETCH_LASTEST: ({commit, state}, {type}) => {
			commit('SET_ACTIVE_TYPE', {type})
			return fetchTopics(type)
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

		FETCH_DETAIL ({commit}, id) {
			return fetchTopicDetail(id)
				.then(({data}) => commit('SET_DETAIL', data))
		},
	},

	mutations: {
		SET_ACTIVE_TYPE: (state, {type}) => {
			state.activeType = type
		},

		SET_LIST: (state, {type, data}) => {
			state.lists[type] = data
		},

		SET_DETAIL (state, data) {
			state.detail = data
		}
	},
})

export default store
