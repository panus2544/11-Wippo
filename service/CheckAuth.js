import Cookies from './CookieService'

const checkAuth = {
  clearJwt: async (req) => {
    if (req === 401) {
        Cookies.removeJWTAndEmailCookie()
        alert('Session time out!!')
        location.reload();
    }
  }

  

}

export default checkAuth
