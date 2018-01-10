'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = preDeploy;

var _files = require('./utils/files.utils');

var _exp = require('./utils/exp.utils');

function preDeploy(suffix) {
  var pkg = (0, _files.readPackageJSON)();
  var name = (0, _exp.getExpPublishName)(pkg.name, suffix);
  var modified = _extends({}, pkg, {
    name: name,
    privacy: 'unlisted'
  });

  (0, _files.writePackageJSON)(modified);

  var app = (0, _files.readAppJSON)();
  if (app.expo) {
    app.expo = _extends({}, app.expo, {
      name: name,
      slug: name,
      privacy: 'unlisted'
    });
  } else {
    app = _extends({}, app, {
      name: name,
      slug: name,
      privacy: 'unlisted'
    });
  }

  (0, _files.writeAppJSON)(app);
}