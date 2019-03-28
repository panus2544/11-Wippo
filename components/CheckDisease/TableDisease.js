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
        title: 'ตรวจแล้ว',
        dataIndex: 'medical_approved',
        render: (boolean, registrants) => {
          return (
            boolean == 1 ?
              <Checkbox defaultChecked={true} onChange={(e) => this.handleCheckStatus(registrants.wip_id, e)} /> :
              <Checkbox defaultChecked={false} onChange={(e) => this.handleCheckStatus(registrants.wip_id, e)} />
          )
        }
      },
      {
        title: 'รายชื่อ',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'wip_id',
        dataIndex: 'wip_id',
        key: 'wip_id'
      },
      {
        title: 'โรคประจำตัว',
        dataIndex: 'cangenitalDisease',
        key: 'cangenitalDisease'
      },
      {
        title: 'ยาที่แพ้',
        dataIndex: 'allergicDrug',
        key: 'allergicDrug'
      },
      {
        title: 'อาหารที่แพ้',
        dataIndex: 'allergicFood',
        key: 'allergicFood'
      }
    ]
  }

  componentDidMount = async () => {
    this.getStatus()
    // this.getRegistrant(registrants.registrants)
  }
  getStatus = async () => {
    let registrantsDisease = await Registrants.getAllDisease()
    this.getRegistrant(registrantsDisease.data)
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
        allergicDrug: registrants[index].allergic_drug,
        allergicFood: registrants[index].allergic_food,
        medical_approved: registrants[index].medical_approved,
        cangenitalDisease: registrants[index].cangenital_disease,
        wip_id: registrants[index].wip_id

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
    Registrants.putMedicApprove(wip_id)
  }


  render() {
    return (
      <Table columns={this.state.columns} dataSource={this.state.registrants} />
    )
  }
}

export default DiseaseTable
