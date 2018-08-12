'use strict';
const path = require('path')
var GLOBAL_CONFIG = require(path.join(__dirname, '../../common/global.config'));
module.exports = {
    host: GLOBAL_CONFIG.hostname,
    stripe_secret_key:"sk_test_8MUS8lu9GJtHVTW46zTAZ2P6",
    paypal_mode:"sandbox",
    paypal_client_id:"Aab6Rvb-QgbXC8uNlNDGD06pwCX8nc4hPv66KjcHKxwkeumAMzhxaHL9AY-2z3JgA-McsyX9nSxkY7v6",
    paypal_client_secret:"EDr13MVW4U0jMdbqAfeP9rMk3Rt6cqiirP3M8Wv5sC5jfdWqbEcSI2woPSQ_rDPxB0BKOwDRW2N52i_5"
};