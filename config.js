/**
 * @authors     : zhouyongjia
 * @date        : 2017/1/13
 * @version     : 1.0
 * @description :
 */

'use strict';

const path = require('path')

module.exports = {
	CLIENT_PORT: 8888,			// 开发时的前端devServer
	SERVER_PORT: 8090,			// 后端server
	publicPath: '/daily/',	// 多站点部署时的path，原则上应该用二级域名做多站点应用的部署，目前未申请个人域名，所以用path的方式来区分应用
	// publicPath: '/',					// 多站点部署时的path，原则上应该用二级域名而不是path来做多站点应用的部署，目前未申请个人域名，所以用path的方式来区分应用
	srcPath: './src/zhihudaily/',		// 写相对路径
}