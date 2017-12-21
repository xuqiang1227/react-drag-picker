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
      },
	    {
		    test: /\.svg/,
		    loader: "url-loader?limit=8000&mimetype=image/svg+xml"
	    },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=120000'
      }
    ]
  },
  externals: {
    'react': 'react'
  }
};
