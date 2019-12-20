/*
 * @Author: Jason wang
 * @Date: 2019-12-18 19:19:13
 * @Descripttion: 启动阶段 
 */
import { NOT_BOOTSTRAPPED, BOOTSTRAPPING, NOT_MOUNTED, SKIP_BECAUSE_BROKEN } from "../applications/apps.helper";
import { reasonableTime } from "../applications/timeout";
import { getProps } from "./helper";

export function toBootstrapPromise(app) {
  if(app.status !== NOT_BOOTSTRAPPED) {
    return Promise.resolve(app)
  }
  // 变更状态为启动中
  app.status = BOOTSTRAPPING

  return reasonableTime(app.bootstrap(getProps(app)), `app: ${app.name} bootstrapping`, app.timeouts.bootstrap).then(() => {
    app.status = NOT_MOUNTED
    return app
  }).catch(e => {
    app.status = SKIP_BECAUSE_BROKEN
    console.log(e)
    return app
  })
}