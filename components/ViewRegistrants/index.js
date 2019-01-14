import React from 'react'
import { Table } from 'antd'
import Nav from '../Core/Navbar'
import Menu from '../Core/Menu'


export default class Registants extends React.Component {
  state = {
   userAuth : this.props.allUser
  }
  render() {
    return (
      <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Nav visible={this.state.menu} setPage={this.setPage} current={this.state.current} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-3">
          <Menu />
        </div>
        <div className="col-md-9 col-9">
         
        </div>
      </div>
    </div>
    )
  }
}
