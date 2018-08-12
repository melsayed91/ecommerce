let winston = require('winston');
let os = require('os');
let utility = require('./utility');
const path = require('path')
var GLOBAL_CONFIG = require(path.join(__dirname, '../../../common/global.config'));
require('winston-mongodb').MongoDB
require('winston-elasticsearch')

var esTransportOpts = {
    clientOpts: {
        host: GLOBAL_CONFIG.es_hostname
    }
};
winston.add(winston.transports.Elasticsearch, esTransportOpts);

winston.emitErrs = true;
let errorMeta = {
    hostname: os.hostname(),
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'development'
};

module.exports = function (app, options) {
    var options = options || {};
    var defaultTransport = { type: 'Console' };
    var defaultName = 'log';
    var name = options.name || defaultName;
    delete options.name;

    function parseTransports() {
        var transports = options.transports || [defaultTransport];

        if (transports.constructor.name !== 'Array') { throw new Error('transports should be Array'); }
        if (transports.length === 0) { throw new Error('No transport was specified'); }

        return transports.map(function (transport) {
            if (transport.constructor.name === 'Object') {
                var transportType = transport.type;
                if (!transportType) {
                    throw new Error('type property is not specified for transport descriptor: ' +
                        JSON.stringify(transport));
                }
                var winstonTtransportType = winston.transports[transportType];

                if (!winstonTtransportType) {
                    throw new Error('unsupported transport type specified: ' + transportType);
                }

                delete transport.type;
                return new winston.transports[transportType](transport);
            } else {
                return transport;
            }
        });
    }

    options.transports = parseTransports(options);

    let logger = new winston.Logger(options);
    logger.log = function () {
        var args = arguments;
        var level = args[0];

        if (level === 'error') {
            var originalMeta = args[2] || {};
            args[2] = utility.extend(originalMeta, errorMeta);
        }

        winston.Logger.prototype.log.apply(this, args);
    };
    app[name] = logger
}