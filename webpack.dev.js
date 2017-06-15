var path = require('path');
var webpack = require('webpack');
var core_url = process.env.CORE_URL ? process.env.CORE_URL : '/';

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './frontend/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-dev.js',
        publicPath: core_url+'dist'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // both .js and .jsx
                include: path.resolve(__dirname, 'frontend'),
                enforce: 'pre',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                exclude: [/node_modules/],
                include: [
                    path.resolve(__dirname, "frontend"),
                ],
                loader: 'react-hot-loader'
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    }
}
