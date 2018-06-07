'use strict';
var loopback = require('loopback');
// var LoopBackContext = require('loopback-context');
var boot = require('loopback-boot');

var app = module.exports = loopback();
// app.use(LoopBackContext.perRequest());
// app.use(loopback.token());
// function inject(ctx, next) {
//   if(ctx.req.accessToken){
//     ctx.args.options = ctx.req.accessToken;
//   }
//   next();
// }

// app.remotes().before('*.*', inject);
// app.use(function setCurrentUser(req, res, next) {
//   if (!req.accessToken) {
//     return next();
//   } else {
//     var loopbackContext = LoopBackContext.getCurrentContext();
//     if (loopbackContext) {
//       loopbackContext.set('currentUserId', req.accessToken.userId);
//     }
//     next();
//   }
// });
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
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
