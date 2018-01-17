'use strict';

module.exports = function (sysUser) {

      sysUser.greet = function (person, cb) {
            cb(null, 'Greetings' + person + 'from Mars!');
      }

      sysUser.remoteMethod('greet', {
            accepts: { arg: 'person', type: 'string' },
            returns: { arg: 'greeting', type: 'string' },
            http: { path: '/greet', verb: 'get' }
      });
};
