import apiCamperService from "../utils/apiCamperService";
import checkAuth from './CheckAuth'
import { message } from 'antd';

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
    try{
      return await apiCamperService.post('campers/createcampers',{
        'campers' : data.camper
      })
    }catch(e){
      console.log(e)
      message.error('สร้าง camper ไม่สำเร็จ');
    }
  }
}
export default PermissionService