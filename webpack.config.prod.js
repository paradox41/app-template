var webpack = require('webpack');

var config = require('./webpack.config');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

const BASE_CONFIG = config.BASE_CONFIG;
const BASE_PLUGINS = config.BASE_PLUGINS;

module.exports = Object.assign(BASE_CONFIG, {
  devtool: '',
  debug: false,
  plugins: BASE_PLUGINS.concat([
    new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      mangle: true,
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[hash:8].js'),
    new ExtractTextPlugin('[name].[hash:8].css')
  ]),
  output: {
    filename: '[name].bundle.[hash:8].js',
    path: `${__dirname}/build`,
    publicPath: ''
  }
});
