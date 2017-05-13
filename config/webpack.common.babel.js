const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

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
    rules: [
      {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: [helpers.root('app')]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [helpers.root('app')]
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        include: [helpers.root('app')]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.html', '.css']
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new ExtractTextPlugin('[name].css')
  ]
};
