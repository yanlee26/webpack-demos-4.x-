const path = require('path');
const MyFirstPlugin = require('./MyFirstPlugin');

module.exports = {
  entry: './src/index.js',
  watch:true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[new MyFirstPlugin()],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module:{
    rules:[{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test:/\.js$/,
      use:path.resolve(__dirname,'drop-console.js')
      },
    ]
  }
};