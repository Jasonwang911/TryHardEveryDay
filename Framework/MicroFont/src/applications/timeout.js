/*
 * @Author: Jason wang
 * @Date: 2019-12-18 13:31:54
 * @Descripttion: 超时处理
 */
const TIMEOUTS = {
  bootstrap: {
    milliseconds: 3000,     // 超时的时间
    rejectWhenTimeout: false    // 超时后是否拒绝   
  },
  mount: {
    milliseconds: 3000,
    rejectWhenTimeout: false
  },
  unmount: {
    milliseconds: 3000,
    rejectWhenTimeout: false
  },
}

/**
 * @name: 
 * @test: test font
 * @msg: 
 * @lifecyclePromise {Promise} 
 * @description {string} 
 * @timeout {data} 
 * @return: 
 */
export function reasonableTime(lifecyclePromise, description, timeout) {
  return new Promise((resolve, reject) => {
    let finished = false
    lifecyclePromise.then((data) => {
      finished = true
      resolve(data)
    }).catch(e => {
      finished = true
      reject(e)
    })

    setTimeout(() => {
      // 规定时间没有超时
      if(finished) {
        return 
      }
      if(timeout.rejectWhenTimeout) {
        reject(`${description}`)
      }else {
        console.log('timeout but waiting')
      }
    }, timeout.milliseconds)
  })
}

export function ensureAppTimeout(timeouts={}) {
  return {
  ...TIMEOUTS,
  ...timeouts
  }
}