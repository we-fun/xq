'use strict'
const resolve = require('path').resolve
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const srcDir = resolve(__dirname, 'src')

module.exports = {

  entry: {
    'index.js': './src/index.js',
  },

  devtool: 'cheap-module-source-map',

  output: {
    pathinfo: true,
    path: 'dist',
    filename: '[name]',
    sourceMapFilename: '[name].map',
  },

  module: {
    preLoaders: [
      // { test: /\.js$/, include: srcDir, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.js$/, include: srcDir, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' }
    ],
  },

  resolve: {
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main', 'style'],
  },

  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"development"`
      }
    }),
  ],
}
