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

const allPermission = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11]

const path = ['dashboard', 'viewregistrants', 'questions', 'checkdisease', 'flavors', 'approved', 'confirm', 'confirmannounce', 'checkdocument', 'checkdocpr','checkdocpr']

const permission = ['ข้อมูลสรุป', 'จัดการรายชื่อสมาชิก', 'ตรวจคำตอบ', 'ตรวจโรค', 'จัดการรส', 'จัดการผู้ขอสิทธิ์', 'จัดการผู้มีสิทธิ์เข้าค่าย', 'ประกาศรายชื่อผู้ติดค่าย', 'ตรวจเอกสารผู้ยืนยันสิทธิ์', 'ตรวจเอกสารผู้ยืนยันสิทธิ์ (pr)','ตรวจเอกสารผู้ยืนยันสิทธิ์ (pr)']
class Menubar extends React.Component {
  state = {
    showComponent: false,
    collapsed: false,
    permission: {},
    pathname: 0,
  };

  componentDidMount = async () => {
    this.getPermission()
  }

  UNSAFE_componentWillMount() {
    this.checkLocations()
  }

  async checkLocations() {
    let checkLocation = window.location.pathname;
    switch (checkLocation) {
      case '/dashboard': await this.setState({ pathname: 0 })
      case '/viewregistrants': await this.setState({ pathname: 1 })
      case '/questions': await this.setState({ pathname: 2 })
      case '/checkdisease': await this.setState({ pathname: 3 })
      case '/flavors': await this.setState({ pathname: 4 })
      case '/approved': await this.setState({ pathname: 5 })
      case '/confirm': await this.setState({ pathname: 6 })
      case '/confirmannounce': await this.setState({ pathname: 7 })
      case '/checkdocument': await this.setState({ pathname: 8 })
      case '/checkdocpr': await this.setState({ pathname: 9 })
      case '/checkdocpr': await this.setState({ pathname: 10 })
    }
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
        <StyleMenu defaultSelectedKeys={[`${this.state.pathname}`]} mode="inline">
          {
            allPermission.map((data, i) => {
              return (
                this.checkPermission(data) == data &&
                <SubItem key={i}>
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