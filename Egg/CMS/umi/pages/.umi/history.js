// create history
const history = __IS_BROWSER
  ? require('umi/lib/createHistory').default({
      basename: window.routerBase,
    })
  : require('history').createMemoryHistory({
      // for history object in dva
      initialEntries: [global.req ? global.req.url : '/'],
    });
window.g_history = history;
export default history;
