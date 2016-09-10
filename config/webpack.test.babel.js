const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const autoprefixer = require('autoprefixer');

const helpers = require('./helpers');

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
      ],
      query: {
        plugins: [
          ['istanbul', {
            'exclude': [
              '**/*.spec.js'
            ]
          }]
        ]
      }
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
