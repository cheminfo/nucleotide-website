"use strict";

define(["exports", "src/util/typerenderer", "./ea", "./ir", "./nmr", "./mass"], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.add = add;

  var _typerenderer = _interopRequireDefault();

  var _ea = _interopRequireDefault();

  var _ir = _interopRequireDefault();

  var _nmr = _interopRequireDefault();

  var _mass = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function add() {
    _typerenderer["default"].addType('acsir', {
      toscreen: function toscreen($element, val, root) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        $element.html((0, _ir["default"])(val, options));
      }
    });

    _typerenderer["default"].addType('acsnmr', {
      toscreen: function toscreen($element, val, root) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        $element.html((0, _nmr["default"])(val, options));
      }
    });

    _typerenderer["default"].addType('acsms', {
      toscreen: function toscreen($element, val, root) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        $element.html((0, _mass["default"])(val, options));
      }
    });

    _typerenderer["default"].addType('acsea', {
      toscreen: function toscreen($element, val, root) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        $element.html((0, _ea["default"])(val, options));
      }
    });
  }
});