import axios from 'axios'

// cnode可以开放了API，不需要转发，可以直接发起cors请求

const defaults = {
  baseURL: 'https://cnodejs.org/api/v1',
  // transformResponse: [(data) => {
  //   return JSON.parse(replaceImageUrl(data))
  // }]
}

Object.assign(axios.defaults, defaults)

axios.interceptors.response.use(function (response) {
  // 数据提取、loading动画处理等
  if (response.data.success) {
    response.data = response.data.data
    return response
  } else {
    return Promise.reject(error);
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export function fetchTopics(type = 'all', page = 1) {
  let url = `/topics?limit=20&tab=${type}&page=${page}`;   // 每页数量为20条
  return axios.get(url);
}

export function fetchTopicDetail(id) {
  return axios.get(`/topic/${id}`)
}

export function fetchUser(loginname) {
  return axios.get(`/user/${loginname}`)
}

function replaceImageUrl(str) {
  let reg = /https?:(\\?\/){2}(pic\d*\.zhimg\.com\\?\/)/g
  // return str.replace(reg, 'https://images.weserv.nl/?url=$2')
  return str.replace(reg, config.publicPath + 'loadImg?url=$2')
}
