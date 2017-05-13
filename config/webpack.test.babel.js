const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'istanbul',
                  {
                    exclude: ['**/*.spec.js']
                  }
                ]
              ]
            }
          }
        ],
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
  plugins: [new LodashModuleReplacementPlugin(), new ExtractTextPlugin('[name].css')]
};
