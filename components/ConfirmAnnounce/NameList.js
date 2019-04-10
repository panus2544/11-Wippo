import React, { Component } from 'react';
import { Table, Input, message, Button as DefaultBtn, Modal } from 'antd';
import Registrants from '../../service/RegistanceService'
import Permission from '../../service/PermissionService'
import Camper from '../../service/CamperService'
import styled from 'styled-components'

let registrants_id_2 = [];
let registrants_id_12 = [];

const ButtonModal = styled(DefaultBtn)`
  visibility : ${props => props.show || ''};
`


class NameList extends Component {
  state = {
    registrants_id_2: [],
    registrants_id_12: [],
    showModal: false,
    cancel: false,
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
    permission: [],
    ModalText: '',
    visible: false,
    confirmLoading: false,
    showBtn: ''
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
      this.setState({
        showBtn: 'hidden',
      })
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

  showModal = () => {
    this.setState({
      ModalText: 'กด OK ยืนยันรายชื่อผู้มีสิทธิ์เข้าค่าย',
      visible: true,
    });

  }

  crateCamper = async () => {
    this.setState({
      ModalText: 'รอสักครู่ ...',
      confirmLoading: true,
    });
    let res = await Camper.crateCamper({ 'camper': registrants_id_2 });
    if (res.status == 200) {
      this.setState({
        ModalText: 'สำเร็จ !'
      })
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 1000);
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText, showBtn } = this.state;
    return (
      <React.Fragment>
        <p>รายชื่อผู้ที่มีสิทธิ์เข้าค่าย (ตัวจริง)</p>
        <Table columns={this.state.columns} dataSource={this.state.registrants_id_2} camper={this.state.registrants_id_2} />
        <div className="d-flex justify-content-center mt-3" >
          <ButtonModal type="primary"
            onClick={() => this.showModal(this.state.registrants_id_2)}
            show={showBtn}>
            ยืนยันรายชื่อผู้มีสิทธิ์เข้าค่าย
          </ButtonModal>
          <Modal
            title={false}
            visible={visible}
            onOk={this.crateCamper}
            onCancel={this.handleCancel}
            confirmLoading={confirmLoading}
          >
            <p>{ModalText}</p>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default NameList;