// 判断数据类型
// typeof instanceof contructor Object.prototype.toString.call  
function isType(type) {  // 变量私有化---闭包，返回的函数可以在任何作用于下调用，type不会被销毁
    return function(content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let types = ['String', 'Number' , 'Boolean', 'Function', 'Null', 'Undefined']
let unit = {}
for(let i=0;i<types.length;i++) {
    let type = types[i]
    unit[`is${type}`] = isType(type)
    // unit.isString = function('String') 预制参数和bind一样
}
let flag = unit.isFunction((affix) => {console.log(affix)})
console.log(flag)