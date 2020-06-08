"use strict";

define(["module", "./ZebraPrintServer", "./PrintServer"], function (module) {
  var _ZebraPrintServer = _interopRequireDefault();

  var _PrintServer = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = function printServerFactory(s, opts) {
    if (String(s.kind) === 'zebra') {
      return new _ZebraPrintServer["default"](s, opts);
    } else {
      return new _PrintServer["default"](s, opts);
    }
  };
});