'use strict';

module.exports = function (ProductReview) {

  ProductReview.addProductReview = function (review, next) {

    review.creationDate = new Date();

    ProductReview.create(review, function (error, createdReview) {
      if (error)
        return next(error);


      next(null, createdReview);

      //calculate average product rating

      ProductReview.getDataSource().connector.collection(ProductReview.modelName).aggregate([{$match:{
        productId: createdReview.productId
      }},
        {$group:{
            _id: "$orderId",
            rating: { $last: "$rating" }
          }}
      ], function (err, allProductReview) {

        if (allProductReview.length) {
          let star1 = allProductReview.filter(function (_review) {
            return _review.rating === 1;
          }).length;
          let star2 = allProductReview.filter(function (_review) {
            return _review.rating === 2;
          }).length;
          let star3 = allProductReview.filter(function (_review) {
            return _review.rating === 3;
          }).length;
          let star4 = allProductReview.filter(function (_review) {
            return _review.rating === 4;
          }).length;
          let star5 = allProductReview.filter(function (_review) {
            return _review.rating === 5;
          }).length;

          var avgRating = (1 * star1 + 2 * star2 + 3 * star3 + 4 * star4 + 5 * star5) / allProductReview.length;

          let rateInfo = {average: avgRating,total : allProductReview.length}
          ProductReview.app.models.Product.update({_id: review.productId}, {rating: rateInfo}, function (err, result) {

          })
        }

      })

    });
  };

  ProductReview.remoteMethod('addProductReview', {
    accepts: {arg: 'review', type: 'object', required: true},
    returns: {arg: 'review', type: 'any'},
    http: {path: '/addProductReview', verb: 'post'}
  });

  ProductReview.getReviews = function (productId, next) {

    ProductReview.find({
      where: {productId: productId},

      include: [{
        owner: {accountData: ["profileImage"]}
      }]
    }, function (error, result) {
      if (error)
        return next(error);

      return next(null, result);

    });
  }

  ProductReview.remoteMethod('getReviews', {
    accepts: {arg: 'productId', type: 'string', required: true},
    returns: {arg: 'reviews', type: 'any'},
    http: {path: '/getReviews', verb: 'post'}
  });

};
