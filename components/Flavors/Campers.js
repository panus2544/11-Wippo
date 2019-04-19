import React, { Component } from 'react';
import { Select } from 'antd';
import CamperService from '../../service/CamperService'
import { Table, Input, Checkbox } from 'antd';

const Option = Select.Option;

let flavors = [];
let flavorName = '';


class Campers extends Component {
  state = {
    flavors: [],
    campers: [],
    flavorName: '',
    flavorId: null,
    columns: [{
      title: `เลือกรส`,
      dataIndex: 'flavorId',
      key: 'flavorId',
      render: (flavorId, wipid) => {
        const flavors_filter = flavors.filter((flavors) => {
          return flavors.flavor_id == flavorId
        })
        
        return (
          <Select defaultValue={flavors_filter[0] != undefined ? flavors_filter[0].name : 'กรุณาเลือกรส'} onChange={(e) => this.handleChange(e,wipid)} >
            {flavors.map((data,i) => {
              return (
                  <Option key={i} value={data.flavor_id} wipid={wipid} >{data.name}</Option>
                )
              })}
          </Select>
        )
      }
    }, {
      title: `WIP ID`,
      dataIndex: 'wipId',
      key: 'wipId'
    }, {
      title: `ชื่อ-สกุล`,
      dataIndex: 'name',
      key: 'name'
    }, {
      title: `ห้องนอน`,
      dataIndex: 'bedroom',
      key: 'bedroom'
    },]
  }
  
  
  componentWillMount = async () => {
    this.getFlavors()
  }
  
  handleChange = (flavorId,wipId) => {
    console.log(flavorId,wipId)
    CamperService.updateCamper({ 'wipId': wipId.wipId, 'flavor_id': flavorId, 'bedroom': wipId.bedroom })
    
  }
  
  getFlavors = async () => {
    let data = await CamperService.getFlavors();
    for (let index = 0; index < data.data.length; index++) {
      flavors.push({
        flavor_id: data.data[index].flavor_id,
        name: data.data[index].name
      })
    }
    this.setState({
      flavors: data.data
    })
    this.getCamper()
  }
  
  getCamper = async () => {
    let data = await CamperService.getCampers();
    let camper = [];
    for (let index = 0; index < data.data.campers.length; index++) {
      camper.push({
        flavorId: data.data.campers[index].flavor_id,
        wipId: data.data.campers[index].wip_id,
        name: `${data.data.campers[index].firstname_th} ${data.data.campers[index].lastname_th}`,
        bedroom: data.data.campers[index].bed_room,
      })
    }
    this.setState({
      campers: camper
    })
    // console.log(camper)
  }

  handleCheckStatus = (wip_id, e) => {
    // Registrants.getDataForChangeStatus({ wipId: wip_id, is_call: e.target.checked })
  }

  handleUnfocus = (wip_id, e) => {
    // Registrants.getDataForUpdateNote({ wipId: wip_id, note: e.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <Table columns={this.state.columns} dataSource={this.state.campers} />
      </React.Fragment>
    );
  }
}

export default Campers;