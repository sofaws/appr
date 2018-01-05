'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpPublishName = getExpPublishName;
function getExpPublishName(packageName, branchName) {
  return (packageName + '-' + branchName).replace(/[^a-zA-Z0-9\\-]/, '-');
}