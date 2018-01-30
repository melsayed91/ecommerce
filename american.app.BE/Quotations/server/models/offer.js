'use strict';

module.exports = function (Offer) {

  Offer.getOffers = function (model, next) {

    var query ={};
    if(model.rfqId){
      query.rfqId = model.rfqId
    }
    if(model.rfpId){
      query.rfpId = model.rfpId
    }
    if(model.accountId){
      query.accountId = model.accountId
    }
    Offer.find({where: query, include: ['rfq','rfp','account']}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Offer.remoteMethod('getOffers', {
    accepts: {arg: 'model', type: 'object', required: true},
    returns: {arg: 'offer', type: 'any'},
    http: {path: '/getoffers', verb: 'post'}
  });

  Offer.updateOfferStatus = function (model, next) {

    Offer.update({_id: model.offerId}, {
      statusId: model.statusId,
      modificationDate: new Date()
    }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Offer.remoteMethod('updateOfferStatus', {
    accepts: {arg: 'model', type: 'object', required: true},
    returns: {arg: 'offer', type: 'any'},
    http: {path: '/updateOfferStatus', verb: 'post'}
  });
};
