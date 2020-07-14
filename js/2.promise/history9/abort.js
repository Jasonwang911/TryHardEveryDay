let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 3000)
})

function warp(promise) {
  let p = {}
  let abort
  let newPromise = new Promise((resolve, reject) => {
    abort = reject
  })
  p.promise = Promise.race([newPromise, promise])
  p.abort = abort
  return p
}

let p1 = warp(p)
setTimeout(() => {
  p1.abort('timeout')
}, 2000)
p1.promise.then(data => {
  console.log('success', data)
}, err => {
  console.log('err', err)
}).catch(err => {
  console.log('catch', err)
})