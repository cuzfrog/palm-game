const webpack = require('webpack');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnoreNotFoundExportPlugin = require('./IgnoreNotFoundExportPlugin.js');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                },
            },
        ]
    },
    loadCss: {
        test: /\.less/,
        include: SRC_DIR,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: "[local]_[hash:base64:4]",
                }
            },
            "postcss-loader",
            "less-loader",
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
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'build/dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".less"],
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
            workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
            tslint: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        // new BundleAnalyzerPlugin(),
        new IgnoreNotFoundExportPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                PACKAGE_VERSION: JSON.stringify(require('./package.json').version)
            }
        }),
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
};

module.exports = config;