const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new DynamicCdnWebpackPlugin(),
  ],
});
