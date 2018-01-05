'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readPackageJSON = readPackageJSON;
exports.writePackageJSON = writePackageJSON;
exports.readAppJSON = readAppJSON;
exports.writeAppJSON = writeAppJSON;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readPackageJSON() {
  return JSON.parse(_fs2.default.readFileSync('./package.json'));
}

function writePackageJSON(content) {
  _fs2.default.writeFileSync('./package.json', JSON.stringify(content, null, 2));
}

function readAppJSON() {
  return JSON.parse(_fs2.default.readFileSync('./app.json'));
}

function writeAppJSON(content) {
  _fs2.default.writeFileSync('./app.json', JSON.stringify(content, null, 2));
}