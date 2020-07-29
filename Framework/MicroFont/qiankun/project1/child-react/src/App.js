import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/react">
      <Link to="/">首页</Link>
      <Link to="/about">关于页面</Link>
      <Route path="/" exact render={() => (
          <div>我是react的首页</div>
      )}></Route>
      <Route path="/about" render={() => (
          <div>我是react的关于页面</div>
      )}></Route>
    </BrowserRouter>
  );
}

export default App;
