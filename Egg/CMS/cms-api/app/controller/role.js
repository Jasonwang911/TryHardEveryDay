'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  // 获取用户
  async getUser() {
    const {
      service,
    } = this;
    const result = await service.role.getUser();
    this.success(result);
  }
  // 设置用户和角色的关系，把角色和用户进行关联
  async setUser() {
    const {
      service,
    } = this;
    const body = this.ctx.request.body; // {roleId: 1, userId: [1,2]}
    const result = await service.role.getUser(body);
    this.success(result);
  }
}

module.exports = RoleController;
