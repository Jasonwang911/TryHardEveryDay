module.exports = {
  lintOnSave: false,
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd',   // 打包后模块规范，会将打包后的属性挂在到window上
    },
    devServer: {
      port: 10001
    }
  }
}