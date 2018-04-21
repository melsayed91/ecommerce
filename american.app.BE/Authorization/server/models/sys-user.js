'use strict';
var objectId = require('mongodb').ObjectID;
var utils = require('./utils');

module.exports = function (sysUser) {

  sysUser.socialLogin = function (myUserId, next) {
    Account.find({
      where:
        { id: "5a5bc48125aa403e94c56a0b" },
      fields: ['data']
    }, function (error, acc) {
      if (error)
        return next(error);
      return next(null, acc);
    });
  }

  function profileToUser(provider, profile) {
    var email = profile.emails && profile.emails[0] && profile.emails[0].value;
    if (!email) {
      // Fake an e-mail
      email = (profile.username || profile.id) + '@loopback.' +
        (profile.provider || provider) + '.com';
    }
    var username = provider + '.' + (profile.username || profile.id);
    var password = utils.generateKey('password');
    var userObj = {
      username: username,
      password: password,
      email: email
    };
    return userObj;
  }

  sysUser.afterRemote('login', function (ctx, result, next) {

    sysUser.app.models.Account.findOne(
      {
        where: { userId: ctx.result.userId },
        include: { accountData: ['profileImage', 'country', 'bannerImage', 'countriesOfOperation'] }
      },
      function (err, account) {
        ctx.result.account = account;
        ctx.result.accountErr = err;
        if (!account.isApproved) {
          ctx.result.accountErr = "Account not approved!";
        }
        next();
      });
  });
};
