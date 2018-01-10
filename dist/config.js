'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _circle = require('./config/circle.config');

var _circle2 = _interopRequireDefault(_circle);

var _travis = require('./config/travis.config');

var _travis2 = _interopRequireDefault(_travis);

var _default = require('./config/default.config');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = void 0;
if (process.env.TRAVIS === 'true') {
  config = _travis2.default;
} else if (process.env.CIRCLECI === 'true') {
  config = _circle2.default;
} else {
  config = _default2.default;
}

var useCommit = process.argv.includes('--commit');

for (var key in config) {
  var value = config[key];
  // shell envs are weird
  if (typeof value === 'undefined' || value === 'undefined' || value === null || value === '' || value === 'false') {
    throw new Error('Missing configuration key ' + key);
  }
}

exports.default = _extends({}, config, { useCommit: useCommit });