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
  服务端渲染 ssr   

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
- preload-webpck-plugin: 添加预加载


####  Hot Module Replacement，简称 HMR
刷新分为两种：一种是页面刷新，不保留页面状态，就是简单粗暴，直接window.location.reload()；另一种是基于 WDS（Webpack-dev-server）的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。
1. Webpack Watch
为什么代码的改动保存会自动编译，重新打包？这一系列的重新检测编译依赖于 Webpack 的文件监听：在项目启动之后，Webpack 会通过 Compiler 类的 Run 方法开启编译构建过程，编译完成后，调用 Watch 方法监听文件变更，当文件发生变化，重新编译，编译完成之后继续监听。
2. webpack-dev-middleware
页面的访问需要依赖 Web 服务器，那要如何将 Webpack 编译打包之后的文件传递给 Web 服务器呢？这就要看 Webpack-dev-middleware了。 Webpack-dev-middleware 是一个封装器（ wrapper ），它可以把 Webpack 处理过的文件发送到一个 Server（其中 Webpack-Dev-Server 就是内置了 Webpack-dev-middleware 和 Express 服务器）。上面有说到编译之后的文件会被写入到内存，而 Webpack-dev-middleware 插件通过 memory-fs 实现静态资源请求直接访问内存文件。




### 数组的操作
1. 数组的去重（ES6 和 ES5分别实现） [https://juejin.im/post/5eb7bcccf265da7bf93712e0]
- ES6  
  -- Array.from 将 类似数组的对象 和 可遍历的对象转化为真正的数组   
  -- Set ES6 新的数据结构，set对象是值的集合,不会储存重复的元素，无法对{}和[]去重   
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
- 嵌套循环去重(原始)
嵌套循环，原始数组arrList和一个新的reasonList，判断arrList[i]和reasonList[j]是否相等，如果不相等，就说明元素是唯一的，循环执行完j的长度等于reasonList[j]的长度，把唯一的元素push到新的数组里。   
```
var list = [4, 4, "lalala", "lalala", true, true, undefined, 'true', 'true', undefined, undefined, null, null, 0, 0, {}, {}, [], [], NaN, NaN]

function uni (arrList) {
    // reasonList 用来储存去重后的数组
    let reasonList = []
    for(var i = 0; i < arrList.length; i++) {
        for (var j = 0; j < reasonList.length; j++) {
            // 当找到两个数组中有相同的就停止循环
            if (arrList[i] === reasonList[j]) {
                break
            }
        }
        // 如果没有相同的，执行完循环j === reasonList.length
        if (j === reasonList.length) {
            reasonList.push(arrList[i])
        }
    }
    return reasonList
}
console.log(uni(list))
//[4, "lalala", true, undefined, "true", null, 0, {}, {}, [], [], NaN, NaN]
//0.025146484375ms
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

3. 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。    
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。    
```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```   
主要思路是通过差值来寻找。      
1.用while循环从后往前遍历。     
2.每次遍历先pop最后一个值，再通过indexOf来查找是否有对应的差，pop的好处是为了防止两个数相等。   
3.如果有对应的值，索引就是indexOf和数组的长度。   
```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let i = nums.length;
    while(i > 1) {
        let last = nums.pop();
        if (nums.indexOf(target - last) > -1) {
            return [nums.indexOf(target - last), nums.length]
        }
        i--
    }
};
```

### 前端面试必问
1. 深拷贝
- 数组的浅拷贝
```
[...arr]
arr.concat([])
arr.slice()
```
- 对象的浅拷贝
```
{...obj}
Object.assign({}, obj)
for in 只能遍历可枚举的属性，不可枚举的属性如Symbol不会被拷贝？
```

2. merage合并
- Object.assign(options, params)  

3. 函数柯理化

4. AOP面向切片编程

5. queryURLparams的实现



## 算法面试
1. 全排列
2. 


## 整体规划
1. 设计语言
- 设计规范
- PC组件库
- PC物料库
- 移动组件库
- 移动物料库

2. 前端方案/服务
- NPM私有源
> 技术资产管理
> 接入账号体系
> 一致性

- ICON平台
- API管理平台
> BFF请求层的处理：请求拆分，数据清洗，数据聚合。同时提供数据mock功能，不受后端接口进度的影响。统一所有服务的格式，以便前端的的组件封装

- CI流程规范
> eslint代码检查
> sonar + eslint 分支合并和合并构建 

- 代码风格规范

3. 前端生态

### GMTCB 北京大会部分ppt
https://ppt.infoq.cn/list/gmtcbj2021

## 面试自我介绍
面试官好，我叫王深，从事前端开发大概6年了，在金融行业，教育行业和工业生产行业从事过前端开发，目前在工业生产行业给各种生产模式的企业做生产管理平台。最近几年一直在做前端提效方向的前端基础设施建设，比如公司级别脚手架的设计和研发、组件库、前端物料的建设。对前端效能提升工具的开发有兴趣。

上一分工作在博雅智能，目前我们在做的是一个面向不同类型生产企业的B侧项目，包括生产过程、工艺文件、计划、派工、智能生产数据的管理等一系列的管理平台。项目使用vue对不同管理方向单独立项。基于这样的业务需求，我负责的前端团队的项目架构和提效的工作。由于是给不同企业的不同生产模式管理进行开发，需要维护的项目有部分公用模块和对不同企业的定制需求，普通的项目维护不能满足前端的架构需求。所以我对前端vue项目进行了拆解，每个公司的项目通过微前端管理不同的工作单元模块，比如基础模块，ERP，工艺流程，销售管理等，每个工作单元模块又进行拆解分成所有企业需求一致的共有组件，和面向不同企业定制的功能页面。共有组件通过npm包的形式进行安装和统一升级，定制页面抽离在不同的企业项目中。同时这样的工作方式导致了我们每接到一个项目或者每次抽离新的公有组件都要进行项目的搭建，为了减少繁杂的复制和创建项目过程，统一每个项目的结构和标准化创建流程，我搭建了公司前端开发的脚手架，脚手架主要的功能模块有三个：1. 标准初始化体系，可以根据研发同事的各种自定义配置初始化项目、组件、自定义组件。  2. 标准的git体系：通过执行不同的命令，脚手架可以自动完成本地和远程的git操作  3. 集成项目的CICD功能。CICD又根据项目的不同类型，业务项目推送到不同的测试服务器，组件自动进行build自动发布到公司内部npm私有源。同时整个的流程都会存入进行整体流程数据化，可以为以后研发过程的量化进行数据支持。前端组件库呢，又分为每个公司使用都相同的基础模块如组织机构，字典，权限，菜单管理等。还有每个公司私人定制了业务组件，和一些和业务无关的木偶组件。这些都拆分成npm包进行维护，包和包之间的依赖管理也是用lerna进行管理。省去了手工修改版本号，手工同步不同包之间依赖等的繁琐操作。上面这些是我最近几年的对前端工程化上的实践操作。
另外在lowcode方向最近几年我也不断进行摸索尝试。有在之前东方银谷做的拖拽自动生成运营活动页面和目前B侧的api自动生成vuecode的实践。




### 全排列
https://leetcode-cn.com/problems/permutations/


### lowcode 
https://gitee.com/y_project/RuoYi-Vue


### 面试算法：
1. 爬楼梯、老虎吃羊： 动态规划 https://juejin.cn/post/6844903774390059016
198/337/213 打家劫舍   
```
function fun(n) {
  if (n < 0){
	return 0
  }
  if (n === 1){
	return 1
  }
  if (n === 2){
	return 2
  }
  return fun(n-1) + fun(n-2)
}
console.log('12台阶的走法 ：' + fun(12) )
console.log('11台阶的走法 ：' + fun(11) )
console.log('10台阶的走法 ：' + fun(10) )
console.log('9台阶的走法 ：' + fun(9) )
console.log('8台阶的走法 ：' + fun(8) )
console.log('7台阶的走法 ：' + fun(7) )
console.log('6台阶的走法 ：' + fun(6) )
console.log('5台阶的走法 ：' + fun(5) )
console.log('4台阶的走法 ：' + fun(4) )
console.log('3台阶的走法 ：' + fun(3) )
console.log('2台阶的走法 ：' + fun(2) )
console.log('1台阶的走法 ：' + fun(1) )
```

