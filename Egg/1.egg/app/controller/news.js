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
    await ctx.render('news', {
      list,
      title: '默认新闻列表'
    })
  }
}

module.exports = NewsController