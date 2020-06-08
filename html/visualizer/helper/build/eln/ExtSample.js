"use strict";

define(["module", "src/util/api", "src/util/IDBKeyValue", "./ExpandableMolecule", "./MF", "./libs/elnPlugin"], function (module) {
  var _api = _interopRequireDefault();

  var _IDBKeyValue = _interopRequireDefault();

  var _ExpandableMolecule = _interopRequireDefault();

  var _MF = _interopRequireDefault();

  var _elnPlugin = _interopRequireDefault();

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

  var idb = new _IDBKeyValue["default"]('external-samples');
  var defaultOptions = {
    varName: 'sample'
  };

  var Sample = /*#__PURE__*/function () {
    function Sample(sample, options) {
      _classCallCheck(this, Sample); // make sure we don't copy attachment metadata


      var s = sample.$content ? {
        $content: {
          general: sample.$content.general,
          identifier: sample.$content.identifier,
          stock: sample.$content.stock
        }
      } : {
        $content: {
          general: {
            title: '',
            description: '',
            mf: '',
            molfile: ''
          },
          spectra: {
            nmr: [],
            mass: [],
            ir: []
          },
          image: []
        }
      };
      this.sample = JSON.parse(JSON.stringify(s));
      this.options = Object.assign({}, defaultOptions, options);
      Object.assign(this.sample, this.options.sample);

      this._init();
    }

    _createClass(Sample, [{
      key: "_loadSample",
      value: function _loadSample(sample) {
        var _this = this;

        console.log('loadSample:', {
          sample: sample
        });
        this.sample = sample;

        var sampleVar = _api["default"].getVar(this.options.varName);

        _api["default"].setVariable('sampleCode', sampleVar, ['$id', 0]);

        _api["default"].setVariable('batchCode', sampleVar, ['$id', 1]);

        _api["default"].setVariable('content', sampleVar, ['$content']);

        _api["default"].setVariable('general', sampleVar, ['$content', 'general']);

        _api["default"].setVariable('molfile', sampleVar, ['$content', 'general', 'molfile']);

        _api["default"].setVariable('mf', sampleVar, ['$content', 'general', 'mf']);

        _api["default"].setVariable('mw', sampleVar, ['$content', 'general', 'mw']);

        _api["default"].setVariable('em', sampleVar, ['$content', 'general', 'em']);

        _api["default"].setVariable('mass', sampleVar, ['$content', 'spectra', 'mass']);

        _api["default"].setVariable('nmr', sampleVar, ['$content', 'spectra', 'nmr']);

        _api["default"].setVariable('ir', sampleVar, ['$content', 'spectra', 'ir']);

        _api["default"].setVariable('description', sampleVar, ['$content', 'general', 'description']);

        _api["default"].setVariable('title', sampleVar, ['$content', 'general', 'title']);

        _api["default"].setVariable('iupac', sampleVar, ['$content', 'general', 'iupac']);

        _api["default"].setVariable('image', sampleVar, ['$content', 'image']);

        this.expandableMolecule = new _ExpandableMolecule["default"](this.sample, this.options);
        this.mf = new _MF["default"](this.sample);
        this.mf.fromMF();

        this.onChange = function (event) {
          var jpathStr = event.jpath.join('.');

          if (jpathStr.replace(/\.\d+\..*/, '') === '$content.spectra.nmr') {
            _this.nmr1dManager.updateIntegralOptions();
          }

          switch (event.jpath.join('.')) {
            case '$content.general.molfile':
              _this.mf.fromMolfile();

              break;

            case '$content.general.mf':
              try {
                _this.mf.fromMF();
              } catch (e) {// ignore
              }

              break;

            default:
              break;
          }

          var contentString = JSON.stringify(_this.sample.$content);

          if (contentString !== _this.contentString && _this.options.trackId) {
            _this.contentString = JSON.stringify(_this.sample.$content);
            idb.set(_this.options.trackId, _this.sample.resurrect());
          }
        };

        this.bindChange();
      }
    }, {
      key: "_init",
      value: function () {
        var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this._initialized = new Promise( /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                      var sample;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!_this2.options.trackId) {
                                _context.next = 12;
                                break;
                              }

                              _context.prev = 1;
                              _context.next = 4;
                              return idb.get(_this2.options.trackId);

                            case 4:
                              sample = _context.sent;
                              _context.next = 12;
                              break;

                            case 7:
                              _context.prev = 7;
                              _context.t0 = _context["catch"](1); // eslint-disable-next-line no-console

                              console.error(_context.t0);
                              sample = _this2.sample;
                              _this2.options.trackId = false;

                            case 12:
                              _context.next = 14;
                              return _api["default"].createData(_this2.options.varName, sample || _this2.sample);

                            case 14:
                              sample = _context.sent;

                              if (sample.$content.general.molfile) {
                                // Let the mf be calculated from the molfile
                                delete sample.$content.general.mf;
                              } else {
                                sample.$content.general.molfile = ''; // can not be edited otherwise
                              }

                              _this2._loadSample(sample);

                              resolve();

                            case 18:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[1, 7]]);
                    }));

                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  }());

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function _init() {
          return _init2.apply(this, arguments);
        }

        return _init;
      }()
    }, {
      key: "bindChange",
      value: function bindChange() {
        this.sample.unbindChange(this.onChange);
        this.sample.onChange(this.onChange);
      }
    }, {
      key: "unbindChange",
      value: function unbindChange() {
        this.sample.unbindChange(this.onChange);
      }
    }, {
      key: "handleDrop",
      value: function handleDrop(name) {
        if (!name) {
          throw new Error('handleDrop expects a variable name');
        }

        name = String(name); // maps name of variable to type of data

        var types = {
          droppedNmr: 'nmr',
          droppedIR: 'ir',
          droppedUV: 'uv',
          droppedIV: 'iv',
          droppedMS: 'mass',
          droppedChrom: 'chromatogram',
          droppedXray: 'xray',
          droppedOverview: 'image',
          droppedImage: 'image',
          droppedGenbank: 'genbank'
        };

        if (!types[name]) {
          throw new Error('Unexpected variable name');
        } // Dropped data can be an array
        // Expecting format as from drag and drop module
        // we store the data in the view


        var droppedDatas = _api["default"].getData(name);

        droppedDatas = droppedDatas.file || droppedDatas.str;

        var _iterator = _createForOfIteratorHelper(droppedDatas),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var droppedData = _step.value;
            if (!droppedData.filename.includes('.')) droppedData.filename += '.txt';

            _elnPlugin["default"].process(types[name], this.sample.$content, droppedData, {}, {
              keepContent: true
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this.sample.triggerChange();
      }
    }, {
      key: "handleAction",
      value: function handleAction(action) {
        if (!action) return;

        switch (action.name) {
          case 'unattach':
            {
              var value = action.value;

              if (value && value.__parent) {
                for (var i = 0; i < value.__parent.length; i++) {
                  var row = value.__parent[i];

                  if (row === value) {
                    value.__parent.splice(i, 1);

                    value.__parent.triggerChange();

                    return;
                  }
                }
              }
            }
            break;

          default:
        }

        if (this.expandableMolecule) {
          this.expandableMolecule.handleAction(action);
        }
      }
    }]);

    return Sample;
  }();

  module.exports = Sample;
});