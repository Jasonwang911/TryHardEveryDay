// LeetCode 第 20 题：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意：空字符串可被认为是有效字符串。

// 示例 1
// 输入: "()"
// 输出: true

// 示例 2
// 输入: "(]"
// 输出: false


// 思路： 
// 利用一个栈，不断地往里压左括号，一旦遇上了一个右括号，我们就把栈顶的左括号弹出来，表示这是一个合法的组合，以此类推，直到最后判断栈里还有没有左括号剩余。

let isValid = (s) => {
  let length = s.length
  if(!length || length % 2 === 1) return false

  const stack = []
  for(let i = 0; i < length; i++) {
    const c = s[i]
    // 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串
    if(c === '(' || c === '{' || c === '[') {
      stack.push(c)
      //  [(, {]
    }else {
      const t = stack[stack.length - 1]
      if((t === '(' && c === ')') || (t === '{' && c ==='}') || (t === '[' && c === ']')) {
        stack.pop()
      }else {
        return false
      }
    }
  }
  return stack.length === 0 ? true : false
}

console.log("(]===>", isValid("(]"))
console.log("()===>",isValid("()"))


var isValid2 = function(s) {
  if(!s || s.length % 2 === 1)return false;

  let m = {
      '(':')',
      '{':'}',
      '[':']',
  }
  let stack = [];
  for(let char of s){
      if(char === '(' || char === '{' || char === '['){
          stack.push(char);
      }else{
          let pop = stack.pop();
          if(char !== m[pop])return false;
      }
  }

  return stack.length > 0? false:true;

}