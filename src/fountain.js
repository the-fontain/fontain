const fs = require('fs'),
    exec = require('child_process').execSync,
    path = process.cwd(),
    fontsFolder = path + '/fonts',
    changeCase = require('change-case'),
    Promises = require('bluebird'),
    request = Promises.promisifyAll(require('request')),
    css = require('css');

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
        colors('success', 'Fountain version: ' + packageJson.version)
    );
};

Fountain.prototype.fetchUrl = function(cssFile) {
    return new Promise(function(resolve, reject) {
        fetch(cssFile, function(err, meta, body) {
            if (err) throw err;
            try {
                resolve(body.toString());
            } catch (err) {
                reject(err);
            }
        });
    });
}

Fountain.prototype.fetchFonts = function(fonts) {
    let self = this;
    console.log('Fonts to download:', colors('message', fonts.join(', ')));
    let googleFonts = 'https://fonts.googleapis.com/css?family=';

    return Promises.map(fonts, function(font) {
        font = changeCase.titleCase(font);
        font = googleFonts + font.replace(/\s/g, "+");
        console.log(font);
        return request.getAsync({
                url: font,
                timeout: 3000,
                headers: {
                    'User-Agent': 'Firefox 36.0 Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0',
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            })
            .spread(function(response, body) {
                console.log(body);
            })
    });
}

Fountain.prototype.install = function() {
    let configFile = path + '/fonts.json';

    if (!fs.existsSync(configFile)) {
        utils.throwError('You doesn\'t have fonts.json file');
        return;
    }

    exec('rm -rf ' + fontsFolder);
    fs.mkdirSync(fontsFolder);

    let config = require(configFile);
    this.fetchFonts(config.fonts, process.exit);
    spinner();
};

module.exports = new Fountain();