var express = require('express');
var path = require('path');

var isDevelopment = (process.env.NODE_ENV !== 'production');

var app = express();

var distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at http://%s:%s', host, port);
});

if (isDevelopment) {
    // Webpack dev
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('../../config/webpack.js');

    new WebpackDevServer(webpack(config), {
        hot: true,
        historyApiFallback: true,
        proxy: {
            '*': 'http://localhost:3000'
        }
    }).listen(3001, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Webpack dev server is listening at localhost:3001');
    });
}