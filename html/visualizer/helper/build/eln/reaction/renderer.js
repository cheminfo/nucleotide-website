"use strict";

define(["exports", "src/util/typerenderer", "./color"], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.add = add;

  var _typerenderer = _interopRequireDefault();

  var _color = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function add() {
    _typerenderer["default"].addType('reactionStatus', {
      toscreen: function toscreen($element, val) {
        var label = _color["default"].getLabel(val);

        var color = _color["default"].getColor(val);

        $element.css('background-color', color);
        $element.html(label);
      }
    });
  }
});