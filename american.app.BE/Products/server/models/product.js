'use strict';

const path = require('path')
var LoopBackContext = require('loopback-context');
var GLOBAL_CONFIG = require(path.join(__dirname, '../../../common/global.config'));
var elasticsearch = require('elasticsearch');
var es = new elasticsearch.Client({
    host: GLOBAL_CONFIG.es_hostname,
    log: 'trace'
});

module.exports = function (product) {


    product.observe("after save", function (ctx, next) {
        var currentProduct = ctx.instance

        product.findById(currentProduct.id.toString(),
            {
                include: [
                    "attachments",
                    "category",
                    { "account": { "accountData": "profileImage" } }
                ]
            }, function (err, productDetails) {

                if (ctx.isNewInstance) {
                    es.create({
                        index: GLOBAL_CONFIG.es_products_index_name,
                        type: GLOBAL_CONFIG.es_products_index_type,
                        refresh: true,
                        id: productDetails.id.toString(),
                        body: {
                            views: 0,
                            sells: 0,
                            rate: 0,
                            name: productDetails.name,
                            price: productDetails.price,
                            categoryId: productDetails.categoryId,
                            category: productDetails.__data.category.__data.name,
                            description: productDetails.description,
                            companyId: productDetails.accountId,
                            company: productDetails.__data.account.__data.accountData.__data.name,
                            stock: productDetails.stock,
                            createdAt: productDetails.createdAt,
                            image_url: productDetails.__data.attachments[0].__data.url
                        }
                    }, function (err, response, status) {
                        next();
                    });
                } else {
                    es.update({
                        index: GLOBAL_CONFIG.es_products_index_name,
                        type: GLOBAL_CONFIG.es_products_index_type,
                        refresh: true,
                        id: productDetails.id.toString(),
                        body: {
                            doc: {
                                views: 0,
                                sells: 0,
                                rate: 0,
                                name: productDetails.name,
                                price: productDetails.price,
                                categoryId: productDetails.categoryId,
                                category: productDetails.__data.category.__data.name,
                                description: productDetails.description,
                                companyId: productDetails.accountId,
                                company: productDetails.__data.account.__data.accountData.__data.name,
                                stock: productDetails.stock,
                                createdAt: productDetails.createdAt,
                                image_url: productDetails.__data.attachments[0].__data.url
                            }
                        }
                    }, function (err, response, status) {
                        if (err && err.status == 404) {
                            es.create({
                                index: GLOBAL_CONFIG.es_products_index_name,
                                type: GLOBAL_CONFIG.es_products_index_type,
                                refresh: true,
                                id: productDetails.id.toString(),
                                body: {
                                    views: 0,
                                    sells: 0,
                                    rate: 0,
                                    name: productDetails.name,
                                    price: productDetails.price,
                                    categoryId: productDetails.categoryId,
                                    category: productDetails.__data.category.__data.name,
                                    description: productDetails.description,
                                    companyId: productDetails.accountId,
                                    company: productDetails.__data.account.__data.accountData.__data.name,
                                    stock: productDetails.stock,
                                    createdAt: productDetails.createdAt,
                                    image_url: productDetails.__data.attachments[0].__data.url
                                }
                            }, function (err, response, status) {
                                next();
                            });
                        } else {
                            next();
                        }
                    });
                }

            });
    });

    product.suggest = function (prefix, next) {
        es.search({
            index: GLOBAL_CONFIG.es_products_index_name,
            type: GLOBAL_CONFIG.es_products_index_type,
            body: {
                suggest: {
                    products: {
                        prefix: prefix,
                        completion: {
                            field: "name.completion",
                            fuzzy: {
                                fuzziness: "auto"
                            }
                        }
                    }
                }
            }
        }, function (err, response, status) {
            if (err)
                return next(err);
            return next(null, response);
        });
    }

    product.search = function (text, next) {
        var query = {
            match_all: {}
        }

        if (text) {
            query = {
                match: {
                    name: text
                }
            }
        }

        es.search({
            index: GLOBAL_CONFIG.es_products_index_name,
            type: GLOBAL_CONFIG.es_products_index_type,
            body: {
                sort: [
                    { "createdAt": { "order": "desc", "unmapped_type": "long" } },
                    { "views": { "order": "desc", "unmapped_type": "long" } },
                    { "sells": { "order": "desc", "unmapped_type": "long" } },
                    { "rate": { "order": "desc", "unmapped_type": "long" } },
                    "_score"
                ],
                query: query
            }
        }, function (err, response, status) {
            if (err)
                return next(err);
            return next(null, response);
        });
    }

    product.catalog = function (accountId, next) {
        var ctx = LoopBackContext.getCurrentContext();
        es.search({
            index: GLOBAL_CONFIG.es_products_index_name,
            type: GLOBAL_CONFIG.es_products_index_type,
            body: {
                sort: [
                    { "createdAt": { "order": "desc", "unmapped_type": "long" } },
                    { "views": { "order": "desc", "unmapped_type": "long" } },
                    { "sells": { "order": "desc", "unmapped_type": "long" } },
                    { "rate": { "order": "desc", "unmapped_type": "long" } },
                    "_score"
                ],
                query: {
                    term: {
                        companyId: accountId
                    }
                }
            }
        }, function (err, response, status) {
            if (err)
                return next(err);
            return next(null, response);
        });
    }

    product.getUserProducts = function (accountId, categoryId, next) {

        var whereFilter = { isDeleted: false, accountId: accountId };

        if (categoryId)
            whereFilter.categoryId = categoryId;

        product.find({
            where: whereFilter, include: ['category', 'attachments']
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
        accepts: [
            { arg: 'accountId', type: 'string', required: true },
            { arg: 'categoryId', type: 'string' }],
        returns: { arg: 'products', type: 'any' },
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

    product.remoteMethod('suggest', {
        accepts: { arg: 'prefix', type: 'string', required: true },
        returns: { arg: 'result', type: 'any' },
        http: { path: '/suggest', verb: 'post' }
    });

    product.remoteMethod('search', {
        accepts: { arg: 'text', type: 'string' },
        returns: { arg: 'result', type: 'any' },
        http: { path: '/search', verb: 'post' }
    });
    product.remoteMethod('catalog', {
        accepts: { arg: 'accountId', type: 'string', required: true },
        returns: { arg: 'result', type: 'any' },
        http: { path: '/catalog', verb: 'post' }
    });
};
