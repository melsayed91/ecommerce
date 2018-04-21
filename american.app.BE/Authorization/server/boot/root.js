'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  router.get('/auth/success', function (req, res, next) {
    res.redirect('http://localhost:4200/auth/signin/' + req.accessToken.id + '/' +  req.accessToken.userId);
  });
  router.get('/auth/failure', function (req, res, next) {
    res.redirect('http://localhost:4200/auth/signin/' + req.accessToken.id + '/' +  req.accessToken.userId);
  });
  server.use(router);
};
