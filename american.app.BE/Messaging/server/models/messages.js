'use strict';

module.exports = function (Message) {

  Message.addMessage = function (message, next) {

    message.creationDate = new Date();


    Message.create(message, function (error, createdMessage) {
      if (error)
        return next(error);


      return next(null, createdMessage);

    });
  }

  Message.remoteMethod('addMessage', {
    accepts: {arg: 'message', type: 'object', required: true},
    returns: {arg: 'message', type: 'any'},
    http: {path: '/addMessage', verb: 'post'}
  });


  Message.getMessages = function (conversationId, next) {

    Message.find({
      where: {conversationId: conversationId},

      include: [{
        owner: {accountData: ["profileImage","socialImage"]}
      }]
    }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Message.remoteMethod('getMessages', {
    accepts: {arg: 'conversationId', type: 'string', required: true},
    returns: {arg: 'messages', type: 'any'},
    http: {path: '/getMessages', verb: 'post'}
  });

  Message.markMessageAsSeen = function (messageId, next) {

    Message.update({_id: model.specificationId}, {
      seenDate: new Date()
    }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  Message.remoteMethod('markMessageAsSeen', {
    accepts: {arg: 'messageId', type: 'string', required: true},
    returns: {arg: 'messages', type: 'any'},
    http: {path: '/markMessageAsSeen', verb: 'post'}
  });

};
