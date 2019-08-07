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
    client: resolve("../src/client-entry.js")
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板的名称
      filename: "index.html",
      // 模板的路径
      template: resolve("../public/index.html")
    })
  ]
});
