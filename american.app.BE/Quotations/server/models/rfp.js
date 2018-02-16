'use strict';
var objectId = require('mongodb').ObjectID;
var enums = require("../../../common/enums/common");

module.exports = function (Rfp) {
  Rfp.addRFP = function (rfp, next) {
    rfp.creationDate = new Date();
    rfp.modificationDate = new Date();
    rfp.statusId = enums.rfpStatus.open;
    Rfp.create(rfp, function (error, createdRfp) {
      if (error)
        return next(error);
      Rfp.app.models.rfpTransaction.create({
        rfpId: createdRfp.id,
        statusId: enums.rfpStatus.open,
        accountId: createdRfp.accountId
      }, function (error, createdOffer) {
        if (error)
          return next(error);
        return next(null, createdRfp);
      });
    });
  }
  Rfp.remoteMethod('addRFP', {
    accepts: { arg: 'rfp', type: 'object', required: true },
    returns: { arg: 'rfp', type: 'any' },
    http: { path: '/addrfp', verb: 'post' }
  });

  Rfp.getRFPs = function (criteria, next) {
    var query = {
      isDeleted: false
    }
    if (criteria.isBusiness) {
      query.categoryId = { inq: criteria.catIds }
      query.enabled = true
    } else {
      query.accountId = criteria.accountId
    }
    Rfp.find({ where: query, include: ['offers', 'attachments', 'category', 'account', 'status'] }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfp.remoteMethod('getRFPs', {
    accepts: { arg: 'criteria', type: 'any', http: { source: "body" } },
    returns: { arg: 'rfp', type: 'any' },
    http: { path: '/getrfp', verb: 'post' }
  });

  Rfp.getRFPTransactions = function (rfpId, next) {

    Rfp.app.models.rfpTransaction.find({ where: { rfpId: rfpId }, include: ['account', 'status'] }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfp.remoteMethod('getRFPTransactions', {
    accepts: { arg: 'rfpId', type: 'string', required: true },
    returns: { arg: 'transactions', type: 'any' },
    http: { path: '/getrfp/transactions', verb: 'post' }
  });

  Rfp.updateRFPStatus = function (model, next) {

    Rfp.update({ _id: model.rfpId }, { statusId: model.statusId, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfp.remoteMethod('updateRFPStatus', {
    accepts: { arg: 'rfpId', type: 'object', required: true },
    returns: { arg: 'rfp', type: 'any' },
    http: { path: '/updaterfpstatus', verb: 'post' }
  });

  Rfp.addRFPOffer = function (rfpId, rfpoffer, next) {
    rfpoffer.creationDate = new Date();
    rfpoffer.rfpId = rfpId;
    Rfp.app.models.offer.create(rfpoffer, function (error, createdOffer) {
      if (error)
        return next(error);
      Rfp.update({ _id: rfpId }, { "$addToSet": { "offerIds": objectId(createdOffer.id.toString()) }, "$set": { statusId: enums.rfpStatus.offered } }, function (error, updateResult) {
        if (error)
          return next(error);
        Rfp.app.models.rfpTransaction.create({
          rfpId: createdOffer.rfpId,
          statusId: enums.rfpStatus.offered,
          accountId: createdOffer.accountId
        }, function (error, createdOffer) {
          if (error)
            return next(error);
          return next(null, createdOffer);
        });
      });
    });
  }
  Rfp.remoteMethod('addRFPOffer', {
    accepts: [{ arg: 'rfpId', type: 'string', required: true },
    { arg: 'rfpoffer', type: 'any', required: true }],
    returns: { arg: 'rfp', type: 'any' },
    http: { path: '/addoffer', verb: 'post' }
  });
};

