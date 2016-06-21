function createStandAloneUserService(execlib, ParentService) {
  'use strict';

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function StandAloneUserService(prophash) {
    ParentService.call(this, prophash);
    this.tokens = {
      user: execlib.lib.uid()
    };
  }
  
  ParentService.inherit(StandAloneUserService, factoryCreator, void 0, {
    local: require('./localsinkinfo'),
    remote: require('./remotesinkinfo')
  });
  
  StandAloneUserService.prototype.__cleanUp = function() {
    this.tokens = null;
    ParentService.prototype.__cleanUp.call(this);
  };
  
  return StandAloneUserService;
}

module.exports = createStandAloneUserService;
