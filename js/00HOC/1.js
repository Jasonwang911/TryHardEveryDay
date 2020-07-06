
// 高阶函数 函数的参数如果是函数，或者这个函数返回一个新的函数，就叫高阶函数

// function fn() {
//     return function() {

//     }
// }

// fn(() => {

// })

// AOP: 面向切片编程
// before函数 
function say(who) {
    console.log(who+'：hello')
}

Function.prototype.before = function(beforeFun) {
    // 谁调用this指向谁,这里的this指向 say函数, 箭头函数中没有this也没有arguments
    return (...args) => {   // ...有收集的作用，也有展开的作用
        // 如果这里使用function，this的指向也是谁调用指向谁，所以是window，使用箭头函数会向上找寻this的指向也就是着调了上面一层的say函数
        beforeFun()
        this(...args)
    }
}

const beforeFun = say.before(() => {
    console.log('开始说话')
})

beforeFun('jason')

// 闭包的概念： 