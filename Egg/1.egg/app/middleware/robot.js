module.exports = (options, app) => {
  return async function (ctx, next) {
    // 判断客户端类型，如果是特定类型的话，则返回403拒绝访问
    // 1. 先得到客户端的类型，就是 UserAgent
    let agent = ctx.get('user-agent')
    let matched = options.ua.some(uas => u.test(agent))
    if (matched) {
      ctx.status = 403
      ctx.body = 'You are forbidden'
    } else {
      await next()
    }
  }
}