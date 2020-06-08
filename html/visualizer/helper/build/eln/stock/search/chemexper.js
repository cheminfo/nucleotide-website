"use strict";

define(["module", "superagent", "src/util/util", "src/util/ui", "lodash"], function (module) {
  var _superagent = _interopRequireDefault();

  var _util = _interopRequireDefault();

  var _ui = _interopRequireDefault();

  var _lodash = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
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

  module.exports = {
    search: function search(term) {
      return _superagent["default"].get("https://www.chemexper.com/search/reference/json2/quick/".concat(encodeURIComponent(term))).then(function (result) {
        result = result.body && result.body.entry;

        if (!result) {
          _ui["default"].showNotification('No results in reference DB', 'warn');

          return Promise.resolve([]);
        }

        var list = [];

        for (var i = 0; i < result.length; i++) {
          if (result[i] && result[i].value) {
            var val = result[i].value;
            val.code = val.catalogID;
            list.push({
              id: i,
              name: val && val.iupac && val.iupac[0] ? val.iupac[0].value : '',
              row: val
            });
          }
        }

        return list;
      }).then(function (data) {
        return data.map(fromChemexper);
      }).then(function (data) {
        return data.sort(function (a, b) {
          var rn1 = a.$content.identifier.cas.length > 0 ? Number(a.$content.identifier.cas[0].value.replace(/-/g, '')) : Number.MAX_SAFE_INTEGER;
          var rn2 = b.$content.identifier.cas.length > 0 ? Number(b.$content.identifier.cas[0].value.replace(/-/g, '')) : Number.MAX_SAFE_INTEGER;
          return rn1 - rn2;
        });
      });
    }
  };

  function fromChemexper(chemexper) {
    var mol = chemexper.row.mol;
    var mf = chemexper.row.mf && chemexper.row.mf[0] && chemexper.row.mf[0].value.value;
    var cas = chemexper.row.rn && chemexper.row.rn.map(function (rn) {
      return {
        value: numberToCas(rn.value.value)
      };
    });
    if (!chemexper.row.iupac) chemexper.row.iupac = [];
    return {
      $content: {
        general: {
          molfile: mol && mol[0] && mol[0].value.value,
          description: chemexper.name,
          name: chemexper.row.iupac,
          mf: mf
        },
        identifier: {
          cas: cas
        },
        stock: {
          catalogNumber: chemexper.row.code
        },
        physical: {
          density: chemexper.row.density,
          mp: chemexper.row.mp,
          bp: chemexper.row.bp
        }
      },
      id: _util["default"].getNextUniqueId(true),
      names: _lodash["default"].uniq([chemexper.name].concat(_toConsumableArray(chemexper.row.iupac.map(function (i) {
        return i.value;
      })))),
      source: 'reference'
    };
  }

  function numberToCas(nb) {
    nb = String(nb);
    return "".concat(nb.slice(0, -3), "-").concat(nb.slice(-3, -1), "-").concat(nb.slice(-1));
  }
});