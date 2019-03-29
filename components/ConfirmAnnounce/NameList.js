import React, { Component } from 'react';
import { Table, Input, Checkbox } from 'antd';
import Registrants from '../../service/RegistanceService'
import Permission from '../../service/PermissionService'

let registrants_id_2 = [];
let registrants_id_12 = [];
class NameList extends Component {
  state = {
    registrants_id_2: [],
    registrants_id_12: [],
    columns: [{
      title: 'WIP ID',
      dataIndex: 'wipId',
      key: 'wip_id',
      align: 'center'
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'firstname',
      key: 'name',
      align: 'center'
    }],
  }

  componentDidMount() {
    this.getPermission()
  }

  getPermission = async () => {
    let data = await Permission.getPermission()
    let permission = []
    permission = data.permission
    this.setState({
      permission: permission
    })
    this.checkPermission()
  }

  checkPermission = async () => {
    if (this.state.permission.find(permissionId => permissionId.permission_id == 7) || this.state.permission.find(permissionId => permissionId.permission_id == 8)) {
      this.getRegistrants()
    } else {
      alert('คุณไม่สิทธิ์ในการเข้าถึง กรุณาติดต่อ admin')
    }
  }

  getRegistrants = async () => {
    let nameList = await Registrants.getRegistrantsForPassing()
    this.setData(nameList.data[0])
  }

  setData = async (data) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].role.role == 2) {
        registrants_id_2.push({
          wipId: data[index].wip_id,
          firstname: `${data[index].firstname_th} ${data[index].lastname_th}`,
          role: data[index].role.role,
        })
      } else if (data[index].role.role == 12) {
        registrants_id_12.push({
          wipId: data[index].wip_id,
          firstname: `${data[index].firstname_th} ${data[index].lastname_th}`,
          role: data[index].role.role,
        })
      }
    }
    this.setState({
      registrants_id_2: registrants_id_2,
      registrants_id_12 : registrants_id_12
    })
  }

  render() {
    return (
      <div>
        <p>รายชื่อผู้ที่มีสิทธิ์เข้าค่าย (ตัวจริง)</p>
        <Table columns={this.state.columns} dataSource={this.state.registrants_id_2} />
        <p>รายชื่อผู้ที่มีสิทธิ์เข้าค่าย (ตัวสำรอง)</p>
        <Table columns={this.state.columns} dataSource={this.state.registrants_id_12} />
      </div>
    );
  }
}

export default NameList;