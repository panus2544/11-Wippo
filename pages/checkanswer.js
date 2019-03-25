import React from 'react'
import App from '../components/CheckAnswer/index'
import Router from 'next/router'
import AuthService from './../service/PermissionService'
import CookiesService from './../service/CookieService'

class index extends React.Component {
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
   if (!await permission.find(permissionId => permissionId.permission_id )) {
     console.log('in case')
     Router.push({
       pathname: '/waiting'
     })
	 }
	
 }
	render() {
		return (
			<App />
		)
	}
}

export default index