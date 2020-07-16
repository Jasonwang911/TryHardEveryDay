let s1 = Symbol('my')
let s2 = Symbol('my')

let obj = {
  [s1]: 1,
  [s2]: 2
}

console.log(s1 === s2) // false

for(let key in obj) {
  console.log('for in', obj[key])
}

console.log(Object.getOwnPropertySymbols(obj))

let s3 = Symbol.for('xxx')
let s4 = Symbol.for('xxx')
console.log(s3 === s4)   // true