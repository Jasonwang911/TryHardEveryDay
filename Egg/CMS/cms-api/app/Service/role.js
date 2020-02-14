'use strict';

const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
  // 获取用户
  async getUser() {
    return await this.app.mysql.select('user');
  }
  // 设置用户和角色的关系，把角色和用户进行关联
  async setUser(body) {
    const {
      roleId,
      userIds,
    } = body;
    const conn = await this.app.mysql.beginTransaction();
    try {
      // 删除此角色关系的所有用户
      await conn.query('DELETE FROM role_user WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < userIds.length; i++) {
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: userIds[i],
        });
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
    }
  }
}

module.exports = RoleService;
