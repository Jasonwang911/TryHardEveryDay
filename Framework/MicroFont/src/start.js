/*
 * @Author: Jason wang
 * @Date: 2019-12-05 11:17:18
 * @Descripttion:  系统启动状态
 */
import { invoke } from "./navigations/invoke"

let started = false

export function start() {
  if(started) {
    return Promise.resolve()
  }
  started = true
  return invoke()
}

export function isStarted() {
  return started
}