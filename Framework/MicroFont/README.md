## 微前端架构的实现

### 创建项目
1. 创建项目
```
yarn init -y 
```

2. 安装依赖
```
yarn add @babel/core @babel/plugin-syntax-dynamic-import @babel/preset-env rollup rollup-plugin-babel rollup-plugin-commonjs  rollup-plugin-node-resolve rollup-plugin-serve corss-env -D
```
模块名称	说明    
@babel/core	  babel编译器的核心库，负责所有babel预设和插件的加载及执行   
@babel/plugin-syntax-dynamic-import	  支持使用import()进行动态导入，当前在Stage 4: finished的阶段    
@babel/preset-env 	预设：为方便开发提供的常用的插件集合   
rollup	javascript    打包工具，在打包方面比webpack更加的纯粹   
rollup-plugin-babel	  让rollup支持babel，开发者可以使用高级js语法    
rollup-plugin-commonjs	  将commonjs模块转换为ES6    
rollup-plugin-node-resolve	  让rollup支持nodejs的模块解析机制    
rollup-plugin-serve	  支持dev serve，方便调试和开发   

3. 配置babel和rollup
```
# 创建babel.config.js
touch babel.config.js
```
然后添加内容
```
module.export = function (api) {
    // 缓存babel的配置
    api.cache(true); // 等同于api.cache.forever()
    return {
        presets: [
            ['@babel/preset-env', {module: false}]
        ],
        plugins: ['@babel/plugin-syntax-dynamic-import']
    };
};
```

```
# 创建rollup.config.js
touch rollup.config.js
```
rollup配置文件：
```
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/my-single-spa.js',
    output: {
        file: './lib/umd/my-single-spa.js',
        format: 'umd',
        name: 'mySingleSpa',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({exclude: 'node_modules/**'}),
        // 见下方的package.json文件script字段中的serve命令
        // 目的是只有执行serve命令时才启动这个插件
        process.env.SERVE ? serve({
            open: true,
            contentBase: '',
            openPage: '/toutrial/index.html',
            host: 'localhost',
            port: '10001'
        }) : null
    ]
}
```

4. 在package.json中添加script和browserslist字段
```
{
    "script": {
        "build:dev": "rollup -c",
        "serve": "SERVE=true rollup -c -w"
    },
    "browserslist": [
        "ie >=11",
        "last 4 Safari major versions",
        "last 10 Chrome major versions",
        "last 10 Firefox major versions",
        "last 4 Edge major versions"
    ]
}
```

5. 添加项目文件夹   
```
mkdir -p src/applications src/lifecycles src/navigation src/services toutrial && touch src/my-single-spa.js && touch toutrial/index.html
```

### app相关概念

1. app相关要求  
微前端的核心为app，微前端的场景主要是：将应用拆分为多个app加载，或将多个不同的应用当成app组合在一起加载。   
为了更好的约束app和行为，要求每个app必须向外export完整的生命周期函数，使微前端框架可以更好地跟踪和控制它们。   
```
// app1
export default {
    // app启动
    bootstrap: [() => Promise.resolve()],
    // app挂载
    mount: [() => Promise.resolve()],
    // app卸载
    unmount: [() => Promise.resolve()],
    // service更新，只有service才可用
    update: [() => Promise.resolve()]
}
```
- 生命周期函数共有4个：bootstrap、mount、unmount、update。
- 生命周期可以传入 返回Promise的函数也可以传入 返回Promise函数的数组。

2. app状态
为了更好的管理app，特地给app增加了状态，每个app共存在11个状态

状态说明（app和service在下表统称为app）：
状态	                  说明	                                                      下一个状态
NOT_LOADED    	app还未加载，默认状态	                                    LOAD_SOURCE_CODE      
LOAD_SOURCE_CODE      	加载app模块中	                                  NOT_BOOTSTRAPPED、SKIP_BECAUSE_BROKEN、LOAD_ERROR   
NOT_BOOTSTRAPPED      	app模块加载完成，但是还未启动（未执行app的bootstrap生命周期函数）	          BOOTSTRAPPING   
BOOTSTRAPPING	      执行app的bootstrap生命周期函数中（只执行一次）	SKIP_BECAUSE_BROKEN     
NOT_MOUNTED	      app的bootstrap或unmount生命周期函数执行成功，等待执行mount生命周期函数（可多次执行）	        MOUNTING      
MOUNTING	      执行app的mount生命周期函数中	                          SKIP_BECAUSE_BROKEN     
MOUNTED     	app的mount或update(service独有)生命周期函数执行成功，意味着此app已挂载成功，可执行Vue的$mount()或ReactDOM的render()	                      UNMOUNTING、UPDATEING   
UNMOUNTING      	app的unmount生命周期函数执行中，意味着此app正在卸载中，可执行Vue的$destory()或ReactDOM的unmountComponentAtNode()	        SKIP_BECAUSE_BROKEN、NOT_MOUNTED    
UPDATEING	      service更新中，只有service才会有此状态，app则没有	      SKIP_BECAUSE_BROKEN、MOUNTED      
SKIP_BECAUSE_BROKEN     	app变更状态时遇见错误，如果app的状态变为了SKIP_BECAUSE_BROKEN，那么app就会blocking，不会往下个状态变更      	无      
LOAD_ERROR      	加载错误，意味着app将无法被使用     	无  


