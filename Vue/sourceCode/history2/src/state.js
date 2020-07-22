import { observe } from './observe/index.js'

export function initState(vm) {
  const opts = vm.$options
  // Vue的数据来源  属性 方法 数据 计算属性 watch 依次初始化
  if(opts.props) {
    initProps(vm)
  }
  if(opts.methods) {
    initMethod(vm)
  }
  if(opts.data) {
    initData(vm)
  }
  if(opts.computed) {
    initComputed(vm)
  }
  if(opts.watch) {
    initWatch(vm)
  }
}

function initProps() {}

function initMethod() {}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(this) : data
  console.log(data)
  // 对象劫持，用户改变了数据，可以得到通知。 MVVM模式，数据变化可以驱动师徒变化
  // Object.defineProperty() 给属性增加get和set方法，也是响应式原理的主要代码
  observe(data)
}

function initComputed() {}

function initWatch() {}