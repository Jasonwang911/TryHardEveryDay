import { uniquelize, validMoney } from '@/utils'
import { expect } from 'chai'

// 写代码的时候 mocha + chai  

// 一个用例  expect  期望
// 用例分类  describe 套件  
/*
*   单元测试的测试方法
*    
*
*/
describe('专门测试uniquelize，是否能排序成功', () => {
    it('我要测试uniquelize，是否能排序成功', () => {
        // deep.equal  表示两个对象是狗完全相等
        expect(uniquelize([1,1,2,2,3,3,4])).to.be.deep.equal([1,2,3,4])
    })
})

describe('我要测试validMoney函数能否检验金额', () => {
    it('我要测试validMoney函数能否检验金额', () => {
        expect(validMoney(-1)).to.be.equal(false)
    })
})

describe('相等测试', () => {
    it('equal', () => {
        expect(-1).to.be.equal(-1)
    })
    it('deep.equal', () => {
        expect({a: 1, b: 2}).to.be.deep.equal({a: 1, b: 2})
    })
    it('lengthOf', () => {
        expect([1,2,3]).to.be.lengthOf(3)
    })
    it('boolean', () => {
        expect(validMoney(1)).to.be.true
    })
})

describe('包含检测', () => {
    it('contain', () => {
        expect('123').to.be.contain('2')
    })
    it('正则', () => {
        expect('123').to.be.match(/^1/)
    })
})

describe('比较检测', () => {
    it('大于', () => {
        expect(100).to.be.greaterThan(99)
    })
    it('小于', () => {
        expect(1).to.be.lessThan(10)
    })
})

describe('取反检测', () => {
    it('取反', () => {
        expect(true).to.be.not
    })
})