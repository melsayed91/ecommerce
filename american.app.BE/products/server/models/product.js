'use strict';

module.exports = function (product) {

    product.getUserProducts = function (filter, next) {
        product.find({
            where: {
                accountId: filter.accountId,
                categoryId: filter.categoryId,
                isDeleted: false
            }, include: ['category', 'attachments']
        }, function (error, products) {
            if (error)
                return next(error);

            return next(null, products);

        })
    }

    product.deleteUserProduct = function (productId, next) {
        product.update({ _id: productId }, { isDeleted: true }, function (error, result) {
            if (error)
                return next(error);

            return next(null, result);

        })
    }

    product.updateUserProduct = function (updateObj, next) {
        product.update({ _id: updateObj.productId }, updateObj.data, function (error, result) {
            if (error)
                return next(error);

            return next(null, result);

        })
    }

    product.remoteMethod('getUserProducts', {
        accepts: { arg: 'filter', type: 'object', required: true },
        returns: { arg: 'product', type: 'any' },
        http: { path: '/getUserProducts', verb: 'post' }
    });

    product.remoteMethod('updateUserProduct', {
        accepts: { arg: 'updateObj', type: 'object', required: true },
        returns: { arg: 'result', type: 'any' },
        http: { path: '/updateUserProduct', verb: 'post' }
    });

    product.remoteMethod('deleteUserProduct', {
        accepts: { arg: 'productId', type: 'string', required: true },
        returns: { arg: 'result', type: 'any' },
        http: { path: '/deleteUserProduct', verb: 'delete' }
    });
};
