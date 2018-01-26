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
                  if (user.data.country)
                        user.data.countryId = user.data.country.id;

                  var accountData = user.data;
                  if (user.userDocuments && user.userDocuments.length)
                        accountData.documentIds = user.userDocuments;
                  if (user.categories && user.categories.length)
                        accountData.categoryIds = user.categories;
                  if (user.userCategories && user.userCategories.length)
                        accountData.userCategories = user.userCategories;
                  
                  sysUser.app.models.accountData.create(accountData, function (error, createdAccountData) {
                        if (error)
                              return next(error);
                        var account = {
                              userId: createdUser.id.toString(),
                              accountType: user.type,
                              accountDataId: createdAccountData.id.toString()
                        };
                        sysUser.app.models.Account.create(account, function (error, createdAccount) {
                              if (error)
                                    return next(error);


                              return next(null, createdUser);
                        });
                  });
            });
      }

      sysUser.remoteMethod('register', {
            accepts: { arg: 'user', type: 'object', required: true },
            returns: { arg: 'user', type: 'any' },
            http: { path: '/register', verb: 'POST' }
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
