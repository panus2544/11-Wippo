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

const allPermission = [1,2,3,4,5,6,8,9]

const path = ['dashboard','viewregistrants','questions','viewsponsor','editsponsor','viewapprove','postannounce','selectitimpassing','approved']

const permission = ['ดูหน้าแดชบอร์ด','ดูรายชื่อผู้สมัคร','ตรวจคำตอบ','ดูสปอนเซอร์','แก้ไขสปอนเซอร์','ดูผู้ขอสิทธิ์','ประกาศรายชื่อผู้จิดค่าย','เลือกผู้สมัคร','adminapprove']
class Menubar extends React.Component {
  state = {
    showComponent: false,
    collapsed: false,
    permission : {}
  }

  componentDidMount = async() => {
    this.getPermission()
  }

  getPermission = async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    this.setState({
      permission : permission
    })
  }
  
  checkPermission = (permissionId) => {
    for (let index = 0; index < this.state.permission.length; index++) {
      if(this.state.permission[index].permission_id === permissionId){
        // console.log('this.state.permission[index].permission_id : ',this.state.permission[index].permission_id)
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
          allPermission.map((data,i) => {
            return (
            this.checkPermission(data) === data &&
              <Menu.Item key={`${i}`} >
              <a href={`/${path[data-1]}`}>
                <Icon type="eye" />
                <span>{permission[data-1]}</span>
              </a>
          </Menu.Item> )
          })
        }
        </StyleMenu>
      </Sider>
    )
  }
}

export default Menubar
