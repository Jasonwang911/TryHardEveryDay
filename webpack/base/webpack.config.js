let path = require('path')
let HtmlWebpckPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'boundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 7900,
    progress: true,
    contentBase: './dist',
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'top'
            }
          },
        'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpckPlugin({
      template: './public/index.html',
      filename: 'index.html',
      // 压缩
      minify: {
        // 删除双引号
        removeAttributeQuotes: true,
        // 折叠空行
        collapseWhitespace: true
      },
      // 添加hash
      hash: true
    })
  ]
}