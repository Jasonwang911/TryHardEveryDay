import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Count from '@/components/Count'

// 测试按钮 
describe('测试Count组件', () => {
  it('测试 点击按钮是否能加1', () => {
    let wrapper= mount(Count)
    expect(wrapper.find('#count').text()).to.be.equal('10')
    wrapper.find('button').trigger('click')
    expect(wrapper.find('#count').text()).to.be.equal('11')
  })
})