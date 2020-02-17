/**
 * title: 个人中心
 * Routes:
 *   - ./PrivateRoute.js
 */

import React from 'react'
import router from 'umi/router'

export default class Porfile extends React.Component {
  render() {
    return <div>
      <button onClick={() => router.push('/')}>首页</button>
      <h4>个人中心</h4>
    </div>
  }
}