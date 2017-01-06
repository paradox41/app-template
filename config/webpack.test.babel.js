const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const autoprefixer = require('autoprefixer');

const helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [
        helpers.root('app')
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
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
      loader: 'html-loader',
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
    extensions: [
      '.js',
      '.json',
      '.html',
      '.scss'
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer];
        }
      }
    })
  ]
};
