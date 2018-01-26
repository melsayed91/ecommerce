'use strict';

module.exports = function (accountData) {

  accountData.getAccountData = function (accountDataId, next) {
    accountData.find({
      where: { _id: accountDataId }, include: ['categories', 'account', 'customers', 'gallery', 'profileImage', 'country',
        'bannerImage']
    },
      function (error, result) {
        if (error)
          return next(error);

        return next(null, result[0]);

      });
  }

  accountData.remoteMethod('getAccountData', {
    accepts: { arg: 'accountDataId', type: 'string', required: true },
    returns: { arg: 'accountData', type: 'any' },
    http: { path: '/getAccountData', verb: 'post' }
  });



  accountData.updateAccountData = function (model, next) {
    if (model.updateQuery.country)
      delete model.updateQuery.country
    if (model.updateQuery.categories)
      delete model.updateQuery.categories

    accountData.update(
      { _id: model.accountDataId },
      model.updateQuery,
      function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
  }

  accountData.remoteMethod('updateAccountData', {
    accepts: { arg: 'model', type: 'object', required: true },
    returns: { arg: 'accountData', type: 'any' },
    http: { path: '/updateAccountData', verb: 'post' }
  });

  accountData.addCustomer = function (model, next) {
    accountData.update(
      { _id: model.accountDataId },
      { $addToSet: { customerIds: model.customerId } },
      function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
  }

  accountData.remoteMethod('addCustomer', {
    accepts: { arg: 'model', type: 'object', required: true },
    returns: { arg: 'accountData', type: 'any' },
    http: { path: '/addCustomer', verb: 'post' }
  });

  accountData.addOperationCountry = function (model, next) {
    accountData.update(
      { _id: model.accountDataId },
      { $addToSet: { countriesOfOperationIds: model.operationCountryId } },
      function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
  }

  accountData.remoteMethod('addOperationCountry', {
    accepts: { arg: 'model', type: 'object', required: true },
    returns: { arg: 'accountData', type: 'any' },
    http: { path: '/addOperationCountry', verb: 'post' }
  });

};
