const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const config = require('./webpack.common.babel');

module.exports = webpackMerge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
});
