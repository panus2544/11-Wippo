import apiRegService from "../utils/apiRegisterService";

const Question = {
    getAllRegistrant : async ()=>{
      const respons = await apiRegService.get('/registrant')
        return respons.data
    } ,
    getRegistrantNotRespons : async ()=>{
        return await apiRegService.get('/notregistrant')
    } 
}
export default Question;