var path = require('path');

var webpack = require('webpack');

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-inline-source-map',
    debug: true,
    context: __dirname + '/app',
    entry: {
        index: './index.js',
        vendor: [
            'angular',
            'angular-ui-router',
            'lodash'
        ]
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [
                /\.(spec)\.js$/,
                /node_modules/
            ],
            loader: 'babel-loader'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html-loader'
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        root: path.resolve(__dirname, 'app/'),
        extenstions: ['', '.js', '.json', '.html'],
        alias: {
            common: 'common'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ProgressBarPlugin()
    ]
};
