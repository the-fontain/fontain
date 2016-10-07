const fs = require('fs'),
    exec = require('child_process').execSync,
    path = process.cwd(),
    fontsFolder = path + '/fonts',
    changeCase = require('change-case'),
    Promises = require('bluebird'),
    request = Promises.promisifyAll(require('request')),
    css = require('css');

const packageJson = require('../package.json'),
    colors = require('./lib/colors'),
    utils = require('./lib/utils'),
    spinner = require('char-spinner');

let Fontain = new Function();

Fontain.prototype.default = function() {
    return ('Hey young padawan, please type a valid command.\n' +
        colors('message', '>> See more: https://github.com/the-fontain/fontain'));
};

Fontain.prototype.version = function() {
    return (
        colors('success', 'Fontain version: ' + packageJson.version)
    );
};

Fontain.prototype.fetchUrl = function(cssFile) {
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

Fontain.prototype.fetchFonts = function(fonts) {
    let self = this;
    console.log('Fonts to download:', colors('message', fonts.join(', ')));
    let googleFonts = 'https://fonts.googleapis.com/css?family=';

    return Promises.map(fonts, function(font) {
        let fontName = changeCase.titleCase(font);
        fontName = fontName.replace(/\s/g, "+")
        font = googleFonts + fontName.replace(/\s/g, "+");
        return request.getAsync({
                url: font,
                timeout: 3000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0',
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            })
            .spread(function(response, body) {
                let cssom = css.parse(body, {silent: false});
                let declarations = cssom.stylesheet.rules[0].declarations;
                let src = declarations.filter(function(item){
                    return (item.property === 'src');
                })[0].value;
                let url = src.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g) || [];
                return request.getAsync(url[0]).spread(function(res, b) {
                    let fontPath = fontsFolder + '/' + fontName + '.woff';
                    let stream = fs.createWriteStream(fontPath);
                    stream.write(b);
                    stream.end();
                }).then(function() {
                    console.log(colors('success', '[Downloaded]'), fontName);
                })
            })
    })
}

Fontain.prototype.install = function() {
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

module.exports = new Fontain();