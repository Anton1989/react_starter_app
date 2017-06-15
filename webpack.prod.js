var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var core_url = process.env.CORE_URL ? process.env.CORE_URL : '/';

module.exports = {
    entry: [
        './frontend/index'
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: process.env.NODE_MODE == "executive" ? 'bundle-prod.ex.js' : 'bundle-prod.js',
        publicPath: '/dist'
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
            asset: process.env.NODE_MODE == "executive" ? 'bundle-prod.ex.js.gz' : 'bundle-prod.js.gz',
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // both .js and .jsx
                include: path.resolve(__dirname, 'frontend'),
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
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    }
}
