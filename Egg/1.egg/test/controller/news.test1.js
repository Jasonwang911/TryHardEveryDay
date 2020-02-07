const {
  app,
  mock,
  assert
} = require('egg-mock/bootstrap')

describe('test/controller/news.test.js', function () {
  it('get a ctx', () => {
    // ctx.session.name= 'jason'
    let ctx = app.mockContext({
      session: {
        name: 'jason'
      }
    })
    // 断言内部房一个布尔表达式，如果为true,则什么都不做，如果为false抛异常让测试用例失败
    assert(ctx.method === 'GET')
    assert(ctx.url === '/')
    assert(ctx.session.name === 'jason')
  })

  // async/await 
  it('async/await', async () => {
    await app.httpRequest().get('/news').expect(200)
  })

  // callback 接收一个done参数，然后测试用例执行到此的时候回等待调用done方法
  it('callback', (done) => {
    app.httpRequest().get('/news').expect(200, done)
  })

  // promise
  it('promise', () => {
    // app.httpRequest() 发送一个请求
    return app.httpRequest().get('/news').expect(200)
  })
})