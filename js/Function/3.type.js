/*
 * @Author: Jason wang
 * @Date: 2019-12-24 13:21:49
 * @Descripttion: 数据类型判断 -- 高阶函数预制参数 原理和bind类似   
 *  相当于变量私有化
 */

// 判断数据类型 
// typeof(只能判断除了null以外的原始类型) instanceof（只能判断谁是谁的实例） contructor（只有类上才有） Object.prototype.toSring.call（无法区分到底属于谁）

// 变量保存在函数内部不销毁----闭包，可以在任何作用域调用, type不会被销毁
function isType(type) {
  // return Object.prototype.toString.call(content) == `[object ${type}]`
  return (content) => {
    return Object.prototype.toString.call(content) == `[object ${type}]`
  }
}

// isString   isArray  isBoolean
let types = ['String', 'Number', 'Boolean', 'Null', 'Undefined']
let utils = {}
for(let i = 0; i < types.length; i++) {
  let type = types[i]
  utils[`is${type}`] = isType(type)  // utils.isString = functioin  
}

let flag = utils.isString('hello')
console.log(flag)