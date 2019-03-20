import apiRegService from "../utils/apiRegisterService";
import checkAuth from './CheckAuth'

const Question = {
  getAllRegistrant: async () => {
    const respons = await apiRegService.get('/registrants').catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })
    return respons.data
  },
  getAllDisease: async () => {
    const res = await apiRegService.get('stats/registrants/medic')
    return res;
  },
  getRegistrantNotRespons: async () => {
    return await apiRegService.get('/notregistrant').catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })
  },
  getAllQuestions: async () => {
    let res = await apiRegService.get('/questions').catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })
    return res;
  },
  getAnswersByQuestionId: async (question_id) => {
    return await apiRegService.get(`/answers/${question_id}`).catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })
  },
  postAnswerEvaluations: async (answerEva) => {
    return await apiRegService.post(`/answers/evaluations`, answerEva).catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })
  },
  getQuestionById: async (question_id) => {
    return await apiRegService.get(`/questions/${question_id}`).catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })
  },

  getDataForUpdateNote: async (data) => {

    await apiRegService.put('/registrants/note', {
      'itim_wip_id': data.wipId,
      'note': data.note,
    }).catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    })

  },

}

export const Stats = {
  getRegistrantStats: async () => {

    return await apiRegService.get('/stats/registrants').catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    });
  },
  getRegistrantStatsByDate: async (startdate, enddate) => {
    return await apiRegService.get('/stats/registrants/date?startdate=' + startdate + "&&enddate=" + enddate).catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    });
  },
  getRegistrantStatsByTime: async () => {
    return await apiRegService.get('/stats/registrants/time').catch(error => {
      if (error.response.status === 401) {
        checkAuth.clearJwt(error.response.status)
      }
    });
  }

}

export default Question;