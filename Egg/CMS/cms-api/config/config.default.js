/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581477790886_3467';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    security: {
      csrf: false,
    },
    // myAppName: 'egg',
    mysql: {
      client: {
        host: '127.0.0.1',
        user: 'root',
        password: 'SHEN396689144@',
        port: '3306',
        database: 'cms',
      },
      // 把mysql模块挂载到app对象 this.app.mysql, 默认为 true
      app: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
