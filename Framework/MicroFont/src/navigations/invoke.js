/*
 * @Author: Jason wang
 * @Date: 2019-12-05 13:35:09
 * @Descripttion: 
 */
import { isStarted } from '../start'    // 判断系统是否启动
import { getAppsToload, getAppsToUnmount, getAppsToMount } from '../applications/apps'
import { toLoadPromise } from '../lifecycles/load'
import { toBootstrapPromise } from '../lifecycles/bootstrap'
import { toMountPromise } from '../lifecycles/mount'
import { toUnmountPromise } from '../lifecycles/unmount'

// 拿到所有得app
let appChangesUnderway = false
let chagesQueue = []

export function invoke() {
  // 判断系统是否启动
  if(appChangesUnderway) {
    return new Promise((resolve, reject) => {
      chagesQueue.push({
        success: resolve,
        failure: reject
      })
    })
  }
  appChangesUnderway = true
  if(isStarted()) {
    // 启动app

  }else {
    // 加载app 并不执行，相当于预加载
    loadApps()
  }

  function loadApps() {
    // 获取需要被加载的app
    getAppsToload().map(toLoadPromise).then(() => {
      console.log(1)
    })
    // getAppsToload().map(app => {
    //   return toLoadPromise(app)
    // })
  }

  function preformAppChanges() {
    // 先卸载不需要的app  
    getAppsToUnmount().map(toUnmountPromise)
    // will 加载 app
    getAppsToload().map(app => {
      toLoadPromise(app).then(toBootstrapPromise)
    })
    // will mount app
    getAppsToMount().map(toMountPromise)

    // 针对load和mount的app去重
  }


}