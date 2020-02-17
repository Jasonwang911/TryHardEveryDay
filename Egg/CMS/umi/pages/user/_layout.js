import React from 'react'
import Link from 'umi/link'
import router from 'umi/router'

export default class UserLayout extends React.Component {
  render() {
    return <div className="row">
      <div className="col-md-3">
        <nav className="nav nav-stacked">
          <div><Link to="/user/list">用户列表</Link></div>
          <div><Link to="/user/add">添加用户</Link></div>
        </nav>
      </div>
      <div className="col-md-9">
        {this.props.children}
      </div>
    </div>
  }
}