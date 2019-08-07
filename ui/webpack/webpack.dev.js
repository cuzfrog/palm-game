const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
  mode: "development",
  devtool: 'cheap-source-map',
  devServer: {
      contentBase: path.resolve(__dirname, 'build/dist'),
      compress: true,
      port: 9000,
      host: '0.0.0.0',
      stats: {
          children: false,
      },
  },
  watchOptions: {
      ignored: [/node_modules/, /deprecated/, /tmp/, /coverage/, /build/]
  },
};

module.exports = merge(common, config);
