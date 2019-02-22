import React from 'react';
import { Table, Input, Checkbox } from 'antd';
import Registrants from '../../service/RegistanceService'
import AuthService from '../../service/PermissionService'

class App extends React.Component {
  state = {
    permission: [],
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    note: '',
    columns: [{
      title: 'โทรแล้ว',
      dataIndex: 'is_call',
      key: 'wip_id',
      render: (boolean, profile) => {
        return (
          boolean === 1 ?
            <Checkbox defaultChecked={true} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} /> :
            <Checkbox defaultChecked={false} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} />
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
      render: (text, profile) => {
        return (
          <Input type="text" defaultValue={text} onChangeCapture={(e) => this.handleUnfocus(profile.wip_id, e)} />
        )
      }
    }]
  };

  componentDidMount = async () => {
    let registrants = await Registrants.getAllRegistrant()
    this.getRegistrant(registrants.registrants)
    this.getPermission()
  }

  getPermission = async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    this.setState({
      permission: permission
    })

    console.log(this.state.permission)
  }

  checkPermission = (permissionId) => {
    for (let index = 0; index < this.state.permission.length; index++) {
      if (this.state.permission[index].permission_id === permissionId) {
        return permissionId
      }
    }
  }

  getRegistrant = async registrants => {
    let data = [];
    for (let index = 0; index < registrants.length; index++) {
      data.push({
        key: index,
        wip_id: registrants[index].wip_id,
        is_call: registrants[index].is_call,
        name: `${registrants[index].firstname_th} ${registrants[index].lastname_th}`,
        tel: registrants[index].telno,
        message: registrants[index].note,
      })
    }
    this.setState({
      registrants: data
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleCheckStatus = (wip_id, e) => {
    Registrants.getDataForChangeStatus({ wipId: wip_id, is_call: e.target.checked })
  }

  handleUnfocus = (wip_id, e) => {
    Registrants.getDataForUpdateNote({ wipId: wip_id, note: e.target.value })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.checkPermission(2) === 2 ? 
            <Table columns={this.state.columns} dataSource={this.state.registrants} /> :
            <Table /> 
        }
      </React.Fragment>
    );
  }
}

export default App