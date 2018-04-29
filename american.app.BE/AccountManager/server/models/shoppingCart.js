'use strict';

module.exports = function (shoppingCart) {

  shoppingCart.addCartItem = function (model, next) {

    let item = {
      productId: model.productId,
      quantity: model.quantity,
      creationDate: new Date()
    };
    shoppingCart.create(item, function (error, createdItem) {
      if (error)
        return next(error);
      shoppingCart.app.models.accountData.update(
        {_id: model.accountDataId},
        {$addToSet: {cartItemId: createdItem.id}},
        function (error, result) {
          if (error)
            return next(error);

          return next(null, createdItem.id);

        });
    })


  }

  shoppingCart.remoteMethod('addCartItem', {
    accepts: {arg: 'model', type: 'object', required: true},
    returns: {arg: 'accountData', type: 'any'},
    http: {path: '/addCartItem', verb: 'post'}
  });

};
