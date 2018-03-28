'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
// const StatsToElastic = require('@nearform/stats-to-elasticsearch')
// const statsToElastic = StatsToElastic({
//   elaticsearchConfig: {
//     host: 'localhost:9200',
//     log: 'error',
//     maxRetries: Number.MAX_SAFE_INTEGER,
//     sniffOnStart: true,
//     keepAlive: true,
//     sniffOnConnectionFault: true
//   }, statsConfig: {

//   }
// })
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    //statsToElastic.start()
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      //test logging
     // app.log.error('test', { data: 'error' });
     // app.log.info('test', { data: 'info' });
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
