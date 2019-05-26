import React, { Component } from 'react'
import Nav from '../Core/Navbar'
import styled from 'styled-components'
import Menu from '../Core/Menu'
import { Table, Input, Button } from 'antd'

const ZIndex = styled.div`
  z-index: 10;
`

class score extends Component {
  state = {
    userAuth: this.props.allUser,
    data: [
      {
        key: '1',
        color: 'ซาบะ',
        score:0
      },
      {
        key: '2',
        color: 'แซลม่อน',
        score:0
      },
      {
        key: '3',
        color: 'ไดฟูกุ',
        score:0
      },
      {
        key: '4',
        color: 'โมจิ',
        score:0
      },
      {
        key: '5',
        color: 'วาซาบิ',
        score:0
      },
      {
        key: '6',
        color: 'โชยุ',
        score:0
      },
      {
        key: '7',
        color: 'พุดดิ้ง',
        score:0
      },
      {
        key: '8',
        color: 'มันม่วง',
        score:0
      },
      {
        key: '9',
        color: 'ซากุระ',
        score:0
      },
      {
        key: '10',
        color: 'มัจฉะ',
        score:0
      }
    ],
    columns: [
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color'
      },
      {
        title: 'score',
        dataIndex: 'score',
        render: (text,id) => (
          <div>
            <Input id={id.key} onChange={this.handleOnChange} />
          </div>
        )
      }
    ]
  }

  handleOnChange = (e) => {
    console.log(e.target.value)
    console.log('id:',e.target.id)
    this.state.data[e.target.id-1].score = parseInt(e.target.value)
    console.log('test',this.state.data)
  }
  handleSubmit = () =>{
    //submit method
  }
  render() {
    return (
      <div className="container-fulid overflow-hidden">
        <div className="row">
          <div className="col-12 col-md-12 ">
            <Nav
              visible={this.state.menu}
              setPage={this.setPage}
              current={this.state.current}
            />
          </div>
          <ZIndex className="col-3 col-md-2">
            <Menu />
          </ZIndex>
          <div className="col-9 col-md-10 p-5">
            <Table dataSource={this.state.data} columns={this.state.columns} />
            <Button onClick={()=> this.handleSubmit()} type="primary">Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default score
