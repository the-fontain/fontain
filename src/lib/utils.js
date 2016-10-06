var colors = require('./colors');

exports.verify = function(args) {
	var input = process.argv[2];
	
    if (typeof args === 'object') {
        if (args.indexOf(input) == -1)
            return false;

        return true;
    } else {
        if (args != input)
            return false;
            
        return true;
    }
};

exports.throwError = function(err) {
    console.log(colors('error', 'Fontain Error: ' + err ));
}