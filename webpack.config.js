var path = require('path');

var webpack = require('webpack');

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
        filename: '[name].bundle.js',
        path: __dirname + '/build',
        publicPath: '/'
    },
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
        }],
        postLoaders: [{
            test: /\.js$/,
            exclude: [
                /node_modules/
            ],
            loader: 'ng-annotate'
        }]
    },
    resolve: {
        root: path.resolve(__dirname, 'app/'),
        extensions: ['', '.js', '.json', '.html'],
        alias: {
            common: 'common'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'process.env': {
                'NODE_ENV': process.env.NODE_ENV || 'development'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
