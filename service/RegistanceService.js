import apiRegService from "../utils/apiRegisterService";
import { async } from "rxjs/internal/scheduler/async";

const Question = {
    getAllRegistrant : async ()=>{
      const respons = await apiRegService.get('/registrants')
        return respons.data
    } ,
    getRegistrantNotRespons : async ()=>{
        return await apiRegService.get('/notregistrant')
    } , 
    getAllQuestions : async ()=>{
        return await apiRegService.get('/questions')
    } 
}
export default Question;