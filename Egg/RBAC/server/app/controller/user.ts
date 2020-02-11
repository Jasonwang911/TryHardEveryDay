import { Controller } from 'egg';

export default class UserController extends Controller {
  public async loginCallback() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      console.log('ctx.user', ctx.user)
      ctx.body = {
        status: 'ok',
        type: ctx.user.type,
        currentAuthoryty: ctx.user.currentAuthority
      }
    } else {
      ctx.body = {
        status: 'failure',
        error: '用户登录失败'
      }
    }
  }
}