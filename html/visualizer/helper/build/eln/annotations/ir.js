"use strict";

define(["module"], function (module) {
  function toAnnotations(peaks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$fillColor = options.fillColor,
        fillColor = _options$fillColor === void 0 ? 'green' : _options$fillColor,
        _options$strokeColor = options.strokeColor,
        strokeColor = _options$strokeColor === void 0 ? 'red' : _options$strokeColor;
    if (!peaks) return [];
    var shouldRefresh = false;
    var annotations = peaks.map(function (peak) {
      if (!peak._highlight) {
        Object.defineProperty(peak, '_highlight', {
          enumerable: false,
          writable: true
        });
        peak._highlight = Math.random();
        shouldRefresh = true;
      }

      var annotation = {
        line: 1,
        _highlight: [peak._highlight],
        type: 'rect',
        strokeColor: strokeColor,
        strokeWidth: 0,
        fillColor: fillColor
      };
      annotation.label = [{
        text: peak.kind,
        size: '18px',
        anchor: 'middle',
        color: 'red',
        position: {
          x: peak.wavelength,
          y: peak.transmittance,
          dy: '-22px'
        }
      }];
      annotation.position = [{
        x: peak.wavelength - 10,
        y: peak.transmittance,
        dy: '-20px'
      }, {
        x: peak.wavelength + 10,
        y: peak.transmittance,
        dy: '-10px'
      }];
      return annotation;
    });

    if (shouldRefresh && peaks.triggerChange) {
      peaks.triggerChange();
    }

    return annotations;
  }

  module.exports = toAnnotations;
});