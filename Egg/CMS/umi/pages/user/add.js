import React from 'react'
import router from 'umi/router'

export default class UserAdd extends React.Component {
  constructor() {
    super()
    this.usernameRef = React.createRef()
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.usernameRef.current.value;
    let userStr = localStorage.getItem('users');
    let users = userStr ? JSON.parse(userStr) : [];
    user.push({id: Date.now(), username})
    localStorage.setItem('user', JSON.stringify(users))
    router.push('/user/list');
  }

  render() {
    return <div>
      <h4>添加用户</h4>
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input type="text" className="form-control" ref={this.usernameRef} />
        </div>
        <div className="form-group">
          <input type="text" value="添加用户" htmltype="submit" className="btn btn-primary" htmlFor="submit" onChange={this.handleSubmit} />
        </div>
      </form>
    </div>
  }
}