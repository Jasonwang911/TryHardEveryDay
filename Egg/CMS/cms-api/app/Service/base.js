'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  // 查询用户
  async select(pageNum, pageSize, where) {
    // await this.app.mysql.query(`SELECT * FROM user WHERE username='zhangsan' ORDER BY id DESC, age ASC limit 3, 3;`)
    const list = await this.app.mysql.select(this.entity, {
      where,
      orders: [
        [ 'id', 'desc' ],
      ],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
    });
    const total = await this.app.mysql.count(this.entity, where);
    const totalSize = Math.ceil(total / pageSize);
    return {
      list,
      total,
      totalSize,
      pageSize,
      pageNum,
    };
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
