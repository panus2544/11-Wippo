import apiAuthService from "../utils/apiAuthService";
import Cookies from './CookieService'

const PermissionService = {
  getPermission : async (request) => {
    try{
      let data =  await apiAuthService.get('/permissions')
      return data.data
    }catch (error){
      console.log(error)
    }
  },
}
export default PermissionService