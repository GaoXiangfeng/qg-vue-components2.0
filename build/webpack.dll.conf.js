/**
 * Created by wangze on 2017/3/22.
 */
const path = require('path');
const webpack = require('webpack');
var config = require('../config')
var utils = require('./utils')

module.exports = {
    entry: {
        vendor: ['vue', 'vue-router', 'vue-resource', 'vuex', 'qg-vue-components2', 'es6-promise', 'fastclick']
    },
    output: {
        path: path.join(__dirname, "../dll"),
        filename: "[name]-"+new Date().getTime()+".js",
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "[name]-manifest.json"),
            name: '[name]_library',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
};