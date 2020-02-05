const express = require('express')
const Mock = require('mockjs')

let app = express()
app.get('/news', function (req, res) {
  const result = Mock.mock({
    'code': 0,
    'message': '成功',
    [`data|${req.query.limit}`]: [{
      'id': '@id',
      'title': '@csentence',
      'ip': '@ip',
      'name': '@cname',
      'userId': '@id',
      'stars|2': ['※'],
      'image': '@image(600x300)',
      'url': '@url',
      'createAt': '@datetime'
    }]
  })
  res.json(result)
})

app.get('/cache', function (req, res) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.json({
    title: '服务器返回的新闻标题' + Date.now()
  })
})

app.listen(3000)