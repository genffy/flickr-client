/**
 * Created by genffy on 16/6/4.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    watch: true,
    entry: {
        react: "./web/app.js",
        vendors: ['react', 'react-dom','jquery','events']
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        path: path.join(__dirname, '/web/assets/'),
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
                    presets:  ["react","es2015", "es2015", "stage-0"]
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             screw_ie8: true,
    //             warnings: false
    //         },
    //         sourceMap: false,
    //         minimize: true
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.min.js',Infinity),
    //     new ExtractTextPlugin("styles.css"),
    // ]
};