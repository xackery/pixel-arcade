var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, '../deploy/html/js/'),
    filename: 'game.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../deploy/html'),
    publicPath: '../deploy/html/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      WS_URL: JSON.stringify("ws://localhost:9090/ws"),
      IS_DEBUG: JSON.stringify(true)
    })
  ]
};