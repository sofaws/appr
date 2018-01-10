#!/usr/bin/env node
'use strict';

var _spawn = require('./utils/spawn.utils');

var _spawn2 = _interopRequireDefault(_spawn);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _log = require('./utils/log.utils');

var _log2 = _interopRequireDefault(_log);

var _preDeploy = require('./pre-deploy');

var _preDeploy2 = _interopRequireDefault(_preDeploy);

var _postDeploy = require('./post-deploy');

var _postDeploy2 = _interopRequireDefault(_postDeploy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localExp = './node_modules/exp/bin/exp.js';

(0, _log2.default)('Logging into Expo...');

var suffix = void 0;
_config2.default.useCommit ? suffix = _config2.default.githubCommitId : suffix = _config2.default.githubSourceBranch;

(0, _spawn2.default)(localExp, ['login', '-u', _config2.default.expUsername, '-p', _config2.default.expPassword, '--non-interactive'], function (loginError) {
  if (loginError) {
    throw new Error('Failed to log into Expo');
  } else {
    (0, _log2.default)('Logged into Expo.');
    (0, _log2.default)('Preparing project for publish...');
    (0, _preDeploy2.default)(suffix);
  }

  (0, _log2.default)('Publishing project into Expo.');
  (0, _spawn2.default)(localExp, ['publish'], function (publishError) {
    if (publishError) {
      throw new Error('Failed to publish package to Expo');
    } else {
      (0, _log2.default)('Published project.');
      (0, _log2.default)('Notifying GitHub...');
      (0, _postDeploy2.default)();
    }
  });
});