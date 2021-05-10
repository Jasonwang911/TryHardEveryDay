# css和图片的处理
## css 
- css: ['style-loader', 'css-loader']
- less: ['style-loader', 'css-loader', 'less-loader']
- sass: ['style-loader', 'css-loader', 'sass-loader']

## 图片
- file-loader: 读取文件，并拷贝到输出目录；并吧图片模块转为js模块
- url-loader: file-loader的增强，多了一个参数 limit: 8*1024  如果文件体积小于limit，就会将文件转为base64内嵌到html中
- html-loader
- css文件中的图片引入是依靠 css-loader 来完成的

# 兼容的处理
- Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5
## @babel/preset-env
- Babel默认只转换新的最新ES语法,比如箭头函数
- babel-loader 转换器，使用Babel和webpack转译JavaScript文件
- babel-core 本身只是一个提供过程管理功能，把源代码转换成抽象语法树，进行遍历解析和生成，它本身并不知道具体要转换什么语法，以及语法如何转换
- babel-preset-env 管理和实现如何转换语法和转换为什么语法
- @babel/@babel/preset-reactReact插件的Babel预设
- @babel/plugin-proposal-decorators把类和对象装饰器编译成ES5
- @babel/plugin-proposal-class-properties转换静态类属性以及使用属性初始值化语法声明的属性

```
{
  test: /\.jsx?$/, use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react"
        ]
      }
    }
  ]
}
```

### 具体转化过程
1. 先把ES6转成ES5语法树--babelCore
2. 然后调用预设preset-env把ES6语法树转成ES5语法树--preset-env
3. 再把ES5语法树重新生成ES5代码--babel-core