import { initMixin } from './init'

function Vue(options) {
  this._init(options)
}
// 调用init.js中的initMixin()方法给Vue原型上添加方法
initMixin(Vue)

export default Vue