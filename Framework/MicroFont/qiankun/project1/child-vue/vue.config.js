module.exports = {
  devServer: {
    port: 10001,
    headers: {
      'Access-Control-allow-Origin': '*'   // 配置跨域
    }
  },
  configureWebpack: {
    output: {
      library: 'vueApp',     // lib打包的名字
      libraryTarget: 'umd'   // 启用umd规范
    }
  }
}