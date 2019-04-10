import React, { Component } from 'react';
import { Table, Input, Checkbox, Button } from 'antd';
import Registrants from '../../service/RegistanceService'
import Permission from '../../service/PermissionService'
import Camper from '../../service/CamperService'

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
    permission : []
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
    if (this.state.permission.find(permissionId => permissionId.permission_id == 7)) {
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
      registrants_id_12: registrants_id_12
    })
  }

  createCamper = (camper) =>{
    Camper.crateCamper({'camper':camper});
  }

  render() {
    return (
      <React.Fragment>
        <p>รายชื่อผู้ที่มีสิทธิ์เข้าค่าย (ตัวจริง)</p>
        <Table columns={this.state.columns} dataSource={this.state.registrants_id_2} camper={this.state.registrants_id_2} />
        {/* <p>รายชื่อผู้ที่มีสิทธิ์เข้าค่าย (ตัวสำรอง)</p>
        <Table columns={this.state.columns} dataSource={this.state.registrants_id_12} /> */}
        <div className="d-flex justify-content-end mt-5">
          <Button type="primary" onClick={() => this.createCamper(this.state.registrants_id_2)}>ยืนยันรายชื่อผู้มีสิทธิ์เข้าค่าย</Button>
        </div>
      </React.Fragment>
    );
  }
}

export default NameList;