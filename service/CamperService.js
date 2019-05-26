import apiCamperService from "../utils/apiCamperService";
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
      'type_path': data.type_path
    })
  },
  crateCamper: async (data) => {
    try {
      return await apiCamperService.post('campers/createcampers', {
        'campers': data.camper
      })
    } catch (e) {
      console.log(e)
      message.error('สร้าง camper ไม่สำเร็จ');
    }
  },
  getCampers: async () => {
    return await apiCamperService.get('/campers').catch((e) => {
      console.log(e)
    })
    // return data.data
  },
  getFlavors: async () => {
    let data = await apiCamperService.get('/campers/flavors').catch((e) => {
      console.log(e)
    })
    return data
  },
  insertScoresFlavors: async (data) => {
   await apiCamperService.post('/campers/score',{data}).catch(e =>{
     console.log(e)
   })
  },
  updateCamper: async (data) => {
    await apiCamperService.put('/campers/updatecamper', {
      'wipId' : data.wipId,
      'flavor_id' : data.flavor_id,
      'bed_room' : data.bedroom
    }).catch((e) => {
      console.log(e)
    })
  },
}
export default PermissionService