'use strict';
var objectId = require('mongodb').ObjectID;
module.exports = function (Conversation) {

  Conversation.addConversation = function (conversation, next) {

    if (conversation.type === 'private' || conversation.type === 'complaint') {
      Conversation.findOne({
        where: {
          participantIds: conversation.participantIds,
          type: conversation.type
        }
      }, function (err, convo) {
        if (err)
          return next(err);

        if (convo) {
          return next(null, convo);
        } else {
          conversation.creationDate = new Date();
          Conversation.create(conversation, function (error, createdConversation) {
            if (error)
              return next(error);


            return next(null, createdConversation);

          });
        }
      })
    } else {
      conversation.creationDate = new Date();
      Conversation.create(conversation, function (error, createdConversation) {
        if (error)
          return next(error);


        return next(null, createdConversation);

      });
    }
  }

  Conversation.remoteMethod('addConversation', {
    accepts: {arg: 'conversation', type: 'object', required: true},
    returns: {arg: 'conversation', type: 'any'},
    http: {path: '/addConversation', verb: 'post'}
  });


  Conversation.getConversations = function (accountId, next) {

    Conversation.find(
      {
        where: {participantIds: accountId},
        include: [{accounts: {accountData: "profileImage"}}, {specificationRequest: {product: 'attachments'}}]
        , order: 'creationDate DESC'
      }, function (error, result) {
        if (error)
          return next(error);

        return next(null, result);

      });
  }

  Conversation.remoteMethod('getConversations', {
    accepts: {arg: 'accountId', type: 'string', required: true},
    returns: {arg: 'conversations', type: 'any'},
    http: {path: '/getConversations', verb: 'post'}
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
    accepts: [{arg: 'userIds', type: 'array', required: true},
      {arg: 'message', type: 'text', required: true},
      {arg: 'accountId', type: 'text', required: true},
      {arg: 'conversationType', type: 'string', required: true}],
    returns: {arg: 'conversations', type: 'any'},
    http: {path: '/addBulkConversation', verb: 'post'}
  });

};
