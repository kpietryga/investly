import path from 'path';
import {DefinePlugin} from 'webpack';
import Dotenv from 'dotenv-webpack';

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        port: 3000,
        open: true
    },
    plugins: [
        // Tak definiujesz zmienne srodowiskowe bezposrednio w pliku konfiguracyjnym
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // Tak okreslasz plik, w ktorym znajduja sie zmienne srodowiskowe
        new Dotenv({
           path: path.resolve(__dirname, '..', '.env.development'),
        })
    ]
}