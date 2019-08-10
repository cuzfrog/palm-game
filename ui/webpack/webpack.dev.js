const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const Rules = {
  loadTypescript: {
    test: /\.tsx?$/,
    include: /src/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
      },
    ]
  },
};

const config = {
  mode: "development",
  devtool: 'cheap-source-map',
  module: { rules: Object.values(Rules) },
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
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
    }),
  ],
};

module.exports = merge(common, config);
