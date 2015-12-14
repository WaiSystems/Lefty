'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const SessionManager = require('./session-manager');

// Consts
const DEFAULT_PORT = 3000;
const ROUTES_SUB_FOLDER = '/routes';
const WEBPACK_OUTPUT_PATH = '../../dist';

// Initialize our express app to support json POSTs
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from Webpack's output folder
const distPath = path.resolve(__dirname, WEBPACK_OUTPUT_PATH);
app.use(express.static(distPath + '/'));

// Load all routes from the "routes" folder
var routes = require('require-all')(__dirname + ROUTES_SUB_FOLDER);
Object.keys(routes).forEach(function(routeName) {
    console.log('Registering route ' + routeName);
    app.use('/' + routeName, routes[routeName]);
});

// Start the server
let server = app.listen(process.env.PORT || DEFAULT_PORT, function () {
  const host = server.address().address;
    const port = server.address().port;

  console.log('Server is listening at http://%s:%s', host, port);
});

// Initialize the session manager (and socket handling)
const socketEventHandlers = require('./socketEventHandlers');
SessionManager.initialize(server, socketEventHandlers);
