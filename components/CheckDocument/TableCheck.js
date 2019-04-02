import React, { Component } from 'react';
import { Table, Input, Checkbox } from 'antd';
import CamperService from '../../service/CamperService'
import AuthService from '../../service/PermissionService'
import Router from 'next/router'

class TableCheck extends Component {
  state = {
    permission: [],
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    url: null,
    note: '',
    columns: [{
      title: 'ตรวจแล้ว',
      dataIndex: 'checked',
      render: (boolean, profile) => {
        return (
          boolean == 'checked' ?
            <Checkbox defaultChecked={true} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} /> :
            <Checkbox defaultChecked={false} onChange={(e) => this.handleCheckStatus(profile.wip_id, e)} />
        )
      }
    }, {
      title: 'WIP ID',
      dataIndex: 'wip_id',
      key: 'wip_id'
    }, {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
    }, {
      title: 'Transcript',
      dataIndex: 'transcript',
      render: (link) => {
        return (
          <a onClick={() => this.getDocument(link)}>{link}</a>
        )
      }
    }, {
      title: 'ใบขออนุญาต ผปค.',
      dataIndex: 'confrim',
      render: (link) => {
        return (
          <a onClick={() => this.getDocument(link)}>{link}</a>
        )
      }
    }, , {
      title: 'Receipt',
      dataIndex: 'receipt',
      render: (link) => {
        return (
          <a onClick={() => this.getDocument(link)}>{link}</a>
        )
      }
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
      let registrants = await CamperService.getCamper()
      this.getCamper(registrants.data)
      console.log(registrants.data)
      return true
    }
  }

  getCamper = async camper => {
    let data = [];
    for (let index = 0; index < camper.length; index++) {
      data.push({
        key: index,
        wip_id: camper[index].wip_id,
        checked: camper[index].reason,
        name: `${camper[index].firstname_th} ${camper[index].lastname_th}`,
        transcript: camper[index].transcript,
        confrim: camper[index].confrim,
        receipt: camper[index].receipt,
      })
    }
    this.setState({
      registrants: data
    })
  }

  handleCheckStatus = (wip_id, e) => {
    if (e.target.checked) {
      CamperService.updateCheckDoc({ wipId: wip_id, reason: 'checked' })
    } else {
      CamperService.updateCheckDoc({ wipId: wip_id, reason: null })
    }
  }

  getDocument = async (link) => {
    let wipId = link.substring(5, 11)
    let typePath = link.substring(19)
    let res = await CamperService.getDocuments({ wipId: wipId, type_path: typePath })
    console.log(res.data)
    this.setState({
      url: res.data
    })
    window.open(this.state.url,'_blank')
  }

  chengeUrl = () => {
    this.setState({
      url: URL.createObjectURL('https://storage.freezer.in.th/profile/WIPID110014/110014_transcript?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=VizhBfmrCSvpJqGRKvEC%2F20190402%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190402T191217Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=d97220c0494433f4c463e6f7521f1c5346bbf3e97ee9172e216f63993cfe1af8')
    })
  }

  render() {
    return (
      <React.Fragment>
        {/* <button onClick={() => this.chengeUrl()} >Test</button> */}
        <Table columns={this.state.columns} dataSource={this.state.registrants} />
      </React.Fragment>
    );
  }
}

export default TableCheck;