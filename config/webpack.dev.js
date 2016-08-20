var webpackMerge = require('webpack-merge');
var DashboardPlugin = require('webpack-dashboard/plugin');

var config = require('./webpack.common');

module.exports = webpackMerge(config, {
  plugins: [
    new DashboardPlugin()
  ]
});
