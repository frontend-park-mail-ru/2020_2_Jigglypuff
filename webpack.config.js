const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        "core-js/modules/es6.promise",
        "core-js/modules/es6.array.iterator",
        path.resolve(__dirname, 'src/index.js'),
    ],
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.hbs$/, use: 'handlebars-loader'},
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
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
