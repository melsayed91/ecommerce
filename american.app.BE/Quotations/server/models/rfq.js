'use strict';
var objectId = require('mongodb').ObjectID;
var enums = require("../../../common/enums/common");
module.exports = function (Rfq) {

  Rfq.getRFQs = function (criteria, next) {
    var query = {
      isDeleted: false
    }
    if (criteria.isBusiness) {
      query.productOwnerId = criteria.accountId
    } else {
      query.accountId = criteria.accountId
    }
    Rfq.find({
      where: query, include: ['offers', { 'account': 'accountData' }, { 'product': 'attachments' }, 'status', 'productOwner']
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



  Rfq.getRFQTransactions = function (rfqId, next) {

    Rfq.app.models.rfqTransaction.find({ where: { rfqId: rfqId }, include: ['account', 'status'] }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfq.remoteMethod('getRFQTransactions', {
    accepts: { arg: 'rfqId', type: 'string', required: true },
    returns: { arg: 'transactions', type: 'any' },
    http: { path: '/getrfq/transactions', verb: 'post' }
  });

  Rfq.addRFQ = function (rfq, next) {
    delete rfq.category;
    rfq.statusId = enums.rfqStatus.open;
    Rfq.create(rfq, function (error, createdRfq) {
      if (error)
        return next(error);
      Rfq.app.models.rfqTransaction.create({
        rfqId: createdRfq.id,
        statusId: enums.rfqStatus.open,
        accountId: createdRfq.accountId
      }, function (error, createdOffer) {
        if (error)
          return next(error);
        return next(null, createdRfq);
      });
    });
  }

  Rfq.remoteMethod('addRFQ', {
    accepts: { arg: 'rfq', type: 'object', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/addrfq', verb: 'POST' }
  });

  Rfq.beginRFQ = function (rfqId, accountId, next) {

    Rfq.update({ _id: rfqId }, { statusId: enums.rfqStatus.recieved, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);
      Rfq.app.models.rfqTransaction.create({
        rfqId: rfqId,
        statusId: enums.rfqStatus.recieved,
        accountId: accountId
      }, function (error, createdOffer) {
        if (error)
          return next(error);
        return next(null, result);
      });
    });
  }



  Rfq.remoteMethod('cancelRFQ', {
    accepts: [{ arg: 'rfqId', type: 'string', required: true }, { arg: 'offerId', type: 'string', required: true }, { arg: 'accountId', type: 'string', required: true }],
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/cancelRFQ', verb: 'POST' }
  });

  Rfq.cancelRFQ = function (rfqId, offerId, accountId, next) {

    Rfq.update({ _id: rfqId }, { statusId: enums.rfqStatus.rejected, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);
      Rfq.app.models.offer.update({ _id: offerId }, { statusId: enums.offerStatus.rejected, modificationDate: new Date() }, function (error, result) {
        if (error)
          return next(error);
        Rfq.app.models.rfqTransaction.create({
          rfqId: rfqId,
          statusId: enums.rfqStatus.rejected,
          accountId: accountId
        }, function (error, createdOffer) {
          if (error)
            return next(error);
          return next(null, result);
        });
      })
    });
  }

  Rfq.remoteMethod('lastPriceRFQ', {
    accepts: [{ arg: 'rfqId', type: 'string', required: true }, { arg: 'offerId', type: 'string', required: true }, { arg: 'accountId', type: 'string', required: true }],
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/lastPriceRFQ', verb: 'POST' }
  });

  Rfq.lastPriceRFQ = function (rfqId, offerId, accountId, next) {

    Rfq.update({ _id: rfqId }, { statusId: enums.rfqStatus.open, modificationDate: new Date() }, function (error, result) {
      if (error)
        return next(error);
      Rfq.app.models.offer.update({ _id: offerId }, { statusId: enums.offerStatus.rejected, modificationDate: new Date() }, function (error, result) {
        if (error)
          return next(error);
        Rfq.app.models.rfqTransaction.create({
          rfqId: rfqId,
          statusId: enums.rfqStatus.open,
          accountId: accountId
        }, function (error, createdOffer) {
          if (error)
            return next(error);
          return next(null, result);
        });
      });
    });
  }


  Rfq.remoteMethod('beginRFQ', {
    accepts: [{ arg: 'rfqId', type: 'string', required: true }, { arg: 'accountId', type: 'string', required: true }],
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/begin', verb: 'post' }
  });

  Rfq.addOffer = function (rfqId, rfqoffer, next) {
    rfqoffer.rfqId = rfqId;
    rfqoffer.statusId = enums.offerStatus.open;
    Rfq.app.models.offer.create(rfqoffer, function (error, createdOffer) {
      if (error)
        return next(error);
      Rfq.update({ _id: rfqId }, { "$addToSet": { "offerIds": objectId(createdOffer.id.toString()) }, "$set": { statusId: enums.rfqStatus.offered } }, function (error, result) {
        if (error)
          return next(error);
        Rfq.app.models.rfqTransaction.create({
          rfqId: createdOffer.rfqId,
          statusId: enums.rfqStatus.offered,
          accountId: createdOffer.accountId
        }, function (error, createdOffer) {
          if (error)
            return next(error);
          return next(null, createdOffer);
        });
      });
    });
  }

  Rfq.remoteMethod('addOffer', {
    accepts: [{ arg: 'rfqId', type: 'string', required: true },
    { arg: 'rfqoffer', type: 'any', required: true }],
    returns: { arg: 'rfqoffer', type: 'any' },
    http: { path: '/addoffer', verb: 'post' }
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
};