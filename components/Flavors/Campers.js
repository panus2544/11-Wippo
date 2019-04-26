import React, { Component } from 'react';
import { Select } from 'antd';
import CamperService from '../../service/CamperService'
import { Table, Input, Checkbox } from 'antd';
import styled from 'styled-components'

const InputValue = styled(Input)`
  width : 30%;
`

const Option = Select.Option;

let flavors = [];
let flavorName = '';


class Campers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flavors: [],
      campers: [],
      flavorName: '',
      flavorId: null,
      searchString: ''
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
      flavorName: flavors_filter[0].name,
      campers: []
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
    const camper = [];
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
  }

  handleChecked = (data, e) => {
    const { flavorId, countSelected } = this.state
    if (e.target.checked) {
      CamperService.updateCamper({ 'wipId': data.wipId, 'flavor_id': flavorId, 'bedroom': data.bedroom })
      this.setState({
        countSelected: countSelected + 1
      })
    }else{
        this.setState({
          countSelected: countSelected - 1
        })
      CamperService.updateCamper({ 'wipId': data.wipId, 'flavor_id': null, 'bedroom': data.bedroom })
    }
  }

  handleBedroom(data, e) {
    CamperService.updateCamper({ 'wipId': data.wipId, 'flavor_id': this.state.flavorId, 'bedroom': e.target.value })
  }

  checkFlavors = (data) => {
    if (data.flavorId == this.state.flavorId) {
      return true
    }
  }

  handleChangeSearch(e) {
    this.setState({
      searchString: e.target.value
    });
  }

  render() {
    let _users = this.state.campers;
    let search = this.state.searchString.trim();
    if (search.length > 0) {
      _users = _users.filter((user) => {
        return user.name.toString().match(search);
      });
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <h2>จัดการรส / ห้อง</h2>
          </div>
          <div className="col-8 d-flex justify-content-end p-2">
            <Select className='mr-2' defaultValue='กรุณาเลือกรส' onChange={(e) => this.handleChange(e)} >
              {flavors.map((flavor, i) => {
                return (
                  <Option key={i} value={flavor.flavor_id} >{flavor.name}</Option>
                )
              })}
            </Select>
            <InputValue className='mr-2' placeholder="ค้นหาด้วยชื่อ" onChange={(e) => this.handleChangeSearch(e)} />
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" className="text-center">เลือกรส {this.state.flavorName}</th>
                <th scope="col">WIP ID</th>
                <th scope="col" className="text-center">ชื่อ-สกุล</th>
                <th scope="col" className="text-center">ห้องนอน</th>
              </tr>
            </thead>
            {_users.map((data, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td className="text-center">{this.checkFlavors(data) == true ?
                      <Checkbox defaultChecked={true} onChange={(e) => this.handleChecked(data, e)} /> :
                      <Checkbox defaultChecked={false} onChange={(e) => this.handleChecked(data, e)} />
                    }</td>
                    <td>{data.wipId}</td>
                    <td>{data.name}</td>
                    <td><Input defaultValue={data.bedroom} onChange={(e) => this.handleBedroom(data, e)} /></td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Campers;