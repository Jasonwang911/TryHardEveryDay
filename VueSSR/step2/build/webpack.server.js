// 客户端的webpack配置
const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolve = dir => {
  return path.resolve(__dirname, dir);
};

module.exports = merge(base, {
  // webpack的入口文件
  entry: {
    // 给每个模块起名，方便在bundle进行标识
    server: resolve("../src/server-entry.js")
  },
  // 确定是给node提供
  target: "node",
  // 给node使用的代码要遵守commonjs规范，也就是将export default 转变为 module.exports, 配置 libraryTarget: 'commonjs2' 会将文件最终导出的结果，放到 module.exports上
  output: {
    libraryTarget: "commonjs2"
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板的名称
      filename: "index.ssr.html",
      // 模板的路径
      template: resolve("../public/index.ssr.html"),
      // 排除服务端打包后的结果
      excludeChunks: ["server"]
    })
  ]
});
