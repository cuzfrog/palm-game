const webpack = require('webpack');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const IgnoreNotFoundExportPlugin = require('./IgnoreNotFoundExportPlugin.js');

const packageJson = require('../package.json');

const config = {
  entry: {
    app: "./src/app/index.tsx"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, '../build/dist')
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src')
    },
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif|ico|ttf)$/,
        include: /src/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'public'
    }]),
    new IgnoreNotFoundExportPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        PACKAGE_VERSION: JSON.stringify(packageJson.version)
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      minify: false,
      meta: {
        keywords: packageJson.keywords.join(','),
      },
    }),
    new HtmlBeautifyPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  bail: process.env.NODE_ENV === 'CI',
};

module.exports = config;
