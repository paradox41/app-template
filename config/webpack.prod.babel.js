const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.common.babel');

module.exports = webpackMerge(config, {
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.[hash:8].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      mangle: true,
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.[hash:8].js'
    }),
    new ExtractTextPlugin('[name].[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
