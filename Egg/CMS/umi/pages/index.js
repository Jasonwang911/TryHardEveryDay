import React from 'react'
import Link from 'umi/link'

export default class Home extends React.Component {
  render() {
    return <div>
      <Link to="/porfile">个人中心</Link>
      <h4>首页</h4>
    </div>
  }
}