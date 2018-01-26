'use strict';

module.exports = function (Rfq) {


  Rfq.addRFQ = function (rfq, next) {
    Rfq.create(rfq, function (error, createdRfq) {
      if (error)
        return next(error);
      return next(null, createdRfq);
    });
  }

  Rfq.remoteMethod('addRFQ', {
    accepts: { arg: 'rfq', type: 'object', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/addrfq', verb: 'post' }
  });

  Rfq.getRFQs = function (catIds, accountId, isBusiness, next) {
    var query = {
      enabled: true,
      isDeleted: false
    }
    if (isBusiness) {
      query.categoryId = { inq: catIds }
    } else {
      query.accountId = accountId
    }
    Rfq.find({
      where: query, include: ['offers', 'category']
    }, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    });
  }

  Rfq.remoteMethod('getRFQs', {
    accepts: [{ arg: 'catIds', type: 'array' },
    { arg: 'accountId', type: 'string' },
    { arg: 'isBusiness', type: 'Boolean', required: true }],
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/getrfq', verb: 'post' }
  });


  Rfq.updateRFQStatus = function (model, next) {

    Rfq.update({ _id: model.rfqId }, { statusId: model.statusId, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfq.remoteMethod('updateRFQStatus', {
    accepts: { arg: 'rfqId', type: 'object', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/updaterfqstatus', verb: 'post' }
  });

  Rfq.enableRFQ = function (rfqId, enable, next) {
    Rfq.update({ _id: rfqId }, { enabled: enable, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    });
  }

  Rfq.remoteMethod('enableRFQ', {
    accepts: [{ arg: 'rfqId', type: 'string', required: true },
    { arg: 'enable', type: 'Boolean', required: true }],
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/enableRFQ', verb: 'post' }
  });


  Rfq.deleteRFQ = function (rfqId, next) {
    Rfq.update({ _id: rfqId }, { isDeleted: true, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    });
  }

  Rfq.remoteMethod('deleteRFQ', {
    accepts: { arg: 'rfqId', type: 'string', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/deleteRFQ', verb: 'post' }
  });

  Rfq.addOffer = function (rfqId, rfqoffer, next) {
    rfqoffer.creationDate = new Date();
    rfqoffer.rfqId = rfqId;
    Rfq.app.models.offer.create(rfqoffer, function (error, createdOffer) {
      if (error)
        return next(error);
      Rfq.update({ _id: rfqId }, { "$addToSet": { "offerIds": createdOffer.id.toString() } }, function (error, result) {
        if (error)
          return next(error);
        return next(null, rfqoffer);
      });
    });
  }

  Rfq.remoteMethod('addOffer', {
    accepts: [{ arg: 'rfqId', type: 'string', required: true },
    { arg: 'rfqoffer', type: 'object', required: true }],
    returns: { arg: 'rfqoffer', type: 'any' },
    http: { path: '/addoffer', verb: 'post' }
  });
};