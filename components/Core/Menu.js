import React from 'react'
import { Menu as DefaultMenu, Icon, Layout, Menu } from 'antd'
import styled from 'styled-components'
import AuthService from '../../service/PermissionService'

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

const StyleMenu = styled(DefaultMenu)`
  height: 100vh;
`
class Menubar extends React.Component {
  state = {
    showComponent: false,
    collapsed: false,
  }

  componentDidMount = async () => {
    this.checkPermission()
  }

  checkPermission = async () => {
    let data = await AuthService.getPermission()
    console.log(data)
    if (data.permission[0].permission_id == 1 || data.permission[0].permission_id == 4) {
      this.setState({
        showComponent: true
      })
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
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
          {this.state.showComponent ?
            <Menu.Item key="1">
              <a href='/viewregistrants'>
                <Icon type="eye" />
                <span>ดูรายชื่อผู้สมัคร</span>
              </a>
            </Menu.Item> : ''}
          <Menu.Item key="2">
            <Icon type="eye" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="eye" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="eye" />
            <span>File</span>
          </Menu.Item>
        </StyleMenu>
      </Sider>
    )
  }
}

export default Menubar
