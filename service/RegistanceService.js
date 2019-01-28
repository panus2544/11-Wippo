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
    } ,
    getAnswersByQuestionId : async (question_id)=>{
        return await apiRegService.get(`/answers/${question_id}`)
    },
    postAnswerEvaluations : async () => {
        return await apiRegService.post(`/answers/evaluations`)
    }
     
}
export default Question;