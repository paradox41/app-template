const path = require('path');
const _root = path.resolve(__dirname, '..');

function root(...args) {
  return path.join.apply(path, [_root, ...args]);
}

exports.root = root;
