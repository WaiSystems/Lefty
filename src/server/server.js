var express = require('express');
var path = require('path');

var app = express();

var distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at http://%s:%s', host, port);
});
