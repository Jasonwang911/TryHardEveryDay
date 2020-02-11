import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // 1.参数是指鉴权的方法
  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/server/api/loginCallback',  // 不管鉴权成功和失败都会重定向到此
    failureRedirect: '/server/api/loginCallback'
  })
  // localStrategy 功能是先从请求中获取登录的用户名和密码，然后把他们传入我们自己写的callback
  // 鉴权成功后，会把用户对象传给done, done会把用户放入session中，并重定向到鉴权的成功或者失败参数路由
  router.post('/api/login/account', localStrategy);
  router.get('/api/loginCallback', controller.user.loginCallback)
};
