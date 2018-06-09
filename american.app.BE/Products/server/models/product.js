'use strict';

const path = require('path')
const es_page_size = 12
var LoopBackContext = require('loopback-context');
var moment = require('moment');
var GLOBAL_CONFIG = require(path.join(__dirname, '../../../common/global.config'));
var elasticsearch = require('elasticsearch');
var es = new elasticsearch.Client({
  host: GLOBAL_CONFIG.es_hostname,
  log: 'trace'
});
const discountStatus = require('../../../common/enums/common').discountStatus;
module.exports = function (product) {


  product.observe("after save", function (ctx, next) {
    var productId = {};
    if (ctx.instance) {
      productId = ctx.instance.id.toString()
    } else {
      productId = ctx.where._id;
    }
    product.findById(productId,
      {
        include: [
          "attachments",
          "category",
          {"account": {"accountData": "profileImage"}}
        ]
      }, function (err, productDetails) {
        var _doc = {
          views: productDetails.views,
          sells: productDetails.sells,
          rating: productDetails.rating ? productDetails.rating : {
            average: 0,
            total: 0
          },
          name: productDetails.name,
          price: productDetails.price,
          categoryId: productDetails.categoryId,
          category: productDetails.__data.category.__data.name,
          description: productDetails.description,
          companyId: productDetails.__data.account.userId.toString(),
          company: productDetails.__data.account.__data.accountData.__data.name,
          stock: productDetails.stock,
          createdAt: productDetails.createdAt,
          image_url: productDetails.__data.attachments[0].__data.url,
          discount: productDetails.__data.discount
        };

        /*  if (productDetails.__data.discount) {
            //var active_discount = productDetails.__data.discounts[0].__data;

          } else {
            _doc.discount = undefined;
          }*/

        if (ctx.isNewInstance) {
          es.create({
            index: GLOBAL_CONFIG.es_products_index_name,
            type: GLOBAL_CONFIG.es_products_index_type,
            refresh: true,
            id: productDetails.id.toString(),
            body: _doc
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
              doc: _doc
            }
          }, function (err, response, status) {
            if (err && err.status === 404) {
              es.create({
                index: GLOBAL_CONFIG.es_products_index_name,
                type: GLOBAL_CONFIG.es_products_index_type,
                refresh: true,
                id: productDetails.id.toString(),
                body: _doc
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
              skip_duplicates: true,
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

  product.search = function (searchParams, options, next) {
    var query = {
        bool: {
          must: {
            match_all: {}
          }
        }
      },
      sortBy_Latest = {"createdAt": {"order": "desc", "unmapped_type": "long"}},
      sort_By_Hottest = {"sells": {"order": "desc", "unmapped_type": "long"}},
      sort_By_Views = {"views": {"order": "desc", "unmapped_type": "long"}},
      soryBy = [
        sort_By_Hottest,
        {"rating.average": {"order": "desc", "unmapped_type": "long"}},
        sort_By_Views,
        sortBy_Latest,
        "_score"
      ],
      aggregations = {
        max_price: {max: {field: "price"}},
        min_price: {min: {field: "price"}},
        categories: {
          terms: {field: "category"}
        }
      };


    if (searchParams && Object.keys(searchParams).length > 0) {
      if (searchParams.text) {
        query.bool.must = {
          match: {
            name: searchParams.text
          }
        }
        if (options && options.accessToken && options.accessToken.userId) {
          query.bool["must_not"] = {
            match: {
              companyId: options.accessToken.userId.toString()
            }
          }
        }
      }

      if (searchParams.facets) {
        var mustObj = {},
          shouldObj = [];
        searchParams.facets.forEach(function (facet) {
          var facetObj = {};
          if (facet.value.constructor === Array && facet.value.length == 2) {
            var rangeObj = {};
            rangeObj[facet.field] = {
              gte: facet.value[0],
              lte: facet.value[1]
            };
            mustObj = {
              range: rangeObj
            };
          } else {
            var currentObj = {};
            currentObj[facet.field] = facet.value;
            shouldObj.push({
              term: currentObj
            });
          }

        });

        if (shouldObj.length !== 0 && Object.keys(mustObj).length !== 0) {
          query.bool["filter"] = {
            bool: {
              must: mustObj,
              should: shouldObj
            }
          }
        } else if (shouldObj.length === 0 && Object.keys(mustObj).length !== 0) {
          query.bool["filter"] = {
            bool: {
              must: mustObj
            }
          }
        } else if (shouldObj.length !== 0 && Object.keys(mustObj).length === 0) {
          query.bool["filter"] = {
            bool: {
              should: shouldObj
            }
          }
        }
      }

      if (searchParams.sort) {
        var sortObj = {};
        sortObj[searchParams.sort.field] = {order: searchParams.sort.dir, unmapped_type: "long"}
        soryBy = [sortObj];
      }

      es.search({
        index: GLOBAL_CONFIG.es_products_index_name,
        type: GLOBAL_CONFIG.es_products_index_type,
        body: {
          track_scores: true,
          sort: soryBy,
          query: query,
          aggs: aggregations,
          from: searchParams.from ? searchParams.from : 0,
          size: es_page_size
        }
      }, function (err, response, status) {
        if (err)
          return next(err);
        return next(null, response);
      });
    } else {
      es.msearch({
        body: [
          {index: GLOBAL_CONFIG.es_products_index_name, type: GLOBAL_CONFIG.es_products_index_type},
          {
            query: query,
            sort: sortBy_Latest,
            from: 0,
            size: es_page_size
          },
          {index: GLOBAL_CONFIG.es_products_index_name, type: GLOBAL_CONFIG.es_products_index_type},
          {
            query: query,
            sort: sort_By_Hottest,
            from: 0,
            size: es_page_size
          },
          {index: GLOBAL_CONFIG.es_products_index_name, type: GLOBAL_CONFIG.es_products_index_type},
          {
            query: query,
            sort: sort_By_Views,
            from: 0,
            size: es_page_size
          }
        ]
      }, function (err, response, status) {
        if (err)
          return next(err);
        return next(null, response);
      })
    }

  }

  product.catalog = function (searchParams, options, next) {
    if (options && options.accessToken && options.accessToken.userId) {
      es.search({
        index: GLOBAL_CONFIG.es_products_index_name,
        type: GLOBAL_CONFIG.es_products_index_type,
        body: {
          track_scores: true,
          sort: [
            {"sells": {"order": "desc", "unmapped_type": "long"}},
            {"rating.average": {"order": "desc", "unmapped_type": "long"}},
            {"views": {"order": "desc", "unmapped_type": "long"}},
            {"createdAt": {"order": "desc", "unmapped_type": "long"}},
            "_score"
          ],
          query: {
            term: {
              companyId: options.accessToken.userId.toString()
            }
          },
          from: searchParams && searchParams.from ? searchParams.from : 0,
          size: es_page_size
        }
      }, function (err, response, status) {
        if (err)
          return next(err);
        return next(null, response);
      });
    } else {
      return next(null, null);
    }
  }

  product.facets = function () {

  }

  product.getUserProducts = function (accountId, categoryId, next) {

    var whereFilter = {isDeleted: false, accountId: accountId};

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
    product.update({_id: productId}, {isDeleted: true}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    })
  }

  product.updateUserProduct = function (updateObj, next) {
    product.update({_id: updateObj.productId}, updateObj.data, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    })
  }

  product.incrementProductViews = function (productId, next) {
    product.update({_id: productId}, {$inc: {views: 1}}, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    })
  }

  product.incrementProductSells = function (productId, next) {
    product.update({_id: productId}, {$inc: {sells: 1}}, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    })
  }

  product.startSale = function (sale, options, next) {


    //sale.statusId = discountStatus.active
    // var now_date = moment().startOf('day'),
    //   sale_start_date = moment(sale.start_date).startOf('day');

    // if (sale_start_date.isAfter(now_date)) {
    //   sale.statusId = discountStatus.pending
    // } else if (sale_start_date.isSame(now_date)) {
    //   sale.statusId = discountStatus.active
    // }

    sale.isActive = true;

    product.findById(sale.productId, {price: 1}, function (error, _product) {
      if (error)
        return next(error);
      // type 1 is for percentage type
      if (sale.sale_type === "1") {
        sale.percentage = Math.round(sale.sale_value);
        sale.price = _product.price - ((_product.price * sale.percentage) / 100);
        sale.sale_value = _product.price - sale.price;
      } else {
        sale.price = _product.price - sale.sale_value;
        sale.percentage = Math.round((sale.sale_value / _product.price) * 100);
      }


      product.update({_id: sale.productId}, {$set: {discount: sale}}, function (error, result) {
        if (error)
          return next(error);
        return next(null, result);
      })

    })


  }

  product.stopSale = function (productId, options, next) {
    product.update({_id: productId}, {$set: {"discount.isActive": false}}, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    })
  }

  product.remoteMethod('getUserProducts', {
    accepts: [
      {arg: 'accountId', type: 'string', required: true},
      {arg: 'categoryId', type: 'string'}],
    returns: {arg: 'products', type: 'any'},
    http: {path: '/getUserProducts', verb: 'post'}
  });

  product.remoteMethod('incrementProductSells', {
    accepts: {arg: 'productId', type: 'string', required: true},
    returns: {arg: 'result', type: 'any'},
    http: {path: '/incrementProductSells', verb: 'post'}
  });

  product.remoteMethod('incrementProductViews', {
    accepts: {arg: 'productId', type: 'string', required: true},
    returns: {arg: 'result', type: 'any'},
    http: {path: '/incrementProductViews', verb: 'post'}
  });
  product.remoteMethod('updateUserProduct', {
    accepts: [{arg: 'updateObj', type: 'object', required: true, http: {source: 'body'}},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}],
    returns: {arg: 'result', type: 'any'},
    http: {path: '/updateUserProduct', verb: 'post'}
  });

  product.remoteMethod('deleteUserProduct', {
    accepts: {arg: 'productId', type: 'string', required: true},
    returns: {arg: 'result', type: 'any'},
    http: {path: '/deleteUserProduct', verb: 'delete'}
  });

  product.remoteMethod('suggest', {
    accepts: {arg: 'prefix', type: 'string', required: true},
    returns: {arg: 'result', type: 'any'},
    http: {path: '/suggest', verb: 'post'}
  });

  product.remoteMethod('search', {
    accepts: [
      {"arg": 'searchParams', type: 'object', http: {source: 'body'}},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],

    returns: {arg: 'result', type: 'any'},
    http: {path: '/search', verb: 'post'}
  });
  product.remoteMethod('catalog', {
    accepts: [{"arg": 'searchParams', type: 'object', http: {source: 'body'}},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}],
    returns: {arg: 'result', type: 'any'},
    http: {path: '/catalog', verb: 'post'}
  });

  product.remoteMethod('startSale', {
    accepts: [
      {"arg": 'sale', type: 'object', http: {source: 'body'}, required: true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],

    returns: {arg: 'result', type: 'any'},
    http: {path: '/sale/start', verb: 'post'}
  });
  product.remoteMethod('stopSale', {
    accepts: [
      {"arg": 'productId', type: 'string', required: true},
      {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    ],

    returns: {arg: 'result', type: 'any'},
    http: {path: '/sale/stop', verb: 'post'}
  });
};
