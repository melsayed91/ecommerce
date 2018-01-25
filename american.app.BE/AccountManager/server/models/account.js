'use strict';

module.exports = function (Account) {

    //Register User
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
};
