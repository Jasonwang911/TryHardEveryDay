## 盒模型
1. 标准盒模型
2. 怪异盒模型
## 外边距折叠
只有上下margin会出现外边距重叠，左右margin不会出现外边距重叠
## 文档流
所谓文档流是DOM节点在排版中会自动从左到右，从上到下的流式排列。

### 关键帧动画
通过 @keyframes 来定义关键帧， 开发者不需要给出每一帧的定义。只需要定义一些关键的帧即可。因为其余的帧，浏览器会根据计时函数插值计算出来。   
animation-timing-function 
- 常见值有：linear、ease、ease-in、ease-out、ease-in-out。这些值其实都是 cubic-bezier(n,n,n,n) 的特例。它们被称为贝塞尔曲线。  
线调试贝塞尔曲线的网站：cubic-bezier.com
animation-fill-mode 动画填充模式  
- forwards ，表示，动画完成后，元素状态保持为最后一帧的状态。
- backwards，表示，有动画延迟时，动画开始前，元素状态保持为第一帧的状态。
- both，表示上述二者效果都有。

animation-delay 设置延迟时间  
- 延迟可以为负数。负延迟表示动画仿佛开始前就已经运行过了那么长时间。

animation-iteration-count 表示动画播放次数
- normal 默认值。
- reverse 表示动画反向播放。
- alternate 表示正向和反向交叉进行。
- alternate-reverse 表示反向和正向交叉进行。

### 逐帧动画  



### 页面层级
层叠上下文 (堆叠上下文, Stacking Context)、
层叠等级 (层叠水平, Stacking Level)、
层叠顺序 (层叠次序, 堆叠顺序, Stacking Order)、
z-index、
BFC（块级格式化上下文，Block Formatting Context），
这些概念共同决定了你看到元素的位置

- 以下定位元素指的是 position:absolute|fixed|relative|sticky
- 以下非定位元素指的是 position:initial|static


### BFC
触发 BFC 的方式有：
1. 根元素，即 HTML 标签;
2. 浮动元素，即 float 值为 left、 right;
3. overflow 值不为 visible，即值为 auto、 scroll、 hidden；
4. display 值为 inline-block、 table-cell、 table-caption、 table、 inline-table、 flex、 inline-flex、 grid、 inline-grid；
5. 定位元素： position 值为 absolute、 fixed；
6. contain 为 layout、 content、 paint 的元素；

注意： display:table 也可以生成 BFC 的原因在于 Table 会默认生成一个匿名的 table-cell，是这个匿名的 table-cell 生成了 BFC。