'use strict';

module.exports = function(sysUser) {
    
      sysUser.greet = function(cb) {
        cb(null, 'Greetings... from Mars!');
      }
  
      sysUser.remoteMethod('greet', {
            returns: {arg: 'greeting', type: 'string'},
            http: {path: '/greet', verb: 'get'}
      });
};
