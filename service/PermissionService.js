import apiAuthService from "../utils/apiAuthService";
import checkAuth from './CheckAuth'

const PermissionService = {
  getPermission : async (request) => {
      let data =  await apiAuthService.get('/permissions').catch(error =>{
        if(error.response.status === 401){
          checkAuth.clearJwt(error.response.status)
        }
      })
      return data.data
  },
  getPending : async ()=>{
     return await apiAuthService.get('/rolepending')
    
  },
  getAllRoles : async ()=>{
    return await apiAuthService.get('/allroles')
   
 }
}
export default PermissionService