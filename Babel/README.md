## Babel 是一个 JavaScript 编译器 


### Babel 转译的范围
注意很重要的一点就是，Babel 只是转译新标准引入的语法，比如：箭头函数 let/const 解构   
对于新标准引入的全局变量、部分原生对象新增的原型链上的方法，Babel 表示超纲了。比如： 全局变量 Promise Symbol WeakMap Set includes generator 函数，对于这些来说就需要引入 polyfill 来解决。  

#### Babel 编译的三个阶段
解析（Parsing）：将代码字符串解析成抽象语法树。   
转换（Transformation）：对抽象语法树进行转换操作。   
生成（Code Generation）: 根据变换后的抽象语法树再生成代码字符串。  

