'use strict';

module.exports = function(Rfq) {



  Rfq.addRFQ = function (rfq, next) {

    rfq.creationDate = new Date ();
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

  Rfq.getRFQs = function (catId, next) {

    Rfq.find({where:{categoryId:catId}}, function (error, createdRfq) {
      if (error)
        return next(error);

      return next(null, createdRfq);

    });
  }

  Rfq.remoteMethod('getRFQs', {
    accepts: { arg: 'catId', type: 'string', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/getrfq', verb: 'post' }
  });


  Rfq.updateRFQStatus = function (catId, next) {

    Rfq.update({_id:catId} , {statusId:2}, function (error, createdRfq) {
      if (error)
        return next(error);

      return next(null, createdRfq);

    });
  }

  Rfq.remoteMethod('updateRFQStatus', {
    accepts: { arg: 'rfqId', type: 'String', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/updaterfqstatus', verb: 'post' }
  });

  Rfq.updateRFQBusinessStatus = function (query, next) {

    Rfq.update({_id:query.rfqId} , {statusId:2}, function (error, createdRfq) {
      if (error)
        return next(error);

      return next(null, createdRfq);

    });
  }

  Rfq.remoteMethod('updateRFQBusinessStatus', {
    accepts: { arg: 'businessrfq', type: 'object', required: true },
    returns: { arg: 'rfq', type: 'any' },
    http: { path: '/businessrfq', verb: 'post' }
  });
};
