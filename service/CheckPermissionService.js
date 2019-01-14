import apiAuthService from "../utils/apiAuthService";
import Cookies from '../service/CookieService'

const CheckPermissionService = {
  getPermission : async (request) => {
    try{
      let data =  await apiAuthService.get('/permissions')
      console.log('Data  ',data.data)
      return data.data
    }catch (error){
      console.log(error)
    }
  },
}
export default CheckPermissionService