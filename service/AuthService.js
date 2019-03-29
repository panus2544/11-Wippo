import api from '../utils/apiAuthService'
import Cookies from './CookieService'
import apiAuthService from '../utils/apiAuthService';

const AuthService = {
  login: async (request) => {
    try {
      Cookies.setCookie('name', request.name)
      await api.post('/auth/login', {
        'provider_name': 'facebook',
        'provider_id': request.userID,
        'accessToken': request.accessToken,
        'role' : 3
      })
        .then(respons => {
          console.log('callback')
          if (respons) {
            Cookies.setCookie('tokenJWT', respons.data.token)
            Cookies.setCookie('wip_Id', respons.data.wip_id)
            location.reload(true)
          } else {
          }
        })
    } catch (error) {
      console.log(error)
    }
  },
  changeRole: async (data) => {
    try {
      await apiAuthService.put('/changerole', {
        'wip_id_itim': data.wipId,
        'role_id': data.roleId,
      })
    } catch (error) {
      console.log(error)
    }
  },
  

}

export default AuthService
