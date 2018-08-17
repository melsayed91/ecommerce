'use strict';

module.exports = function (ProductReturn) {

  ProductReturn.getReturns = function (accountId, next) {
        var query = {
          order: 'creationDate DESC',
          include: [
            'product',
            'reason',
            {customer: 'accountData'},
            {vendor: 'accountData'}
          ]
        };
          query.where = {vendorId: accountId};

      ProductReturn.find(query, function (error, result) {
          if (error)
            return next(error);

          return next(null, result);

        });
      };

  ProductReturn.remoteMethod('getReturns', {
    accepts: {arg: 'accountId', type: 'string', required: true},
    returns: {arg: 'returns', type: 'any'},
    http: {path: '/getReturns', verb: 'post'}
  });


}
