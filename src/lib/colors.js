var suportColors = (process.env ? require('supports-color') : null),
    useColors = (suportColors && true);

var colorsOptions = {
  'success': 92, 'error': 91, 'message': 93
};

function Colors(color, message) {
  if (!useColors) return String(str);
  return '\u001b[' + colorsOptions[color] + 'm' + message + '\u001b[0m';
}

module.exports = Colors;