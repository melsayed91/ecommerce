'use strict';

module.exports = function (Syscode) {

    Syscode.findByParent = function (parentId, next) {
        Syscode.find({
            parentId: parentId
        }, function (error, sysCodes) {
            if (error) {
                return next(error);
            } else {
                return next(null, sysCodes);
            }
        });
    }

    Syscode.remoteMethod('findByParent', {
        accepts: { arg: 'parentId', type: 'string', required: true },
        returns: { arg: 'sysCode', type: 'any' },
        http: { path: '/findByParent', verb: 'get' }
    });
};
