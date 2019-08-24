const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

const Rules = {
  loadTypescript: {
    test: /\.tsx?$/,
    include: /src/,
    use: [
      {
        loader: 'ts-loader',
      },
    ]
  },
};

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: { rules: Object.values(Rules) },
  plugins: [
    new CleanWebpackPlugin(),
    new DynamicCdnWebpackPlugin(),
  ],
});
