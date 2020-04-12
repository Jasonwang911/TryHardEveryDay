## Vue
1. v-module 原理

2. 组件中data为什么是一个函数

3. v-html会有什么问题：原理就是innerHTML
- 可能会导致xss攻击
- 会替换调内部标签

4. 父子组件生命周期调用顺序  
- 渲染顺序： 先父后子
- 完成顺序： 先子后父
- 有队列的概念，子组件初始化后都会进入队列，所有队列表清空才会执行父组件

5. Vue父子组件如何通信

6. Vue中相同逻辑如何抽离
- mixins
- 先执行mixin的后执行组件的，组件的会覆盖mixin的

7. 为什么要使用异步组件  
组件功能多打包打包出来的结果会变大，这时候可以使用异步组件的方式来加载。主要依赖import()实现文件分割加载。
- 把组件的定义变成异步加载
- 异步组件一定是一个函数或者是对象，函数的话返回的是一个Promise

8. 什么是作用域插槽
- 普通插槽是在父组件中进行渲染，在渲染完子组件后进行保存和替换
- 作用域插槽 slot-scope  v-slot， 是在组件内部渲染的，编译成了组件的属性，以一个函数的形式存在

9. 谈谈你对keep-alive的理解
- keep-alive 是一个组件，并且是抽象组件，创建组件created的时候创建一个缓存列表数组，移除组件destoryed，会清空缓存和key，在mounted的时候，会使用watch监听include和exclude属性，并动态的加载和移除组件，渲染render的时候，会拿到组件的默认插槽this.$slots.default，并且拿到缓存的第一个组件（如果缓存多个组件的话只会拿到第一个组件），然后获取组件的名字name，并判断组件是否在缓存队列中，如果是进行缓存，如果不是不进行缓存
- keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载，常用的两个属性是include和exclude，两个生命周期是activated和deactivited.
- LRU算法，缓存的时候会创建一个key，key会被放入队列，LRU算法就是最久未使用法。调用哪个页面会把哪个页面的key移动到数组最后，然后当超出keep-alive的max属性的时候，会从前面一次删除key

10. Vue组件中常见的性能优化  
- 编码优化
  不要讲所有数据都放在data中，data中的数据都会进行geter和setter,并会进行watch   
  vue在v-for时都会给每项元素绑定事件需要的代理   
  spa页面采用keep-alive缓存组件  
  拆分组件，提高复用性，增加代码的可维护性，减少不必要的渲染  
  v-if当值为false时内部指令不会执行，具有阻断功能，尽量使用v-if代替v-show  
  key保证唯一性，vue会才用就就地复用策略  
  Object.freeze冻结数据   
  合理使用路由懒加载、异步组件   
  尽量才用runtime运行时版本   
  数据持久化的问题（防抖、节流）   

- vue加载性能优化
  第三方模块按需导入（babel-plugin-component)   
  滚动到可视区动态加载（vue-virtual-scroll-list)     
  图片懒加载（vue-lazyload)   

- 用户体验 
  app-skeleton骨架屏     
  app-shell app壳   
  pwa service-work   

- SEO优化  
  预渲染插件 prerender-spa-plugin  
  服务端渲染ssr   

- 打包优化
  使用cdn的方式加载第三方模块   
  多线程打包happypack   
  splitChunks 抽离公用文件  
  sourceMap 生成   

- 缓存 压缩
  客户端缓存，服务端缓存  
  服务端gzip压缩   


11. Vue3.0你知道有哪些改进
  Vue3.0才用了TS来编写   
  支持Composition API   
  Vue3中响应式数据原理改成proxy   
  vdom的对比算法更新，只更新vdom的绑定了动态数据部分

12. 实现hash路由和history路由
  onhashchange   
  history.pushState    

13. Vue-router中导航守卫有哪些
  - 完整的导航解析流程

##  js的一些方法和属性

1. 数组扁平化flat方法的多种实现？
- arr.toString().split(',').map(item => Number(item)) 
- JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map(item => Number(item))
- concat
```
while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
}
```
- prototype 
```
Array.prototype.flat = function () {
    let result = [];
    let _this = this;
    function _flat(arr) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (Array.isArray(item)) {
                _flat(item);
            } else {
                result.push(item);
            }
        }
    }
    _flat(_this);
    return result;
}
```

2. 实现一个不可变对象
- 无论是不可扩展，密封，还是冻结，都是浅层控制的，即只控制对象本身属性的增删改。如果对象属性是一个引用类型，比如数组 subArr 或对象 subObj等，虽然subArr、subObj 的不可被删改，但subArr、subObj 的属性仍然可增删改
- 由于每个对象都有一个属性__proto__,该属性的值是该对象的原型对象，也是引用类型，由于冻结是浅层的所以原型对象并不会被连着冻结，仍然可以通过给对象的原型对象加属性达到给当前对象新增属性的效果。所以如果想进一步冻结还需要把原型对象也冻结上

