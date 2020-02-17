import React from 'react'
import Link from 'umi/link'

export default class UserList extends React.Component {
  render() {
    const list = [{id: 1, name: 'jason'}, {id: 1, name: 'xiaoming'}]
    return <div>
      <h4>用户列表</h4>
      <ul className="list-group">
        {
          list.map((item, index) => {
            return (
              <li key={index}><Link to={{pathname:`/user/detail/${item.id}`, state: item}}>{item.name}</Link></li>
            )
          })
        }
      </ul> 
    </div>
  }
}