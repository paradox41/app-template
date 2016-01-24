var webpack = require('webpack');

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    module: {
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
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'process.env': {
                'NODE_ENV': process.env.NODE_ENV || 'development'
            }
        }),
        new webpack.NoErrorsPlugin(),
        new ProgressBarPlugin()
    ]
};
