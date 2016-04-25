var webpack = require('webpack');

var baseConfig = require('./webpack.config.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = Object.assign(baseConfig, {
  devtool: '',
  debug: false,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      mangle: true,
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    }),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[hash:8].js'),
    new ExtractTextPlugin('[name].[hash:8].css'),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    })
  ],
  output: {
    filename: '[name].bundle.[hash:8].js',
    path: `${__dirname}/build`,
    publicPath: ''
  }
});
