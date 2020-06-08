"use strict";

define(["module", "exports", "src/util/api", "src/util/ui", "./getViewInfo"], function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModulePrefsManager = void 0;

  var _api = _interopRequireDefault();

  var _ui = _interopRequireDefault();

  var _getViewInfo = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
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
  } // ModulePrefsManager is created in the init script
  // Any module may have a gear in the settings allowing to change preferences
  // the system will either store in Roc or localStorge depending what is available


  var ModulePrefsManager = /*#__PURE__*/function () {
    function ModulePrefsManager() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, ModulePrefsManager);

      var promises = [];

      if (options.hasRoc) {
        var waitingRoc = new Promise(function (resolveRoc) {
          _this.resolveRoc = resolveRoc;
        }).then(function () {
          console.log('Roc initialized');
        });
        promises.push(waitingRoc);
      }

      var waitingView = (0, _getViewInfo["default"])().then(function (result) {
        _this.viewID = result._id;
      });
      promises.push(waitingView);
      var promiseAll = Promise.all(promises).then(function () {
        _this.waiting = function () {
          return true;
        };
      });

      this.waiting = function () {
        return promiseAll;
      };
    }

    _createClass(ModulePrefsManager, [{
      key: "setRoc",
      value: function setRoc(roc) {
        this.roc = roc;
        this.resolveRoc();
      }
    }, {
      key: "updateSlickGridPrefs",
      value: function () {
        var _updateSlickGridPrefs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(moduleID) {
          var objectStructure, cols;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.waiting();

                case 2:
                  objectStructure = _api["default"].getModule(moduleID).data.resurrect()[0];
                  cols = JSON.parse(JSON.stringify(_api["default"].getModulePreferences(moduleID).cols));
                  cols.forEach(function (item) {
                    if (!item.id) item.id = Math.random();
                  });
                  _context.next = 7;
                  return _ui["default"].editTable(cols, {
                    remove: true,
                    reorder: true,
                    dialog: {
                      title: 'Configure the columns of the module'
                    },
                    columns: [{
                      id: 'id',
                      name: 'name',
                      jpath: ['name'],
                      editor: Slick.CustomEditors.TextValue
                    }, {
                      id: 'rendererOptions',
                      name: 'rendererOptions',
                      jpath: ['rendererOptions'],
                      editor: Slick.CustomEditors.TextValue
                    }, {
                      id: 'width',
                      name: 'width',
                      jpath: ['width'],
                      editor: Slick.CustomEditors.NumberValue
                    }, {
                      id: 'x',
                      name: 'x',
                      jpath: ['x'],
                      editor: Slick.CustomEditors.Select,
                      editorOptions: {
                        choices: 'ab:cd;ef:gh'
                      }
                    }, {
                      id: 'jpath',
                      name: 'jpath',
                      jpath: ['jpath'],
                      editor: Slick.CustomEditors.JPathFactory(objectStructure),
                      forceType: 'jpath',
                      rendererOptions: {
                        forceType: 'jpath'
                      }
                    }]
                  });

                case 7:
                  cols.forEach(function (item) {
                    item.formatter = 'typerenderer';
                  });

                  _api["default"].updateModulePreferences(moduleID, {
                    cols: JSON.parse(JSON.stringify(cols))
                  });

                  this.saveModulePrefs(moduleID, {
                    cols: cols
                  });

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function updateSlickGridPrefs(_x) {
          return _updateSlickGridPrefs.apply(this, arguments);
        }

        return updateSlickGridPrefs;
      }()
    }, {
      key: "reloadModulePrefs",
      value: function () {
        var _reloadModulePrefs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(moduleID) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.waiting();

                case 2:
                  if (this.roc) {
                    this.reloadModulePrefsFromRoc(moduleID);
                  } else {
                    this.reloadModulePrefsFromLocalStorage(moduleID);
                  }

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function reloadModulePrefs(_x2) {
          return _reloadModulePrefs.apply(this, arguments);
        }

        return reloadModulePrefs;
      }()
    }, {
      key: "reloadModulePrefsFromLocalStorage",
      value: function () {
        var _reloadModulePrefsFromLocalStorage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(moduleID) {
          var prefs;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  prefs = JSON.parse(localStorage.getItem('viewModulePreferences') || '{}');

                  if (prefs[this.viewID]) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt("return");

                case 3:
                  if (!(moduleID && !prefs[this.viewID][moduleID])) {
                    _context3.next = 5;
                    break;
                  }

                  return _context3.abrupt("return");

                case 5:
                  if (moduleID) {
                    _api["default"].updateModulePreferences(moduleID, prefs[this.viewID][moduleID]);
                  } else {
                    for (moduleID in prefs[this.viewID]) {
                      _api["default"].updateModulePreferences(moduleID, prefs[this.viewID][moduleID]);
                    }
                  }

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function reloadModulePrefsFromLocalStorage(_x3) {
          return _reloadModulePrefsFromLocalStorage.apply(this, arguments);
        }

        return reloadModulePrefsFromLocalStorage;
      }()
    }, {
      key: "getRecord",
      value: function () {
        var _getRecord = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var user;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.roc.getUser();

                case 2:
                  user = _context4.sent;

                  if (!(!user || !user.username)) {
                    _context4.next = 5;
                    break;
                  }

                  return _context4.abrupt("return", undefined);

                case 5:
                  _context4.next = 7;
                  return this.roc.view('entryByOwnerAndId', {
                    key: [user.username, ['userModulePrefs', this.viewID]]
                  });

                case 7:
                  return _context4.abrupt("return", _context4.sent[0]);

                case 8:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function getRecord() {
          return _getRecord.apply(this, arguments);
        }

        return getRecord;
      }()
    }, {
      key: "reloadModulePrefsFromRoc",
      value: function () {
        var _reloadModulePrefsFromRoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(moduleID) {
          var record;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.getRecord();

                case 2:
                  record = _context5.sent;

                  if (record) {
                    _context5.next = 5;
                    break;
                  }

                  return _context5.abrupt("return");

                case 5:
                  if (moduleID) {
                    _api["default"].updateModulePreferences(moduleID, record.$content[moduleID]);
                  } else {
                    for (moduleID in record.$content[moduleID]) {
                      _api["default"].updateModulePreferences(moduleID, record.$content[moduleID]);
                    }
                  }

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function reloadModulePrefsFromRoc(_x4) {
          return _reloadModulePrefsFromRoc.apply(this, arguments);
        }

        return reloadModulePrefsFromRoc;
      }()
    }, {
      key: "saveModulePrefs",
      value: function () {
        var _saveModulePrefs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(moduleID, modulePrefs) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.waiting();

                case 2:
                  if (this.roc) {
                    this.saveModulePrefsToRoc(moduleID, modulePrefs);
                  } else {
                    this.saveModulePrefsToLocalStorage(moduleID, modulePrefs);
                  }

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function saveModulePrefs(_x5, _x6) {
          return _saveModulePrefs.apply(this, arguments);
        }

        return saveModulePrefs;
      }()
    }, {
      key: "saveModulePrefsToLocalStorage",
      value: function () {
        var _saveModulePrefsToLocalStorage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(moduleID, modulePrefs) {
          var prefs;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  prefs = JSON.parse(localStorage.getItem('viewModulePreferences') || '{}');
                  if (!prefs[this.viewID]) prefs[this.viewID] = {};
                  prefs[this.viewID][moduleID] = modulePrefs;
                  localStorage.setItem('viewModulePreferences', JSON.stringify(prefs));

                case 4:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function saveModulePrefsToLocalStorage(_x7, _x8) {
          return _saveModulePrefsToLocalStorage.apply(this, arguments);
        }

        return saveModulePrefsToLocalStorage;
      }()
    }, {
      key: "saveModulePrefsToRoc",
      value: function () {
        var _saveModulePrefsToRoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(moduleID, modulePrefs) {
          var record, content;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.getRecord();

                case 2:
                  record = _context8.sent;

                  if (!record) {
                    _context8.next = 8;
                    break;
                  }

                  record.$content[moduleID] = modulePrefs;
                  return _context8.abrupt("return", this.roc.update(record));

                case 8:
                  content = {};
                  content[moduleID] = modulePrefs;
                  return _context8.abrupt("return", this.roc.create({
                    $id: ['userModulePrefs', this.viewID],
                    $content: content,
                    $kind: 'userModulePrefs'
                  }));

                case 11:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function saveModulePrefsToRoc(_x9, _x10) {
          return _saveModulePrefsToRoc.apply(this, arguments);
        }

        return saveModulePrefsToRoc;
      }()
    }]);

    return ModulePrefsManager;
  }();

  exports.ModulePrefsManager = ModulePrefsManager;
  module.exports = ModulePrefsManager;
});