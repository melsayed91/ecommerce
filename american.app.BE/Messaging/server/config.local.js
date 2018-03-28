'use strict';
const path = require('path')
var GLOBAL_CONFIG = require(path.join(__dirname, '../../common/global.config'));
module.exports = {
    host: GLOBAL_CONFIG.hostname
};