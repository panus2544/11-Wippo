import React from 'react'
import { Menu as DefaultMenu } from 'antd'
import styled from 'styled-components'
import AuthService from '../../service/PermissionService'
import { async } from 'rxjs/internal/scheduler/async';

const Menu = styled(DefaultMenu)`
  height: 100vh;
`
class Menubar extends React.Component {
  state = {
    permission: [],
    showComponent: false
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

  handleClick = (e) => {
    console.log('click ', e);
  }
  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          mode="inline"
        >
          {this.state.showComponent ?
            <Menu.Item key="9">
              <a href='/viewregistrants'>ดูรายชื่อผู้สมัคร</a>
            </Menu.Item> : ''}
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Menubar
