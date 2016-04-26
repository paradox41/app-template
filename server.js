var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.js');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler);

var port = 8080;

server.listen(port, 'localhost', function() {
  console.log(`Listening on port ${port}`);
});
