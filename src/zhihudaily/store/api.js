import axios from 'axios'
import config from '../../../config'

// const publicPath = '/'   // 部署在根目录下直接使用/
const publicPath = config.publicPath   // '/daily/'

const defaults = {
	baseURL: publicPath + 'api/4',
	transformResponse: [(data) => {
		return JSON.parse(replaceImageUrl(data))
	}]
}

Object.assign(axios.defaults, defaults)

export const fetchLatest = () => {
	return axios.get('/news/latest')
}

export const fetchBefore = (date) => {
	return axios.get(`/news/before/${date}`)
}

export const fetchDetail = (id) => {
	return axios.get(`/news/${id}`)
}

function replaceImageUrl(str) {
	let reg = /https?:(\\?\/){2}(pic\d*\.zhimg\.com\\?\/)/g
	// return str.replace(reg, 'https://images.weserv.nl/?url=$2')
	return str.replace(reg, config.publicPath + 'loadImg?url=$2')
}
