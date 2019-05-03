const path = require('path');
const MyFirstPlugin = require('./MyFirstPlugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[new MyFirstPlugin()]
};