require('./index.css')

class B {

}

function * gen(params) {
  yield 1;
}

console.log(gen().next())

let p = new Promise((resolve, reject) => {
  if([] == ![]) {
    resolve(1)
  }
})

p.then(res => {
  console.log('Promise is ' + res);
})

console.log('aaa'.includes('a'))