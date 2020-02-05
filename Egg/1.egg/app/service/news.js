// 服务层
const {
  Service
} = require('egg')

class NewsService extends Service {
  async list(limit) {
    const {
      ctx
    } = this
    let url = this.config.news.url
    // {headers, data}
    let result = await ctx.curl(url, {
      methods: 'GET',
      data: {
        limit
      },
      dataType: 'json'
    })
    const {
      code,
      message,
      data
    } = result.data
    if (code === 0) {
      return data
    } else {
      return {
        code,
        message
      }
    }
  }
}

module.exports = NewsService