// 定时任务
const {
  Subscription
} = require('egg')

class UpdateCacheSubscription extends Subscription {
  // 静态任务，返回一个配置
  static get schedule() {
    return {
      // 间隔时间，每隔5分钟执行一次
      interval: '5m',
      // 计划任务将在哪些worker上执行, all指的是在所有的worker上执行
      type: 'all'
    }
  }
  // 任务定义
  async subscribe() {
    const result = await this.ctx.curl(this.config.cache.url, {
      methods: 'GET',
      dataType: 'json'
    })
    // app代表egg应用的实例
    this.ctx.app.cache = result.data
  }
}

module.exports = UpdateCacheSubscription