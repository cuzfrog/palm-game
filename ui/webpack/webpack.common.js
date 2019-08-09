const webpack = require('webpack');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const IgnoreNotFoundExportPlugin = require('./IgnoreNotFoundExportPlugin.js');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const packageJson = require('../package.json');
const SRC_DIR = /src/;

const Rules = {
    loadTypescript: {
        test: /\.tsx?$/,
        include: SRC_DIR,
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
    loadResources: {
        test: /\.(png|svg|jpe?g|gif|ico|ttf)$/,
        include: SRC_DIR,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]'
        }
    },
};

const config = {
    entry: {
        app: "./src/app/index.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, '../build/dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        symlinks: false
    },
    module: {
        rules: Object.values(Rules)
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'public'
        }]),
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
        }),
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
                keywords : packageJson.keywords.join(','),
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
