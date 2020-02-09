const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    see: './src/see.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', //and try chunkhash,contenthash
    chunkFilename: '[name].[contenthash].js', // 异步模块
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader'
        }
      ]
    }],
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin({
      // 替换掉base64，减少时间
      hashDigest: 'hex'
    }),
    // 增加css抽取
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // 进行chunkId的稳定
    new webpack.NamedChunksPlugin(
      chunk => chunk.name || Array.from(chunk.modulesIterable, m => m.id).join("_")
    )
  ],
  // 使用splitChunks默认策略拆包，同时提取runtime
  /*
  runtimeChunk非常的小，同时可预见的并不会有体积上的大变，所以可以考虑内联进html。
  This option enables smart code splitting. With this option, webpack 
  would automatically look for common code and extract it into separate files.
  */
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};

// 相同 hash 问题 fix：
/**
 * 1. chunkhash: 引入不同模块，相同模块生成 hash 不一致问题： 
 * 使用HashedModuleIdsPlugin 内置插件; 但存在 改变 css 会使入口文件 hash 变动的问题。
 * 
 * Fix：apply contenthash !!!
 * 解决的是，css模块修改后，js哈希值变动的问题。
 * 
 */