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
    const body = this.ctx.request.body; // {roleId: 1, userIds: [1,2]}
    const result = await service.role.setUser(body);
    result ? this.success('更新成功') : this.error('更新失败');
  }
  // 获取用户
  async getResource() {
    const {
      service,
    } = this;
    const result = await service.role.getResource();
    this.success(result);
  }
  // 设置用户和角色的关系，把角色和用户进行关联
  async setResource() {
    const {
      service,
    } = this;
    const body = this.ctx.request.body; // {roleId: 1, resourceIds: [1,2]}
    const result = await service.role.setResource(body);
    result ? this.success('更新成功') : this.error('更新失败');
  }
}

module.exports = RoleController;
