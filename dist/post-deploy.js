'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = postDeploy;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _files = require('./utils/files.utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _log = require('./utils/log.utils');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function postDeploy() {
  var expUrl = 'https://expo.io/@' + _config2.default.expUsername + '/' + (0, _files.readPackageJSON)().name;
  var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + expUrl;
  var issueUrl = 'https://' + _config2.default.githubUsername + ':' + _config2.default.githubToken + '@api.github.com/repos/' + _config2.default.githubOrg + '/' + _config2.default.githubRepo + '/issues/' + _config2.default.githubPullRequestId + '/comments';
  var typeDeploy = _config2.default.useCommit;

  (0, _log2.default)('Exponent URL', expUrl);
  (0, _log2.default)('GitHub Issue URL', issueUrl);
  (0, _log2.default)('QR Code URL ', qrUrl);

  var body = '\n  :shipit: This ' + typeDeploy + ' has been deployed to:\n  ' + expUrl + '\n\n  Download the [Expo](https://expo.io/) app and scan this QR code to get started!\n\n  ![QR Code](' + qrUrl + ')\n  ';

  _request2.default.post({
    url: issueUrl,
    headers: { 'User-Agent': 'ci' },
    body: JSON.stringify({ body: body })
  }, function (error, response) {
    if (error) {
      console.error('Failed to post comment to GitHub, an error occurred', error);
    } else if (response.statusCode >= 400) {
      console.error('Failed to post comment to GitHub, request failed with', response);
    } else {
      console.log('Posted message to GitHub PR #' + _config2.default.githubPullRequestId);
    }
  });
}