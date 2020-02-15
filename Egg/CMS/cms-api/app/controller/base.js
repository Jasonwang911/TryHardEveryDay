'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error,
    };
  }
  // 查询用户，支持查询和分页
  async index() {
    const {
      ctx,
      service,
    } = this;
    const {
      pageNum,
      pageSize,
      ...where
    } = ctx.query;
    const currentPageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    const currentPageSize = isNaN(pageSize) ? 3 : parseInt(pageSize);
    const result = await service[this.entity].select(currentPageNum, currentPageSize, where);
    console.log(result);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  // 新增用户
  async create() {
    const {
      ctx,
      service,
    } = this;
    const user = ctx.request.body; // {username, password, email}
    const result = await service[this.entity].create(user);
    result ? this.success('创建成功') : this.error('创建失败');
  }
  // 修改用户信息
  async update() {
    const {
      ctx,
      service,
    } = this;
    const id = ctx.params.id;
    const user = ctx.request.body;
    user.id = id;
    const result = await service[this.entity].update(user);
    result ? this.success('更新成功') : this.error('更新失败');
  }
  // 删除用户
  async destroy() {
    const {
      ctx,
      service,
    } = this;
    const id = ctx.params.id;
    const result = await service[this.entity].destroy(id);
    result ? this.success('删除成功') : this.error('删除失败');
  }
}

module.exports = BaseController;
