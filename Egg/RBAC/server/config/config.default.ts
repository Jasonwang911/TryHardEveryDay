import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581232304232_6442';

  // add your egg config in here
  config.middleware = [];

  // 安全配置
  config.security = {
    csrf: false
  }

  // mysql
  config.mysql = {
    // 客户端
    client: {
      // 主机
      host: '127.0.0.1',
      // 端口
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'SHEN396689144@',
      // 数据库
      database: 'cms2'
    },
    // 表示app就是egg应用,配置为true,会在app对象上添加一个属性 app.mysql 用来操作数据库
    app: true,
    agent: true
  }
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
