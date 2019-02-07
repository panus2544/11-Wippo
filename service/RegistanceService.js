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
    postAnswerEvaluations : async (answerEva) => {
        return await apiRegService.post(`/answers/evaluations`,answerEva)
    },
    getDataForChangeStatus : async (data)=>{
        try{
            await apiRegService.put('/registrants/changstatus',{
                'itim_wip_id':data.wipId,
                'is_call' : data.is_call,
            })
        }catch (error){
            console.log(error)
        }
      } ,
      getDataForUpdateNote : async (data)=>{
        try{
            await apiRegService.put('/registrants/note',{
                'itim_wip_id':data.wipId,
                'note' : data.note,
            })
        }catch (error){
            console.log(error)
        }
      } ,
     
}
export default Question;