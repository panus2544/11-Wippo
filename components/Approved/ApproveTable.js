import React from 'react'
import { Table, Input, Checkbox } from 'antd'
import Registrants from '../../service/RegistanceService'

class ApproveTable extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    note: '',
    columns: [
      {
        title: 'วันที่',
        dataIndex: 'date'
      },
      {
        title: 'เวลา',
        dataIndex: 'time'
      },
      {
        title: 'รายชื่อ',
        dataIndex: 'name',
        key: 'wip_id'
      },
      {
        title: 'ตำแหน่ง',
        dataIndex: 'role',
        key: 'role_id'
      },
      {
        title: 'การอนุมัติ',
        dataIndex: 'approve',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green'
              if (tag === 'loser') {
                color = 'volcano'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </span>
        )
      }
    ]
  }

  componentDidMount = async () => {
    let registrants = await Registrants.getAllRegistrant()
    this.getRegistrant(registrants.registrants)
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

export default ApproveTable
