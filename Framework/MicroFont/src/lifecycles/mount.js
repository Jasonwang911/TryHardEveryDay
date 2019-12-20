/*
 * @Author: Jason wang
 * @Date: 2019-12-18 19:19:20
 * @Descripttion: mount阶段
 */
import { NOT_MOUNTED, MOUNTING, MOUNTED, SKIP_BECAUSE_BROKEN } from "../applications/apps.helper";
import { reasonableTime } from "../applications/timeout";
import { getProps } from "./helper";
import { toUnmountPromise } from "./unmount";

export function toMountPromise(app) {
  if(app.status !== NOT_MOUNTED) {
    return Promise.resolve(app)
  }
  app.status = MOUNTING
  return reasonableTime(
    app.mount(getProps(app)),
    `app ${app.name} mounting`,
    app.timeouts.mount
  ).then(() => {
    app.status = MOUNTED
    return app
  }).catch(e => {
    // 如果app挂在失败，那么立即执行unmount操作
    app.status = SKIP_BECAUSE_BROKEN
    // toUnmountPromise
    toUnmountPromise(app)
    console.log(e)
    return app
  })
}