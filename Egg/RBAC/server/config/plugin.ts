import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // mysql
  mysql: {
    // 是否启用
    enable: true,
    // 包名
    package: 'egg-mysql'
  },
  // passport
  passport: {
    enable: true,
    package: 'egg-passport'
  },
  // passport-local
  passportLocal: {
    enable: true,
    package: 'egg-passport-local'
  },
};

export default plugin;
