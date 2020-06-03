var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Px2remWebpackPlugin = require('qg-px2rem-webpack');
var env = config.build.env;
var packageJson = require('../package.json');


var banner =
  '/*!\n' +
  ' * QG Vue Components 2.0 v' + packageJson.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Myron Liu \n' +
  ' * Released under the MIT License.\n' +
  ' */';

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.js'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('qg-vue-components.js'),
    library: 'qgVueComponents',
    libraryTarget: 'umd'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs2: 'vue',
      amd: 'vue',
      commonjs: 'vue'
    },
    vuex: {
      root: 'Vuex',
      commonjs2: 'vuex',
      amd: 'vuex',
      commonjs: 'vuex'
    }
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new Px2remWebpackPlugin({originScreenWidth: 375}),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('qg-vue-components.css')),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
