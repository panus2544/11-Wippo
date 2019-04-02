import apiCamperService from "../utils/apiCamperService";
import checkAuth from './CheckAuth'

const PermissionService = {
  getCamper: async () => {
    return await apiCamperService.get('campers/documents').catch((e) => {
      console.log()
    });
  },
  updateCheckDoc: async (data) => {
    await apiCamperService.put('campers/resons', {
      'wip_id_itim': data.wipId,
      'status': data.reason
    })
  },
  getDocuments: async (data) => {
    await apiCamperService.put('campers/image', {
      'wip_id_itim': data.wipId,
    }).then((response) => {
      // console.log(response)
      return response
    })
  }
}
export default PermissionService