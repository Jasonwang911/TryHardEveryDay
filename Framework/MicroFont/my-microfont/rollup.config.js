import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/my-single-spa.js',
  output: {
    file: './lib/umd/my-single-spa.js',
    format: 'umd', // umd commonjs esm CMD systemjs
    name: 'mySingleSpa',  // 打包完成后向外暴漏的模块名
    sourcemap: true
  },
  // loader 编译文件 
  // plugin  可以深入到webpack的各个生命周期中
  plugins: [
    resolve(),
    commonjs(),
    babel({exclude: 'node_modules/**'}),
    // dev-server 配置
    process.env.SERVE ? serve({
      open: true,
      contentBase: '',
      openPage: '/toutrial/index.html',
      host: 'localhost',
      port: '7900'
    }) : null
  ]
}