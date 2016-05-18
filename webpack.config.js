var path = require('path');

var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  debug: true,
  context: `${__dirname}/app`,
  entry: {
    index: './index.js',
    vendor: [
      'angular',
      'angular-ui-router',
      'lodash'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/build`,
    publicPath: ''
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: [
        /node_modules/
      ]
    }],
    loaders: [{
      test: /\.js$/,
      exclude: [
        /node_modules/
      ],
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ])
    }],
    postLoaders: [{
      test: /\.js$/,
      exclude: [
        /node_modules/
      ],
      loader: 'ng-annotate'
    }]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules')]
  },
  resolve: {
    root: path.resolve(__dirname, 'app/'),
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    })
  ],
  postcss: function() {
    return [autoprefixer];
  }
};
