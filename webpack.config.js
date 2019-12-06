const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('webpack-nano/argv')
//const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const { mode = 'production' } = argv

module.exports = {
  mode,
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    alias: {}
  },
  watch: mode === 'development'
}
