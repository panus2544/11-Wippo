import React, { Component } from 'react';
import { Select } from 'antd';
import CamperService from '../../service/CamperService'
import { Table, Input, Checkbox } from 'antd';

const Option = Select.Option;

let flavors = [];
let flavorName = '';


class Campers extends Component {
  // state = {
  //   flavors: [],
  //   campers: [],
  //   flavorName: '',
  //   flavorId: null,
  //   countSelected: 0,
  // }
  constructor(props) {
    super(props);
    this.state = {
      flavors: [],
      campers: [],
      flavorName: '',
      flavorId: null,
      countSelected: 0,
    }
    this.getCamper = this.getCamper.bind(this)  
  }
  
  componentDidMount = async () => {
    this.getFlavors()
  }

  handleChange = (flavorId) => {
    const flavors_filter = flavors.filter((flavors) => {
      return flavors.flavor_id == flavorId
    })
    this.setState({
      flavorId: flavorId,
      flavorName: flavors_filter[0].name
    })
    this.getCamper()
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
    // console.log(this.state.campers)
  }

  handleChecked = (data, e) => {
    const { flavorId, countSelected } = this.state
    this.setState({
      countSelected: countSelected + 1
    })
    CamperService.updateCamper({ 'wipId': data.wipId, 'flavor_id': flavorId, 'bedroom': data.bedroom })
  }

  checkFlavors = (data) => {
    if (data.flavorId == this.state.flavorId) {
      return true
    }
  }


  render() {
    return (
      <React.Fragment>
        <p>เลือกแล้ว : {this.state.countSelected} คน</p>
        <Select defaultValue='กรุณาเลือกรส' onSelect={(e) => this.handleChange(e)} >
          {flavors.map((flavor, i) => {
            return (
              <Option key={i} value={flavor.flavor_id} >{flavor.name}</Option>
            )
          })}
        </Select>
        <table>
          <tbody>
          <tr>
            <th>เลือกรส</th>
            <th>WIP ID</th>
            <th>ชื่อ-สกุล</th>
          </tr>
          {this.state.campers.map((data,i) => {
            return (
              <tr key={i} >
                <td>{this.checkFlavors(data) == true ?
                  <Checkbox defaultChecked={true} onChange={(e) => this.handleChecked(data, e)} /> :
                  <Checkbox defaultChecked={false} onChange={(e) => this.handleChecked(data, e)} />
                }</td>
                <td>{data.wipId}</td>
                <td>{data.name}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Campers;