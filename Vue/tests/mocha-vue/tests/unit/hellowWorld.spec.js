import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'

describe('HellowWorld.vue', () => {
  it('helloWorld组件是否能正常显示传递的属性', () => {
    // 原生测试方法
    // extend方法可以根据实例创建一个类
    let Constructor = Vue.extend(HelloWorld)
    // 挂载组件  vm.$el vue挂载的dom   测试的时候mocha集成了jsDom 
    let vm = new Constructor({
      propsData: {msg: 'Jason'}
    }).$mount()
    expect(vm.$el.querySelector('h1').innerHTML).to.be.contain('Jason')
  })
})

// @vue/test-utils  中的 mount
describe('使用@vue/test-utils测试HelloWord组件', () => {
  it('helloWorld组件是否能正常显示传递的属性', () => {
    // mount 用来挂在元素
    const warpper = mount(HelloWorld, {
      propsData: {msg: 'Jason'}
    })
    // find() 查找元素   text() 获取内容
    expect(warpper.find('h1').text()).to.be.contain('Jason')
  })
})