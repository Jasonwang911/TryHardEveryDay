import React from 'react'
import router from 'umi/router'

export default class Profile extends React.Component {
  render() {
    console.log(router)
    return <div>
      <button onClick={() => router.push('/')}>首页</button>
      <h4>个人中心</h4>
    </div>
  }
}