- 筛选需要加载的app

- 筛选需要

- 筛选需要被卸载的app


3. app生命周期函数和超时的处理
app的生命周期函数何以传入数组或函数，但是它们都必须返回一个Promise，为了方便处理，所以我们会判断：如果传入的不是Array，就会用数组将传入的函数包裹起来。  

```
export function smellLikeAPromise(promise) {
    if (promise instanceof Promise) {
        return true;
    }
    return typeof promise === 'object' && promise.then === 'function' && promise.catch === 'function';
}

export function flattenLifecyclesArray(lifecycles, description) {
    if (Array.isArray(lifecycles)) {
        lifecycles = [lifecycles]
    }
    if (lifecycles.length === 0) {
        lifecycles = [() => Promise.resolve()];
    }
    // 处理lifecycles
    return props => new Promise((resolve, reject) => {
        waitForPromise(0);

        function waitForPromise(index) {
            let fn = lifecycles[index](props);
            if (!smellLikeAPromise(fn)) {
                reject(`${description} at index ${index} did not return a promise`);
                return;
            }
            fn.then(() => {
                if (index >= lifecycles.length - 1) {
                    resolve();
                } else {
                    waitForPromise(++index);
                }
            }).catch(reject);
        }
    });
}

// 示例
app.bootstrap = [
    () => Promise.resolve(),
    () => Promise.resolve(),
    () => Promise.resolve()
];
app.bootstrap = flattenLifecyclesArray(app.bootstrap);
```
思考：如果用reduce的话怎么写？有什么需要注意的问题么？

为了app的可用性，我们还讲给每个app的生命周期函数增加超时的处理。   

```
// flattenedLifecyclesPromise为经过上一步flatten处理过的生命周期函数
export function reasonableTime(flattenedLifecyclesPromise, description, timeout) {
    return new Promise((resolve, reject) => {
        let finished = false;
        flattenedLifecyclesPromise.then((data) => {
            finished = true;
            resolve(data)
        }).catch(e => {
            finished = true;
            reject(e);
        });

        setTimeout(() => {
            if (finished) {
                return;
            }
            let error = `${description} did not resolve or reject for ${timeout.milliseconds} milliseconds`;
            if (timeout.rejectWhenTimeout) {
                reject(new Error(error));
            } else {
                console.log(`${error} but still waiting for fulfilled or unfulfilled`);
            }
        }, timeout.milliseconds);
    });
}

// 示例
reasonableTime(app.bootstrap(props), 'app bootstraping', {rejectWhenTimeout: false, milliseconds: 3000})
    .then(() => {
        console.log('app 启动成功了');
        console.log(app.status === 'NOT_MOUNTED'); // => true
    })
    .catch(e => {
        console.error(e);
        console.log('app启动失败');
        console.log(app.status === 'SKIP_BECAUSE_BROKEN'); // => true
    });
```

### 路由拦截 
微前端中app分为两种：一种是根据Location进行变化的，称之为app。另一种是纯功能(Feature)级别的，称之为service。

如果要实现随Location的变化动态进行mount和unmount那些符合条件的app，我们就需要对浏览器的Location相关操作做统一的拦截。另外，为了在使用Vue、React等视图框架时降低冲突，我们需要保证微前端必须是第一个处理Location的相关事件，然后才是Vue或React等框架的Router处理。

- 为什么Location改变时，微前端框架一定要第一个执行相关操作哪？如何保证"第一个"？

因为微前端框架要根据Location来对app进行mount或unmount操作。然后app内部使用的Vue或React才开始真正进行后续工作，这样可以最大程度减少app内部Vue或React的无用（冗余）操作。  
对原生的Location相关事件进行拦截（hijack），统一由微前端框架进行控制，这样就可以保证总是第一个执行。 

