'use strict';

module.exports = function (Specification) {


  Specification.addSpecification = function (specification, next) {

    specification.creationDate = new Date();


    Specification.create(specification, function (error, createdSpecification) {
      if (error)
        return next(error);

      var conversation = {
        creationDate: new Date(),
        participantIds: [specification.productOwnerId, specification.accountId],
        specificationId: createdSpecification.id.toString()
      };

      Specification.app.models.ConversationServiceApi.addConversation({conversation: conversation}).then(function (createdConversation) {
        var newMessage = {
          creationDate: new Date(),
          conversationId: createdConversation.conversation.id,
          ownerId: specification.accountId,
          text: specification.description
        }
        Specification.app.models.MessageServiceApi.addMessage({message: newMessage}, function (createdMessage) {

          return next(null, createdSpecification);
        })
      })


    });
  }

  Specification.remoteMethod('addSpecification', {
    accepts: {arg: 'specification', type: 'object', required: true},
    returns: {arg: 'specification', type: 'any'},
    http: {path: '/addSpecification', verb: 'post'}
  });

  Specification.getSpecifications = function (ownerId, next) {

    Specification.find({
      where: {productOwnerId: ownerId},
      include: [{product: 'attachments'}, {account: 'accountData'}]
    }, function (error, result) {
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

