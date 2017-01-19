/**
 * @authors     : qieguo
 * @date        : 2017/1/19
 * @version     : 1.0
 * @description :
 */

'use strict';

const path = require('path');
const rimraf = require('rimraf');
const config = require('../config.js');

rimraf.sync(path.join('./dist', config.publicPath))