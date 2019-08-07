// 服务端入口
import createApp from "./main";

const { app } = createApp();
// 调用当前这个文件产生一个vue的实例，并且需要导出给node服务端使用
export default () => {
  const { app } = createApp();
  return app;
};
