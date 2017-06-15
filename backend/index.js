import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './config';
//Custome middlewares
import ServerRenderingMiddleware from './middleware/serverSideRendering';
import setBundleHeaders from './middleware/setBundleHeaders';

var app = new express();
const host = process.env.NODE_ENV == 'development' ? config.server.develope : config.server.host;
const port = config.server.port;
var webpackConfig = null;
if (process.env.NODE_ENV == 'development') {
    webpackConfig = require('../webpack.dev');
} else {
    webpackConfig = require('../webpack.prod');
}
var compiler = webpack(webpackConfig);

if (process.env.NODE_ENV == 'production') {
    app.use('*.js', setBundleHeaders); // USE GZIP COMPRESSION FOR PRODUCTION BUNDLE
    app.use('/dist', express.static(__dirname + '/../dist'));
} else {
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}
app.use('/css', express.static(__dirname + '/static/css'));
app.use('/images', express.static(__dirname + '/static/images'));
app.use('/favicon.ico', express.static(__dirname + '/static/images/favicon.ico'));
app.use(ServerRenderingMiddleware);

app.listen(config.server.port, config.server.host, function(error) {
    if (error) {
        console.error('APP ERROR:');
        console.error(error);
    } else {
        console.info('==> 🌎 Web APP listening on port %s. Open up http://%s:%s/ in your browser.', config.server.port, config.server.host, config.server.port);
    }
});