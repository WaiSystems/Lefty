Lefty
=====
# Building
```
npm install
npm run build
```

"build" will pack the source files (using webpack and babel) to the dist folder.

# Starting the server
```
npm run start - Starts server.js with node

npm run start-dev-server - Starts server.js with nodemon
npm run start-dev-hot-reload - Starts webpack-dev-server with hot reloading
npm run start-dev - Starts both of the above in new console windows
```
* Normal server will be listening at localhost:3000
* Webpack dev server with hot reloading will be listening at localhost:3001, and will proxy requests to locatlhost:3000. 