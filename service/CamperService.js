import apiCamperService from "../utils/apiCamperService";
import checkAuth from './CheckAuth'

const PermissionService = {
  getCamper : async () =>{
    let camper = apiCamperService.get('camper/success').catch((e) => {
      console.log()
    });
  }
}
export default PermissionService