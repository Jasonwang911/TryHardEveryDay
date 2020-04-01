const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { IgnorePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bound.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      hash: true
    })
  ]
}