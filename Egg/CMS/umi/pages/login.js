import React from 'react'
import router from 'umi/router'

export default class Profile extends React.Component {
  render() {
    return <div>
      <button onClick={() => {
        localStorage.setItem('login', true)
        const pathname = this.props.location.state && this.props.location.state.form ? this.props.location.state.form : '/'
        router.push(pathname)
      }}>登录</button>
    </div>
  }
}