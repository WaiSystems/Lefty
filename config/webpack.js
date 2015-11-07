var path = require('path');
var webpack = require('webpack');

module.exports = {  
  entry: [ 
    'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors

    path.resolve(__dirname, '../src/client/js/app.jsx'),
    path.resolve(__dirname, '../src/client/index.html'),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "../src")
        ],
        loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin() 
  ]
};