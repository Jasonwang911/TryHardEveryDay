/*
 * @Author: Jason wang
 * @Date: 2019-12-05 13:35:09
 * @Descripttion: 
 */
import { isStarted } from '../start'    // 判断系统是否启动
import { getAppsToload, getAppsToUnmount, getAppsToMount, getMountedApps } from '../applications/apps'
import { toLoadPromise } from '../lifecycles/load'
import { toBootstrapPromise } from '../lifecycles/bootstrap'
import { toMountPromise } from '../lifecycles/mount'
import { toUnmountPromise } from '../lifecycles/unmount'

// 拿到所有得app
let appChangesUnderway = false
// 路由改变或者是调用了appChangesUnderway
let changesQueue = []

//  pendings 是上一次循环得 changesQueue，finish中调用invoke传入
export function invoke(pendings = []) {
  // 判断系统是否启动
  if(appChangesUnderway) {
    return new Promise((resolve, reject) => {
      changesQueue.push({
        success: resolve,
        failure: reject
      })
    })
  }
  appChangesUnderway = true
  if(isStarted()) {
    // 启动app
    return preformAppChanges()
  }
  // 加载app 并不执行，相当于预加载
  return loadApps()

  function loadApps() {
    // 获取需要被加载的app
    return Promise.all(getAppsToload().map(toLoadPromise)).then((apps) => {
      console.log(apps)
      // 加载完成调finish
      return finish()
    }).catch(e => {
      console.log(e)
    })
    // getAppsToload().map(app => {
    //   return toLoadPromise(app)
    // })
  }

  // 核心逻辑 启动app: 卸载不需要的app,加载需要的app，挂载需要的app
  function preformAppChanges() {
    // 先卸载不需要的app  执行卸载
    // 拿到需要卸载的app，调用toUnmountPromise
    let unmountPromise = getAppsToUnmount().map(toUnmountPromise)
    unmountPromise = Promise.all(unmountPromise)
    // will load app  ===>  getAppsToload().map(toLoadPromise)   
    //  加载完  启动   启动完  mount
    // 拿到需要加载的app，去load， load完成后调用 bootstrap, bootstrap完成并且等unmount完成后再去调用mount（先卸载再加载）
    let loadApps = getAppsToload()
    loadApps.map(app => {
      return toLoadPromise(app).then(function(app) {
        return toBootstrapPromise(app).then(() => unmountPromise).then(() => toMountPromise(app))
      })
    })
    // will mount app   mount不需要load,比上一步操作少了一个load
    let mountApps = getAppsToMount()
    // 去重
    mountApps = mountApps.filter(app => loadApps.indexOf(app) === -1)
    mountApps = mountApps.map(function (app) {
      // 拿到已经加载过并且没有mount的app
      return toBootstrapPromise(app).then(() => unmountPromise).then(() => toMountPromise(app))
    })

    // unmountPromise
    return unmountPromise.then(() => {
      let allPromises = loadApps.concat(mountApps)
    // 统一去挂载
      return Promise.all(allPromises).then(() => {
        return finish()
      }, e => {
        pendings.forEach(item => item.failure(e))
        throw e;
      })
    }, e => {
      console.log(e)
    })

    // 针对load和mount的app去重
  }

  // 事件队列里有值就一直循环 递归掉，如果没有值，就把当前事件队列返回回去
  function finish() {
    // 获取当前已经被加载的app
    let returnValue = getMountedApps()
    if(pendings.length) {
      // 当前被挂载得app
      // promise 状态一旦确定，就无法再修改
      pendings.forEach(item => item.success(returnValue))
    }
    
    // 表示当前循环已经完成
    appChangesUnderway = false
    if(changesQueue.length) {
      // 路由变了 用户掉start方法了
      let backup = changesQueue
      changesQueue = []
      invoke(backup)
    }

    return returnValue
  }

}