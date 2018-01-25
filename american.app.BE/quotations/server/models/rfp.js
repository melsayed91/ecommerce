'use strict';

module.exports = function (Rfp) {


  Rfp.addRFP = function (rfp, next) {

    rfp.creationDate = new Date();
    rfp.statusId = "1";
    Rfp.create(rfp, function (error, createdRfp) {
      if (error)
        return next(error);


      return next(null, createdRfp);

    });
  }

  Rfp.remoteMethod('addRFP', {
    accepts: {arg: 'rfp', type: 'object', required: true},
    returns: {arg: 'rfp', type: 'any'},
    http: {path: '/addrfp', verb: 'post'}
  });

  Rfp.getRFPs = function (catId, next) {

    Rfp.find({where: {categoryId: catId}, include: ['rfqs', 'offers', 'status', 'category']}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfp.remoteMethod('getRFPs', {
    accepts: {arg: 'catId', type: 'string', required: true},
    returns: {arg: 'rfp', type: 'any'},
    http: {path: '/getrfp', verb: 'post'}
  });

  Rfp.addSubRFQ = function (model, next) {
    Rfp.update({_id: model.rfpId}, {$addToSet: {rfqIds: model.rfqId}}, function (error, createdRfp) {
      if (error)
        return next(error);


      return next(null, createdRfp);

    });
  }

  Rfp.remoteMethod('addSubRFQ', {
    accepts: {arg: 'model', type: 'object', required: true},
    returns: {arg: 'rfp', type: 'any'},
    http: {path: '/addSubRFQ', verb: 'post'}
  });

  Rfp.updateRFPStatus = function (model, next) {

    Rfp.update({_id: model.rfpId}, {statusId: model.statusId, modificationDate: new Date()}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Rfp.remoteMethod('updateRFPStatus', {
    accepts: {arg: 'rfpId', type: 'object', required: true},
    returns: {arg: 'rfp', type: 'any'},
    http: {path: '/updaterfpstatus', verb: 'post'}
  });

  Rfp.addOffer = function (query, next) {
    query.offer.creationDate = new Date();
    query.offer.rfpId = query.rfpId;
    Rfp.app.models.offer.create(query.offer, function (error, createdOffer) {
      if (error)
        return next(error);

      Rfp.update({_id: query.rfpId}, {"$addToSet": {"offerIds": createdOffer.id.toString()}}, function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
    });

  }

  Rfp.remoteMethod('addOffer', {
    accepts: {arg: 'rfpoffer', type: 'object', required: true},
    returns: {arg: 'rfp', type: 'any'},
    http: {path: '/addoffer', verb: 'post'}
  });
};

