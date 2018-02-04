'use strict';
var objectId = require('mongodb').ObjectID;

module.exports = function (sysUser) {

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
