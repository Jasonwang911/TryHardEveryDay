// 服务端入口
import createApp from "./main";

const { app } = createApp();
// 调用当前这个文件产生一个vue的实例，并且需要导出给node服务端使用
// content 上下文，是服务端传入的
export default context => {
  // 服务端会执行这个方法
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    // 返回的实例应该跳转到对应的路由
    router.push(context.url);
    router.onReady(() => {
      const matchs = router.getMatchedComponents();
      if (matchs.length === 0) reject({ code: 404 });
      // 查看匹配到的页面是够包含asyncData，如果包含就执行。asyncData是在服务端执行的
      Promise.all(
        matchs.map(component => {
          if (component.asyncData) {
            return component.asyncData(store);
          }
        })
      ).then(res => {
        context.state = store.state;
        resolve(app);
      });
    }, reject);
  });
};
