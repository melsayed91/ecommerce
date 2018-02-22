'use strict';

module.exports = function (Specification) {


  Specification.addSpecification = function (specification, next) {

    specification.creationDate = new Date();

    Specification.create(specification, function (error, createdSpecification) {
      if (error)
        return next(error);


      return next(null, createdSpecification);

    });
  }

  Specification.remoteMethod('addSpecification', {
    accepts: {arg: 'specification', type: 'object', required: true},
    returns: {arg: 'specification', type: 'any'},
    http: {path: '/addSpecification', verb: 'post'}
  });

  Specification.getSpecifications = function (ownerId, next) {

    Specification.find({where: {productOwnerId: ownerId}, include: [{product: 'attachments'}, 'account']}, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Specification.remoteMethod('getSpecifications', {
    accepts: {arg: 'ownerId', type: 'string', required: true},
    returns: {arg: 'specifications', type: 'any'},
    http: {path: '/getSpecifications', verb: 'post'}
  });

  Specification.replyToSpecification = function (model, next) {

    Specification.update({_id: model.specificationId}, {
      reply: model.reply,
      isReplied: true,
      modificationDate: new Date()
    }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Specification.remoteMethod('replyToSpecification', {
    accepts: {arg: 'model', type: 'object', required: true},
    returns: {arg: 'reply', type: 'any'},
    http: {path: '/replyToSpecification', verb: 'post'}
  });

};

