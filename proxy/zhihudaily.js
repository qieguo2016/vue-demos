/**
 * @authors     : qieguo
 * @date        : 2017/1/19 0019
 * @version     : 1.0
 * @description :
 */

'use strict';

const request = require('superagent')
const logger = require('../logger')

// baseURL
const baseUrl = 'http://news-at.zhihu.com'

module.exports = function (app) {
  // proxy request to zhihu
  app.get('/zhihudaily/api/*', function (req, res) {
    let url = baseUrl + req.url
    url = baseUrl + '/' + req.url.split('/zhihudaily/')[1]
    logger.info('proxy request: ' + url)
    request.get(url).pipe(res)
  });

  // load image, because zhihu forbidden load img directly
  app.get('/zhihudaily/loadImg', function (req, res) {
    let url = req.query.url;
    logger.debug('load image: ' + url)
    request.get(url).pipe(res)
  })
}


