/*
 * @Author: Jason wang
 * @Date: 2019-12-23 17:48:54
 * @Descripttion: 监听路由变化
 */
import { invoke } from "./invoke";

const HIJACK_EVENT_NAME = /^(hashchange|popstate)$/i
const EVENTS_POOL = {
  hashchange: [],
  popstate: []
}

function reroute() {
  invoke([], arguments)
}

window.addEventListener('hashchange', reroute)
window.addEventListener('postate', reroute)

const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener

// 重写并监听浏览器事件  保证微前端的location是第一个执行的，然后再去调用各个微服务中的路由
window.addEventListener = function(eventName, handle) {
  if(eventName && HIJACK_EVENT_NAME.test(eventName)) {
    EVENTS_POOL[eventName].indexOf(handle) === -1 && EVENTS_POOL[eventName].push(handle)
  }else {
    originalAddEventListener.apply(this, arguments)
  }
}

window.removeEventListener = function(eventName, handle) {
  if(eventName && HIJACK_EVENT_NAME.test(eventName)) {
    let events = EVENTS_POOL[eventName]
    events.indexOf(handle) > -1 && (EVENTS_POOL[eventName] = events.filter(fn => fn !== handle))
  }else {
    originalRemoveEventListener.apply(this, arguments)
  }
}