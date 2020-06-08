"use strict";

define(["module", "src/util/ui"], function (module) {
  var _ui = _interopRequireDefault();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  /*
  We retrieve some exercises for structural analysis
   */


  var html = "\n<style>\n#distances {\n  width: 100%;\n  font-family: Arial, Helvetica, sans-serif;\n}\n#distances thead,\n#distances tbody {\n  display: block;\n}\n#distances tbody {\n  height: 600px;\n  overflow-y: auto;\n}\n#distances td {\n  vertical-align: top;\n}\n#distances i {\n  color: darkred;\n  font-size: 0.8em;\n}\n#distances tr:nth-child(even) {\n  background: #ddd;\n}\n#distances tr:nth-child(odd) {\n  background: #eee;\n}\n#distances thead th:nth-child(1),\n#distances tbody td:nth-child(1) {\n  width: 90px;\n}\n#distances thead th:nth-child(2),\n#distances tbody td:nth-child(2) {\n  width: 200px;\n  text-overflow: ellipsis;\n}\n#distances thead th:nth-child(3),\n#distances tbody td:nth-child(3) {\n  width: 80px;\n  text-overflow: ellipsis;\n}\n#distances thead th:nth-child(4),\n#distances tbody td:nth-child(4) {\n  width: 250px;\n  text-overflow: ellipsis;\n}\n</style>\n\n<div id=\"distances\">\n<table>\n  <tbody>\n    <tr>\n      <th>Algorithm</th>\n      <th>Allow negative</th>\n      <th>Scale insensitive</th>\n      <th>Formula</th>\n    </tr>\n\n    <tr>\n      <td>avg</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\frac{\\sum\\limits_{i=1}^{n}{\\left|p_i-q_i\\right|}%2b\\max\\limits_i(|p_i-q_i|)}{2}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>canberra</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}\\frac{\\left|{p_i-q_i}\\right|}{p_i%2bq_i}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>chebyshev</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td><img src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\max\\limits_i(|p_i-q_i|)\">\n      </td>\n    </tr>\n\n    <tr>\n      <td>clark</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sqrt{\\sum\\limits_{i=1}^{n}{\\left(\\frac{\\left|p_i-q_i\\right|}{(p_i%2bq_i)}\\right)^2}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>czekanowski</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=1-\\frac{2\\sum\\limits_{i=1}^{n}{min(p_i,q_i)}}{\\sum\\limits_{i=1}^{n}{p_i%2Bq_i}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>dice</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=1-\\frac{\\sum\\limits_{i=1}^{n}{(p_i-q_i)^2}}{\\sum\\limits_{i=1}^{n}{p_i^2}%2b\\sum\\limits_{i=1}^{n}{q_i^2}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>divergence</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=2\\cdot\\sum\\limits_{i=1}^{n}{\\frac{(p_i-q_i)^2}{(p_i%2bq_i)^2}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>euclidean</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sqrt{\\sum\\limits_{i=1}^{n}(p_i-q_i)^2}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>gower</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\frac{\\sum\\limits_{i=1}^{n}{\\left|p_i-q_i\\right|}}{n}\"\n        />\n      </td>\n    </tr>\n \n    <tr>\n      <td nowrap>intersection<br><i>Requires normalization</i></td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n      <img src=\"https://tex.cheminfo.org/?tex=d(p,q)=1-sumlimits_{i=1}^{n}min(p_i,q_i)\">\n      </td>\n    </tr>\n\n    <tr>\n      <td>jaccard</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=1-\\frac{\\sum\\limits_{i=1}^{n}{p_i\\cdot{q_i}}}{\\sum\\limits_{i=1}^{n}{p_i^2}%2b\\sum\\limits_{i=1}^{n}{q_i^2}-\\sum\\limits_{i=1}^{n}{p_i\\cdot{q_i}}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>kulczynski</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\frac{\\sum\\limits_{i=1}^{n}{\\left|p_i-q_i\\right|}}{min(p_i,q_i)}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>lorentzian</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}\\ln(\\left|{p_i-q_i}\\right|%2b1)\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>manhattan</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}{\\left|p_i-q_i\\right|}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>probabilisticSymmetric</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=2\\cdot\\sum\\limits_{i=1}^{n}{\\frac{(p_i-q_i)^2}{p_i%2bq_i}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>soergel</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\frac{\\sum\\limits_{i=1}^{n}{\\left|p_i-q_i\\right|}}{max(p_i,q_i)}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>sorensen</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\frac{\\sum\\limits_{i=1}^{n}{\\left|p_i-q_i\\right|}}{\\sum\\limits_{i=1}^{n}{p_i%2Bq_i}}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>squared</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}{(\\sqrt{p_i}-\\sqrt{q_i})^2}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>squaredChord</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}{(\\sqrt{p_i}-\\sqrt{q_i})^2}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>squaredEuclidean</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkred;\">\u2718</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}{(p_i-q_i)^2}\"\n        />\n      </td>\n    </tr>\n\n    <tr>\n      <td>waveHedges</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td style=\"color:darkgreen;\">\u2714</td>\n      <td>\n        <img\n          src=\"https://tex.cheminfo.org/?tex=d(p,q)=\\sum\\limits_{i=1}^{n}\\left(1-\\frac{min(p_i,q_i)}{max(p_i,q_i)}\\right)\"\n        />\n      </td>\n    </tr>\n  </tbody>\n</table>\n</div>\n\n";

  module.exports = function showMfGroupsList() {
    _ui["default"].dialog(html, {
      width: 700,
      height: 700,
      title: 'List of known groups'
    });
  };
});