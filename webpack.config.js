const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')

const htmlPlugin = new HtmlWebpackPlugin({
  template: './html/index.html',
})

const webpackConfig = {
  devtool: 'source-map',
  context: config.APP,
  entry: [
    config.SRC,
  ],
  output: {
    filename: 'bundle.js',
    path: config.BUILD,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    htmlPlugin,
  ],
}

module.exports = webpackConfig
