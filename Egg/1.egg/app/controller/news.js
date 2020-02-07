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
    await ctx.render('news', {
      list,
      title: this.app.cache ? this.app.cache.title : '暂无标题'
    })
  }

  async users() {
    const {
      ctx
    } = this
    // 拿到 model 下user.js中 定义的模型 User， 这个模型下有多个方法
    ctx.body = await ctx.model.User.findAll()
  }
}

module.exports = NewsController