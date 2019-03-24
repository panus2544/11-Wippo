import React from "react";
import AuthService from '../../service/PermissionService'

const CheckPermissions = {
  getPermission : async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    if (permission.find(permissionId => permissionId.permission_id == 3) || permission.find(permissionId => permissionId.permission_id == 9)) {
      return true
    }
    return false
  },
  
}
   
export default CheckPermissions