```
const HIJACK_EVENTS_NAME = /^(hashchange|popstate)$/i;
const EVENTS_POOL = {
    hashchange: [],
    popstate: []
};

function reroute() {
    // invoke主要用来load、mount、unmout满足条件的app
    // 具体条件请看文章上方app状态小节中的"load、mount、unmount条件"
    invoke([], arguments)
}

window.addEventListener('hashchange', reroute);
window.addEventListener('popstate', reroute);

const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;
window.addEventListener = function (eventName, handler) {
    if (eventName && HIJACK_EVENTS_NAME.test(eventName) && typeof handler === 'function') {
        EVENTS_POOL[eventName].indexOf(handler) === -1 && EVENTS_POOL[eventName].push(handler);
    }
    return originalAddEventListener.apply(this, arguments);
};
window.removeEventListener = function (eventName, handler) {
    if (eventName && HIJACK_EVENTS_NAME.test(eventName)) {
        let eventsList = EVENTS_POOL[eventName];
        eventsList.indexOf(handler) > -1 && (EVENTS_POOL[eventName] = eventsList.filter(fn => fn !== handler));
    }
    return originalRemoveEventListener.apply(this, arguments);
};

function mockPopStateEvent(state) {
    return new PopStateEvent('popstate', {state});
}

// 拦截history的方法，因为pushState和replaceState方法并不会触发onpopstate事件，所以我们即便在onpopstate时执行了reroute方法，也要在这里执行下reroute方法。
const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
window.history.pushState = function (state, title, url) {
    let result = originalPushState.apply(this, arguments);
    reroute(mockPopStateEvent(state));
    return result;
};
window.history.replaceState = function (state, title, url) {
    let result = originalReplaceState.apply(this, arguments);
    reroute(mockPopStateEvent(state));
    return result;
};

// 再执行完load、mount、unmout操作后，执行此函数，就可以保证微前端的逻辑总是第一个执行。然后App中的Vue或React相关Router就可以收到Location的事件了。
export function callCapturedEvents(eventArgs) {
    if (!eventArgs) {
        return;
    }
    if (!Array.isArray(eventArgs)) {
        eventArgs = [eventArgs];
    }
    let name = eventArgs[0].type;
    if (!HIJACK_EVENTS_NAME.test(name)) {
        return;
    }
    EVENTS_POOL[name].forEach(handler => handler.apply(window, eventArgs));
}
```

### 执行流程（核心）
整个微前端框架的执行顺序和js事件循环相似

#### 触发时机
整个系统的触发时机分为两类：
1. 浏览器触发：浏览器Location发生改变，拦截onhashchange和onpopstate事件，并mock浏览器history的pushState()和replaceState()方法。
2. 手动触发：手动调用框架的registerApplication()或start()方法。

#### 修改队列(changesQueue)
每通过触发时机进行一次触发操作，都会被存放到changesQueue队列中，它就像事件循环的事件队列一样，静静地等待被处理。如果changesQueue为空，则停止循环直至下一次触发时机到来。
- 和js事件循环队列不同的是，changesQueue是当前循环内的所有修改(changes)会绑成一批（batch）同时执行，而js事件循环是一个一个地执行。

#### "事件"循环
在每一次循环的开始阶段，会先判断整个微前端的框架是否已经启动。

#### 未启动：
根据规则（见上文的『判断需要被加载(load)的App』）加载需要被加载的app，加载完成之后调用内部的finish方法。

#### 已启动：
根据规则获取当前因为不满足条件而需要被卸载(unmount)的app、需要被加载(load)的app以及需要被挂载(mount)的app，将load和mount的app先合并在一起进行去重，等unmout完成之后再统一进行mount。然后再等到mount执行完成之后就会调用内部的finish方法。  
- 可以通过调用mySingleSpa.start()来启动微前端框架。

通过上文我们可以发现不管是当前的微前端框架的状态是未启动或已启动，最终都会调用内部的finish方法。其实，finish方法的内部很简单，判断当前的changesQueue是否为空，如果不为空则重新启动下一次循环，如果为空则终止终止循环，退出整个流程。   

```
function finish() {
    // 获取成功mount的app
    let resolveValue = getMountedApps();
    
    // pendings是上一次循环进行时存储的一批changesQueue的别名
    // 其实就是下方调用invoke方法的backup变量
    if (pendings) {
        pendings.forEach(item => item.success(resolveValue));
    }
    // 标记循环已结束
    loadAppsUnderway = false;
    // 发现changesQueue的长度不为0
    if (pendingPromises.length) {
        const backup = pendingPromises;
        pendingPromises = [];
        // 将『修改队列』传入invoke方法，并开启下一次循环
        return invoke(backup);
    }
    
    // changesQueue为空，终止循环，返回已mount的app
    return resolveValue;
}
```
#### location事件
另外在每次循环终止时都会将已拦截的location事件进行触发，这样就可以保证上文说的微前端框架的location触发时机总是首先被执行，而Vue或React的Router总是在后面执行。




### Vue和React使用方式的总结
卸载实例：
```
// Vue
VueInstance.$destory()
// React
let el = ReactDom.findNode(reactInstance)
ReactDom.unmountComponentAtNode(el)  
```

#### BDD 行为驱动开发： 先确定系统的行为，再开发，先确定接口，再开发接口


##### package.json中设置环境的三种方式
```
{
  "scripts": {
    "dev1": "export WEBPACK_ENV=production && npx webpack -p",  ## mac
    "dev1": "set WEBPACK_ENV=production && npx webpack -p", ## windows
    "dev2": "cross-env CURRENT_ENV=development webpack-dev-server --inline --progress", ## 兼容所有平台
  }
}
```

#### 版本号的规范
1.0.0   
大版本： 颠覆性升级  major    
正常迭代： minor   
小版本修复问题: patch-extra   

#### treeshark  条件   esmodule
