import path from 'path'
import {exitPath} from './utils'

// console.log()
// console.log(exitPath(path.resolve('.')))

path.resolve('.')
exitPath(path.resolve('.'))

(async function() {
  await new Promise(resolve => setTimeout(resolve, 2000))
})()
