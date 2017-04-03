'use strict';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const DashboardPlugin = require('webpack-dashboard/plugin');
const isProduction = process.env.NODE_ENV === 'production';

let config = {
    entry: [
        './app/index.js',
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: isProduction ? false : true,
                        }
                    },
                    'postcss-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: isProduction ? 'compressed' : 'expanded',
                        }
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[ext]'
                }
            },
        ]
    },
    devServer: {
        contentBase: __dirname + '/build',
        hot: true,
        host: '0.0.0.0',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin(),
    ],
    // source map in ext file in production and cheap fast source maps in dev
    devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
    // do not continue on error
    bail: true,
};

// additional config for production build
if (isProduction) {
    // add polyfills
    config.entry.unshift('./config/polyfills');

    // do not use devServer or dev plugins
    delete config.devServer;
    config.plugins = [];
}

module.exports = config;
