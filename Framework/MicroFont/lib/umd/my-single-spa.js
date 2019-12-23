(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.mySingleSpa = {}));
}(this, (function (exports) { 'use strict';

  // 未加载
  const NOT_LOADED = 'NOT_LOADED'; // 加载app代码中

  const LOAD_RESOURCE_CODE = 'LOAD_RESOURCE_CODE'; // 加载成功，但未启动

  const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED'; // 启动中

  const BOOTSTRAPPING = 'BOOTSTRAPPING'; // 启动成功，未挂载

  const NOT_MOUNTED = 'NOT_MOUNTED'; // 挂载中

  const MOUNTING = 'MOUNTING'; // 挂载成功

  const MOUNTED = 'MOUNTED'; // 卸载中

  const UNMOUNTING = 'UNMOUNTING'; // 加载时参数校验未通过，或非致命错误

  const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'; // 加载时遇到致命错误

  const LOAD_ERROR = 'LOAD_ERROR'; // 更新service中
  function noSkip(app) {
    return app.status !== SKIP_BECAUSE_BROKEN;
  }
  function noLoadError(app) {
    return app.status !== LOAD_ERROR;
  }
  function isLoaded(app) {
    return app.status !== NOT_LOADED && app.status !== SKIP_BECAUSE_BROKEN && app.status !== LOAD_ERROR;
  }
  function isntLoaded(app) {
    return app.status === NOT_LOADED;
  }
  function isActive(app) {
    return app.status === MOUNTED;
  }
  function isntActive(app) {
    return !isActive(app);
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
   */
  let started = false;
  function start() {
    if (started) {
      return Promise.resolve();
    }

    started = true;
    return invoke();
  }
  function isStarted() {
    return started;
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-17 14:08:40
   * @Descripttion: 判断是否是promise和生命周期
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

    return props => new Promise((resolve, reject) => {
      waitForPromise(0);

      function waitForPromise(index) {
        let fn = lifecycle[index](props);

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
  function getProps(app) {
    return {
      name: app.name,
      ...app.customProps
    };
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-18 13:31:54
   * @Descripttion: 超时处理
   */
  const TIMEOUTS = {
    bootstrap: {
      milliseconds: 3000,
      // 超时的时间
      rejectWhenTimeout: false // 超时后是否拒绝   

    },
    mount: {
      milliseconds: 3000,
      rejectWhenTimeout: false
    },
    unmount: {
      milliseconds: 3000,
      rejectWhenTimeout: false
    }
  };
  /**
   * @name: 
   * @test: test font
   * @msg: 
   * @lifecyclePromise {Promise} 
   * @description {string} 
   * @timeout {data} 
   * @return: 
   */

  function reasonableTime(lifecyclePromise, description, timeout) {
    return new Promise((resolve, reject) => {
      let finished = false;
      lifecyclePromise.then(data => {
        finished = true;
        resolve(data);
      }).catch(e => {
        finished = true;
        reject(e);
      });
      setTimeout(() => {
        // 规定时间没有超时
        if (finished) {
          return;
        }

        if (timeout.rejectWhenTimeout) {
          reject(`${description}`);
        } else {
          console.log('timeout but waiting');
        }
      }, timeout.milliseconds);
    });
  }
  function ensureAppTimeout(timeouts = {}) {
    return { ...TIMEOUTS,
      ...timeouts
    };
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-17 14:02:58
   * @Descripttion: 
   * @version: 
   */

  function toLoadPromise(app) {
    if (app.status !== NOT_LOADED) {
      return Promise.resolve(app);
    } // 修改状态为加载源代码


    app.status = LOAD_RESOURCE_CODE; // 加载app  getProps() 是获取app相关的描述信息

    let loadPromise = app.loadFunction(getProps(app));

    if (!smellLikeAPromise(loadPromise)) {
      app.status = SKIP_BECAUSE_BROKEN;
      return Promise.reject(new Error('loadFuntion must return a Promise or thanable object'));
    }

    return loadPromise.then(appConfig => {
      if (typeof appConfig !== 'object') {
        throw new Error('appConfig must be object');
      } // 生命周期  验证生命周期有没有，是不是函数   bootstrap mount unmount 


      let errors = [];
      let lifecycleArr = ['bootstrap', 'mount', 'unmount'];
      lifecycleArr.forEach(lifecycle => {
        if (!appConfig[lifecycle]) {
          errors.push(`lifecycle: ${lifecycle} must be exists`);
        }
      });

      if (errors.length) {
        app.status = SKIP_BECAUSE_BROKEN;
        console.log(errors);
        return;
      } // 修改状态为 not 


      app.status = NOT_BOOTSTRAPPED; // 处理生命周期和超时   需要做reduce处理

      app.bootstrap = flattenLifecycleArray(appConfig.bootstrap, `app: ${app.name} bootstrap`);
      app.mount = flattenLifecycleArray(appConfig.mount, `app: ${app.name} mount`);
      app.unmount = flattenLifecycleArray(appConfig.unmount, `app: ${app.name} unmount`); // 超时处理

      app.timeouts = ensureAppTimeout(appConfig.timeouts); // console.log(app)

      return app;
    }).catch(e => {
      app.status = LOAD_ERROR;
      console.log('====>', e);
    });
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-18 19:19:13
   * @Descripttion: 启动阶段 
   */
  function toBootstrapPromise(app) {
    if (app.status !== NOT_BOOTSTRAPPED) {
      return Promise.resolve(app);
    } // 变更状态为启动中


    app.status = BOOTSTRAPPING; // 超时处理

    return reasonableTime(app.bootstrap(getProps(app)), `app: ${app.name} bootstrapping`, app.timeouts.bootstrap).then(() => {
      // 更新状态为 没有被挂在
      app.status = NOT_MOUNTED;
      return app;
    }).catch(e => {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
      return app;
    });
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-18 19:19:26
   * @Descripttion: 卸载阶段
   */
  function toUnmountPromise(app) {
    if (app.status !== MOUNTED) {
      return Promise.resolve(app);
    }

    app.status = UNMOUNTING;
    return reasonableTime(app.unmount(getProps(app)), `app: ${app.name} unmounting`, app.timeouts.unmount).then(() => {
      app.status = NOT_MOUNTED;
      return app;
    }).catch(e => {
      app.status = SKIP_BECAUSE_BROKEN;
      console.log(e);
      return app;
    });
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-18 19:19:20
   * @Descripttion: mount阶段
   */
  function toMountPromise(app) {
    if (app.status !== NOT_MOUNTED) {
      return Promise.resolve(app);
    }

    app.status = MOUNTING;
    return reasonableTime(app.mount(getProps(app)), `app ${app.name} mounting`, app.timeouts.mount).then(() => {
      app.status = MOUNTED;
      return app;
    }).catch(e => {
      // 如果app挂在失败，那么立即执行unmount操作
      app.status = MOUNTED; // toUnmountPromise

      toUnmountPromise(app);
      console.log(e);
      return app;
    });
  }

  /*
   * @Author: Jason wang
   * @Date: 2019-12-05 13:35:09
   * @Descripttion: 
   */

  let appChangesUnderway = false; // 路由改变或者是调用了appChangesUnderway

  let changesQueue = []; //  pendings 是上一次循环得 changesQueue，finish中调用invoke传入

  function invoke(pendings = []) {
    // 判断系统是否启动
    if (appChangesUnderway) {
      return new Promise((resolve, reject) => {
        changesQueue.push({
          success: resolve,
          failure: reject
        });
      });
    }

    appChangesUnderway = true;

    if (isStarted()) {
      // 启动app
      return preformAppChanges();
    } // 加载app 并不执行，相当于预加载


    return loadApps();

    function loadApps() {
      // 获取需要被加载的app
      return Promise.all(getAppsToload().map(toLoadPromise)).then(apps => {
        console.log(apps); // 加载完成调finish

        return finish();
      }).catch(e => {
        console.log(e);
      }); // getAppsToload().map(app => {
      //   return toLoadPromise(app)
      // })
    } // 核心逻辑 启动app: 卸载不需要的app,加载需要的app，挂载需要的app


    function preformAppChanges() {
      // 先卸载不需要的app  执行卸载
      // 拿到需要卸载的app，调用toUnmountPromise
      let unmountPromise = getAppsToUnmount().map(toUnmountPromise);
      unmountPromise = Promise.all(unmountPromise); // will load app  ===>  getAppsToload().map(toLoadPromise)   
      //  加载完  启动   启动完  mount
      // 拿到需要加载的app，去load， load完成后调用 bootstrap, bootstrap完成并且等unmount完成后再去调用mount（先卸载再加载）

      let loadApps = getAppsToload();
      loadApps.map(app => {
        return toLoadPromise(app).then(function (app) {
          return toBootstrapPromise(app).then(() => unmountPromise).then(() => toMountPromise(app));
        });
      }); // will mount app   mount不需要load,比上一步操作少了一个load

      let mountApps = getAppsToMount(); // 去重

      mountApps = mountApps.filter(app => loadApps.indexOf(app) === -1);
      mountApps = mountApps.map(function (app) {
        // 拿到已经加载过并且没有mount的app
        return toBootstrapPromise(app).then(() => unmountPromise).then(() => toMountPromise(app));
      }); // unmountPromise

      return unmountPromise.then(() => {
        let allPromises = loadApps.concat(mountApps); // 统一去挂载

        return Promise.all(allPromises).then(() => {
          return finish();
        }, e => {
          pendings.forEach(item => item.failure(e));
          throw e;
        });
      }, e => {
        console.log(e);
      }); // 针对load和mount的app去重
    } // 事件队列里有值就一直循环 递归掉，如果没有值，就把当前事件队列返回回去


    function finish() {
      // 获取当前已经被加载的app
      let returnValue = getMountedApps();

      if (pendings.length) {
        // 当前被挂载得app
        // promise 状态一旦确定，就无法再修改
        pendings.forEach(item => item.success(returnValue));
      } // 表示当前循环已经完成


      appChangesUnderway = false;

      if (changesQueue.length) {
        // 路由变了 用户掉start方法了
        let backup = changesQueue;
        changesQueue = [];
        invoke(backup);
      }

      return returnValue;
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

  function registerApplication(appName, loadFunction, activityWhen, customProps = {}) {
    if (!appName || typeof appName !== 'string') {
      throw new Error('appName must be a no-empty string');
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
  } // 卸载app

  function getAppsToUnmount() {
    return APPS.filter(noSkip).filter(isActive).filter(shouldBeActivity);
  } // mount app

  function getAppsToMount() {
    // 没有中断  已经加载过的(isLoaded)   没有被mount的(isntActive)  应该被mount的(shouldBeActivity)
    return APPS.filter(noSkip).filter(isLoaded).filter(isntActive).filter(shouldBeActivity);
  } // 获取当前已经被挂载的app

  function getMountedApps() {
    return APPS.filter(app => isActive(app));
  }

  exports.registerApplication = registerApplication;
  exports.start = start;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=my-single-spa.js.map
