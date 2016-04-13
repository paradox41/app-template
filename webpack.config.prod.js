var webpack = require('webpack');

var baseConfig = require('./webpack.config.js');

var plugins = baseConfig.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        mangle: true,
        compress: {
            conditionals: false,
            dead_code: false,
            drop_debugger: true,
            drop_console: true,
            unused: false
        }
    })
]);

module.exports = Object.assign(baseConfig, {
    devtool: '',
    debug: false,
    plugins: plugins
});
