import React, { Component } from 'react';
import { Table, Input, Checkbox } from 'antd';
import CamperService from '../../service/CamperService'
import AuthService from '../../service/PermissionService'

class TableCheck extends Component {
  state = {
    permission: [],
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    note: '',
    columns : [{
      title: 'ตรวจแล้ว',
      dataIndex: 'checked',
      render: (boolean, profile) => {
        return (
          boolean == 1 ?
            <Checkbox defaultChecked={true} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} /> :
            <Checkbox defaultChecked={false} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} />
        )
      }
    },{
      title: 'WIP ID',
      dataIndex: 'wip_id',
      key : 'wip_id'
    }, {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
    },{
      title: 'Transcript',
      dataIndex: 'nickname',
    }, {
      title: 'ใบขออนุญาต ผปค.',
      dataIndex: 'tel',
    },, {
      title: 'Receipt',
      dataIndex: 'receipt',
    }]
  }

  componentDidMount = async () => {
    this.getPermission()
  }

  getPermission = async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    this.setState({
      permission: permission
    })
    this.checkPermission(permission)
  }

  checkPermission = async () => {
    if (this.state.permission.find(permissionId => permissionId.permission_id == 10)) {
      // let registrants = await Registrants.getAllRegistrant()
      // this.getRegistrant(registrants.registrants)
      return true
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
        nickname :  registrants[index].nickname,
        tel: registrants[index].telno,
        message: registrants[index].note,
      })
    }
    this.setState({
      registrants: data
    })
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
          <Table columns={this.state.columns} dataSource={this.state.registrants} />
      </React.Fragment>
    );
  }
}

export default TableCheck;