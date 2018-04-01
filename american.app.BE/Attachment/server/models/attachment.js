'use strict';
var CONTAINERS_URL = '/api/containers/';
module.exports = function (Attachment) {

    Attachment.upload = function (ctx, fileName, options, cb) {
        if (!options) options = {};
        ctx.req.params.container = 'common';
        console.log(fileName)
        Attachment.app.models.container.upload(ctx.req, ctx.result, options, function (err, fileObj) {
            if (err) {
                cb(err);
            } else {

                var fileInfo = fileObj.files.file[0];
                Attachment.create({
                    originalFileName: fileName,
                    name: fileInfo.name,
                    type: fileInfo.type,
                    container: fileInfo.container,
                    url: CONTAINERS_URL + fileInfo.container + '/download/' + fileInfo.name
                }, function (err, obj) {
                    if (err !== null) {
                        cb(err);
                    } else {
                        cb(null, obj);
                    }
                });
            }
        });
    }
    Attachment.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source: 'context' } },
                { arg: 'fileName', type: 'string', required: true },
                { arg: 'options', type: 'object', http: { source: 'query' } }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            headers: { "Content-Type": undefined },
            http: { verb: 'post' }
        }
    );
};
