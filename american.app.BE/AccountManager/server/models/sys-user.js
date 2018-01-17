'use strict';
var config = require('../../server/config.json');
var path = require('path');


module.exports = function (sysUser) {

      //Register User
      sysUser.register = function (user, next) {
            //Force Password to string 
            if (user.credentials)
                  user.password = user.credentials.password.toString();

            sysUser.create(user.credentials, function (error, createdUser) {
                  if (error)
                        return next(error);

                  var account = {
                        userId: createdUser.id.toString(),
                        accountType: user.type,
                        data: user.data
                  };
                  sysUser.app.models.Account.create(account, function (error, createdAccount) {
                        if (error)
                              return next(error);

                        return next(null, createdUser);
                  });
            });
      }

      sysUser.remoteMethod('register', {
            accepts: { arg: 'user', type: 'object', required: true },
            returns: { arg: 'user', type: 'any' },
            http: { path: '/register', verb: 'get' }
      });



      //send verification email after registration
      sysUser.afterRemote('register', function (context, response, next) {
            var user = response.user;
            var ref = context.req.headers.referer;
            if (!ref) {
                  ref = context.req.headers.origin;
            }
            ref = ref.replace("register", "signin");
            var fromMail = sysUser.app.models.Email.dataSource.settings.transports[0].auth.user;
            var options = {
                  type: 'email',
                  from: fromMail,
                  to: user.email,
                  subject: "You're in! Activate your account now.",
                  template: path.resolve(__dirname, '../../server/email-templates/verify.ejs'),
                  redirect: ref,
                  user: user
            };

            user.verify(options, function (err, response) {
                  if (err) {
                        sysUser.deleteById(user.id);
                        return next(err);
                  }
                  return next(null, true);
            });
      });
};
