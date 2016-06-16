'use strict';

var fontr = require('./fontr'),
    verify = require('../utils').verify,
    commands = process.argv;

if (verify(['-v', '--version']))
    console.log(fontr.version());

else if (verify(['-h', '--help']))
    console.log(fontr.help());

else
    fontr.install(commands[2]);