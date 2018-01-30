'use strict';
var objectId = require('mongodb').ObjectID;

module.exports = function (Rfq) {


  Rfq.addRFQ = function (rfq, next) {
    delete rfq.category;
    Rfq.create(rfq, function (error, createdRfq) {
      if (error)
        return next(error);
      return next(null, createdRfq);
    });
  }

  Rfq.remoteMethod('addRFQ', {
    accepts: { arg: 'rfq', type: 'object', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/addrfq', verb: 'POST' }
  });

  Rfq.getRFQs = function (criteria, next) {
    var query = {
      isDeleted: false
    }
    if (criteria.isBusiness) {
      query.categoryId = { inq: criteria.catIds }
      query.enabled = true
    } else {
      query.accountId = criteria.accountId
    }
    Rfq.find({
      where: query, include: ['offers', 'category', 'attachments']
    }, function (error, result) {
      if (error)
        return next(error);
      return next(null, result);
    });
  }

  Rfq.remoteMethod('getRFQs', {
    accepts: { arg: 'criteria', type: 'any', http: { source: "body" } },
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
    { arg: 'rfqoffer', type: 'any', required: true }],
    returns: { arg: 'rfqoffer', type: 'any' },
    http: { path: '/addoffer', verb: 'post' }
  });
};