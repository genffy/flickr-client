/**
 * Created by genffy on 16/6/4.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        react: "./web/app.js"
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        path: path.join(__dirname, '/web/assets/'),
        publicPath: '/assets/'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['', '.scss', '.ts', '.webpack.js', '.web.js', '.js']
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets:  ["react","es2015", "es2015", "stage-0", "react-hmre"]
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            /*{
                test: /\.css/,
                include: path.join(__dirname, 'src'),
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.ts$/,
                // loader: 'ts-loader'
                loader: 'awesome-typescript-loader'
            }*/
        ]
    }
};