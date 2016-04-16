function createServiceUser(execlib, ParentUser) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function ServiceUser(prophash) {
    ParentUser.call(this, prophash);
  }
  
  var localsinkinfo = require('../localsinkinfo'),
    remotesinkinfo = require('../remotesinkinfo'),
    visiblefields = [];
  localsinkinfo.forEach(function(localsink){
    visiblefields.push('have'+localsink.name);
  });
  remotesinkinfo.forEach(function(remotesink){
    visiblefields.push('have'+execlib.execSuite.userServiceSuite.nameOfRemoteSinkDescriptor(remotesink));
  });
  ParentUser.inherit(ServiceUser, require('../methoddescriptors/serviceuser'), visiblefields.concat([/*visible state fields here*/]));
  ServiceUser.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };
  ServiceUser.prototype.getTokens = function (defer) {
    defer.resolve(this.__service.tokens);
  };

  return ServiceUser;
}

module.exports = createServiceUser;
