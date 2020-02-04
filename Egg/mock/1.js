let Mock = require('mockjs')

let result = Mock.mock({
  'code': 0,
  'message': '成功',
  'data|20': [{
    'id': '@id',
    'ip': '@ip',
    'name': '@cname',
    'userId': '@id',
    'stars|2': ['※'],
    'avatar': '@image()',
    'createAt': '@datetime'
  }]
})

console.log(result)