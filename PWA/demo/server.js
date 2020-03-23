// let fs = require('fs')

// let json = []

// for(let i = 0; i<80; i++) {
//   json.push(`https://www.fullstackjavascript.cn/conan/${i}.jpeg`)
// }
// fs.writeFileSync('data.json', JSON.stringify(json))

let express = require('express')
let app = express()
let json = require('./data.json')

app.use(express.static(__dirname))
app.get('/api/img', (req, res) =>{
  let start = Math.round(Math.random()*(json.length-20))
  res.json(json.slice(start, start+20))
})
app.listen(30001)