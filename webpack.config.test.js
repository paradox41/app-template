var webpack = require('webpack');

var baseConfig = require('./webpack.config');

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: baseConfig.module.loaders
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
