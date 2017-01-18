const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

module.exports = {
	entry: {
		app: config.srcPath + 'main.js',
		vendor: [
			'es6-promise',
			'axios',
			'vue',
			'vue-router',
			'vuex',
			'vuex-router-sync'
		]
	},
	output: {
		path: path.resolve(__dirname, '../dist' + config.publicPath),
		publicPath: config.publicPath,
		filename: '[name].[hash].js',
		// 异步加载的业务模块，例如按需加载的.vue单文件组件
		chunkFilename: "[id].[name].[chunkHash].js"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this nessessary.
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
	plugins: [

		// 提取公共引用脚本并独立打包，避免重复打包
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
		}),

		// 自动生成HTML入口文件，index.html为模板文件
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: config.srcPath + 'index.html',
			inject: true
		})],
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
