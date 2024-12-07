import path from 'path';
import {DefinePlugin} from 'webpack';
import Dotenv from 'dotenv-webpack';

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new Dotenv({
            path: path.resolve(__dirname, '..', '.env.production'),
        })
    ],

    performance: {
        hints: false
    }
}