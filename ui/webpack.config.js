const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_DIR = /src/;

const config = {
    entry: {
        app: "./src/index.tsx"
    },
    //externals: ['react', 'react-dom'],
    mode: "development",
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build/dist'),
        compress: true,
        port: 9000
    },
    watchOptions: {
        ignored: [/node_modules/, /deprecated/, /tmp/]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'build/dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: SRC_DIR,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
            },
            {
                test: /\.less/,
                include: SRC_DIR,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/,
                include: SRC_DIR,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'public'
        }]),
        new ForkTsCheckerWebpackPlugin({workers: 2}),
        new MiniCssExtractPlugin({filename: 'app.css'}),
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
    }
};

module.exports = config;