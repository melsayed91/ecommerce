'use strict';

module.exports = function (sysCode) {

    sysCode.findByParent = function (parentId, next) {
        sysCode.find({
            where: { parentId: parentId, isDeleted: false }, include: ['parent']
        }, function (error, sysCodes) {
            if (error) {
                return next(error);
            } else {
                return next(null, sysCodes);
            }
        });
    }

    sysCode.remoteMethod('findByParent', {
        accepts: { arg: 'parentId', type: 'string', required: true },
        returns: { arg: 'sysCode', type: 'any' },
        http: { path: '/findByParent', verb: 'get' }
    });
};
