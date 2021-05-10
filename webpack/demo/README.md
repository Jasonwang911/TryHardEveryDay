## css 
- css: ['style-loader', 'css-loader']
- less: ['style-loader', 'css-loader', 'less-loader']
- sass: ['style-loader', 'css-loader', 'sass-loader']

## 图片
- file-loader: 读取文件，并拷贝到输出目录；并吧图片模块转为js模块
- url-loader: file-loader的增强，多了一个参数 limit: 8*1024  如果文件体积小于limit，就会将文件转为base64内嵌到html中
- html-loader
- css文件中的图片引入是依靠 css-loader 来完成的
