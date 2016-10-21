const webpack = require('webpack');

module.exports = {
  entry: "./lib/advanced_sprinter.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
