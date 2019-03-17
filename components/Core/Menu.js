import React from 'react'
import { Menu, Icon, Layout } from 'antd'
import styled from 'styled-components'
import AuthService from '../../service/PermissionService'

const {
  Sider,
} = Layout;
const SubItem = Menu.Item;

const StyleMenu = styled(Menu)`
  height: 100vh;
`

const allPermission = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const path = ['dashboard', 'viewregistrants', 'questions', 'viewsponsor', 'editsponsor', 'approve', 'postannounce', 'selectitimpassing', 'approved']

const permission = ['ข้อมูลสรุป', 'จัดการรายชื่อสมาชิก', 'ตรวจคำตอบ', 'จัดการสปอนเซอร์', 'แก้ไขสปอนเซอร์', 'จัดการผู้ขอสิทธิ์', 'ประกาศรายชื่อผู้ติดค่าย', 'จัดการผู้มีสิทธิ์เข้าค่าย', 'adminapprove']
class Menubar extends React.Component {
  state = {
    showComponent: false,
    collapsed: false,
    permission: {}
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
  }

  checkPermission = (permissionId) => {
    for (let index = 0; index < this.state.permission.length; index++) {
      if (this.state.permission[index].permission_id == permissionId) {
        return permissionId
      }
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }


  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
      >
        <div className="logo" />
        <StyleMenu theme="" defaultSelectedKeys={['1']} mode="inline">
          {
            allPermission.map((data, i) => {
              return (
                this.checkPermission(data) == data &&
                <SubItem key={`${i}`}>
                  <a href={`/${path[data - 1]}`}>
                    <Icon type="eye" />
                    <span>{permission[data - 1]}</span>
                  </a>
                </SubItem>
              )
            })
          }
        </StyleMenu>
      </Sider>
    )
  }
}

export default Menubar
