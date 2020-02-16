'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
  // 获取验证码
  async captcha() {
    const {
      ctx,
    } = this;
    const captcha = svgCaptcha.createMathExpr({
      size: 4,
      background: '#ffffff',
      ignoreChars: '0o1i', // 过滤掉一些字符，例如0o1i
    });
    ctx.session.captcha = captcha.text;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captcha.data;
  }
  // 验证验证码
  async checkCaptcha() {
    const {
      ctx,
    } = this;
    const {
      captcha,
    } = ctx.request.body;
    if (ctx.session.captcha === captcha) {
      ctx.body = {
        code: 0,
        data: '验证码识别成功',
      };
    } else {
      ctx.body = {
        code: 1,
        data: '验证码识别失败',
      };
    }
  }
}

module.exports = IndexController;
