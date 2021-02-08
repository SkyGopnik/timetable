// require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/js/index.jsx'),
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Caching'
    })
  ],
  output: {
    path: path.join(__dirname, '/www'),
    filename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // получает имя, то есть node_modules/packageName/not/this/part.js
            // или node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // имена npm-пакетов можно, не опасаясь проблем, использовать
            // в URL, но некоторые серверы не любят символы наподобие @
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  performance: {
    hints: false
  }
};
