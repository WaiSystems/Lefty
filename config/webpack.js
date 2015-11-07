var path = require('path');

module.exports = {  
  entry: { 
    javascript: path.resolve(__dirname, '../src/client/js/app.jsx'),
    html: path.resolve(__dirname, '../src/client/index.html'),
  },
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  }
};