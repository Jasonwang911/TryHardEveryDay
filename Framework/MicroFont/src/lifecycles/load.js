import { NOT_LOADED, LOAD_SOURCE_CODE, SKIP_BECAUSE_BROKEN } from "../applications/apps.helper";
import { smellLikeAPromise, flattenLifecycleArray } from './helper'

// 加载app
export function toLoadPromise(app) {
  if(app.status !== NOT_LOADED) {
    return Promise.resolve(app)
  }
  // 修改状态为加载源代码
  app.status = LOAD_SOURCE_CODE
  // 加载app 
  let loadPromise = app.loadFuntion()
  if(!smellLikeAPromise(loadPromise)) {
    return Promise.reject(new Error('app.loadFuntion not a promise'))
  }
  loadPromise.then(appConfig => {
    if(typeof appConfig !== 'object') {
      throw new Error('')
    }
    // 生命周期  验证生命周期有没有，是不是函数   bootstrap mount unmount 
    let errors = []
    ['bootstrap', 'mount', 'unmount'].forEach(lifecycle => {
      if(!appConfig[lifecycle]) {
        errors.push(`lifecycle: ${lifecycle} must be exists`)
      }
    })
    if(errors.length) {
      app.status = SKIP_BECAUSE_BROKEN
      console.log(errors)
      return 
    }
    // 处理生命周期和超时   需要做reduce处理
    app.bootstrap = flattenLifecycleArray(appConfig.bootstrap, `app: ${app.name} bootstrap`)
    app.mount = flattenLifecycleArray(appConfig.mount, `app: ${app.name} mount`)
    app.unmount = flattenLifecycleArray(appConfig.unmount, `app: ${app.name} unmount`)
    
  })
}