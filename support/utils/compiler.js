const webpack = require('webpack');
const config = require('../../config/webpack.ssr.config');

const compiler = webpack(config);

exports.default = compiler;

exports.config = config;