'use strict';

let path = require('path');

console.log(path.join(__dirname, './src'));

module.exports = {
  entry: {
	  DragPicker: './src/DragPicker.jsx'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, './src')]
      }
    ]
  },
  externals: {
    'react': 'react'
  }
};
