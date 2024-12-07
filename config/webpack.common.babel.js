import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
    entry: {
        index: path.resolve(__dirname, '..', './src/js/index.js'),
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            // {
            //     test: /\.(jpg|png)$/,
            //     use: {
            //         loader: 'url-loader'
            //     }
            // },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'webfonts',
                        publicPath: '../webfonts',
                    },
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        filename: './js/[name]-[contenthash:8].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Index',
            template: path.resolve(__dirname, '..', './src/index.html'),
            chunks: ['index']
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name]-[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {from: './src/assets', to: './assets'}
        //     ]
        // })
    ]



}