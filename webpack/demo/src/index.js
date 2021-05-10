import './style/index.css'
import './style/less.less'
import './style/scss.scss'

console.log(1)
console.log('js文件中', process.env.NODE_ENV)

let logo = require('./assets/vue.webp')
let image = new Image()
image.src = logo
document.body.append(image)

