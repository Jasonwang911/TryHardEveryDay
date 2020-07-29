import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



function render(props) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 如果是基座调用的子应用，qiankun会动态的注入 publicPath
// if(window.__POWERED_BY_QIANKUN__) {
//   __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
// }

// 如果没有基座，需要独立运行子应用，直接进行挂载
if(!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap(props) {

}

export async function  mount(props) {
  // mount的时候渲染实例
  render(props)
}

export async function unmount(props) {
  // unmount的时候卸载实例
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}
