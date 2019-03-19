import React from 'react'
import { Table, Input, Checkbox,Icon, Divider,Dropdown,Menu} from 'antd'
import Registrants from '../../service/RegistanceService'
import PermissionService from '../../service/PermissionService'
import { async } from 'rxjs/internal/scheduler/async';

let role=[
  {
    role_id: 4,
    role_name: 'wipper'
  },
  {
    role_id: 6,
    role_name: 'pr'
  },
  {
    role_id: 7,
    role_name: 'secretary'
  },
  {
    role_id: 8,
    role_name: 'vice-president'
  },
  {
    role_id: 9,
    role_name: 'president'
  },
  {
    role_id: 10,
    role_name: 'admin'
  },
]

let menu = (
  <Menu >
      {role.map((data,index)=>{
        return (<Menu.Item key={index} onClick={() => handleChangeRole(data.role_id)}>
          {data.role_name}
        </Menu.Item>)
      })}
  </Menu>
)

const handleChangeRole = (e) => {
  console.log(e)
}


class ApproveTable extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    registrants: [],
    note: '',
    role: '',
    columns: [
      {
        title: 'รายชื่อ',
        dataIndex: 'wip_id',
        key: 'wip_id'
      },
      {
        title: 'ตำแหน่ง',
        dataIndex: 'role',
        render:  () => (
         <Dropdown overlay={menu} trigger={['click']}>
           <a className="ant-dropdown-link" href="#">
             Pending <Icon type="down" />
            </a>
          </Dropdown>
        )
      },
      {
        title: 'Approve',
        key: 'approve',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Approve {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Reject</a>
          </span>
        ),
      }
    ]
  }


  componentDidMount = async () => {
    let registrants = await PermissionService.getPending()
    this.getRegistrant(registrants.data)
  }

  getRegistrant = async registrants => {
    let data = []
    for (let index = 0; index < registrants.length; index++) {
      data.push({
        key: index,
        wip_id: registrants[index].wip_id,
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
