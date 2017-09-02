const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpackConfig.plugins.push(
  new webpack.NamedModulesPlugin()
)

webpackConfig.entry.splice(1, 0, 'react-hot-loader/patch')

module.exports = webpackConfig
