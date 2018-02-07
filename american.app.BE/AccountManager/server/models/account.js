'use strict';

module.exports = function (Account) {


    Account.getAccountByUser = function (myUserId, next) {
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

    Account.remoteMethod('getAccountByUser', {
        accepts: { arg: 'myUserId', type: 'any', required: true },
        returns: { arg: 'acc', type: 'any' },
        http: { path: '/getAccountByUser', verb: 'get' }
    });

  Account.getBusinessAccounts = function (next) {
    Account.find({
      where:
        { type:"Business" },
      include: ['accountData']
    }, function (error, acc) {
      if (error)
        return next(error);
      return next(null, acc);
    });
  }

  Account.remoteMethod('getBusinessAccounts', {
    returns: { arg: 'acc', type: 'any' },
    http: { path: '/getBusinessAccounts', verb: 'post' }
  });

  Account.approveBusinessAccount = function (accountId, next) {
    Account.update({_id: accountId}, {
      isApproved: true,
      modificationDate: new Date()
    }, function (error, acc) {
      if (error)
        return next(error);
      return next(null, acc);
    });
  }

  Account.remoteMethod('approveBusinessAccount', {
    accepts: { arg: 'accountId', type: 'any' },
    returns: { arg: 'acc', type: 'any' },
    http: { path: '/approveBusinessAccount', verb: 'post' }
  });
};
