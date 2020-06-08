"use strict";

define(["module", "./jpaths", "file-saver", "src/util/api", "src/util/ui", "./libs/SD", "./nmrGUI", "./libs/MolecularFormula"], function (module, _jpaths) {
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

  var _fileSaver = _interopRequireDefault();

  var _api = _interopRequireDefault();

  var _ui = _interopRequireDefault();

  var _SD = _interopRequireDefault();

  var GUI = _interopRequireWildcard();

  var _MolecularFormula = _interopRequireDefault();

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
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function F() {};

        return {
          s: F,
          n: function n() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function s() {
        it = o[Symbol.iterator]();
      },
      n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it["return"] != null) it["return"]();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Ranges = _SD["default"].Ranges;
  var NMR = _SD["default"].NMR;
  var nmr1hOndeTemplates = {
    full: {
      type: 'object',
      properties: {
        integral: {
          type: 'number',
          title: 'value to fit the spectrum integral',
          label: 'Integral'
        },
        noiseFactor: {
          type: 'number',
          title: 'Mutiplier of the auto-detected noise level',
          label: 'noiseFactor'
        },
        clean: {
          type: 'number',
          title: 'Delete signals with integration less than input value',
          label: 'clean'
        },
        compile: {
          type: 'boolean',
          title: 'Compile the multiplets',
          label: 'compile'
        },
        optimize: {
          type: 'boolean',
          title: 'Optimize the peaks to fit the spectrum',
          label: 'optimize'
        },
        integralFn: {
          type: 'string',
          title: 'Type of integration',
          label: 'Integral type',
          "enum": ['sum', 'peaks']
        },
        type: {
          type: 'string',
          title: 'Nucleus',
          label: 'Nucleus',
          editable: false
        },
        removeImpurities: {
          type: 'object',
          label: 'Remove residual solvent, TMS and water',
          properties: {
            useIt: {
              type: 'boolean',
              label: 'Remove Impurities'
            },
            error: {
              type: 'number',
              label: 'Tolerance',
              title: 'Allowed error in ppm'
            }
          }
        }
      }
    },
    "short": {
      type: 'object',
      properties: {
        integral: {
          type: 'number',
          title: 'Total integral value',
          label: 'Integral'
        },
        removeImpurities: {
          type: 'object',
          label: 'Remove solvent impurities',
          properties: {
            useIt: {
              type: 'boolean',
              label: 'Remove Impurities'
            },
            error: {
              type: 'number',
              label: 'Tolerance',
              title: 'Allowed error in ppm'
            }
          }
        }
      }
    }
  };

  _api["default"].cache('nmr1hOndeTemplates', nmr1hOndeTemplates);

  var Nmr1dManager = /*#__PURE__*/function () {
    function Nmr1dManager(sample) {
      _classCallCheck(this, Nmr1dManager);

      this.spectra = {};
      this.sample = sample;
      this.previousNMR = undefined;
      this.initializeNMROptions();
    }

    _createClass(Nmr1dManager, [{
      key: "handleAction",
      value: function handleAction(action) {
        switch (action.name) {
          case 'updateRanges':
            {
              this.updateIntegrals();
              break;
            }

          case 'downloadSVG':
            {
              var blob = new Blob(["".concat(action.value)], {
                type: 'application/jcamp-dx;charset=utf-8'
              });
              (0, _fileSaver["default"])(blob, 'spectra.svg');
              break;
            }

          case 'toggleNMR1hAdvancedOptions':
            {
              var advancedOptions1H = !_api["default"].cache('nmr1hAdvancedOptions');

              _api["default"].cache('nmr1hAdvancedOptions', advancedOptions1H);

              if (advancedOptions1H) {
                _api["default"].createData('nmr1hOndeTemplate', _api["default"].cache('nmr1hOndeTemplates').full);
              } else {
                _api["default"].createData('nmr1hOndeTemplate', _api["default"].cache('nmr1hOndeTemplates')["short"]);
              }

              break;
            }

          case 'resetNMR1d':
            {
              var type = action.name.replace(/[^0-9]/g, '');
              type = "".concat(type, "d");

              _api["default"].createData("blackNMR".concat(type), null);

              _api["default"].createData("annotationNMR".concat(type), null);

              _api["default"].createData("acsNMR".concat(type), null);

              break;
            }

          case 'switchNMRLayer':
            {
              var goToLayer = action.value && action.value.dimension > 1 ? 'nmr2D' : 'Default layer';

              _api["default"].switchToLayer(goToLayer, {
                autoSize: true
              });

              if (action.value.dimension > 1) {
                if (action.value.jcamp) {
                  _api["default"].createData('blackNMR2d', action.value.jcamp.data);
                } else {
                  _api["default"].createData('blackNMR2d', null);
                }
              } else {
                if (action.value.jcamp) {
                  _api["default"].createData('blackNMR1d', action.value.jcamp.data);
                } else {
                  _api["default"].createData('blackNMR1d', null);
                }
              }

              break;
            }

          case 'executePeakPicking':
            {
              var options = _api["default"].getData('nmr1hOptions');

              delete options.from;
              delete options.to;

              var currentNmr = _api["default"].getData('currentNmr');

              if (currentNmr.dimension > 1) {
                if (typeof _ui["default"] !== 'undefined') {
                  _ui["default"].showNotification('Peak picking can only be applied on 1D spectra', 'warning');
                }

                return false;
              }

              this._autoRanges(currentNmr);

              break;
            }

          case 'deleteAllRanges':
            var ranges = _api["default"].getData('currentNmrRanges');

            while (ranges.length) {
              ranges.pop();
            }

            ranges.triggerChange();
            break;

          case 'clearAssignments':
            {
              var _ranges = this.getCurrentRanges();

              if (_ranges) {
                _ranges.forEach(function (a) {
                  if (a.signal) {
                    a.signal.forEach(function (b) {
                      b.diaID = [];
                    });
                  }
                });

                _ranges.triggerChange();
              }

              break;
            }

          case 'clearAllAssignments':
            {
              var nmr = this.sample.$content.spectra.nmr;
              nmr.forEach(function (n) {
                if (n.range) {
                  n.range.forEach(function (a) {
                    if (a.signal) {
                      a.signal.forEach(function (b) {
                        b.diaID = [];
                      });
                    }
                  });
                }
              });

              var _ranges2 = this.getCurrentRanges();

              if (_ranges2) _ranges2.triggerChange();
              break;
            }

          case 'nmrChanged':
            {
              if (this.previousNMR === _api["default"].getData('currentNmr')) break;
              if (!_api["default"].getData('currentNmr')) break;
              this.previousNMR = _api["default"].getData('currentNmr'); // Init ranges if does not exist

              this.initCurrentNmrRanges();
              this.updateIntegralOptions();
              this.rangesHasChanged();
              break;
            }

          case 'setIntegralFromMF':
            {
              this.updateIntegralOptionsFromMF();
              break;
            }

          default:
            {
              return false;
            }
        }

        return true;
      }
    }, {
      key: "initCurrentNmrRanges",
      value: function initCurrentNmrRanges() {
        var nmr = _api["default"].getData('currentNmr');

        if (nmr.range === undefined) {
          var currentNmrVar = _api["default"].getVar('currentNmr');

          _api["default"].setVariable('currentNmrRanges', currentNmrVar, ['range']);

          nmr.setChildSync(['range'], []);
        }
      }
    }, {
      key: "getCurrentRanges",
      value: function getCurrentRanges() {
        var nmr = _api["default"].getData('currentNmr');

        if (nmr !== null) {
          return nmr.getChildSync(['range']);
        } else {
          return null;
        }
      }
    }, {
      key: "updateIntegralOptions",
      value: function updateIntegralOptions() {
        var nmr = _api["default"].getData('currentNmr');

        if (!nmr || nmr.dimension > 1) {
          return;
        }

        if (nmr.nucleus && nmr.nucleus[0].replace(/[0-9]/, '') !== 'H') {
          return;
        }

        if (!nmr.range || !nmr.range.length) {
          this.updateIntegralOptionsFromMF();
        } else {
          this.updateIntegralOptionsFromRanges();
        }
      }
    }, {
      key: "updateIntegralsFromSpectrum",
      value: function () {
        var _updateIntegralsFromSpectrum = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var nmr, spectrum, ranges, ppOptions;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  nmr = _api["default"].getData('currentNmr');

                  if (nmr) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return");

                case 3:
                  _context.next = 5;
                  return this._getNMR(nmr);

                case 5:
                  spectrum = _context.sent;

                  if (spectrum && spectrum.sd && nmr.range && nmr.range.length > 0) {
                    ranges = new Ranges(nmr.range);
                    ppOptions = _api["default"].getData('nmr1hOptions');
                    spectrum.updateIntegrals(ranges, {
                      nH: Number(ppOptions.integral)
                    });
                  }

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function updateIntegralsFromSpectrum() {
          return _updateIntegralsFromSpectrum.apply(this, arguments);
        }

        return updateIntegralsFromSpectrum;
      }()
    }, {
      key: "updateIntegrals",
      value: function updateIntegrals(integral) {
        var ppOptions = _api["default"].getData('nmr1hOptions');

        var currentRanges = this.getCurrentRanges();
        if (!currentRanges || currentRanges.length === 0) return; // We initialize ranges with the DataObject so that
        // the integral update is inplace

        var ranges = new Ranges(currentRanges);
        ranges.updateIntegrals({
          sum: Number(ppOptions.integral || integral)
        });
        currentRanges.triggerChange();
      }
    }, {
      key: "_getNMR",
      value: function _getNMR(currentNMRLine) {
        var _this = this;

        var filename = String(currentNMRLine.getChildSync(['jcamp', 'filename']));
        return currentNMRLine.getChild(['jcamp', 'data']).then(function (jcamp) {
          if (filename && _this.spectra[filename]) {
            var spectrum = _this.spectra[filename];
          } else {
            if (jcamp) {
              jcamp = String(jcamp.get());
              spectrum = NMR.fromJcamp(jcamp);

              if (filename) {
                _this.spectra[filename] = spectrum;
              }
            } else {
              spectrum = new NMR();
            }
          }

          return spectrum;
        });
      }
    }, {
      key: "_autoRanges",
      value: function _autoRanges(nmrLine) {
        this._getNMR(nmrLine).then(function (nmrSpectrum) {
          var ppOptions = _api["default"].getData('nmr1hOptions').resurrect();

          var removeImpurityOptions = {};

          if (ppOptions.removeImpurities.useIt) {
            removeImpurityOptions = {
              solvent: nmrLine.solvent,
              nH: Number(ppOptions.integral),
              error: ppOptions.removeImpurities.error
            };
          }

          var ranges = nmrSpectrum.getRanges({
            nH: Number(ppOptions.integral),
            realTop: true,
            thresholdFactor: Number(ppOptions.noiseFactor),
            clean: ppOptions.clean,
            compile: ppOptions.compile,
            from: ppOptions.from,
            to: ppOptions.to,
            optimize: ppOptions.optimize,
            integralType: ppOptions.integralFn,
            gsdOptions: {
              minMaxRatio: 0.001,
              smoothY: false,
              broadWidth: 0.004
            },
            removeImpurity: removeImpurityOptions
          });
          nmrLine.setChildSync(['range'], ranges);
        });
      }
    }, {
      key: "_createNMRannotationsAndACS",
      value: function () {
        var _createNMRannotationsAndACS2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var nmrLine, ranges, nmrSpectrum, nucleus, observe;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  nmrLine = _api["default"].getData('currentNmr');
                  ranges = nmrLine.range;
                  _context2.next = 4;
                  return this._getNMR(nmrLine);

                case 4:
                  nmrSpectrum = _context2.sent;
                  nucleus = nmrLine.nucleus[0];
                  observe = nmrLine.frequency;

                  if (nmrSpectrum && nmrSpectrum.sd) {
                    nucleus = nmrSpectrum.getNucleus(0);
                    observe = nmrSpectrum.observeFrequencyX();
                  }

                  if (nmrSpectrum) {
                    _api["default"].createData('annotationsNMR1d', GUI.annotations1D(ranges, {
                      line: 1,
                      fillColor: 'lightgreen',
                      strokeWidth: 0
                    }));
                  }

                  _api["default"].createData('acsNMR1d', _SD["default"].getACS(ranges, {
                    rangeForMultiplet: true,
                    nucleus: nucleus,
                    observe: observe
                  }));

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function _createNMRannotationsAndACS() {
          return _createNMRannotationsAndACS2.apply(this, arguments);
        }

        return _createNMRannotationsAndACS;
      }()
    }, {
      key: "getNumberHydrogens",
      value: function getNumberHydrogens() {
        var mf = String((0, _jpaths.getData)(this.sample, 'mf'));

        if (mf) {
          try {
            var mfInfo = new _MolecularFormula["default"].MF(mf).getInfo();

            if (mfInfo && mfInfo.atoms && mfInfo.atoms.H) {
              return mfInfo.atoms.H || 100;
            }
          } catch (e) {
            return 100;
          }
        }

        return 100;
      }
    }, {
      key: "updateIntegralOptionsFromMF",
      value: function updateIntegralOptionsFromMF() {
        var options = _api["default"].getData('nmr1hOptions');

        var currentIntegral = Number(options.integral);
        var newIntegral = this.getNumberHydrogens();

        if (currentIntegral !== newIntegral) {
          options.setChildSync(['integral'], newIntegral);
        }
      } // todo : migrate this code to spectra-data-ranges

    }, {
      key: "getRangesTotalIntegral",
      value: function getRangesTotalIntegral() {
        var ranges = _api["default"].getData('currentNmrRanges') || [];
        var sum = 0;

        var _iterator = _createForOfIteratorHelper(ranges),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var range = _step.value;

            if (_SD["default"].Ranges.shouldIntegrate(range)) {
              sum += range.integral;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return sum;
      }
    }, {
      key: "updateIntegralOptionsFromRanges",
      value: function updateIntegralOptionsFromRanges() {
        var options = _api["default"].getData('nmr1hOptions');

        var currentIntegral = Number(options.integral);
        var newIntegral = Math.round(this.getRangesTotalIntegral());

        if (currentIntegral !== newIntegral && newIntegral > 0) {
          options.setChildSync(['integral'], newIntegral);
        }
      }
    }, {
      key: "rangesHasChanged",
      value: function () {
        var _rangesHasChanged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var ranges, newRangesID;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  ranges = this.getCurrentRanges();
                  _context3.next = 3;
                  return this.updateIntegralsFromSpectrum();

                case 3:
                  newRangesID = this._getRangesID(ranges);
                  this.ensureHighlights(this.previousRangesID !== newRangesID);
                  this.previousRangesID = newRangesID;

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function rangesHasChanged() {
          return _rangesHasChanged.apply(this, arguments);
        }

        return rangesHasChanged;
      }()
    }, {
      key: "ensureHighlights",
      value: function ensureHighlights(forceTrigger) {
        var ranges = this.getCurrentRanges();
        var highlightWasUpdated = GUI.ensureRangesHighlight(ranges);

        if (highlightWasUpdated || forceTrigger) {
          ranges.triggerChange();

          this._createNMRannotationsAndACS();
        }
      }
    }, {
      key: "_getRangesID",
      value: function _getRangesID(ranges) {
        return JSON.stringify(ranges);
      }
    }, {
      key: "initializeNMROptions",
      value: function initializeNMROptions() {
        _api["default"].createData('nmr1hOptions', {
          noiseFactor: 0.8,
          clean: 0.5,
          compile: true,
          optimize: false,
          integralType: 'sum',
          integral: this.getNumberHydrogens(),
          type: '1H',
          removeImpurities: {
            useIt: true,
            error: 0.025
          }
        });

        _api["default"].createData('nmr1hOndeTemplate', nmr1hOndeTemplates["short"]);
      }
    }]);

    return Nmr1dManager;
  }();

  module.exports = Nmr1dManager;
});