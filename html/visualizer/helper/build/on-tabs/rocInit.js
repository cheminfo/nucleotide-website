"use strict";

define(["src/util/api", "../rest-on-couch/Roc"], function () {
  var _api = _interopRequireDefault();

  var _Roc = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  if (typeof IframeBridge !== 'undefined') {
    self.IframeBridge.onMessage(onMessage);
    self.IframeBridge.ready();
  } else {
    throw new Error('IframeBridge is not defined');
  }

  function onMessage(data) {
    if (data.type === 'tab.data') {
      var couchDB = data.message.couchDB;

      if (!couchDB) {
        console.error('couchDB configuration was not passed'); // eslint-disable-line no-console

        return;
      }

      var uuid = data.message.uuid;

      _api["default"].cache('couchDB', couchDB);

      _api["default"].cache('uuid', uuid);

      var roc = new _Roc["default"](couchDB);

      _api["default"].cache('roc', roc);

      _api["default"].doAction('rocInit');
    }
  }
});