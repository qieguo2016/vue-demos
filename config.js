/**
 * @authors     : zhouyongjia
 * @date        : 2017/1/13
 * @version     : 1.0
 * @description :
 */

'use strict';

const path = require('path')

module.exports = {
	SERVER_PORT: 8090,			// 端口
	// publicPath: '/',		  // 原则上应该用二级域名配合虚拟主机来部署多个应用
	// srcPath: './src/',		// 写相对路径，最后记得带/
	// publicPath: '/cnode/',	// 多站点部署时的path，目前为了方便整理用path的方式来区分应用
	// srcPath: './src/cnode/',		// 写相对路径
	publicPath: '/zhihudaily/',	// 多站点部署时的path，目前为了方便整理用path的方式来区分应用
	srcPath: './src/zhihudaily/',		// 写相对路径
}