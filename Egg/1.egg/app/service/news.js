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
    // let result = await ctx.curl(url, {
    //   methods: 'GET',
    //   data: {
    //     limit
    //   },
    //   dataType: 'json'
    // })
    let result = this.app.mysql.query(`SELECT * FROM news LIMIT ${limit}`)
    // 调用数据库
    return result
  }
}

module.exports = NewsService