import { arrayMethods } from './array.js'
import { isObject, def } from '../utils/index.js'

class Observer{
  constructor(value) {
    // vue如果数据的层侧太多，需要递归去解析对象中的属性，依次增加set和get方法
    // 在被观测的属性上添加一个 __ob__属性，指向Observer这个类，然后被观测的对象身上就能通过 __ob__ 调用Observer类上的方法了
    // value.__ob__ = this
    def(value, '__ob__', this)
    if(Array.isArray(value)) {
      // 如果是数组的话并不会对索引进行观测，会导致性能问题
      // 前端开发中很少直接操作索引 push  shift  unshift  等方法需要重写
      value.__proto__ = arrayMethods
      // 如果数组中放置的是对象，需要在进行观测
      this.observerArray(value)
    }else {
      this.walk(value)
    }
  }
  // 对数组中的每一项进行观测
  observerArray(value) {
    for(let i = 0; i < value.length; i++) {
      observe(value[i])
    }
  }
  walk(data) {
    let keys = Object.keys(data)  // [name, age, address]
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive(data, key, value) {
  // 递归劫持 observe函数中判断了如果不是对象就直接返回
  observe(value)
  // 在获取值和设置值得时候做依赖收集
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if(newValue === value) return 
      console.log('值发生变化了', newValue)
      observe(newValue)   //  如果直接修改数据为新对象，需要继续劫持新对象---深度劫持
      value = newValue
    }
  })
}

// 把data中的属性都使用 Object.defineProperty() 重新定义一遍
export function observe(data) {
  let isObj = isObject(data)
  if(!isObj) {
    return 
  }
  // 用来观测诗句
  return new Observer(data)
}