'use strict';
var objectId = require('mongodb').ObjectID;
module.exports = function (shoppingCart) {

  shoppingCart.addCartItem = function (model, next) {

    let item = {
      productId: model.productId,
      quantity: model.quantity,
      creationDate: new Date()
    };

    shoppingCart.app.models.accountData.findById(model.accountDataId, {
      include: {
        relation: 'cartItems',
        scope: {
          where: { productId: model.productId }
        }
      }
    }, function (err, _accountData) {
      if (err)
        return next(err);

      if (_accountData.__data.cartItems && _accountData.__data.cartItems.length > 0) {
        shoppingCart.update(
          { _id: _accountData.__data.cartItems[0].id },
          { $inc: { quantity: Number(model.quantity) } },
          function (error, result) {
            if (error)
              return next(error);
            return next(error, result);
          });
      } else {
        shoppingCart.create(item, function (error, createdItem) {
          if (error)
            return next(error);
          shoppingCart.app.models.accountData.update(
            { _id: model.accountDataId },
            { $addToSet: { cartItemId: createdItem.id } },
            function (error, result) {
              if (error)
                return next(error);
              return next(null, createdItem.id);
            });
        })
      }
    });
  };

  shoppingCart.remoteMethod('addCartItem', {
    accepts: { arg: 'model', type: 'object', required: true },
    returns: { arg: 'accountData', type: 'any' },
    http: { path: '/addCartItem', verb: 'post' }
  });


  shoppingCart.updateQuantity = function (model, next) {
    shoppingCart.update(
      { _id: model.itemId },
      { quantity: model.quantity },
      function (error, result) {
        if (error)
          return next(error);

        return next(error, result);
      });
  };

  shoppingCart.remoteMethod('updateQuantity', {
    accepts: { arg: 'model', type: 'object', required: true },
    returns: { arg: 'cartItem', type: 'any' },
    http: { path: '/updateQuantity', verb: 'post' }
  });

  shoppingCart.deleteCartItem = function (model, next) {
    var updateQuery = { $unset: { cartItemId: 1 } };
    if (model.itemId) {
      updateQuery = { $pull: { cartItemId: objectId(model.itemId) } }
    }
    shoppingCart.app.models.accountData.update(
      { _id: model.accountDataId },
      updateQuery,
      function (error, result) {
        if (error)
          return next(error);

        return next(null, result);
      });
  };

  shoppingCart.remoteMethod('deleteCartItem', {
    accepts: { arg: 'model', type: 'object', required: true },
    returns: { arg: 'accountData', type: 'any' },
    http: { path: '/deleteCartItem', verb: 'post' }
  });
};
