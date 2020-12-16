const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
        sw: path.resolve(__dirname, 'src/services/ServiceWorker.js')
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            consts: path.resolve(__dirname, 'src/consts/'),
            'index.scss': path.resolve(__dirname, 'public/css/index.scss'),
            models: path.resolve(__dirname, 'src/models/'),
            services: path.resolve(__dirname, 'src/services/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            view: path.resolve(__dirname, 'src/view/'),
            viewmodels: path.resolve(__dirname, 'src/viewmodels/'),
        },
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-optional-chaining'],
                    }
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/noInternet.html'),
            filename: "noInternet.html",
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './public/img',
                to: 'img',
            }],
        }),
    ],
};
