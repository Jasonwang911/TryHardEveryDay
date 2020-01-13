/*
 * @Author: Jason wang
 * @Date: 2019-12-17 14:08:40
 * @Descripttion: 判断是否是promise和生命周期
 */
// 判断是不是Promise
export function smellLikeAPromise(promise) {
  if(promise instanceof Promise) {
    return true
  }
  return typeof promise === 'object' && typeof promise.then === 'function' && typeof promise.catch === 'function'
}

export function flattenLifecycleArray(lifecycle, description) {
  if(!Array.isArray(lifecycle)) {
    lifecycle = [lifecycle]
  }
  if(!lifecycle.length) {
    // 空对象
    lifecycle = [() => Promise.resolve()]
  }
  return props =>  new Promise((resolve,reject) => {
    waitForPromise(0)
    function waitForPromise(index) {
      let fn = lifecycle[index](props)
      if(!smellLikeAPromise(fn)) {
        reject(new Error(`${description} has error`))
      }else {
        fn.then(() => {
          if(index >= lifecycle.length-1) {
            resolve()
          }else {
            waitForPromise(++index)
          }
        }).catch(e => {
          reject(e)
        })
      }
    }
  })
}

export function getProps(app) {
  return {
    name: app.name,
    ...app.customProps
  }
}