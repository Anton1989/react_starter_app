const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './frontend/index'
    ],
    output: {
        path: path.join(__dirname, '/backend/static/bundle'),
        filename: 'bundle-prod.js',
        publicPath: '/backend/static/bundle'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false,
            sourceMap: false,
            mangle: true,
            minimize: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CompressionPlugin({
            asset: 'bundle-prod.js.gz',
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new ExtractTextPlugin("../css/styles.css")
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // both .js and .jsx
                include: path.resolve(__dirname, 'frontend'),
                exclude: [/\.scss$/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['transform-runtime']
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    }
}
