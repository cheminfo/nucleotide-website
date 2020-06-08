"use strict";

define(["module", "lodash", "src/util/ui"], function (module) {
  var _lodash = _interopRequireDefault();

  var _ui = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = {
    choose: function choose(entries, options) {
      entries = JSON.parse(JSON.stringify(entries));
      entries.forEach(function (entry) {
        entry.names = entry.value.names.join('<br />');
      });
      return _ui["default"].choose(entries, {
        autoSelect: options.autoSelect,
        noConfirmation: true,
        returnRow: true,
        dialog: {
          width: 1000,
          height: 800
        },
        columns: [{
          id: 'code',
          name: 'Code',
          jpath: ['key', '0'],
          maxWidth: 100
        }, {
          id: 'batch',
          name: 'Batch',
          jpath: ['key', '1'],
          maxWidth: 100
        }, {
          id: 'names',
          name: 'names',
          jpath: ['names'],
          rendererOptions: {
            forceType: 'html'
          }
        }, {
          id: 'molfile',
          name: 'Molecule',
          jpath: ['value', 'ocl'],
          rendererOptions: {
            forceType: 'oclid'
          },
          maxWidth: 400
        }],
        idField: 'id',
        slick: {
          rowHeight: 150
        }
      })["catch"](function (e) {
        console.error(e); // eslint-disable-line no-console

        _ui["default"].showNotification('search failed', 'error');
      });
    }
  };

  function listTemplate(val, prop) {
    return "\n    <div style=\"height: 100%; line-height: initial; vertical-align: middle\">\n        <table style=\"width: 100%; text-align: center;\">\n            {% for n in ".concat(val, " %}\n                <tr><td>{{ n").concat(prop, " }}</td></tr>\n            {% endfor %}\n        </table>\n    </div>\n    ");
  }
});