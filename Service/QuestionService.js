import apiRegService from "../utils/apiRegService";

const Question = {
    getRegistance = async()=>{
        return await apiRegService.get('/registance')
    } 
}
export default Question;