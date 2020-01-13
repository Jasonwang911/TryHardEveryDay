/*
 * @Author: Jason wang
 * @Date: 2019-12-17 14:02:58
 * @Descripttion: 
 * @version: 
 */
import { NOT_LOADED, LOAD_RESOURCE_CODE, SKIP_BECAUSE_BROKEN, LOAD_ERROR, NOT_BOOTSTRAPPED } from "../applications/apps.helper";
import { smellLikeAPromise, flattenLifecycleArray, getProps } from './helper'
import { ensureAppTimeout } from '../applications/timeout'

// 加载app
export function toLoadPromise(app) {
  if(app.status !== NOT_LOADED) {
    return Promise.resolve(app)
  }
  // 修改状态为加载源代码
  app.status = LOAD_RESOURCE_CODE
  // 加载app  getProps() 是获取app相关的描述信息
  let loadPromise = app.loadFunction(getProps(app))
  if(!smellLikeAPromise(loadPromise)) {
    app.status = SKIP_BECAUSE_BROKEN
    return Promise.reject(new Error('loadFuntion must return a Promise or thanable object'))
  }
  return loadPromise.then(appConfig => {
    if(typeof appConfig !== 'object') {
      throw new Error('appConfig must be object')
    }
    // 生命周期  验证生命周期有没有，是不是函数   bootstrap mount unmount 
    let errors = []
    let lifecycleArr = ['bootstrap', 'mount', 'unmount']
    lifecycleArr.forEach(lifecycle => {
      if(!appConfig[lifecycle]) {
        errors.push(`lifecycle: ${lifecycle} must be exists`)
      }
    })
    if(errors.length) {
      app.status = SKIP_BECAUSE_BROKEN
      console.log(errors)
      return 
    }
    // 修改状态为 not 
    app.status = NOT_BOOTSTRAPPED
    // 处理生命周期和超时   需要做reduce处理
    app.bootstrap = flattenLifecycleArray(appConfig.bootstrap, `app: ${app.name} bootstrap`)
    app.mount = flattenLifecycleArray(appConfig.mount, `app: ${app.name} mount`)
    app.unmount = flattenLifecycleArray(appConfig.unmount, `app: ${app.name} unmount`)
    // 超时处理
    app.timeouts = ensureAppTimeout(appConfig.timeouts)
    // console.log(app)
    return app
  }).catch(e => {
    app.status = LOAD_ERROR
    console.log('====>', e)
  })
}