const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // proxy: {
    //   '/api': {
    //     target: 'http://www.baidu.com/',
    //     pathRewrite: {'^/api' : ''},
    //     changeOrigin: true,     // target是域名的话，需要这个参数，
    //     secure: false,          // 设置支持https协议的代理
    //   },
    // }
  },
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns:['dist']}),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};