(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.mySingleSpa = {}));
}(this, (function (exports) { 'use strict';

  /*
   * @Author: Jason wang
   * @Date: 2019-12-05 11:06:07
   * @Descripttion: 
   * @version: 
   */
  const NOT_LOADED = 'NOT_LOADED';
  const LOAD_SOURCE_CODE = 'LOAD_SOURCE_CODE'; // 加载源代码

  const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
  const LOAD_ERROR = 'LOAD_ERROR';
  function noSkip(app) {
    return app.status !== SKIP_BECAUSE_BROKEN;
  }
  function noLoadError(app) {
    return app.status !== LOAD_ERROR;
  }
  function isntLoaded(app) {
    return app.status === NOT_LOADED;
  }
  function shouldBeActivity(app) {
    try {
      return app.activityWhen(window.location);
    } catch (e) {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
    }
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-05 11:17:18
   * @Descripttion:  系统启动状态
   * @version: 
   */
  function start() {}

  /*
   * @Author: Jason wang
   * @Date: 2019-12-17 14:08:40
   * @Descripttion: 
   * @version: 
   */
  // 判断是不是Promise
  function smellLikeAPromise(promise) {
    if (promise instanceof Promise) {
      return true;
    }

    return typeof promise === 'object' && typeof promise.then === 'function' && typeof promise.catch === 'function';
  }
  function flattenLifecycleArray(lifecycle, description) {
    if (!Array.isArray(lifecycle)) {
      lifecycle = [lifecycle];
    }

    if (!lifecycle.length) {
      // 空对象
      lifecycle = [() => Promise.resolve()];
    }

    return new Promise((resolve, reject) => {
      waitForPromise();

      function waitForPromise() {
        let fn = lifecycle[index]();

        if (!smellLikeAPromise(fn)) {
          reject(new Error(`${description} has error`));
        } else {
          fn.then(() => {
            if (index >= lifecycle.length - 1) {
              resolve();
            } else {
              waitForPromise(++index);
            }
          }).catch(e => {
            reject(e);
          });
        }
      }
    });
  }

  function toLoadPromise(app) {
    if (app.status !== NOT_LOADED) {
      return Promise.resolve(app);
    } // 修改状态为加载源代码


    app.status = LOAD_SOURCE_CODE; // 加载app 

    let loadPromise = app.loadFuntion();

    if (!smellLikeAPromise(loadPromise)) {
      return Promise.reject(new Error('app.loadFuntion not a promise'));
    }

    loadPromise.then(appConfig => {
      if (typeof appConfig !== 'object') {
        throw new Error('');
      } // 生命周期  验证生命周期有没有，是不是函数   bootstrap mount unmount 


      let errors = [][('unmount')].forEach(lifecycle => {
        if (!appConfig[lifecycle]) {
          errors.push(`lifecycle: ${lifecycle} must be exists`);
        }
      });

      if (errors.length) {
        app.status = SKIP_BECAUSE_BROKEN;
        console.log(errors);
        return;
      } // 处理生命周期和超时   需要做reduce处理


      app.bootstrap = flattenLifecycleArray(appConfig.bootstrap, `app: ${app.name} bootstrap`);
      app.mount = flattenLifecycleArray(appConfig.mount, `app: ${app.name} mount`);
      app.unmount = flattenLifecycleArray(appConfig.unmount, `app: ${app.name} unmount`);
    });
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-05 13:35:09
   * @Descripttion: 
   */

  let appChangesUnderway = false;
  function invoke() {
    // 判断系统是否启动
    if (appChangesUnderway) {
      return new Promise((resolve, reject) => {
      });
    }

    appChangesUnderway = true;

    {
      // 加载app
      loadApps();
    }

    function loadApps() {
      // 获取需要被加载的app
      getAppsToload().map(toLoadPromise); // console.log(getAppsToload())
    }
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-05 10:13:13
   * @Descripttion: 
   * @version: 
   */
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
    invoke();
  }
  function getAppsToload() {
    // 判断需要被加载(load)的App： 没有被跳过，没有加载错误，没有被加载过，需要被加载
    return APPS.filter(noSkip).filter(noLoadError).filter(isntLoaded).filter(shouldBeActivity);
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=my-single-spa.js.map
