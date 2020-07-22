//  判断当前数据是不是对象
export function isObject(data) {
  return typeof data === 'object' &&  data !== null
}

// 定义一个不可枚举的对象
export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,   // 不可枚举
    configurable: false,  // 不可配置，不可修改
    value
  })
}