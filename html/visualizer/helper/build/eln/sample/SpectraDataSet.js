"use strict";

define(["module", "src/util/api", "src/util/ui", "lodash", "src/util/versioning", "src/util/color"], function (module) {
  var _api = _interopRequireDefault();

  var _ui = _interopRequireDefault();

  var _lodash = _interopRequireDefault();

  var _versioning = _interopRequireDefault();

  var _color = _interopRequireDefault();

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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

  var SpectraConfigs = {
    IR: {
      tocFilter: function tocFilter(entry) {
        return entry.value.nbIR && !entry.value.hidden;
      },
      tocCallback: function tocCallback(entry) {
        entry.value.nbSpectra = entry.value.nbIR;
      },
      getSpectra: function getSpectra(sample) {
        if (sample && sample.$content && sample.$content.spectra && Array.isArray(sample.$content.spectra.ir)) {
          var spectra = sample.$content.spectra.ir;
          return spectra;
        } else {
          return [];
        }
      },
      chartPrefs: {
        yLabel: 'Absorbance',
        displayYAxis: ['display', 'main', 'sec'],
        xLabel: 'Wavelength [cm-1]',
        displayXAxis: ['display', 'flip', 'main', 'sec']
      }
    },
    Raman: {
      tocFilter: function tocFilter(entry) {
        return entry.value.nbRaman && !entry.value.hidden;
      },
      tocCallback: function tocCallback(entry) {
        entry.value.nbSpectra = entry.value.nbRaman;
      },
      getSpectra: function getSpectra(sample) {
        if (sample && sample.$content && sample.$content.spectra && Array.isArray(sample.$content.spectra.raman)) {
          var spectra = sample.$content.spectra.raman;
          return spectra;
        } else {
          return [];
        }
      },
      chartPrefs: {
        yLabel: 'Absorbance',
        displayYAxis: ['display', 'main', 'sec'],
        xLabel: 'Wavelength [cm-1]',
        displayXAxis: ['display', 'flip', 'main', 'sec']
      }
    },
    '1H NMR': {
      tocFilter: function tocFilter(entry) {
        return entry.value.nb1h && !entry.value.hidden;
      },
      tocCallback: function tocCallback(entry) {
        entry.value.nbSpectra = entry.value.nb1h;
      },
      getSpectra: function getSpectra(sample) {
        if (sample && sample.$content && sample.$content.spectra && Array.isArray(sample.$content.spectra.nmr)) {
          var spectra = sample.$content.spectra.nmr;
          spectra = spectra.filter(function (spectrum) {
            return spectrum.dimension === 1 && spectrum.nucleus[0] === '1H';
          });
          spectra.forEach(function (spectrum) {
            var info = [];
            if (spectrum.nucleus) info.push(spectrum.nucleus[0]);
            if (spectrum.experiment) info.push(spectrum.experiment);
            if (spectrum.solvent) info.push(spectrum.solvent);
            if (spectrum.frequency) info.push(spectrum.frequency.toFixed(0));
            spectrum.info = info.join(', ');
          });
          return spectra;
        } else {
          return [];
        }
      },
      chartPrefs: {
        yLabel: 'Intensity',
        displayYAxis: ['main', 'sec'],
        xLabel: 'δ [ppm]',
        displayXAxis: ['display', 'flip', 'main', 'sec']
      }
    },
    '13C NMR': {
      tocFilter: function tocFilter(entry) {
        return entry.value.nb13c && !entry.value.hidden;
      },
      tocCallback: function tocCallback(entry) {
        entry.value.nbSpectra = entry.value.nb1h;
      },
      getSpectra: function getSpectra(sample) {
        if (sample && sample.$content && sample.$content.spectra && Array.isArray(sample.$content.spectra.nmr)) {
          var spectra = sample.$content.spectra.nmr;
          spectra = spectra.filter(function (spectrum) {
            return spectrum.dimension === 1 && spectrum.nucleus[0] === '13C';
          });
          spectra.forEach(function (spectrum) {
            var info = [];
            if (spectrum.nucleus) info.push(spectrum.nucleus[0]);
            if (spectrum.experiment) info.push(spectrum.experiment);
            if (spectrum.solvent) info.push(spectrum.solvent);
            if (spectrum.frequency) info.push(spectrum.frequency.toFixed(0));
            spectrum.info = info.join(', ');
          });
          return spectra;
        } else {
          return [];
        }
      },
      chartPrefs: {
        yLabel: 'Intensity',
        displayYAxis: ['main', 'sec'],
        xLabel: 'δ [ppm]',
        displayXAxis: ['display', 'flip', 'main', 'sec']
      }
    },
    Chromatography: {
      tocFilter: function tocFilter(entry) {
        return entry.value.nbChromatogram && !entry.value.hidden;
      },
      tocCallback: function tocCallback(entry) {
        entry.value.nbSpectra = entry.value.nbChromatogram;
      },
      getSpectra: function getSpectra(sample) {
        if (sample && sample.$content && sample.$content.spectra && Array.isArray(sample.$content.spectra.chromatogram)) {
          var spectra = sample.$content.spectra.chromatogram;
          return spectra;
        } else {
          return [];
        }
      },
      chartPrefs: {
        yLabel: 'Intensity',
        displayYAxis: ['main', 'sec'],
        xLabel: 'Time [s]',
        displayXAxis: ['display', 'main', 'sec']
      }
    }
  };

  var SpectraDataSet = /*#__PURE__*/function () {
    function SpectraDataSet(roc, sampleToc) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, SpectraDataSet);

      this.roc = roc;
      this.sampleToc = sampleToc;
      this.spectraConfig = undefined;
      this.defaultAttributes = options.defaultAttributes || {};
    }

    _createClass(SpectraDataSet, [{
      key: "getChartPrefs",
      value: function getChartPrefs() {
        return this.spectraConfig.chartPrefs;
      }
      /**
       * @param {object} [options={}]
       * @param {string} [options.varName='analysisKind'] contains the name of the variable containing the form value
       * @param {string} [options.schemaVarName='analysisKindSchema'] contains the name of the variable containing the form schema
       * @return {string} the form to select group}
       */

    }, {
      key: "initializeAnalysis",
      value: function () {
        var _initializeAnalysis = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this = this;

          var options,
              _options$schemaVarNam,
              schemaVarName,
              _options$varName,
              varName,
              _options$cookieName,
              cookieName,
              possibleAnalysis,
              defaultAnalysis,
              schema,
              analysisKind,
              mainData,
              _args = arguments;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  _options$schemaVarNam = options.schemaVarName, schemaVarName = _options$schemaVarNam === void 0 ? 'analysisKindSchema' : _options$schemaVarNam, _options$varName = options.varName, varName = _options$varName === void 0 ? 'analysisKind' : _options$varName, _options$cookieName = options.cookieName, cookieName = _options$cookieName === void 0 ? 'eln-default-analysis-kind' : _options$cookieName;
                  possibleAnalysis = Object.keys(SpectraConfigs);
                  defaultAnalysis = localStorage.getItem(cookieName);

                  if (possibleAnalysis.indexOf(defaultAnalysis) === -1) {
                    defaultAnalysis = possibleAnalysis[0];
                  }

                  schema = {
                    type: 'object',
                    properties: {
                      analysis: {
                        type: 'string',
                        "enum": possibleAnalysis,
                        "default": defaultAnalysis,
                        required: true
                      }
                    }
                  };

                  _api["default"].createData(schemaVarName, schema);

                  _context.next = 9;
                  return _api["default"].createData(varName, {
                    analysis: defaultAnalysis
                  });

                case 9:
                  analysisKind = _context.sent;
                  this.spectraConfig = SpectraConfigs[defaultAnalysis];
                  _context.next = 13;
                  return this.refresh();

                case 13:
                  mainData = _versioning["default"].getData();
                  mainData.onChange(function (evt) {
                    if (evt.jpath[0] === varName) {
                      localStorage.setItem(cookieName, analysisKind.analysis);

                      var selectedSpectra = _api["default"].getData('selectedSpectra');

                      selectedSpectra.length = 0;
                      selectedSpectra.triggerChange();
                      _this.spectraConfig = SpectraConfigs[String(analysisKind.analysis)];

                      _this.refresh();
                    }
                  });
                  return _context.abrupt("return", analysisKind);

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function initializeAnalysis() {
          return _initializeAnalysis.apply(this, arguments);
        }

        return initializeAnalysis;
      }()
    }, {
      key: "refresh",
      value: function refresh() {
        if (!this.sampleToc) return;
        this.sampleToc.options.filter = this.spectraConfig.tocFilter;
        this.sampleToc.options.callback = this.spectraConfig.tocCallback;
        this.sampleToc.refresh();
      }
    }, {
      key: "processAction",
      value: function () {
        var _processAction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(action) {
          var selectedSpectra, _selectedSpectra, firstSpectrum, path, jpath, getJpath, _iterator, _step, spectrum, _selectedSpectra2;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.log({
                    action: action
                  });
                  _context2.t0 = action.name;
                  _context2.next = _context2.t0 === 'clickedSample' ? 4 : _context2.t0 === 'refresh' ? 6 : _context2.t0 === 'hideSpectra' ? 8 : _context2.t0 === 'hideAllSpectra' ? 10 : _context2.t0 === 'showOnlySpectra' ? 12 : _context2.t0 === 'forceRecolor' ? 14 : _context2.t0 === 'selectCategory' ? 19 : _context2.t0 === 'showSpectra' ? 32 : _context2.t0 === 'showAllSpectra' ? 34 : _context2.t0 === 'clearSelectedSamples' ? 36 : _context2.t0 === 'addSelectedSamples' ? 40 : _context2.t0 === 'addSample' ? 43 : _context2.t0 === 'addSpectrum' ? 46 : 49;
                  break;

                case 4:
                  this.clickedSample(action.value);
                  return _context2.abrupt("break", 49);

                case 6:
                  this.refresh();
                  return _context2.abrupt("break", 49);

                case 8:
                  this.hideSpectra();
                  return _context2.abrupt("break", 49);

                case 10:
                  this.hideAllSpectra();
                  return _context2.abrupt("break", 49);

                case 12:
                  this.showOnlySpectra();
                  return _context2.abrupt("break", 49);

                case 14:
                  selectedSpectra = _api["default"].getData('selectedSpectra');
                  selectedSpectra.forEach(function (spectrum) {
                    return spectrum.color = '';
                  });
                  recolor(selectedSpectra);
                  selectedSpectra.triggerChange();
                  return _context2.abrupt("break", 49);

                case 19:
                  _selectedSpectra = _api["default"].getData('selectedSpectra');
                  firstSpectrum = DataObject.resurrect(_selectedSpectra[0]);
                  path = [];

                  if (firstSpectrum.toc && firstSpectrum.toc.value) {
                    firstSpectrum = firstSpectrum.toc.value;
                    path = ['toc', 'value'];
                  }

                  _context2.next = 25;
                  return _ui["default"].selectJpath(firstSpectrum, undefined, {
                    height: 500
                  });

                case 25:
                  jpath = _context2.sent;

                  if (jpath) {
                    _context2.next = 28;
                    break;
                  }

                  return _context2.abrupt("return");

                case 28:
                  getJpath = _lodash["default"].property([].concat(_toConsumableArray(path), _toConsumableArray(jpath)));
                  _iterator = _createForOfIteratorHelper(_selectedSpectra);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      spectrum = _step.value;
                      spectrum.category = getJpath(spectrum);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  _selectedSpectra.triggerChange();

                case 32:
                  this.showSpectra();
                  return _context2.abrupt("break", 49);

                case 34:
                  this.showAllSpectra();
                  return _context2.abrupt("break", 49);

                case 36:
                  _selectedSpectra2 = _api["default"].getData('selectedSpectra');
                  _selectedSpectra2.length = 0;

                  _selectedSpectra2.triggerChange();

                  return _context2.abrupt("break", 49);

                case 40:
                  _context2.next = 42;
                  return this.addSelectedSamples(_api["default"].getData('tocSelected').resurrect());

                case 42:
                  return _context2.abrupt("break", 49);

                case 43:
                  _context2.next = 45;
                  return this.addSelectedSamples([action.value.resurrect()]);

                case 45:
                  return _context2.abrupt("break", 49);

                case 46:
                  _context2.next = 48;
                  return this.addSpectrum(_api["default"].getData('tocClicked').resurrect(), action.value.resurrect());

                case 48:
                  return _context2.abrupt("break", 49);

                case 49:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function processAction(_x) {
          return _processAction.apply(this, arguments);
        }

        return processAction;
      }()
    }, {
      key: "clickedSample",
      value: function () {
        var _clickedSample = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(samples) {
          var uuid, data, spectra;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(samples.length !== 1)) {
                    _context3.next = 3;
                    break;
                  }

                  _api["default"].createData('spectra', []);

                  return _context3.abrupt("return");

                case 3:
                  uuid = String(samples[0].id);
                  _context3.next = 6;
                  return this.roc.document(uuid, {
                    varName: 'linkedSample'
                  });

                case 6:
                  data = _context3.sent;
                  spectra = this.spectraConfig.getSpectra(data);

                  _api["default"].createData('spectra', spectra);

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function clickedSample(_x2) {
          return _clickedSample.apply(this, arguments);
        }

        return clickedSample;
      }()
    }, {
      key: "showAllSpectra",
      value: function showAllSpectra() {
        var selectedSpectra = _api["default"].getData('selectedSpectra');

        var _iterator2 = _createForOfIteratorHelper(selectedSpectra),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var spectrum = _step2.value;
            spectrum.display = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        _api["default"].getData('selectedSpectra').triggerChange();
      }
    }, {
      key: "hideAllSpectra",
      value: function hideAllSpectra() {
        var selectedSpectra = _api["default"].getData('selectedSpectra');

        var _iterator3 = _createForOfIteratorHelper(selectedSpectra),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var spectrum = _step3.value;
            spectrum.display = false;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        _api["default"].getData('selectedSpectra').triggerChange();
      }
    }, {
      key: "showSpectra",
      value: function showSpectra() {
        var selectedSpectra = _api["default"].getData('selectedSpectra');

        var currentlySelectedSpectra = _api["default"].getData('currentlySelectedSpectra');

        var _iterator4 = _createForOfIteratorHelper(currentlySelectedSpectra),
            _step4;

        try {
          var _loop = function _loop() {
            var currentlySelectedSpectrum = _step4.value;
            var spectrum = selectedSpectra.filter(function (spectrum) {
              return String(spectrum.id) === String(currentlySelectedSpectrum.id);
            })[0];
            spectrum.display = true;
          };

          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        _api["default"].getData('selectedSpectra').triggerChange();
      }
    }, {
      key: "showOnlySpectra",
      value: function showOnlySpectra() {
        var selectedSpectra = _api["default"].getData('selectedSpectra');

        if (!Array.isArray(selectedSpectra)) return;

        var _iterator5 = _createForOfIteratorHelper(selectedSpectra),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var spectrum = _step5.value;
            spectrum.display = false;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        var currentlySelectedSpectra = _api["default"].getData('currentlySelectedSpectra');

        var _iterator6 = _createForOfIteratorHelper(currentlySelectedSpectra),
            _step6;

        try {
          var _loop2 = function _loop2() {
            var currentlySelectedSpectrum = _step6.value;
            var spectrum = selectedSpectra.filter(function (spectrum) {
              return String(spectrum.id) === String(currentlySelectedSpectrum.id);
            })[0];
            spectrum.display = true;
          };

          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        _api["default"].getData('selectedSpectra').triggerChange();
      }
    }, {
      key: "hideSpectra",
      value: function hideSpectra() {
        var selectedSpectra = _api["default"].getData('selectedSpectra');

        var currentlySelectedSpectra = _api["default"].getData('currentlySelectedSpectra');

        var _iterator7 = _createForOfIteratorHelper(currentlySelectedSpectra),
            _step7;

        try {
          var _loop3 = function _loop3() {
            var currentlySelectedSpectrum = _step7.value;
            var spectrum = selectedSpectra.filter(function (spectrum) {
              return String(spectrum.id) === String(currentlySelectedSpectrum.id);
            })[0];
            spectrum.display = false;
          };

          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            _loop3();
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        _api["default"].getData('selectedSpectra').triggerChange();
      }
    }, {
      key: "addSpectrum",
      value: function addSpectrum(tocEntry, spectrum) {
        var selectedSpectra = _api["default"].getData('selectedSpectra');

        this.addSpectrumToSelected(spectrum, tocEntry, selectedSpectra);
        recolor(selectedSpectra);
        selectedSpectra.triggerChange();
      }
    }, {
      key: "addSelectedSamples",
      value: function () {
        var _addSelectedSamples = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tocSelected) {
          var _this2 = this;

          var selectedSpectra, promises, _iterator8, _step8, _loop4;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  selectedSpectra = _api["default"].getData('selectedSpectra'); // count the number of sampleIDs to determine the number of colros

                  promises = [];
                  _iterator8 = _createForOfIteratorHelper(tocSelected);

                  try {
                    _loop4 = function _loop4() {
                      var tocEntry = _step8.value;
                      promises.push(_this2.roc.document(tocEntry.id).then(function (sample) {
                        var spectra = _this2.spectraConfig.getSpectra(sample);

                        var _iterator9 = _createForOfIteratorHelper(spectra),
                            _step9;

                        try {
                          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                            var spectrum = _step9.value;

                            if (spectrum.jcamp && spectrum.jcamp.filename) {
                              _this2.addSpectrumToSelected(spectrum, tocEntry, selectedSpectra);
                            }
                          }
                        } catch (err) {
                          _iterator9.e(err);
                        } finally {
                          _iterator9.f();
                        }
                      }));
                    };

                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      _loop4();
                    }
                  } catch (err) {
                    _iterator8.e(err);
                  } finally {
                    _iterator8.f();
                  }

                  _context4.next = 6;
                  return Promise.all(promises);

                case 6:
                  recolor(selectedSpectra);
                  selectedSpectra.triggerChange();

                case 8:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function addSelectedSamples(_x3) {
          return _addSelectedSamples.apply(this, arguments);
        }

        return addSelectedSamples;
      }()
    }, {
      key: "addSpectrumToSelected",
      value: function addSpectrumToSelected(spectrum, tocEntry, selectedSpectra) {
        if (spectrum.jcamp) {
          var spectrumID = String("".concat(tocEntry.value.reference, " / ").concat(spectrum.jcamp.filename.replace(/.*\/(.*)\..*/, '$1')));
          var sampleID = String(tocEntry.id);

          if (selectedSpectra.filter(function (spectrum) {
            return String(spectrum.id) === spectrumID;
          }).length > 0) {
            return;
          }

          spectrum.sampleID = sampleID;
          spectrum.id = spectrumID;
          spectrum.display = true;

          for (var key in this.defaultAttributes) {
            spectrum[key] = this.defaultAttributes[key];
          }

          spectrum.deconvolutionReference = false;
          spectrum.sampleCode = tocEntry.key.slice(1).join('_');
          spectrum.toc = tocEntry;
          spectrum.category = spectrum.sampleCode;
          spectrum._highlight = spectrumID;
          selectedSpectra.push(spectrum);
        }
      }
    }]);

    return SpectraDataSet;
  }();

  function recolor(selectedSpectra) {
    // need to count the categories
    var categoryColors = {};
    var existingColors = 0;

    var _iterator10 = _createForOfIteratorHelper(selectedSpectra),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var spectrum = _step10.value;
        var category = String(spectrum.category);

        if (categoryColors[category] === undefined) {
          if (spectrum.color) {
            categoryColors[String(spectrum.category)] = spectrum.color;
            existingColors++;
          } else {
            categoryColors[String(spectrum.category)] = '';
          }
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    var nbColors = Math.max(8, 1 << Math.ceil(Math.log2(Object.keys(categoryColors).length)));

    var colors = _color["default"].getDistinctColorsAsString(nbColors);

    var i = existingColors;

    for (var key in categoryColors) {
      if (!categoryColors[key]) {
        categoryColors[key] = colors[i++];
      }
    }

    var _iterator11 = _createForOfIteratorHelper(selectedSpectra),
        _step11;

    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _spectrum = _step11.value;

        if (!_spectrum.color) {
          _spectrum.color = categoryColors[String(_spectrum.category)];
        }
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }

  module.exports = SpectraDataSet;
});