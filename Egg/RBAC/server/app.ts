// 此文件可以捕获项目的生命周期
// app.ts
import { Application, IBoot } from 'egg';
import { Strategy } from 'passport-local'

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configDidLoad() {
    // 插件加载完毕 Config, plugin files have loaded.
    // 实现鉴权password 
    let { app } = this
    // 配置鉴权的方式，配置鉴权的策略，鉴权是通过回调来鉴权
    app.passport.use(new Strategy({
      // 从请求体里的那个字段取到用户名
      usernameField: 'userName',
      // 向callback中传递request对象， 如果配置true，回调的第一个参数就是request，配置false，第一个参数就不是request
      passReqToCallback: true
    }, async (request, userName, password, done) => {
      // SELECT * FROM user WHERE username=? AND password=? LIMIT 1;
      let user = await app.mysql.get('user', { userName, password })
      // 找到了，传入一个用户对象，用户对象会被done放入session，如果没找到传入一个false
      if (user) {
        done(null, user)
      } else {
        // 如果登录失败，需要清除原来的登录状态
        request.ctx.logout()
        done(null, false)
      }
    }))
  }
}