let path = require('path')
let HtmlWebpckPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
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
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader'
      //   },
      //   exclude: /node_modules/,
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],  //使用宽松模式
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
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
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  // 优化项
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,  // 是否启用缓存
        parallel: true, // 是否并发压缩
        sourceMap: true, // 是否开启sourceMap
      }), 
      new OptimizeCSSAssetsPlugin({})],
  },
}