'use strict';
var objectId = require('mongodb').ObjectID;

module.exports = function (sysUser) {

      sysUser.afterRemote('login', function (ctx, result, next) {

            sysUser.app.models.Account.findOne(
                  { where: { userId: ctx.result.userId }, include: ['accountData'] },
                  function (err, account) {
                        ctx.result.account = account;
                        ctx.result.accountErr = err;
                        next();
                  });
      });
};
