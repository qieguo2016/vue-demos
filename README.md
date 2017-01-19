Vue Demo collections (Vue 2.0)
------

> **A Vue.js Demo Collections of Vue 2.o  
  一个 Vue2.0 的 Demo 集**
  
### Summary

Vue2.0的demo集，所有demo前端基于Vue2.0、Vuex、Vue-router、axios，未涉及ssr，均为静态文件伺服。

后端基于express + superagent等库搭建，模块管理方面使用webpack 2。

PS：这是一个多个项目的集合，为了提高效率，开发时只处理一个应用，所以需要设置config内的两个path

### Index

1. [知乎日报]()  

2. [cnode论坛]()

### How to use

``` bash
# install dependencies
npm install

# set current demo by rewrite the two path of config.js
module.exports = {
	SERVER_PORT: 8090,	// port
	publicPath: '/daily/',	// need to be change
	srcPath: './src/zhihudaily/',	// need to be change
}

# develop environment
npm run dev

# build for production with minification
npm run build

# start server for production (Note: need to build first)
npm start

```

### 知乎日报

[Live Demo]() / [Source Code]()

![zhihudaily](.github/zhihudaily.png)

### CNode论坛

[Live Demo]() / [Source Code]()

![CNode](.github/cnode.png)
