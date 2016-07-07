var path = require('path');
var webpack = require('webpack');

var config = require('./webpack.config');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = Object.assign(config, {
  devtool: '',
  output: {
    filename: '[name].bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: ''
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    }),
    new CopyWebpackPlugin([{
      from: '*.{tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json}'
    }]),
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
