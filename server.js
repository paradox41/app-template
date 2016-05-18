var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config').BASE_CONFIG;

var compiler = webpack(config);

var server = new WebpackDevServer(compiler);

var port = 8080;

server.listen(port, 'localhost', function() {
  /*eslint no-console:"off"*/
  console.log(`Listening on port ${port}`);
});
