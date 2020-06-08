"use strict";

define(["exports", "https://www.lactame.com/lib/spectra-data/3.7.2/spectra-data.min.js"], function (exports) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = exports.SD = exports.Ranges = exports.NMR2D = exports.NMR = exports.GUI = void 0;

  var SDLib = _interopRequireWildcard();

  exports["default"] = SDLib;

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj["default"] = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  } // import * as SD from 'https://77426d8f.ngrok.io/cheminfo-js/spectra/dist/SD.js?noBabel=true';


  var GUI = SDLib.GUI,
      NMR = SDLib.NMR,
      NMR2D = SDLib.NMR2D,
      Ranges = SDLib.Ranges,
      SD = SDLib.SD;
  exports.SD = SD;
  exports.Ranges = Ranges;
  exports.NMR2D = NMR2D;
  exports.NMR = NMR;
  exports.GUI = GUI;
});