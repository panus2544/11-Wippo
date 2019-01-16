import apiAuthService from "../utils/apiAuthService";
import Cookies from './CookieService'

const PermissionService = {
  getPermission : async (request) => {
    try{
      let data =  await apiAuthService.get('/permissions')
      console.log('Data:',data.data)
      return data.data
    }catch (error){
      console.log(error)
    }
  },
}
export default PermissionService