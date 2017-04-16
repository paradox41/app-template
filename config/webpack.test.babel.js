const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const autoprefixer = require('autoprefixer');

const helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: [helpers.root('app')],
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
                    exclude: ['**/*.spec.js'],
                  },
                ],
              ],
            },
          },
        ],
        include: [helpers.root('app')],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        include: [helpers.root('app')],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
        include: [helpers.root('app')],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.html', '.scss'],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new StyleLintPlugin({
      syntax: 'scss',
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer];
        },
      },
    }),
  ],
};
