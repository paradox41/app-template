var webpack = require('webpack');

var BASE_CONFIG = require('./webpack.config').BASE_CONFIG;

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: BASE_CONFIG.module.loaders
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
