var _ = require('lodash');

var baseConfig = require('./webpack.config');

var config = {
    output: {
        path: __dirname + '/app'
    }
};

_.defaultsDeep(config, baseConfig);

module.exports = config;
