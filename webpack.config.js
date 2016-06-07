var path = require('path');

var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var autoprefixer = require('autoprefixer');

var pkg = require('./package.json');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  debug: true,
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './index.js',
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: ''
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: [
        path.resolve(__dirname, 'app')
      ]
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.resolve(__dirname, 'app')
      ]
    }, {
      test: /\.html$/,
      loader: 'html',
      include: [
        path.resolve(__dirname, 'app')
      ]
    }, {
      test: /\.json$/,
      loader: 'json',
      include: [
        path.resolve(__dirname, 'app')
      ]
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]),
      include: [
        path.resolve(__dirname, 'app')
      ]
    }],
    postLoaders: [{
      test: /\.js$/,
      loader: 'ng-annotate',
      include: [
        path.resolve(__dirname, 'app')
      ]
    }]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'node_modules')
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'app'),
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new ExtractTextPlugin('[name].css')
  ],
  postcss: function() {
    return [autoprefixer];
  }
};
