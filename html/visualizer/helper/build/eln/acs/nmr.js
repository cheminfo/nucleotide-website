"use strict";

define(["exports", "../libs/SD"], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = toHTML;

  var _SD = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function toHTML(value) {
    var acsString = '';

    if (value && value.range) {
      var ranges = new _SD["default"].Ranges(value.range);
      var nucleus = '1H';
      if (!Array.isArray(value.nucleus)) nucleus = [value.nucleus];
      acsString += ranges.getACS({
        nucleus: nucleus,
        solvent: value.solvent,
        frequencyObserved: value.frequency
      });
    }

    return acsString;
  }
});