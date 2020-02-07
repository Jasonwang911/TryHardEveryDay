module.exports = app => {
  // egg-sequelize插件会把Sequelize添加到app上
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize
  // 定义模型
  const User = app.model.define('User', {

  })
  return User
}