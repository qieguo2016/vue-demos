/**
 * @authors     : qieguo
 * @date        : 2017/1/13
 * @version     : 1.0
 * @description :
 */

const isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const http = require('http')
const logger = require('./logger')
const config = require('./config')

// publicPath of static file
const publicPath = config.publicPath;

const app = express()

if (!isProd) {
	// webpack dev server middleware
	require('./build/setup-dev-server')(app)
}

// close framework info
app.disable('x-powered-by')

// gzip compress
app.use(compression({threshold: 0}))
app.use(favicon('./favicon.ico'))

// serve static files in publicPath
app.use(express.static(path.join(__dirname, 'dist')));

// post request body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/**
 * proxy request to zhihu
*/
const zhihudailyProxy = require('./proxy/zhihudaily')
zhihudailyProxy(app)

// send apps' index.html
if (isProd) {
	const baseDir = path.resolve(__dirname, 'dist');
	let dirs = fs.readdirSync(baseDir)
	let files = {}
	dirs.forEach(function (dir) {
		files[dir] = fs.readFileSync(path.join(baseDir, dir, 'index.html'), 'utf-8')  // ceche file
		app.get('/' + dir + '*', function (req, res) {
			logger.info('local request: ' + req.url)
			res.send(files[dir])
		})
	});
}
// default app
app.get('*', function (req, res) {
	logger.info('home request: ' + req.url)
	res.redirect(publicPath);
})

// setup server
const port = config.SERVER_PORT
const server = http.createServer(app).listen(port)
logger.info(`start server http://localhost:${port}`)

