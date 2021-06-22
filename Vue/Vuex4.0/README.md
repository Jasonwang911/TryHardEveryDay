### vue create vuex-lean
1. Vue3 的composition实现的功用方法的抽离，而并不是代替Vuex
2. Vuex4 并没有实现计算属性getters的功能  
3. Vuex3内部会创造一个Vue的实例，Vuex4直接采用Vue4提供的响应式方法 reactive() = new Vue()
4. store._state = reactive({data: option.state})


### Vuex 中的插件机制

