"use strict";

define(["exports", "./libs/OCLUtils", "./libs/parseXY", "./libs/jcampconverter", "./libs/SpectraProcessor", "./libs/OCLE", "./libs/SD", "./libs/elnPlugin", "./libs/Image", "./libs/MolecularFormula", "./libs/convertToJcamp"], function (exports, _OCLUtils, _parseXY, _jcampconverter, _SpectraProcessor) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "OCLE", {
    enumerable: true,
    get: function get() {
      return _OCLE["default"];
    }
  });
  Object.defineProperty(exports, "OCLUtils", {
    enumerable: true,
    get: function get() {
      return _OCLUtils.OCLUtils;
    }
  });
  Object.defineProperty(exports, "OCL", {
    enumerable: true,
    get: function get() {
      return _OCLUtils.OCL;
    }
  });
  Object.defineProperty(exports, "SD", {
    enumerable: true,
    get: function get() {
      return _SD["default"];
    }
  });
  Object.defineProperty(exports, "elnPlugin", {
    enumerable: true,
    get: function get() {
      return _elnPlugin["default"];
    }
  });
  Object.defineProperty(exports, "Image", {
    enumerable: true,
    get: function get() {
      return _Image["default"];
    }
  });
  Object.defineProperty(exports, "MolecularFormula", {
    enumerable: true,
    get: function get() {
      return _MolecularFormula["default"];
    }
  });
  Object.defineProperty(exports, "convertToJcamp", {
    enumerable: true,
    get: function get() {
      return _convertToJcamp["default"];
    }
  });
  Object.defineProperty(exports, "parseXY", {
    enumerable: true,
    get: function get() {
      return _parseXY.parseXY;
    }
  });
  Object.defineProperty(exports, "convert", {
    enumerable: true,
    get: function get() {
      return _jcampconverter.convert;
    }
  });
  Object.defineProperty(exports, "SpectraProcessor", {
    enumerable: true,
    get: function get() {
      return _SpectraProcessor.SpectraProcessor;
    }
  });

  var _OCLE = _interopRequireDefault();

  var _SD = _interopRequireDefault();

  var _elnPlugin = _interopRequireDefault();

  var _Image = _interopRequireDefault();

  var _MolecularFormula = _interopRequireDefault();

  var _convertToJcamp = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
});