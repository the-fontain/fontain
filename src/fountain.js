const fs = require('fs');

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const packageJson = require('../package.json'),
    colors = require('./lib/colors'),
    utils = require('./lib/utils'),
    spinner = require('char-spinner');

let Fountain = new Function();

Fountain.prototype.default = function() {
    return ('Hey young padawan, please type a valid command.\n' +
        colors('message', '>> See more: https://github.com/the-fountain/fountain'));
};

Fountain.prototype.version = function() {
    return (
        colors('success','Fountain version: ' + packageJson.version)
    );
};

Fountain.prototype.install = function() {
    const path = process.cwd();
    let fountainConfigFile = path + '/fonts.json';
    if (!fs.existsSync(fountainConfigFile)) {
        utils.throwError('You doesn\'t have fonts.json file');
        return;
    }

    let config = require(fountainConfigFile);
    console.log('Fonts to download:', colors('message', config.fonts.join(', ')));
    rl.write();
    spinner();
};

module.exports = new Fountain();