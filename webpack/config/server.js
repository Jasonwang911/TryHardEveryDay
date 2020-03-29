const express = require('express')
const webpack = require('webpack')
let app = express() 
// 中间件
const middle = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

let comiler = webpack(config)

app.use(middle(comiler))

app.get('/api/user', (req, res ) => {
  res.json('hello')
})

app.listen(3000, () => {
  console.log('server is running at port 3000')
})