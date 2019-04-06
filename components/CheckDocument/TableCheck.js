import React, { Component } from 'react';
import { Table, Input, Checkbox,Icon  } from 'antd';
import CamperService from '../../service/CamperService'
import AuthService from '../../service/PermissionService'
import styled from 'styled-components'

const P = styled.p`
  color: ${props => props.color};
  opacity: ${props => props.opacity || 1};
`
class TableCheck extends Component {
  state = {
    permission: [],
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    url: null,
    note: '',
    countUnsucces: 0,
    countSucces: 0,
    columns: [
      {
        title: 'ลำดับ',
        dataIndex: 'count',
      }, {
        title: 'ตรวจแล้ว',
        dataIndex: 'checked',
        align: 'center',
        render: (boolean, profile) => {
          return (
            <Input type="text" defaultValue={profile.checked} onChangeCapture={(e) => this.handleCheckStatus(profile.wip_id, e)} />
          )
        }
      }, {
        title: 'สถานะยืนยันสิทธิ์',
        dataIndex: 'status',
        align: 'center',
        render : (status) =>{
          return (
            status == 'success' ?
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> :
            <Icon type="check-circle"/> 
          )
        }
      },{
        title: 'WIP ID',
        dataIndex: 'wip_id',
        key: 'wip_id'
      },{
        title: 'ชื่อ-สกุล',
        dataIndex: 'name',
      }, {
        title: 'เบอร์โทร',
        dataIndex: 'tel',
      }, {
        title: 'Transcript',
        dataIndex: 'transcript',
        render: (link) => {
          return (
            link != null ?
              <a onClick={() => this.getDocument(link)}>
                <P color="#1aa1f4" >ตรวจเอกสาร</P>
              </a> :
              <P opacity="0.3">ยังไม่อัพโหลด</P>
          )
        }
      }, {
        title: 'ใบขออนุญาต ผปค.',
        dataIndex: 'confrim',
        render: (link) => {
          return (
            link != null ?
              <a onClick={() => this.getDocument(link)}>
                <P color="#1aa1f4">ตรวจเอกสาร</P>
              </a> :
              <P opacity="0.3">ยังไม่อัพโหลด</P>
          )
        }
      }, {
        title: 'Receipt',
        dataIndex: 'receipt',
        render: (link) => {
          return (
            link != null ?
              <a onClick={() => this.getDocument(link)}>
                <P color="#1aa1f4">ตรวจเอกสาร</P>
              </a> :
              <P opacity="0.3">ยังไม่อัพโหลด</P>
          )
        }
      },{
        title: 'ไซต์เสื้อ',
        dataIndex: 'size',
      },{
        title: 'สถานที่',
        dataIndex: 'location',
      }],

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
      let registrants = await CamperService.getCamper()
      this.getCamper(registrants.data)
      return true
    }
  }

  getCamper = async camper => {
    let data = [];
    let countSucces = 0;
    let countUnsucces = 0;
    for (let index = 0; index < camper.length; index++) {
      data.push({
        key: index,
        count: index + 1,
        wip_id: camper[index].wip_id,
        checked: camper[index].reason,
        name: `${camper[index].firstname_th} ${camper[index].lastname_th}`,
        tel: camper[index].telno,
        transcript: camper[index].transcript,
        confrim: camper[index].confrim,
        receipt: camper[index].receipt,
        status: camper[index].status,
        size : camper[index].size,
        location : camper[index].pick_location
      })
      if (camper[index].status == 'success') {
        countSucces = countSucces + 1
      } else {
        countUnsucces = countUnsucces + 1
      }
    }
    this.setState({
      registrants: data,
      countSucces: countSucces,
      countUnsucces: countUnsucces
    })
  }

  handleCheckStatus = (wip_id, e) => {
    console.log(wip_id)
    if (e.target.value) {
      CamperService.updateCheckDoc({ wipId: wip_id, reason:  e.target.value})
    } else {
      CamperService.updateCheckDoc({ wipId: wip_id, reason: null })
    }
  }

  getDocument = async (link) => {
    let wipId = link.substring(5, 11)
    let typePath = link.substring(19)
    let res = await CamperService.getDocuments({ wipId: wipId, type_path: typePath })
    this.setState({
      url: res.data
    })
    window.open(this.state.url, '_blank')
  }


  render() {
    return (
      <React.Fragment>
        <div className='d-flex justify-content-end'>
          อัพโหลดแต่ยังไม่ยืนยันสิทธิ์ : {this.state.countUnsucces}  ยืนยันสิทธิ์แล้ว : {this.state.countSucces}
        </div>
        <Table columns={this.state.columns} dataSource={this.state.registrants} />
      </React.Fragment>
    );
  }
}

export default TableCheck;