var pJson = require('../package.json'),
    core = require('./utils'),
    spinner = require('char-spinner'),
    installing = false;

var Fountain = new Function();

Fountain.prototype.default = function() {
    return ('Hey young padawan, please type a valid command.\n' +
        '>> To see all commands, use: fountain [ -h, --help ]');
};

Fountain.prototype.version = function() {
    return ('Fountain version: ' + pJson.version);
};