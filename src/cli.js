var Fountain = require('./fontain'),
    verify = require('./lib/utils').verify,
    commands = process.argv;

if (verify(['-v', '--version']))
    console.log(Fountain.version());

else if (typeof commands[2] != 'undefined') {
	if (~commands.indexOf('install') || ~commands.indexOf('i'))
    	Fountain.install();
    else
        console.log(Fountain.default());
} else {
    console.log(Fountain.default());
}