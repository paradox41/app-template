const webpackMerge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = require('./webpack.common.babel');

module.exports = webpackMerge(config, {
  plugins: [
    new DashboardPlugin()
  ]
});
