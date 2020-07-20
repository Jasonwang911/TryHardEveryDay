## Vue源码学习

### rollup
rollup更专注于打包js，打包出的体积更小   
打包应用使用webpack，打包js类库使用rollup  
1. 安装依赖
@babel/core   使用babel就需要安装core   
@babel/preset-env  babel的一个预设，可以把高级语法转换成为低级语法   
rollup-plugin-babel  支持在rollup中使用babel    
rollup-plugin-serve  开发过程中的本地服务
cross-env  环境变量的设置
```
 yarn add rollup @babel/core @babel/preset-env rollup-plugin-babel cross-env -D
```
2. 配置文件 rollup.config.js
rollup的配置文件rollup.config.js支持es6-module，支持es6语法  
