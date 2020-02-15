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
      console.log('添加成功了');
      return true;
    } catch (e) {
      console.log('回滚了', e);
      await conn.rollback();
      return false;
    }
  }
  // 获取所有的资源树
  async getResource() {
    const list = await this.app.mysql.select('resource');
    const rootMenus = [];
    const resourceMap = {};
    list.forEach(item => {
      item.children = [];
      resourceMap[item.id] = item;
      if (item.parent_id === 0) {
        // 根节点
        rootMenus.push(item);
      } else {
        resourceMap[item.parent_id] && resourceMap[item.parent_id].children.push(item);
      }
    });
    return rootMenus;
  }
  // 设置角色对应的资源
  async setResource(body) {
    const {
      roleId,
      resourceIds,
    } = body;
    const conn = await this.app.mysql.beginTransaction();
    try {
      // 删除此角色关系的所有资源
      await conn.query('DELETE FROM role_resource WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < resourceIds.length; i++) {
        await conn.insert('role_user', {
          role_id: roleId,
          resource_id: resourceIds[i],
        });
      }
      await conn.commit();
      console.log('添加成功了');
      return true;
    } catch (e) {
      console.log('回滚了', e);
      await conn.rollback();
      return false;
    }
  }
}

module.exports = RoleService;
