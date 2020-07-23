// AST语法树使用对象来描述js语法的  虚拟DOM使用对象来描述dom节点的
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;   // name-space
// ?: 匹配不捕获
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function parseHTML(html) {
  // 不停的解析html字符串，解析一段删除一段，html删除完毕就解析完成
  while(html) {
    let textEnd = html.indexOf('<')
    if(textEnd === 0) {
      // 如果当前索引为0，肯定是一个标签： 开始标签或者结束标签
      let startTagMatch = parseStartTag()   // 通过这个方法获取到匹配的结果： tagName attrs
      break
    }
  }
  // 截取函数  step 表示截取多少位
  function advance(step) {
    html = html.substring(step)
  }
  function parseStartTag() {
    let start = html.match(startTagOpen)
    if(start) {
      console.log(start)   // ["<div", "div", index: 0, input: "<div id="app">↵    <p>{{name}}</p>↵    <span>{{age}}</span>↵  </div>", groups: undefined]
      let match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)  // 截取除了第一个开始标签以外的部分
      let end, attr
      // 不是结尾标签 并且 有属性
      while(!(end= html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 截取属性剩余的标签
        console.log(attr)
        advance(attr[0].length)
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        })
      }
      console.log(match, html)
    }
  }
}

export function compileToFunction(template) {
  let root = parseHTML(template)
  return function render() {

  }
}

{/* <div id="app">
  <p>hello</p>
</div> */}

