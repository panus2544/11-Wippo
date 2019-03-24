import React from 'react'
import Approve from '../components/Approved'
import Router from 'next/router'
import AuthService from './../service/PermissionService'
import CookiesService from './../service/CookieService'


export default class approved extends React.Component {
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
   console.log(permission)
   if (!await permission.find(permissionId => permissionId.permission_id)) {
     console.log('in case')
     Router.push({
       pathname: '/waiting'
     })
   }
   if (await permission.find(permissionId => permissionId.permission_id === 9)) {
    
  }else{
    console.log('in case2')
    Router.push({
      pathname: '/dashboard'
    })
  }
 }
  render() {
    return (
      <div>
        <Approve />
      </div>
    )
  }
}
