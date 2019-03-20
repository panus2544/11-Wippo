import React from "react";
import AuthService from '../../service/PermissionService'

const CheckPermissions = {
  getPermission : async () => {
    let data = await AuthService.getPermission()
    let permission = []
    permission = data.permission
    if (permission.find(permissionId => permissionId.permission_id == 4) || permission.find(permissionId => permissionId.permission_id == 10)) {
      return true
    }
    return false
  },
  
}
   
export default CheckPermissions