'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  // 查询用户
  async select() {
    // await this.app.mysql.query(`SELECT * FROM user;`)
    return await this.app.mysql.select(this.entity);
  }
  // 添加用户
  async create(user) {
    const result = await this.app.mysql.insert(this.entity, user);
    return result.affectedRows > 0;
  }
  // 修改用户
  async update(user) {
    // update user set username=? where id=?;
    const result = await this.app.mysql.update(this.entity, user);
    return result.affectedRows > 0;
  }
  // 删除用户
  async destroy(id) {
    // delete from user where id=?;
    const result = await this.app.mysql.delete(this.entity, {
      id,
    });
    return result.affectedRows > 0;
  }
}

module.exports = BaseService;
