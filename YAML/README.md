# YAML 
YAML 是专门用来写配置文件的语言，非常简洁和强大，远比 JSON 格式方便   
[YAML to JS](https://nodeca.github.io/js-yaml/)   
umi和docker中配置文件大量使用了YAML

## 基本规则
- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
- 井号表示注释，从这个字符一直到行尾，都会被解析器忽略。

## 支持的数据结构
- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值

1. 对象
```
# {name: 'jason'}
name: jason
```
2. 数组
```
# [ 'apple', 'banana', 'orange' ]
- apple
- banana
- orange
```