- 不可扩展  Object.preventExtensions(obj)  检测是否可扩展 Object.isExtensible(obj)   不能添加属性，可以删除和修改原属性
- 密封  Object.seal(obj)   检测是否可扩展 Object.isSealed(obj)   不能添加属性，也不能删除属性，但是可以修改原属性
- 冻结  Object.freeze(obj)  检测是否冻结 Object.isFrozen(obj)    不能添加、修改、删除属性

3. js的+运算
- 两个操作数如果是number则直接相加出结果
- 如果其中有一个操作数为string，则将另一个操作数隐式的转换为string，然后进行字符串拼接得出结果
- 如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接
- 如果操作数是像boolean这种的简单数据类型，那么就将操作数转换为number相加得出结果
- [ ] + { } 因为[]会被强制转换为"", 然后+运算符 链接一个{ }, { }强制转换为字符串就是"[object Object]"
- { } 当作一个空代码块,+[]是强制将[]转换为number,转换的过程是 +[] => +"" =>0 最终的结果就是0
```
[]+{}  //"[object Object]"
{}+[]  //0
{}+0   //0
[]+0   //"0"
```

4. 柯理化 


### webpack 
webpack的原理，Loader的原理，你有用那些优化措施  
1. webpack 和 rollup 的区别和适用


2. 说说你对webpack的理解
- webpack是什么： webpack是把项目当做一个整体，通过一个给定的主体文件，从这个文件开始查找项目所有的依赖文件，用loaders处理他们，最后打包成一个或多个浏览器可识别的js文件。

3. Loader
- loader的作用： 实现对不同格式的文件的处理，比如讲scss转换为css,或者typescript转化为js。loader转化这些文件，从而使其能够被添加到依赖图中。通过使用不同的loader，从而能够调用外部的脚本或者工具，实现对不同格式文件的处理，loader需要在webpack.config.js里边单独用module进行配置。

这里介绍几个常用的loader：
- babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。babel有些复杂，所以大多数都会新建一个.babelrc进行配置
- css-loader,style-loader:两个建议配合使用，用来解析css文件，能够解释@import,url()如果需要解析less就在后面加一个
- less-loaderfile-loader: 生成的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名
- url-loader: 功能类似 file-loader,但是文件大小低于指定的限制时，可以返回一个DataURL事实上，在使用less,scss,stylus这些的时候，npm会提示你差什么插件，差什么，你就安上就行了

4. Plugins
loaders负责的是处理源文件的如css、jsx，一次处理一个文件。而plugins并不是直接操作单个文件，它直接对整个构建过程起作用。

- ExtractTextWebpackPlugin: 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中。
- HtmlWebpackPlugin: 依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html
- HotModuleReplacementPlugin: 热更新HMR
- OccurenceOrderPlugin: 为组件分配ID,通过这个插件webpack可以分析和优先考虑使用最多 的模块，然后为他们分配最小的ID
- UglifyJsPlugin: 压缩代码


####  Hot Module Replacement，简称 HMR
刷新分为两种：一种是页面刷新，不保留页面状态，就是简单粗暴，直接window.location.reload()；另一种是基于 WDS（Webpack-dev-server）的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。
1. Webpack Watch
为什么代码的改动保存会自动编译，重新打包？这一系列的重新检测编译依赖于 Webpack 的文件监听：在项目启动之后，Webpack 会通过 Compiler 类的 Run 方法开启编译构建过程，编译完成后，调用 Watch 方法监听文件变更，当文件发生变化，重新编译，编译完成之后继续监听。
2. webpack-dev-middleware
页面的访问需要依赖 Web 服务器，那要如何将 Webpack 编译打包之后的文件传递给 Web 服务器呢？这就要看 Webpack-dev-middleware了。 Webpack-dev-middleware 是一个封装器（ wrapper ），它可以把 Webpack 处理过的文件发送到一个 Server（其中 Webpack-Dev-Server 就是内置了 Webpack-dev-middleware 和 Express 服务器）。上面有说到编译之后的文件会被写入到内存，而 Webpack-dev-middleware 插件通过 memory-fs 实现静态资源请求直接访问内存文件。




### 数组的操作
1. 数组的去重（ES6 和 ES5分别实现）
- ES6  
```
let arr = [1,2,3,3,4,4]

let set = new Set(arr)
let result = Array.from(set)
console.log(result)
```

- ES5
```
let arr = [1,2,3,3,4,4]

function unique(arr) {
  if(!Array.isArray(arr)) {
    new Error('arg type error')
    return
  }
  let result = []
  let leng = arr.length
  for(let i = 0; i < leng; i++) {
    if(result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}

unique(arr)
```

2. 数组的交集和并集
```
let a = new Set([1, 2, 3]);
let b = new Set([3, 5, 2]); 

// 并集
let unionSet = new Set([...a, ...b]);
//[1,2,3,5]

// 交集
let intersectionSet = new Set([...a].filter(x => b.has(x)));
```

