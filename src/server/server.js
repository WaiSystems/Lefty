'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var SessionManager = require('./session-manager');

// Consts
var DEFAULT_PORT = 3000;

// Initialize our express app to support json POSTs
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from Webpack's output folder
var distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath + "/"));

// Load all routes from the "routes" folder
var routes = require('require-all')(__dirname + '/routes');
Object.keys(routes).forEach(function(routeName) {
    console.log('Registering route ' + routeName);
    app.use('/' + routeName, routes[routeName]);
});

// Start the server
var server = app.listen(process.env.PORT || DEFAULT_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at http://%s:%s', host, port);
});

// Initialize the session manager (and socket handling)
var socketEventHandlers = require('./socketEventHandlers');
SessionManager.initialize(server, socketEventHandlers);
