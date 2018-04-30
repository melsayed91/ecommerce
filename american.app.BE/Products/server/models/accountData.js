'use strict';

module.exports = function (accountData) {
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
};
