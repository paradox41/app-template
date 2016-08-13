var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var autoprefixer = require('autoprefixer');

var helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: [
        helpers.root('app')
      ]
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        helpers.root('app')
      ]
    }, {
      test: /\.html$/,
      loader: 'html',
      include: [
        helpers.root('app')
      ]
    }, {
      test: /\.json$/,
      loader: 'json',
      include: [
        helpers.root('app')
      ]
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }),
      include: [
        helpers.root('app')
      ]
    }],
    postLoaders: [{
      test: /\.js$/,
      loader: 'ng-annotate',
      include: [
        helpers.root('app')
      ]
    }]
  },
  resolve: {
    root: helpers.root('app'),
    extensions: [
      '',
      '.js',
      '.json',
      '.html',
      '.scss'
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new ExtractTextPlugin('[name].css')
  ],
  postcss: function() {
    return [autoprefixer];
  }
};
