import React from 'react'
import router from 'umi/router'

export default class Profile extends React.Component {
  render() {
    let user = this.props.location.state ? this.props.location.state : {name: ''}
    return <div>
      <h4>用户详情</h4>
      <h5>用户id是: {this.props.match.params.id}</h5>
      <h6>用户是: {user.name}</h6>
    </div>
  }
}