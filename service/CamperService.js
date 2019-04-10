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
    return await apiCamperService.put('campers/image', {
      'wip_id_itim': data.wipId,
      'type_path' : data.type_path
    })
  },
  crateCamper: async (data) => {
    console.log(data.camper)
    await apiCamperService.post('campers/createcamper',{
      'campers' : data.camper
    })
  }
}
export default PermissionService