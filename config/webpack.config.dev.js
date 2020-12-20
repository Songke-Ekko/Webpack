const webpack = require("webpack");

const devConfig = {
  mode: 'development',
};

module.exports = webpack.merge(baseConfig, devConfig)