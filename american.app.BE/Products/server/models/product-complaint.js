'use strict';

module.exports = function (ProductComplaint) {

  ProductComplaint.addProductComplaint = function (complaint, next) {

    complaint.creationDate = new Date();

    ProductComplaint.create(complaint, function (error, createdComplaint) {
      if (error)
        return next(error);

      next(null, createdComplaint);

    });
  };

  ProductComplaint.remoteMethod('addProductComplaint', {
    accepts: {arg: 'complaint', type: 'object', required: true},
    returns: {arg: 'complaint', type: 'any'},
    http: {path: '/addProductComplaint', verb: 'post'}
  });

  ProductComplaint.getComplaints = function (accountId, next) {

    ProductComplaint.app.models.Account.findById(accountId, function (err, _account) {
        if (err)
          return next(err);

        var query = {
          order: 'creationDate DESC',
          include: [
            'product',
            {owner: 'accountData'},
            {vendor: 'accountData'}
          ]
        };
        if (_account && !_account.isAdmin) {
          query.where = {vendorId: _account.id};
        }
        ProductComplaint.find(query, function (error, result) {
          if (error)
            return next(error);

          return next(null, result);

        });
      }
    );

  }
  ;

  ProductComplaint.remoteMethod('getComplaints', {
    accepts: {arg: 'accountId', type: 'string', required: true},
    returns: {arg: 'complaints', type: 'any'},
    http: {path: '/getComplaints', verb: 'post'}
  });

}
;
