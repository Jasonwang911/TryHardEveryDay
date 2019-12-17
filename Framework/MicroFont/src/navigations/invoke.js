/*
 * @Author: Jason wang
 * @Date: 2019-12-05 13:35:09
 * @Descripttion: 
 */
import { isStarted } from '../start'    // 判断系统是否启动
import { getAppsToload } from '../applications/apps'
import { toLoadPromise } from '../lifecycles/load'

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
    // 加载app
    loadApps()
  }

  function loadApps() {
    // 获取需要被加载的app
    getAppsToload().map(toLoadPromise)
    // console.log(getAppsToload())
  }


}