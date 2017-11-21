const path = require('path');
const webpack = require('webpack');

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
        publicPath: '/dist'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
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
                exclude: [/node_modules/,/\.scss$/],
                include: [
                    path.resolve(__dirname, 'frontend'),
                ],
                loader: 'react-hot-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                    query: {
                        sourceMap: 1
                    }
                }, {
                    loader: 'css-loader',
                    query: {
                        importLoaders: 1,
                        modules: 1
                    },
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.resolve(__dirname, '../src/frontend')],
                        sourceMap: true
                    }
                }]
            }
        ]
    }
}