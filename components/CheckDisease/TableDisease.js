import React from 'react'
import { Table, Input, Checkbox } from 'antd'
import Registrants from '../../service/RegistanceService'

class DiseaseTable extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    note: '',
    columns: [
      {
        title: 'WIP ID',
        dataIndex: 'wip_id',
        key: 'wip_id'
      },
      {
        title: 'รายชื่อ',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'โรคประจำตัว',
        dataIndex: 'cangenital_disease',
        key: 'cangenital_disease'
      },
      {
        title: 'ยาที่แพ้',
        dataIndex: 'allergic_drug',
        key: 'allergic_drug'
      }
    ]
  }

  componentDidMount = async () => {
    let registrants = await Registrants.getAllDisease()
    console.log(registrants.data)
   
   
    // this.getRegistrant(registrants.registrants)
  }

  getRegistrant = async registrants => {
    let data = []
    for (let index = 0; index < registrants.length; index++) {
      data.push({
        key: index,
        wip_id: registrants[index].wip_id,
        is_call: registrants[index].is_call,
        name: `${registrants[index].firstname_th} ${
          registrants[index].lastname_th
        }`,
        tel: registrants[index].telno,
        message: registrants[index].note
      })
    }
    this.setState({
      registrants: data
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  handleCheckStatus = (wip_id, e) => {
    Registrants.getDataForChangeStatus({
      wipId: wip_id,
      is_call: e.target.checked
    })
  }

  handleUnfocus = (wip_id, e) => {
    Registrants.getDataForUpdateNote({ wipId: wip_id, note: e.target.value })
  }

  render() {
    return (
      <Table columns={this.state.columns} dataSource={this.state.registrants} />
    )
  }
}

export default DiseaseTable
