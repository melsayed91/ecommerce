'use strict';
var objectId = require('mongodb').ObjectID;
module.exports = function (Conversation) {

  Conversation.addConversation = function (conversation, next) {

    conversation.creationDate = new Date();
    // conversation.participantIds = ["5a753fa771a0a8377431aa17","5a7b437bc30fd92aa4264201"];

    Conversation.create(conversation, function (error, createdConversation) {
      if (error)
        return next(error);


      return next(null, createdConversation);

    });
  }

  Conversation.remoteMethod('addConversation', {
    accepts: { arg: 'conversation', type: 'object', required: true },
    returns: { arg: 'conversation', type: 'any' },
    http: { path: '/addConversation', verb: 'post' }
  });


  Conversation.getConversations = function (accountId, next) {

    Conversation.find(
      {
        where: { participantIds: accountId },
        include: [{ accounts: { accountData: "profileImage" } }, { specificationRequest: { product: 'attachments' } }]
        , order: 'creationDate DESC'
      }, function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
  }

  Conversation.remoteMethod('getConversations', {
    accepts: { arg: 'accountId', type: 'string', required: true },
    returns: { arg: 'conversations', type: 'any' },
    http: { path: '/getConversations', verb: 'post' }
  });


  Conversation.addBulkConversation = function (userIds, message, accountId, conversationType, next) {
    var conversations = [];
    userIds.forEach(function (item) {
      conversations.push({
        type: conversationType,
        creationDate: new Date(),
        participantIds: [objectId(item), objectId(accountId)]
      });
    });
    Conversation.create(conversations, function (conversationError, createdConversations) {
      if (conversationError) {
        return next(conversationError);
      } else {
        var messages = [];
        createdConversations.forEach(function (item) {
          messages.push({
            creationDate: new Date(),
            text: message,
            conversationId: objectId(item.id),
            ownerId: objectId(accountId)
          });
        })
        Conversation.app.models.Message.create(messages, function (messageError, createdMessages) {
          if (messageError) {
            return next(messageError);
          } else {
            return next(null, createdMessages);
          }
        });
      }
    });
  }

  Conversation.remoteMethod('addBulkConversation', {
    accepts: [{ arg: 'userIds', type: 'array', required: true },
    { arg: 'message', type: 'text', required: true },
    { arg: 'accountId', type: 'text', required: true },
      { arg: 'conversationType', type: 'string', required: true }],
    returns: { arg: 'conversations', type: 'any' },
    http: { path: '/addBulkConversation', verb: 'post' }
  });

};
