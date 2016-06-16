'use strict';

var packageJson = require('../package.json'),
    utils = require('../utils');

var Fontr = new Function();

Fontr.prototype.version = function () {
    return ('native-css version: ' + packageJson.version)
}

Fontr.prototype.help = function () {
    return 0;
}

module.exports = new Fontr();
