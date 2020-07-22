import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js',  // 打包的入口文件
  output: {
    file: 'dist/umd/vue.js',  // 打包的出口文件
    name: 'Vue',  // 打包后暴露的全局变量的名称
    format: 'umd',  // 指定统一的模块规范
    sourcemap: true   // 开始源码调试，方便找到源码报错位置
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'   // 排除babel转化的文件夹
    }),
    process.env.ENV == 'development' 
    ? 
    serve({
      open: true,   // 自动打开浏览器
      openPage: '/public/index.html',  // 默认打开的html
      port: 9909,    // 默认打开的端口
      contentBase: ''   // 服务默认的根路径
    })
    : null
  ]
}