'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spawn;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _log = require('./utils/log.utils');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Spawn a child process with a callback when the process exits
 */
function spawn(task, args, onClose) {
  var child = _child_process2.default.spawn(task, args, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('error', function (error) {
    (0, _log2.default)(error);
  });
  child.on('close', function (code) {
    onClose(code);
  });
}