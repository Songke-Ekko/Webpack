const webpack = require("webpack")

const prodConfig = {
  mode: 'production'
}

module.exports = webpackMerge(baseConfig, prodConfig);