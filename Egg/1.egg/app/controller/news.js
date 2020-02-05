const {
  Controller
} = require('egg')
const Mock = require('mockjs')

class NewsController extends Controller {
  // 控制器要接收并处理校验参数
  async index() {
    let {
      ctx
    } = this
    let limit = ctx.query ? ctx.query.limit : 5
    const list = await this.service.news.list(limit)
    console.log(list)
    console.log('标题', this.app.cache.title)
    await ctx.render('news', {
      list,
      title: this.app.cache ? this.app.cache.title : '暂无标题'
    })
  }
}

module.exports = NewsController