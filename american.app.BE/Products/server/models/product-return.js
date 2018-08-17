'use strict';
var enums = require("../../../common/enums/common");
module.exports = function (ProductReturn) {

  ProductReturn.getReturns = function (accountId, next) {
        var query = {
          order: 'creationDate DESC',
          include: [
            'product',
            'reason',
            'status',
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

  ProductReturn.getReturnById = function (returnId, next) {
        var query = {
          order: 'creationDate DESC',
          include: [
            {product:'attachments'},
            'reason',
            'status',
            'customerAttachment',
            {customer: 'accountData'},
            {vendor: 'accountData'}
          ]
        };
          query.where = {_id: returnId};

      ProductReturn.findOne(query, function (error, result) {
          if (error)
            return next(error);

          return next(null, result);

        });
      };

  ProductReturn.remoteMethod('getReturnById', {
    accepts: {arg: 'returnId', type: 'string', required: true},
    returns: {arg: 'returnItem', type: 'any'},
    http: {path: '/getReturnById', verb: 'post'}
  });


    ProductReturn.requestProductReturn = function (data, options, next) {
        data.statusId = enums.productReturnStatus.pending;
        data.customerId = options.accessToken.userId.toString();
        data.creationDate=new Date();
        data.modificationDate=new Date();
        data.isDeleted=false;
        ProductReturn.create(data, function (error, createdPR) {
            if (error)
                return next(error);
            ProductReturn.app.models.productReturnTransaction.create({
                transactionId: createdPR.id,
                statusId: enums.productReturnStatus.pending,
                accountId: options.accessToken.userId.toString()
            }, function (error, createdReturnTransaction) {
                if (error)
                    return next(error);
                return next(null, createdPR);
            });
        });
    }

    ProductReturn.remoteMethod('requestProductReturn', {
        accepts: [{ "arg": 'data', type: 'object', http: { source: 'body' } },
        { "arg": "options", "type": "object", "http": "optionsFromRequest" }],
        returns: { arg: 'result', type: 'any' },
        http: { path: '/returnProduct', verb: 'post' }
    });

}
