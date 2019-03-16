import React from 'react'
import Nav from '../Core/Navbar'
import Menu from '../Core/Menu'
import styled from 'styled-components'
import Table from './TableDisease'

const ZIndex = styled.div`
  z-index: 10;
`
export default class Registants extends React.Component {
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
          <ZIndex className="col-3 col-md-2">
            <Menu/>
          </ZIndex>
          <div className="col-9 col-md-10 p-5" >
            <Table/>
          </div>
        </div>
      </div >
    )
  }
}
