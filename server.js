/**
 * Created by qieguo on 2016/12/25.
 */

const isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const favicon = require('serve-favicon')
const http = require('http')
const request = require('superagent')
const logger = require('./logger')
const config = require('./config')

// publicPath of static file
const publicPath = config.publicPath;

// proxy baseURL
const baseUrl = 'http://news-at.zhihu.com'

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

// proxy request to zhihu
app.get(publicPath + 'api/*', function (req, res) {
	let url = baseUrl + req.url
	if (publicPath !== '/') {
		url = baseUrl + '/' + req.url.split(publicPath)[1]
	}
	logger.info('proxy request: ' + url)
	request.get(url).pipe(res)
});

// load image, because zhihu forbidden load img directly
app.get(publicPath + 'loadImg', function (req, res) {
	let url = req.query.url;
	logger.debug('load image: ' + url)
	request.get(url).pipe(res)
})

// send app's index.html
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
	// default
	app.get('*', function (req, res) {
		logger.info('home request: ' + req.url)
		res.redirect('/zhihudaily');
	})
}


// send app's index.html
const port = config.SERVER_PORT
const server = http.createServer(app).listen(port)
logger.info(`start server http://localhost:${port}`)

