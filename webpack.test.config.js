var webpack = require('webpack');

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var baseConfig = require('./webpack.config.js');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders: baseConfig.module.loaders
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ProgressBarPlugin()
    ]
};
