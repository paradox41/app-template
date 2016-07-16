var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.config');

module.exports = webpackMerge(config, {
  devtool: '',
  output: {
    filename: '[name].bundle.[hash:8].js'
  },
  plugins: [
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
  ]
});
