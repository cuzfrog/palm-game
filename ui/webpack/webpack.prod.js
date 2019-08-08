const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'rxjs': 'rxjs',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
