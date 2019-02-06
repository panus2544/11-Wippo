import React from 'react';
import { Table, Button, Input, Tag, Checkbox } from 'antd';
import Registrants from '../../service/RegistanceService'

const data = [];

class App extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    columns: [{
      title: 'โทรแล้ว',
      dataIndex: 'is_call',
      key :'wip_id',
      render: (boolean,profile) => {
        return (
          boolean === 0 ? <Checkbox defaultChecked={true} onChange={(e)=>this.handleCheckStatus(profile.wip_id,e)}/> : <Checkbox defaultChecked={false} />
        )
      }
    }, {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
    }, {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'tel',
    }, {
      title: 'หมายเหตุ',
      dataIndex: 'message',
      render: (text) => 
         <Input type="text" defaultValue={text}  />
    }]
  };

  componentDidMount = async () => {
    let registrants = await Registrants.getAllRegistrant()
    this.getRegistrant(registrants.registrants)
  }

  getRegistrant = async registrants => {
    for (let index = 0; index < registrants.length; index++) {
      data.push({
        key: index,
        wip_id : registrants[index].wip_id,
        is_call: registrants[index].is_call,
        name: registrants[index].firstname_th,
        tel: registrants[index].telno,
        message: registrants[index].note,
      })
    }
    this.setState({
      registrants: registrants
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleCheckStatus = (wip_id,e) =>{
    console.log(`checked = ${e.target.checked} : ${wip_id}`);
    
  }


  render() {
    return (
      <Table columns={this.state.columns} dataSource={data} />
    );
  }
}

export default App