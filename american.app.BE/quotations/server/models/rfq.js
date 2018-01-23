'use strict';

module.exports = function (Rfq) {


  Rfq.addRFQ = function (rfq, next) {

    rfq.creationDate = new Date();
    rfq.statusId = "1";
    Rfq.create(rfq, function (error, createdRfq) {
      if (error)
        return next(error);


      return next(null, createdRfq);

    });
  }

  Rfq.remoteMethod('addRFQ', {
    accepts: {arg: 'rfq', type: 'object', required: true},
    returns: {arg: 'rfq', type: 'any'},
    http: {path: '/addrfq', verb: 'post'}
  });

  Rfq.getRFQs = function (catId, next) {

    Rfq.find({where: {categoryId: catId}, include: ['offers','status', 'category']}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfq.remoteMethod('getRFQs', {
    accepts: {arg: 'catId', type: 'string', required: true},
    returns: {arg: 'rfq', type: 'any'},
    http: {path: '/getrfq', verb: 'post'}
  });


  Rfq.updateRFQStatus = function (model, next) {

    Rfq.update({_id: model.rfqId}, {statusId: model.statusId, modificationDate: new Date()}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfq.remoteMethod('updateRFQStatus', {
    accepts: {arg: 'rfqId', type: 'object', required: true},
    returns: {arg: 'rfq', type: 'any'},
    http: {path: '/updaterfqstatus', verb: 'post'}
  });

  Rfq.addOffer = function (query, next) {
    query.offer.creationDate = new Date();
    query.offer.rfqId = query.rfqId;
    Rfq.app.models.offer.create(query.offer, function (error, createdOffer) {
      if (error)
        return next(error);

      Rfq.update({_id: query.rfqId}, {"$addToSet": {"offerIds": createdOffer.id.toString()}}, function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
    });

  }

  Rfq.remoteMethod('addOffer', {
    accepts: {arg: 'rfqoffer', type: 'object', required: true},
    returns: {arg: 'rfq', type: 'any'},
    http: {path: '/addoffer', verb: 'post'}
  });
};
