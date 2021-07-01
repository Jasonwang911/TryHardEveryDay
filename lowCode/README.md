# 低代码 Low Code 
1. 全栈可视化编程
2. 低代码扩展能力
组件、主题、模板、逻辑
3. 全生命周期管理
开发-构建-测试-部署-运维-运营

## 行业标杆
- medix 
- outsystem
- Sula
- Jeecg-Boot

## 参考示例
lin-xi/playground.git

https://juejin.cn/post/6844903656865677326


## 相关难点
### 两个项目重用组件
- 组件库 从简设计，尽量抽离展示型组件

### 组件的属性设计
1.  业务组件： 样式属性、其他属性
- 把css作为统一的对象传入
- 将所有属性平铺传入(更好)

2. 公用属性

### 组件扩展性怎样保持


```
interface EditorStore {
  components: ComponentData[];
  currentElement: string;
}

interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string;
}
```