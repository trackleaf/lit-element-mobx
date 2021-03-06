const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const argv = require('webpack-nano/argv')

const { mode = 'production' } = argv
const isProd = mode === 'production'
const DIST_DIR = 'dist'

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    favicon: path.resolve(__dirname, 'public/favicon.ico')
  })
]

const entry = ['./src/index.js']

if (isProd) {
  plugins.push(
    new StatsWriterPlugin({
      stats: {
        all: true
      }
    })
  )
} else {
  // dev
  plugins.push(
    new WebpackPluginServe({
      host: 'localhost',
      port: '8080',
      static: path.resolve(__dirname, DIST_DIR),
      liveReload: true,
      hmr: false,
      open: true
    })
  )

  // enable progress indicator
  entry.push('webpack-plugin-serve/client')
}

module.exports = {
  mode,
  entry,
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: { mobx: 'mobx/lib/mobx.es6.js' },
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  watch: mode === 'development',
  devtool: isProd ? 'source-map' : 'eval'
}
