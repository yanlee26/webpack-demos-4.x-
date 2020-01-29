const path = require('path');
const MyFirstPlugin = require('./MyFirstPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[new MyFirstPlugin()]
};