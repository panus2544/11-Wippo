import React from 'react'
import Wait from '../components/Wait'
import Router from 'next/router'
import AuthService from './../service/PermissionService'
import CookiesService from './../service/CookieService'


export default class waiting extends React.Component {
  componentDidMount() {
     this.handleCheckLoginState()

  }
  handleCheckLoginState = async () => {
    if (!CookiesService.gettokenJWTCookie()) {
      Router.push({
        pathname: '/index'
      })
    }else{
     this.getPermissions()
    }
  }
  getPermissions = async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    console.log(permission.find(permissionId => permissionId.permission_id))
    if (await permission.find(permissionId => permissionId.permission_id !== 3)) {
      console.log('in case')
      Router.push({
        pathname: '/dashboard'
      })
    }
  }
  render() {
    return (
      <div>
        <Wait />
      </div>
    )
  }
}
