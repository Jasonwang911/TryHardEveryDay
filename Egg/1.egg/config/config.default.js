// cookie session 加密使用
// exports.keys = 'jason wang'
module.exports = app => {
  let config = {}
  config.keys = app.name + 'jason wang'
  config.view = {
    // 默认的扩展名，如果渲染一个文件，没有指定扩展名，就会尝试添加这个扩展名
    defaultExtension: '.html',
    // 如果某个扩展名的模板文件没有在mapping里配置，就会用这个默认的模板引擎来渲染
    defaultViewEngine: 'nunjucks',
    // 映射  如果要渲染的模板是以 .html 结尾的会用nunjucks进行渲染
    mapping: {
      '.html': 'nunjucks'
    }
  }
  config.news = {
    url: 'http://127.0.0.1:3000/news'
  }
  config.cache = {
    url: 'http://127.0.0.1:3000/cache'
  }
  return config
}