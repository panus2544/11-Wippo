import React, { Component } from 'react';
import Nav from '../Core/Navbar'
import Menu from '../Core/Menu'
import styled from 'styled-components'
import Table from './TableCheck'

const ZIndex = styled.div`
  z-index: 10;
`

class index extends Component {
  render() {
    return (
      <div className="container-fulid overflow-hidden">
        <div className="row">
          <div className="col-12 col-md-12 ">
            <Nav />
          </div>
          <ZIndex className="col-3 col-md-2">
            <Menu/>
          </ZIndex>
          <div className="col-9 col-md-10 p-5" >
            <h2>ตรวจเอกสารผู้ยืนยันสิทธิ์ (PR)</h2>
            <Table/>
          </div>
        </div>
      </div >
    );
  }
}

export default index;