// 重写是数组的方法是会导致数组本身发生变化的方法： push shift unshift pop resverse sort splice
// slice() 等方法不会导致数组本身发生变化，所以不需要重写

// 先把数组原型上的真实方法都存起来
let oldArrayMethods = Array.prototype
// 创建新的数组的方法，并且可以通过 arrayMethods.__proto__ = oldArrayMethods 找到原来数组上的方法
// 这样延长了原型链，用户调用数组的方法，会通过  value.__proto__ = arrayMethods 查找 arrayMethods 上的7个方法，其他的方法在 arrayMethods 上面不能找到，便会通过原型链 __proto__ 继续向上查找到oldArrayMethods  从而得到调用
export let arrayMethods = Object.create(oldArrayMethods)

const methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'resverse',
  'sort',
  'splice'
]

methods.forEach(method => {
  // AOC 面向切片编程
  arrayMethods[method] = function(...args) {   
    // args是个类数组
    console.log(`用户调用了${method}方法`)
    // 调用原生数组的方法病返回结果
    const result = oldArrayMethods[method].apply(this, args)  
    // 被添加的属性需要继续呗观测
    let inserted
    let ob = this.__ob__
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':   //  splice有3个属性  新增  修改 和删除 新增 arr.splice(arr, i, {name: 'xiaokui'})
        inserted = args.slice(2);
        break;
      default: 
        break;
    }
    if(inserted) ob.observerArray(inserted)
    return result
  }
})