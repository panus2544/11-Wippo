import apiRegService from "../utils/apiRegService";

const Question = {
    getAllRegistance : async ()=>{
        return await apiRegService.get('/registance')
    } 
}
export default Question;