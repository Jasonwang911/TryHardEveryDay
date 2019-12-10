(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.mySingleSpa = {}));
}(this, (function (exports) { 'use strict';

  const NOT_LOADED = 'NOT_LOADED';

  let APPS = [];
  /*
  *   注册app
  *   @param  {string} appName  要注册app的名称
  *   @param  {Function<Promise> | Object} loadFunction  app异步加载函数或app内容
  *   @param  {Function<boolean>}  activityWhen 判断该app应该在何时被启动
  *   @param  {Object} customProps  自定义配置
  *   return Promis
  */

  function registerApplication(appName, loadFunction, activityWhen, customProps) {
    if (!appName || typeof appName !== 'string') {
      throw new Error('appName must be a non-empty string');
    }

    if (!loadFunction) {
      throw new Error('loadFunction must be a function or object');
    }

    if (typeof loadFunction !== 'function') {
      // 如果是object 包装成返回的Promise
      loadFunction = () => Promise.resolve(loadFunction);
    }

    if (typeof activityWhen !== 'function') {
      throw new Error('activityWhen must be a function');
    }

    APPS.push({
      name: appName,
      loadFunction,
      activityWhen,
      customProps,
      // app状态
      status: NOT_LOADED
    });
    console.log(APPS);
  }

  function start() {}

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=my-single-spa.js.map
