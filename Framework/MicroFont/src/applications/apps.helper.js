/*
 * @Author: Jason wang
 * @Date: 2019-12-05 11:06:07
 * @Descripttion: 
 * @version: 
 */
export const NOT_LOADED = 'NOT_LOADED'
export const LOAD_SOURCE_CODE = 'LOAD_SOURCE_CODE'   // 加载源代码
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'
export const LOAD_ERROR = 'LOAD_ERROR'

export function noSkip(app) {
  return app.status !== SKIP_BECAUSE_BROKEN
}

export function noLoadError(app) {
  return app.status !== LOAD_ERROR
}

export function isntLoaded(app) {
  return app.status === NOT_LOADED 
}

export function shouldBeActivity(app) {
  try{
    return app.activityWhen(window.location)
  }catch(e) {
    app.status = SKIP_BECAUSE_BROKEN
    console.log(e)
  }
}
