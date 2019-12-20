// 未加载
export const NOT_LOADED = 'NOT_LOADED';
// 加载app代码中
export const LOAD_RESOURCE_CODE = 'LOAD_RESOURCE_CODE';
// 加载成功，但未启动
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';
// 启动中
export const BOOTSTRAPPING = 'BOOTSTRAPPING';
// 启动成功，未挂载
export const NOT_MOUNTED = 'NOT_MOUNTED';
// 挂载中
export const MOUNTING = 'MOUNTING';
// 挂载成功
export const MOUNTED = 'MOUNTED';
// 卸载中
export const UNMOUNTING = 'UNMOUNTING';
// 加载时参数校验未通过，或非致命错误
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
// 加载时遇到致命错误
export const LOAD_ERROR = 'LOAD_ERROR';
// 更新service中
export const UPDATING = 'UPDATING';

export function noSkip(app) {
  return app.status !== SKIP_BECAUSE_BROKEN
}

export function noLoadError(app) {
  return app.status !== LOAD_ERROR
}

export function isLoaded(app) {
  return app.status !== NOT_LOADED && app.status !== SKIP_BECAUSE_BROKEN && app.status !== LOAD_ERROR
}

export function isntLoaded(app) {
  return app.status === NOT_LOADED 
}

export function isActive(app) {
  return app.status === MOUNTED
}

export function isntActive(app) {
  return !isActive(app)
}

export function shouldBeActivity(app) {
  try{
    return app.activityWhen(window.location)
  }catch(e) {
    app.status = SKIP_BECAUSE_BROKEN
    console.log(e)
  }
}
