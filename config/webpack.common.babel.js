const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');

const helpers = require('./helpers');

const pkg = require('../package.json');

module.exports = {
  devtool: 'source-map',
  context: helpers.root('app'),
  entry: {
    index: './index.js',
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    filename: '[name].bundle.js',
    path: helpers.root('build'),
    publicPath: ''
  },
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
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    }),
    new CopyWebpackPlugin([{
      from: '*.{tff,woff,woff2,ico,txt,png,svg,jpg,jpeg,json}'
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new ExtractTextPlugin('[name].css')
  ],
  postcss: function() {
    return [autoprefixer];
  }
};
