// 钩子函数
describe('test/order.test.js', function () {
  before(() => console.log('before1  在所有测试用例之前执行的函数'))
  before(() => console.log('before2  在所有测试用例之前执行的函数'))
  beforeEach(() => console.log('beforeEach 测试用例开始'))
  it('order1', () => console.log('测试用例1'))
  it('order1', () => console.log('测试用例2'))
  afterEach(() => console.log('afterEach 测试用例结束'))
  after(() => console.log('after1 在所有测试用例执行之后执行的钩子'))
  after(() => console.log('after2 在所有测试用例执行之后执行的钩子'))
})