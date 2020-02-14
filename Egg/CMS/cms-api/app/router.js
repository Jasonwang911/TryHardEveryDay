'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  // 单表的增删改查
  router.resources('user', '/api/user', controller.user);
  router.resources('role', '/api/role', controller.role);
  router.resources('resource', '/api/resource', controller.resource);
  router.resources('roleResource', '/api/roleResource', controller.roleResource);
  router.resources('roleUser', '/api/roleUser', controller.roleUser);
  // 权限管理
  // 获取所有的用户
  router.get('/api/role/getUser', controller.role.getUser);
  // router.post('/api/role/setUser', controller.role.setUser);
  // router.get('/api/role/getResource', controller.role.getResource);
  // router.post('/api/role/setResource', controller.role.setResource);
};
