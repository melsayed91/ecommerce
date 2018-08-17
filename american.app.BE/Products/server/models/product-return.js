'use strict';
var enums = require("../../../common/enums/common");
module.exports = function (ProductReturn) {
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