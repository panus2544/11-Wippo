import React from 'react'
import Menu from '../Core/Menu'
import Nav from '../Core/Navbar'
import ApproveTable from './ApproveTable'


export default class Approve extends React.Component {
  state = {
    userAuth : this.props.allUser
   }
  render() {
    return (
      <div className="container-fulid overflow-hidden">
      <div className="row">
        <div className="col-12 col-md-12 ">
          <Nav visible={this.state.menu} setPage={this.setPage} current={this.state.current} />
        </div>
        <div className="col-4 col-md-2">
          <Menu/>
        </div>
        <div className="col-8 col-md-10 p-5" >
          <ApproveTable/>
        </div>
      </div>
    </div >
    )
  }
}
