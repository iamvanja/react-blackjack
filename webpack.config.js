'use strict';
var webpack = require('webpack');

var config = {
    entry: [
        './app/index.js',
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/build',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    // production-specific build options go here
}

module.exports = config;
