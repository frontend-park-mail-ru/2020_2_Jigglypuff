const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
        sw: path.resolve(__dirname, 'src/services/ServiceWorker.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (pathData) => {
            return pathData.chunk.name === 'bundle' ? 'index.js' : 'sw.js';
        },
        publicPath: '/static/',
    },
    devServer: {
        hot: true,
        port: 3001,
        historyApiFallback: true,
        contentBase: [path.join(__dirname, 'dist')],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './public/img',
                to: 'img',
            }],
        },
        ),
    ],
};
