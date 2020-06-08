"use strict";

define(["module", "./jpaths", "src/main/datas", "src/util/api", "src/util/ui", "../rest-on-couch/Roc", "./ExpandableMolecule", "./Nmr1dManager", "./MF", "./libs/elnPlugin", "./Sequence", "./libs/convertToJcamp"], function (module, _jpaths) {
  var _datas = _interopRequireDefault();

  var _api = _interopRequireDefault();

  var _ui = _interopRequireDefault();

  var _Roc = _interopRequireDefault();

  var _ExpandableMolecule = _interopRequireDefault();

  var _Nmr1dManager = _interopRequireDefault();

  var _MF = _interopRequireDefault();

  var _elnPlugin = _interopRequireDefault();

  var _Sequence = _interopRequireDefault();

  var _convertToJcamp = _interopRequireDefault();

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

  var DataObject = _datas["default"].DataObject;
  var defaultOptions = {
    varName: 'sample',
    track: false,
    bindChange: true
  };

  var Sample = /*#__PURE__*/function () {
    function Sample(couchDB, uuid, options) {
      var _this = this;

      _classCallCheck(this, Sample);

      this.options = Object.assign({}, defaultOptions, options);

      var roc = _api["default"].cache('roc');

      if (!roc) {
        roc = new _Roc["default"]({
          url: couchDB.url,
          database: couchDB.database,
          processor: _elnPlugin["default"],
          kind: couchDB.kind
        });

        _api["default"].cache('roc', roc);
      }

      this.roc = roc;

      if (options.onSync) {
        var emitter = this.roc.getDocumentEventEmitter(uuid);
        emitter.on('sync', function () {
          return options.onSync(true);
        });
        emitter.on('unsync', function () {
          return options.onSync(false);
        });
      }

      this.uuid = uuid;

      if (!this.uuid) {
        _ui["default"].showNotification('Cannot create an editable sample without an uuid', 'error');

        return;
      }

      this.sample = this.roc.document(this.uuid, this.options).then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sample) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.sample = sample;

                  _this.updateOtherAttachments();

                  _this._loadInstanceInVisualizer();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      this._checkServerChanges();
    }

    _createClass(Sample, [{
      key: "waitSampleLoaded",
      value: function waitSampleLoaded() {
        return this.sample;
      }
    }, {
      key: "getToc",
      value: function () {
        var _getToc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this2 = this;

          var id, result;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  id = DataObject.resurrect(this.sample.$id).join(' ');
                  _context2.next = 3;
                  return this.roc.query('sample_toc', {
                    key: id,
                    filter: function filter(entry) {
                      return entry.id === _this2.uuid;
                    }
                  });

                case 3:
                  result = _context2.sent;

                  if (!(result.length === 0)) {
                    _context2.next = 8;
                    break;
                  }

                  _context2.next = 7;
                  return this.roc.query('sample_toc', {
                    key: id.trimEnd(' '),
                    filter: function filter(entry) {
                      return entry.id === _this2.uuid;
                    }
                  });

                case 7:
                  result = _context2.sent;

                case 8:
                  return _context2.abrupt("return", result[0]);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function getToc() {
          return _getToc.apply(this, arguments);
        }

        return getToc;
      }()
    }, {
      key: "_checkServerChanges",
      value: function _checkServerChanges() {
        var _this3 = this;

        window.setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var uuid, rev, headers, remoteRev, target, remoteHasChangedDiv, alertDiv;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(_this3.sample && _this3.sample._rev)) {
                    _context3.next = 11;
                    break;
                  }

                  uuid = _this3.sample._id;
                  rev = _this3.sample._rev;
                  _context3.next = 5;
                  return _this3.roc.getHeader(uuid);

                case 5:
                  headers = _context3.sent;

                  if (!(!headers || !headers.etag)) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt("return");

                case 8:
                  remoteRev = String(headers.etag).replace(/"/g, '');
                  target = document.getElementById('modules-grid');

                  if (remoteRev && rev !== remoteRev && _this3.options.track) {
                    remoteHasChangedDiv = document.getElementById('remoteHasChanged');

                    if (!remoteHasChangedDiv) {
                      alertDiv = document.createElement('DIV');
                      alertDiv.innerHTML = "<p id=\"remoteHasChanged\" style=\"font-weight: bold; color: red; font-size: 3em; background-color: yellow\">\nThis entry has changed on the server, please reload the sample.<br>\nYour local changes will be lost.</p>";
                      alertDiv.style.zIndex = 99;
                      alertDiv.style.position = 'fixed';
                      target.prepend(alertDiv);
                    } else {
                      remoteHasChangedDiv.style.display = 'block';
                    }

                    _this3.remoteChanged = true;
                  }

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        })), 60 * 1000);
      }
    }, {
      key: "createVariables",
      value: function createVariables() {
        var sampleVar = _api["default"].getVar(this.options.varName);

        (0, _jpaths.createVar)(sampleVar, 'sampleCode');
        (0, _jpaths.createVar)(sampleVar, 'batchCode');
        (0, _jpaths.createVar)(sampleVar, 'creationDate');
        (0, _jpaths.createVar)(sampleVar, 'modificationDate');
        (0, _jpaths.createVar)(sampleVar, 'content');
        (0, _jpaths.createVar)(sampleVar, 'general');
        (0, _jpaths.createVar)(sampleVar, 'molfile');
        (0, _jpaths.createVar)(sampleVar, 'firstPeptide');
        (0, _jpaths.createVar)(sampleVar, 'firstNucleotide');
        (0, _jpaths.createVar)(sampleVar, 'mf');
        (0, _jpaths.createVar)(sampleVar, 'mw');
        (0, _jpaths.createVar)(sampleVar, 'em');
        (0, _jpaths.createVar)(sampleVar, 'title');
        (0, _jpaths.createVar)(sampleVar, 'description');
        (0, _jpaths.createVar)(sampleVar, 'keyword');
        (0, _jpaths.createVar)(sampleVar, 'meta');
        (0, _jpaths.createVar)(sampleVar, 'name');
        (0, _jpaths.createVar)(sampleVar, 'physical');
        (0, _jpaths.createVar)(sampleVar, 'bp');
        (0, _jpaths.createVar)(sampleVar, 'nd');
        (0, _jpaths.createVar)(sampleVar, 'mp');
        (0, _jpaths.createVar)(sampleVar, 'density');
        (0, _jpaths.createVar)(sampleVar, 'stockHistory');
        (0, _jpaths.createVar)(sampleVar, 'lastStock');
        (0, _jpaths.createVar)(sampleVar, 'supplier');
        (0, _jpaths.createVar)(sampleVar, 'ir');
        (0, _jpaths.createVar)(sampleVar, 'uv');
        (0, _jpaths.createVar)(sampleVar, 'raman');
        (0, _jpaths.createVar)(sampleVar, 'mass');
        (0, _jpaths.createVar)(sampleVar, 'nmr');
        (0, _jpaths.createVar)(sampleVar, 'iv');
        (0, _jpaths.createVar)(sampleVar, 'xray');
        (0, _jpaths.createVar)(sampleVar, 'chromatogram');
        (0, _jpaths.createVar)(sampleVar, 'thermogravimetricAnalysis');
        (0, _jpaths.createVar)(sampleVar, 'xrd');
        (0, _jpaths.createVar)(sampleVar, 'xps');
        (0, _jpaths.createVar)(sampleVar, 'cyclicVoltammetry');
        (0, _jpaths.createVar)(sampleVar, 'elementalAnalysis');
        (0, _jpaths.createVar)(sampleVar, 'differentialScanningCalorimetry');
        (0, _jpaths.createVar)(sampleVar, 'image');
        (0, _jpaths.createVar)(sampleVar, 'sampleCode');
        (0, _jpaths.createVar)(sampleVar, 'attachments');
        (0, _jpaths.createVar)(sampleVar, 'nucleic');
        (0, _jpaths.createVar)(sampleVar, 'peptidic');
        (0, _jpaths.createVar)(sampleVar, 'biology');
      }
    }, {
      key: "_loadInstanceInVisualizer",
      value: function () {
        var _loadInstanceInVisualizer2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var _this4 = this;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  updateSample(this.sample);
                  this.createVariables();

                  this._initializeObjects();

                  this.onChange = function (event) {
                    var jpathStr = event.jpath.join('.');

                    if (jpathStr.match(/\$content.spectra.nmr.[0-9]+.range/)) {
                      _this4.nmr1dManager.rangesHasChanged();
                    }

                    switch (jpathStr) {
                      case '$content.general.molfile':
                        _this4.mf.fromMolfile();

                        _this4.nmr1dManager.handleAction({
                          name: 'clearAllAssignments'
                        });

                        break;

                      case '$content.general.mf':
                        _this4.mf.fromMF();

                        _this4.nmr1dManager.updateIntegralOptionsFromMF();

                        break;

                      case '$content.biology':
                        break;

                      case '$content.general.sequence':
                        throw new Error('Trying to change old sequence, this is a bug');

                      default:
                        break;
                      // ignore
                    }
                  };

                  this.bindChange();

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function _loadInstanceInVisualizer() {
          return _loadInstanceInVisualizer2.apply(this, arguments);
        }

        return _loadInstanceInVisualizer;
      }()
    }, {
      key: "updateOtherAttachments",
      value: function updateOtherAttachments() {
        var otherAttachments = this.sample.attachmentList.filter(function (entry) {
          return !entry.name.includes('/');
        });

        _api["default"].createData('otherAttachments', otherAttachments);
      }
    }, {
      key: "_initializeObjects",
      value: function _initializeObjects() {
        this.expandableMolecule = new _ExpandableMolecule["default"](this.sample, this.options);
        this.nmr1dManager = new _Nmr1dManager["default"](this.sample);
        this.mf = new _MF["default"](this.sample);
        this.mf.fromMF();
      }
    }, {
      key: "bindChange",
      value: function bindChange() {
        if (this.options.bindChange) {
          this.sample.unbindChange(this.onChange);
          this.sample.onChange(this.onChange);
        }
      }
    }, {
      key: "unbindChange",
      value: function unbindChange() {
        if (this.options.bindChange) this.sample.unbindChange(this.onChange);
      }
      /** An image with a special name that is used to display on the
       * first page of a sample
       */

    }, {
      key: "handleOverview",
      value: function () {
        var _handleOverview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(variableName) {
          var data, file;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  data = _api["default"].getData(variableName);

                  if (!(data && data.file && data.file[0])) {
                    _context5.next = 15;
                    break;
                  }

                  file = data.file[0]; // we only accepts 3 mimetype

                  _context5.t0 = file.mimetype;
                  _context5.next = _context5.t0 === 'image/png' ? 6 : _context5.t0 === 'image/jpeg' ? 8 : _context5.t0 === 'image/svg+xml' ? 10 : 12;
                  break;

                case 6:
                  file.filename = 'overview.png';
                  return _context5.abrupt("break", 14);

                case 8:
                  file.filename = 'overview.jpg';
                  return _context5.abrupt("break", 14);

                case 10:
                  file.filename = 'overview.svg';
                  return _context5.abrupt("break", 14);

                case 12:
                  _ui["default"].showNotification('For overview only the following formats are allowed: png, jpg and svg.', 'error');

                  return _context5.abrupt("return", undefined);

                case 14:
                  return _context5.abrupt("return", this.handleDrop(variableName, false));

                case 15:
                  return _context5.abrupt("return", undefined);

                case 16:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function handleOverview(_x2) {
          return _handleOverview.apply(this, arguments);
        }

        return handleOverview;
      }()
      /**
       *
       * @param {string} variableName
       * @param {boolean} askType
       * @param {object} options
       * @param {string} [options.customMetadata]
       * @param {boolean} [options.autoJcamp] - converts automatically tsv, txt and csv to jcamp
       */

    }, {
      key: "handleDrop",
      value: function () {
        var _handleDrop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(variableName, askType) {
          var options,
              type,
              types,
              droppedDatas,
              jcampTypes,
              _iterator,
              _step,
              droppedData,
              extension,
              info,
              meta,
              content,
              _args6 = arguments;

          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};

                  if (variableName) {
                    _context6.next = 3;
                    break;
                  }

                  throw new Error('handleDrop expects a variable name');

                case 3:
                  variableName = String(variableName);

                  if (askType) {
                    _context6.next = 11;
                    break;
                  } // maps name of variable to type of data


                  types = {
                    droppedNmr: 'nmr',
                    droppedIR: 'ir',
                    droppedUV: 'uv',
                    droppedIV: 'iv',
                    droppedMS: 'mass',
                    droppedRaman: 'raman',
                    droppedChrom: 'chromatogram',
                    droppedCV: 'cyclicVoltammetry',
                    droppedTGA: 'thermogravimetricAnalysis',
                    droppedDSC: 'differentialScanningCalorimetry',
                    droppedXray: 'xray',
                    droppedOverview: 'image',
                    droppedImage: 'image',
                    droppedGenbank: 'genbank',
                    droppedOther: 'other'
                  };

                  if (types[variableName]) {
                    _context6.next = 8;
                    break;
                  }

                  throw new Error('Unexpected variable name');

                case 8:
                  type = types[variableName];
                  _context6.next = 16;
                  break;

                case 11:
                  _context6.next = 13;
                  return _ui["default"].choose({
                    nmr: 'NMR (csv, tsv, txt, jcamp, pdf)',
                    mass: 'Mass (csv, tsv, txt, jcamp, pdf, netcdf, xml)',
                    ir: 'Infrared (csv, tsv, txt, jcamp, pdf)',
                    raman: 'Raman (csv, tsv, txt, jcamp, pdf)',
                    uv: 'UV (csv, tsv, txt, jcamp, pdf)',
                    iv: 'IV (csv, tsv, txt, jcamp, pdf)',
                    chromatogram: 'Chromatogram LC, GC, LC/MS, GC/MS (csv, tsv, txt, jcamp, pdf, netcdf, xml)',
                    thermogravimetricAnalysis: 'Thermogravimetric Analysis (csv, tsv, txt, jcamp)',
                    xrd: 'XRD Analysis (csv, tsv, txt, jcamp)',
                    xps: 'XPS (csv, tsv, txt, jcamp)',
                    cyclicVoltammetry: 'Cyclic voltammetry (csv, tsv, txt, jcamp, pdf)',
                    differentialScanningCalorimetry: 'Differential Scanning Calorimetry (csv, tsv, txt, jcamp)',
                    xray: 'Xray (cif, pdb)',
                    image: 'Images (jpg, png or tiff)',
                    other: 'Other'
                  }, {
                    noConfirmation: true,
                    columns: [{
                      id: 'description',
                      name: 'description',
                      field: 'description'
                    }]
                  });

                case 13:
                  type = _context6.sent;

                  if (type) {
                    _context6.next = 16;
                    break;
                  }

                  return _context6.abrupt("return");

                case 16:
                  // Dropped data can be an array
                  // Expecting format as from drag and drop module
                  droppedDatas = _api["default"].getData(variableName);
                  droppedDatas = droppedDatas.file || droppedDatas.str;
                  /*
                    Possible autoconvertion of text file to jcamp
                    * if filename ends with TXT, TSV or CSV
                    * use convert-to-jcamp
                  */

                  if (!options.autoJcamp) {
                    _context6.next = 55;
                    break;
                  }

                  jcampTypes = {
                    nmr: {
                      type: 'NMR SPECTRUM',
                      xUnit: 'Delta [ppm]',
                      yUnit: 'Relative'
                    },
                    ir: {
                      type: 'IR SPECTRUM',
                      xUnit: 'wavelength [cm-1]',
                      yUnit: ['Transmittance (%)', 'Absorbance']
                    },
                    raman: {
                      type: 'RAMAN SPECTRUM',
                      xUnit: 'wavelength [cm-1]',
                      yUnit: 'Absorbance'
                    },
                    iv: {
                      type: 'IV SPECTRUM',
                      xUnit: ['Potential vs Fc/Fc+ [V]', 'Potential vs Ag/AgNO3 [V]', 'Potential vs Ag/AgCl/KCl [V]', 'Potential vs Ag/AgCl/NaCl [V]', 'Potential vs SCE [V]', 'Potential vs NHE [V]', 'Potential vs SSCE [V]', 'Potential vs Hg/Hg2SO4/K2SO4 [V]'],
                      yUnit: ['Current [mA]', 'Current [µA]']
                    },
                    uv: {
                      type: 'UV SPECTRUM',
                      xUnit: 'wavelength [nm]',
                      yUnit: 'Absorbance'
                    },
                    mass: {
                      type: 'MASS SPECTRUM',
                      xUnit: 'm/z [Da]',
                      yUnit: 'Relative'
                    },
                    cyclicVoltammetry: {
                      type: 'Cyclic voltammetry',
                      xUnit: 'I [mA]',
                      yUnit: 'Ewe [V]'
                    },
                    thermogravimetricAnalysis: {
                      type: 'Thermogravimetric analysis',
                      xUnit: 'Temperature [°C]',
                      yUnit: 'Weight [mg]'
                    },
                    differentialScanningCalorimetry: {
                      type: 'Differentical scanning calorimetry',
                      xUnit: 'I [mA]',
                      yUnit: 'Ewe [V]'
                    }
                  };
                  _iterator = _createForOfIteratorHelper(droppedDatas);
                  _context6.prev = 21;

                  _iterator.s();

                case 23:
                  if ((_step = _iterator.n()).done) {
                    _context6.next = 47;
                    break;
                  }

                  droppedData = _step.value;
                  if (!droppedData.filename.includes('.')) droppedData.filename += '.txt';
                  extension = droppedData.filename.replace(/.*\./, '').toLowerCase();

                  if (!(extension === 'txt' || extension === 'csv' || extension === 'tsv')) {
                    _context6.next = 45;
                    break;
                  }

                  info = jcampTypes[type];

                  if (!info) {
                    _context6.next = 44;
                    break;
                  }

                  info.filename = "".concat(droppedData.filename.replace(/\.[^.]*$/, ''), ".jdx"); // we will ask for meta information

                  _context6.next = 33;
                  return _ui["default"].form("\n              <style>\n                  #jcamp {\n                      zoom: 1.5;\n                  }\n              </style>\n              <div id='jcamp'>\n                  <b>Automatic conversion of text file to jcamp</b>\n                  <form>\n                  <table>\n                  <tr>\n                    <th>Kind</th>\n                    <td><input type=\"text\" readonly name=\"type\" value=\"".concat(info.type, "\"></td>\n                  </tr>\n                  <tr>\n                    <th>Filename (ending with .jdx)</th>\n                    <td><input type=\"text\" pattern=\".*\\.jdx$\" name=\"filename\" size=40 value=\"").concat(info.filename, "\"></td>\n                  </tr>\n                  <tr>\n                    <th>xUnit (horizon axis)</th>\n                    ").concat(info.xUnit instanceof Array ? "<td><select name=\"xUnit\">".concat(info.xUnit.map(function (xUnit) {
                    return "<option value=\"".concat(xUnit, "\">").concat(xUnit, "</option>");
                  }), "</select></td>") : "<td><input type=\"text\" readonly name=\"xUnit\" value=\"".concat(info.xUnit, "\"></td>"), "\n                  </tr>\n                  <tr>\n                  <th>yUnit (vectical axis)</th>\n                  ").concat(info.yUnit instanceof Array ? "<td><select name=\"yUnit\">".concat(info.yUnit.map(function (yUnit) {
                    return "<option value=\"".concat(yUnit, "\">").concat(yUnit, "</option>");
                  }), "</select></td>") : "<td><input type=\"text\" readonly name=\"yUnit\" value=\"".concat(info.yUnit, "\"></td>"), "\n                </tr>\n                  </table>\n                    <input type=\"submit\" value=\"Submit\"/>\n                  </form>\n              </div>\n            "), {}, {
                    dialog: {
                      width: 600
                    }
                  });

                case 33:
                  meta = _context6.sent;

                  if (meta) {
                    _context6.next = 36;
                    break;
                  }

                  return _context6.abrupt("return");

                case 36:
                  droppedData.filename = "".concat(meta.filename);
                  droppedData.mimetype = 'chemical/x-jcamp-dx';
                  droppedData.contentType = 'chemical/x-jcamp-dx';
                  content = droppedData.content;

                  if (droppedData.encoding === 'base64') {
                    content = atob(droppedData.content);
                    droppedData.encoding = 'text';
                  }

                  droppedData.content = (0, _convertToJcamp["default"])(content, {
                    meta: meta
                  });
                  _context6.next = 45;
                  break;

                case 44:
                  // eslint-disable-next-line no-console
                  console.log('Could not convert to jcamp file: ', type);

                case 45:
                  _context6.next = 23;
                  break;

                case 47:
                  _context6.next = 52;
                  break;

                case 49:
                  _context6.prev = 49;
                  _context6.t0 = _context6["catch"](21);

                  _iterator.e(_context6.t0);

                case 52:
                  _context6.prev = 52;

                  _iterator.f();

                  return _context6.finish(52);

                case 55:
                  if (!(type === 'other')) {
                    _context6.next = 61;
                    break;
                  }

                  _context6.next = 58;
                  return this.roc.addAttachment(this.sample, droppedDatas);

                case 58:
                  this.updateOtherAttachments();
                  _context6.next = 63;
                  break;

                case 61:
                  _context6.next = 63;
                  return this.attachFiles(droppedDatas, type, options);

                case 63:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[21, 49, 52, 55]]);
        }));

        function handleDrop(_x3, _x4) {
          return _handleDrop.apply(this, arguments);
        }

        return handleDrop;
      }()
    }, {
      key: "handleAction",
      value: function () {
        var _handleAction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(action) {
          var advancedOptions1H, attachment, tempType, type, droppedDatas, ok, remoteHasChangedDiv;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (action) {
                    _context7.next = 2;
                    break;
                  }

                  return _context7.abrupt("return");

                case 2:
                  if (!(this.expandableMolecule && this.expandableMolecule.handleAction(action))) {
                    _context7.next = 4;
                    break;
                  }

                  return _context7.abrupt("return");

                case 4:
                  if (!(this.nmr1dManager && this.nmr1dManager.handleAction(action))) {
                    _context7.next = 6;
                    break;
                  }

                  return _context7.abrupt("return");

                case 6:
                  _context7.t0 = action.name;
                  _context7.next = _context7.t0 === 'save' ? 9 : _context7.t0 === 'explodeSequences' ? 12 : _context7.t0 === 'calculateMFFromSequence' ? 14 : _context7.t0 === 'calculateMFFromPeptidic' ? 16 : _context7.t0 === 'calculateMFFromNucleic' ? 18 : _context7.t0 === 'translateNucleic' ? 20 : _context7.t0 === 'createOptions' ? 22 : _context7.t0 === 'recreateVariables' ? 25 : _context7.t0 === 'deleteAttachment' ? 26 : _context7.t0 === 'deleteNmr' ? 31 : _context7.t0 === 'unattach' ? 31 : _context7.t0 === 'attachNMR' ? 34 : _context7.t0 === 'attachIR' ? 34 : _context7.t0 === 'attachRaman' ? 34 : _context7.t0 === 'attachMass' ? 34 : _context7.t0 === 'refresh' ? 41 : 57;
                  break;

                case 9:
                  _context7.next = 11;
                  return this.roc.update(this.sample);

                case 11:
                  return _context7.abrupt("break", 58);

                case 12:
                  _Sequence["default"].explodeSequences(this.sample);

                  return _context7.abrupt("break", 58);

                case 14:
                  _Sequence["default"].calculateMFFromSequence(this.sample);

                  return _context7.abrupt("break", 58);

                case 16:
                  _Sequence["default"].calculateMFFromPeptidic(this.sample);

                  return _context7.abrupt("break", 58);

                case 18:
                  _Sequence["default"].calculateMFFromNucleic(this.sample);

                  return _context7.abrupt("break", 58);

                case 20:
                  _Sequence["default"].translateNucleic(this.sample);

                  return _context7.abrupt("break", 58);

                case 22:
                  advancedOptions1H = _api["default"].cache('nmr1hAdvancedOptions');

                  if (advancedOptions1H) {
                    _api["default"].createData('nmr1hOndeTemplate', _api["default"].cache('nmr1hOndeTemplates').full);
                  } else {
                    _api["default"].createData('nmr1hOndeTemplate', _api["default"].cache('nmr1hOndeTemplates')["short"]);
                  }

                  return _context7.abrupt("break", 58);

                case 25:
                  this.createVariables();

                case 26:
                  attachment = action.value.name;
                  _context7.next = 29;
                  return this.roc.deleteAttachment(this.sample, attachment);

                case 29:
                  this.updateOtherAttachments();
                  return _context7.abrupt("break", 58);

                case 31:
                  _context7.next = 33;
                  return this.roc.unattach(this.sample, action.value);

                case 33:
                  return _context7.abrupt("break", 58);

                case 34:
                  tempType = action.name.replace('attach', '');
                  type = tempType.charAt(0).toLowerCase() + tempType.slice(1);
                  droppedDatas = action.value;
                  droppedDatas = droppedDatas.file || droppedDatas.str;
                  _context7.next = 40;
                  return this.attachFiles(droppedDatas, type);

                case 40:
                  return _context7.abrupt("break", 58);

                case 41:
                  _context7.next = 43;
                  return _ui["default"].confirm('Are you sure you want to refresh? This will discard your local modifications.');

                case 43:
                  ok = _context7.sent;

                  if (ok) {
                    _context7.next = 46;
                    break;
                  }

                  return _context7.abrupt("return");

                case 46:
                  this.unbindChange();
                  this.expandableMolecule.unbindChange();
                  _context7.next = 50;
                  return this.roc.discardLocal(this.sample);

                case 50:
                  this._initializeObjects();

                  this.bindChange();
                  this.remoteChanged = false;
                  remoteHasChangedDiv = document.getElementById('remoteHasChanged');

                  if (remoteHasChangedDiv) {
                    remoteHasChangedDiv.style.display = 'none';
                  }

                  this.nmr1dManager.handleAction({
                    name: 'nmrChanged'
                  });
                  return _context7.abrupt("break", 58);

                case 57:
                  return _context7.abrupt("break", 58);

                case 58:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function handleAction(_x5) {
          return _handleAction.apply(this, arguments);
        }

        return handleAction;
      }()
    }, {
      key: "attachFiles",
      value: function () {
        var _attachFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(files, type, options) {
          var i, data;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (!(!files || !type)) {
                    _context8.next = 2;
                    break;
                  }

                  return _context8.abrupt("return");

                case 2:
                  if (!Array.isArray(files)) {
                    files = [files];
                  }

                  i = 0;

                case 4:
                  if (!(i < files.length)) {
                    _context8.next = 11;
                    break;
                  }

                  data = DataObject.resurrect(files[i]);
                  _context8.next = 8;
                  return this.roc.attach(type, this.sample, data, options);

                case 8:
                  i++;
                  _context8.next = 4;
                  break;

                case 11:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function attachFiles(_x6, _x7, _x8) {
          return _attachFiles.apply(this, arguments);
        }

        return attachFiles;
      }()
    }]);

    return Sample;
  }();

  function updateSample(sample) {
    if (!sample.$content.general) {
      sample.$content.general = {};
    }
    /** This is the old place we used to put the sequence.
     * By default we expect it is a peptidic sequence
     */


    if (sample.$content.general.sequence) {
      // eslint-disable-next-line no-console
      console.log('Migrating sequence', sample.$content.general.sequence);
      if (!sample.$content.biology) sample.$content.biology = {};

      if (!sample.$content.biology.peptidic) {
        sample.$content.biology.peptidic = [];
      }

      if (!sample.$content.biology.peptidic.length > 0) {
        sample.$content.biology.peptidic[0] = {};
      }

      if (!sample.$content.biology.peptidic[0].seq) {
        sample.$content.biology.peptidic[0].seq = [];
      }

      if (!sample.$content.biology.peptidic[0].seq.length > 0) {
        sample.$content.biology.peptidic[0].seq[0] = {};
      }

      sample.setChildSync(['$content', 'biology', 'peptidic', 0, 'seq', 0, 'sequence'], sample.$content.general.sequence);
      sample.$content.general.sequence = undefined;
    }
  }

  module.exports = Sample;
});