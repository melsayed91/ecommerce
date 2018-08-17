'use strict';

module.exports = function (Account) {

  Account.socialLogin = function (req,res) {
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
  Account.remoteMethod('socialLogin', {
    http: { path: '/socialLogin', verb: 'get' }
  });
    Account.getAccountByUser = function (myUserId, next) {
      Account.findOne(
        {
          where: { userId: myUserId },
          include: { accountData: ['profileImage', 'country', 'bannerImage', 'countriesOfOperation'] }
        }, function (error, acc) {
            if (error)
                return next(error);
            if(!acc){
              Account.app.models.UserIdentity.findOne({where: {userId: myUserId }},function(err,userIdentity){


                var accountData={
                  name: userIdentity.profile.displayName,
                  socialImage: userIdentity.profile.photos[0].value
                }
                Account.app.models.accountData.create(accountData, function (error, createdAccountData) {
                  if (error)
                    return next(error);
                  var account = {
                    userId: myUserId,
                    accountType: 'Individual',
                    accountDataId: createdAccountData.id.toString(),
                    creationDate: new Date(),
                    isApproved: true
                  };
                    Account.create(account, function (error, createdAccount) {
                      if (error)
                        return next(error);

                      Account.findOne(
                        {
                          where: { userId: myUserId },
                          include: { accountData: ['profileImage', 'country', 'bannerImage', 'countriesOfOperation'] }
                        }, function (error, acc) {
                          if (error)
                            return next(error);
                          return next(null, acc);
                        })

                    });

              })
              })
            }else {
              return next(null, acc);
            }
        });
    }

    Account.remoteMethod('getAccountByUser', {
        accepts: { arg: 'myUserId', type: 'any', required: true },
        returns: { arg: 'acc', type: 'any' },
        http: { path: '/getAccountByUser', verb: 'get' }
    });

  Account.getCartItems = function (accountDataId, next) {
    Account.app.models.accountData.find({
        where: { _id: accountDataId },
        include: {cartItems:{product:['attachments','category']}}
      },
      function (error, result) {
        if (error)
          return next(error);

        return next(null, result[0]);

      });
  }

  Account.remoteMethod('getCartItems', {
    accepts: { arg: 'accountDataId', type: 'string', required: true },
    returns: { arg: 'cartItems', type: 'any' },
    http: { path: '/getCartItems', verb: 'post' }
  });
  Account.getBusinessAccounts = function (next) {
    Account.find({
      where:
        { accountType:"Business" },
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
